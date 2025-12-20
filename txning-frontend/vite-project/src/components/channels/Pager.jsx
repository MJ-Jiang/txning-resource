import { useMemo } from 'react'

export default function Pager({ page, totalPages, onPrev, onNext, onGo }) {
  const pages = useMemo(() => {
    const res = []
    const push = (x) => res.push(x)

    const show = new Set([
      1,
      2,
      totalPages - 1,
      totalPages,
      page - 1,
      page,
      page + 1,
    ])

    const list = Array.from(show)
      .filter((n) => n >= 1 && n <= totalPages)
      .sort((a, b) => a - b)

    let prev = 0
    for (const n of list) {
      if (prev && n - prev > 1) push('…')
      push(n)
      prev = n
    }
    return res
  }, [page, totalPages])

  return (
    <div className="pager">
      <button className="pager-btn" onClick={onPrev} disabled={page <= 1}>
        上一页
      </button>

      <div className="pager-pages">
        {pages.map((p, idx) =>
          p === '…' ? (
            <span key={`e-${idx}`} className="pager-ellipsis">
              …
            </span>
          ) : (
            <button
              key={p}
              className={`pager-page ${p === page ? 'active' : ''}`}
              onClick={() => onGo(p)}
            >
              {p}
            </button>
          )
        )}
      </div>

      <button
        className="pager-btn"
        onClick={onNext}
        disabled={page >= totalPages}
      >
        下一页
      </button>
    </div>
  )
}
