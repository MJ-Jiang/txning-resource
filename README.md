txning-resource/
├─ txning-backend/
│  ├─ controllers/
│  │  ├─ auth.js                 # 管理员登录/刷新（可选）/退出（可选）
│  │  ├─ links.js                # 资源 CRUD、排序、上下线、置顶
│  │  ├─ categories.js           # 分类 CRUD
│  │  ├─ tags.js                 # 标签 CRUD
│  │  ├─ platforms.js            # 平台配置（可选：scheme/规则）
│  │  ├─ redirects.js            # /r/:id 记录点击 -> 302 跳转
│  │  └─ stats.js                # 点击排行/趋势/平台占比
│  │
│  ├─ models/
│  │  ├─ user.js                 # 管理员用户
│  │  ├─ link.js                 # 资源：title/webUrl/appUrl/status/priority/pinned/...
│  │  ├─ category.js
│  │  ├─ tag.js
│  │  ├─ platform.js             # 可选
│  │  └─ clickLog.js             # 点击日志（或 dailyStats 汇总）
│  │
│  ├─ routes/                    # 你也可以不单独建 routes，直接在 controllers 里挂载
│  │  ├─ auth.js
│  │  ├─ links.js
│  │  ├─ categories.js
│  │  ├─ tags.js
│  │  ├─ platforms.js
│  │  ├─ redirects.js
│  │  └─ stats.js
│  │
│  ├─ services/
│  │  ├─ linkService.js          # 排序、批量导入、置顶规则
│  │  ├─ redirectService.js      # 跳转与 fallback、记录点击
│  │  └─ statsService.js         # 聚合统计
│  │
│  ├─ utils/
│  │  ├─ config.js
│  │  ├─ logger.js
│  │  ├─ validators.js           # zod/joi 校验（可选但很推荐）
│  │  ├─ urlTools.js             # 识别平台、规范化分享链接
│  │  └─ constants.js
│  │
│  ├─ middleware/
│  │  ├─ auth.js                 # token 校验 + 权限
│  │  ├─ requestLogger.js
│  │  ├─ errorHandler.js
│  │  └─ unknownEndpoint.js
│  │
│  ├─ request/                   # REST Client 测试文件（和你案例一样）
│  │  ├─ login.rest
│  │  ├─ create_link.rest
│  │  ├─ reorder_links.rest
│  │  ├─ get_public_links.rest
│  │  └─ redirect_click.rest
│  │
│  ├─ test/                      # jest + supertest
│  │  ├─ links_api.test.js
│  │  ├─ auth_api.test.js
│  │  ├─ stats_api.test.js
│  │  └─ test_helper.js
│  │
│  ├─ app.js
│  ├─ index.js
│  ├─ package.json
│  ├─ package-lock.json
│  └─ .env
│
├─ txning-frontend/
│  ├─ dist/
│  ├─ public/
│  ├─ src/
│  │  ├─ components/
│  │  │  ├─ layout/
│  │  │  │  ├─ Navbar.jsx
│  │  │  │  └─ Footer.jsx
│  │  │  ├─ common/
│  │  │  │  ├─ Notification.jsx
│  │  │  │  ├─ ConfirmDialog.jsx
│  │  │  │  ├─ TagPill.jsx
│  │  │  │  └─ Pagination.jsx
│  │  │  ├─ links/
│  │  │  │  ├─ LinkCard.jsx
│  │  │  │  ├─ LinkList.jsx
│  │  │  │  ├─ LinkFilterBar.jsx     # 平台/分类/标签筛选 + 排序
│  │  │  │  └─ LinkDetailModal.jsx   # 可选
│  │  │  └─ admin/
│  │  │     ├─ LoginForm.jsx
│  │  │     ├─ LinkForm.jsx          # 新增/编辑链接
│  │  │     ├─ LinkTable.jsx         # 列表管理
│  │  │     ├─ LinkReorder.jsx       # 拖拽排序（可选）
│  │  │     ├─ CategoryManager.jsx
│  │  │     ├─ TagManager.jsx
│  │  │     └─ StatsPanel.jsx
│  │  │
│  │  ├─ pages/                      # 也可以叫 views/
│  │  │  ├─ Home.jsx                 # 首页：精选/最新
│  │  │  ├─ Explore.jsx              # 资源浏览页
│  │  │  ├─ Admin.jsx                # 后台总入口
│  │  │  └─ NotFound.jsx
│  │  │
│  │  ├─ services/
│  │  │  ├─ links.js                 # 对应后端 /api/links
│  │  │  ├─ categories.js
│  │  │  ├─ tags.js
│  │  │  ├─ platforms.js
│  │  │  ├─ auth.js                  # /api/auth/login
│  │  │  └─ stats.js
│  │  │
│  │  ├─ hooks/
│  │  │  ├─ useNotification.js
│  │  │  └─ useAuth.js
│  │  │
│  │  ├─ utils/
│  │  │  ├─ storage.js               # token 存取
│  │  │  └─ url.js                   # 生成跳转URL：/r/:id 或 webUrl
│  │  │
│  │  ├─ App.jsx
│  │  ├─ main.jsx
│  │  └─ App.css
│  │
│  ├─ index.html
│  ├─ testSetup.js                   # 前端单测（可选）
│  ├─ vite.config.js
│  ├─ package.json
│  ├─ package-lock.json
│  └─ .env
│
├─ cypress/
│  ├─ e2e/
│  │  ├─ public_browse.cy.js         # 访客：浏览/筛选/搜索
│  │  ├─ admin_login.cy.js           # 后台：登录
│  │  ├─ admin_links_crud.cy.js      # 后台：新增/编辑/上下线
│  │  ├─ admin_reorder.cy.js         # 后台：排序/置顶
│  │  └─ redirect_click_stats.cy.js  # 跳转：/r/:id 记录点击 + 统计变化
│  │
│  ├─ fixtures/
│  │  ├─ admin.json                  # 管理员账号（测试用）
│  │  └─ links.json                  # 测试资源数据
│  │
│  ├─ support/
│  │  ├─ commands.js                 # 自定义命令：cy.login(), cy.createLink()
│  │  └─ e2e.js
│  │
│  └─ screenshots/
│
├─ cypress.config.js
├─ docker-compose.yml                # 可选：postgres + backend + frontend
├─ .gitignore
└─ README.md
