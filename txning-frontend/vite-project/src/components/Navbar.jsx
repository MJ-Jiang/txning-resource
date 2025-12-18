export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <i className="fa-solid fa-bolt" style={{ color: 'var(--dark)' }}></i>{' '}
        田栩宁
      </div>
      <ul className="nav-links">
        <li><a href="#" className="nav-item active">主页</a></li>
        <li><a href="#" className="nav-item">商务杂志</a></li>
        <li><a href="#" className="nav-item">影视剧</a></li>
        <li><a href="#" className="nav-item">访谈</a></li>
        <li><a href="#" className="nav-item">官方活动</a></li>
        <li><a href="#" className="nav-item">图频</a></li>
      </ul>
    </nav>
  )
}
