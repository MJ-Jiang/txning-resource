import time
from collections import defaultdict, deque
from typing import Deque, Dict, Tuple

from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse


class RateLimitMiddleware(BaseHTTPMiddleware):
    """
    简单滑动窗口限流（内存版）：
    - 按 client_ip + path_prefix 作为 key
    - 在 window_seconds 内最多 max_requests 次
    注意：多进程/多实例不会共享计数；重启会清空；适合先本地/单实例验证。
    """

    def __init__(
        self,
        app,
        max_requests: int = 120,
        window_seconds: int = 60,
        key_prefix: str = "rl",
        scope_path_prefixes: Tuple[str, ...] = ("/",),  # 需要限流的路径前缀
        exclude_path_prefixes: Tuple[str, ...] = ("/health",),  # 排除
    ):
        super().__init__(app)
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.key_prefix = key_prefix
        self.scope_path_prefixes = scope_path_prefixes
        self.exclude_path_prefixes = exclude_path_prefixes

        # key -> timestamps queue
        self._hits: Dict[str, Deque[float]] = defaultdict(deque)

    def _get_client_ip(self, request: Request) -> str:
        """
        Render/反代下通常会带 X-Forwarded-For。
        取第一个 IP 作为真实客户端 IP。
        """
        xff = request.headers.get("x-forwarded-for")
        if xff:
            # "client, proxy1, proxy2"
            return xff.split(",")[0].strip()

        real_ip = request.headers.get("x-real-ip")
        if real_ip:
            return real_ip.strip()

        client = request.client
        return client.host if client else "unknown"

    def _should_apply(self, path: str) -> bool:
        if any(path.startswith(p) for p in self.exclude_path_prefixes):
            return False
        return any(path.startswith(p) for p in self.scope_path_prefixes)

    async def dispatch(self, request: Request, call_next):
        path = request.url.path

        if not self._should_apply(path):
            return await call_next(request)

        ip = self._get_client_ip(request)


        key = f"{self.key_prefix}:{ip}:{path}"

        now = time.time()
        q = self._hits[key]

        # 清理窗口外的记录
        window_start = now - self.window_seconds
        while q and q[0] < window_start:
            q.popleft()

        if len(q) >= self.max_requests:
            retry_after = int(q[0] + self.window_seconds - now) + 1
            return JSONResponse(
                status_code=429,
                content={
                    "detail": "Too Many Requests",
                    "retry_after_seconds": retry_after,
                },
                headers={
                    "Retry-After": str(max(retry_after, 1)),
                },
            )

        q.append(now)
        return await call_next(request)
