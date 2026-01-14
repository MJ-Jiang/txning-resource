import { NavLink } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { useDict } from '@/providers/useDict'

const MOBILE_BP = 768

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { categoryByCode } = useDict()

  // 🔒 确保 label 永远是字符串（CI dict 未就绪时也不炸）
  const safe = (v, fallback) => (typeof v === 'string' && v ? v : fallback)

  const navItems = useMemo(
    () => [
      { to: '/', label: '主页', end: true },
      {
        to: '/drama',
        label: safe(categoryByCode?.drama?.name_zh, '影视剧'),
      },
      {
        to: '/endorsement',
        label: safe(categoryByCode?.endorsement?.name_zh, '商务'),
      },
      {
        to: '/event',
        label: safe(categoryByCode?.event?.name_zh, '活动'),
      },
      {
        to: '/gallery',
        label: safe(categoryByCode?.ugc?.name_zh, '图频'),
      },
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

    if (!mq.matches) setOpen(false)

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
