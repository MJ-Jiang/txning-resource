import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
// Navbar.jsx 顶部
import { CATEGORY_LABEL, CATEGORY_CODES } from '@/dictionary/category'

const NAV_ITEMS = [
  { to: '/', label: '主页', end: true },
  { to: '/drama', category: CATEGORY_CODES.DRAMA },
  { to: '/endorsement', category: CATEGORY_CODES.ENDORSEMENT },
  { to: '/event', category: CATEGORY_CODES.EVENT },
  { to: '/gallery', label: '图频' },
  { to: '/aboutme', label: '关于我' },
]

const MOBILE_BP = 768

export default function Navbar() {
  const [open, setOpen] = useState(false)

  // 1) 浏览器前进/后退时关菜单（
  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('popstate', close)
    return () => window.removeEventListener('popstate', close)
  }, [])

  // 2) ✅ 关键：从小屏变大屏时自动关菜单（解决“放大后柠檬不消失”）
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BP}px)`)

    const handleChange = (e) => {
      // 变成桌面端（不再匹配 max-width）就关掉
      if (!e.matches) setOpen(false)
    }

    // 初始化：如果一开始就是桌面，也确保是关闭状态
    if (!mq.matches) setOpen(false)

    mq.addEventListener('change', handleChange)
    return () => mq.removeEventListener('change', handleChange)
  }, [])

  return (
    <nav className="navbar">
      <div className="logo">
        <i className="fa-solid fa-bolt" style={{ color: 'var(--dark)' }} />
        田栩宁资源站
      </div>

      <button
        type="button"
        className="nav-toggle"
        aria-label="菜单"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <i className="fa-solid fa-bars" />
      </button>

      <ul className={`nav-links ${open ? 'open' : ''}`}>
        <i className="fa-solid fa-lemon nav-lemon-big" aria-hidden="true"></i>

        {NAV_ITEMS.map((item) => {
          const label =
            item.label ?? CATEGORY_LABEL[item.category] ?? item.category

          return (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `nav-item ${isActive ? 'active' : ''}`
                }
                onClick={() => setOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
