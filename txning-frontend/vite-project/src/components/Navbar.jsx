import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'

const MOBILE_BP = 768

export default function Navbar() {
  const [open, setOpen] = useState(false)

  // 1) 浏览器前进/后退时关菜单（你原来就有）
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

        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setOpen(false)}
          >
            主页
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dramas"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setOpen(false)}
          >
            影视剧综
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/endorsements"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setOpen(false)}
          >
            商务杂志
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/events"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setOpen(false)}
          >
            官方活动
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/gallery"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setOpen(false)}
          >
            图频
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/aboutme"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setOpen(false)}
          >
            关于我
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
