import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <i className="fa-solid fa-bolt" style={{ color: 'var(--dark)' }}></i>{' '}
        田栩宁
      </div>

      <ul className="nav-links">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            主页
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dramas"
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            影视剧
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/magazines"
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            商务杂志
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/interviews"
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            综艺访谈
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/events"
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            官方活动
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            图频
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}