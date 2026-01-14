import { NavLink } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { useDict } from '@/providers/useDict'

const MOBILE_BP = 768

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { categoryByCode } = useDict()

  // ✅ 完全由 provider 决定分类名称
  const navItems = useMemo(
    () => [
      { to: '/', label: '主页', end: true },
      {
        to: '/drama',
        label: categoryByCode?.drama?.name_zh,
      },
      {
        to: '/endorsement',
        label: categoryByCode?.endorsement?.name_zh,
      },
      {
        to: '/event',
        label: categoryByCode?.event?.name_zh,
      },
      { to: '/gallery', label: categoryByCode?.ugc?.name_zh },
      { to: '/aboutme', label: '关于我' },
    ],
    [categoryByCode]
  )

  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('popstate', close)
    return () => window.removeEventListener('popstate', close)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BP}px)`)

    const handleChange = (e) => {
      if (!e.matches) setOpen(false)
    }

    // 初始状态
    if (!mq.matches) setOpen(false)

    // 兼容 Safari / CI Chrome
    if (mq.addEventListener) {
      mq.addEventListener('change', handleChange)
      return () => mq.removeEventListener('change', handleChange)
    } else if (mq.addListener) {
      mq.addListener(handleChange)
      return () => mq.removeListener(handleChange)
    }
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

        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'active' : ''}`
              }
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
