import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('popstate', close)
    return () => window.removeEventListener('popstate', close)
  }, [])

  return (
    <nav className="navbar">
      <div className="logo">
        <i className="fa-solid fa-bolt" style={{ color: 'var(--dark)' }} />
        田栩宁资源网
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
            影视剧
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
            to="/interviews"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setOpen(false)}
          >
            综艺访谈
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
      </ul>
    </nav>
  )
}
