export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-deco"><i className="fa-solid fa-bolt"></i></div>
      <h2 style={{ marginBottom: '2rem', fontStyle: 'italic' }}>
         田栩宁资源站
      </h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          marginBottom: '3rem',
        }}
      >
        <a href="#"><i className="fa-brands fa-weibo fa-2x"></i></a>
        <a href="#"><i className="fa-brands fa-instagram fa-2x"></i></a>
        <a href="#"><i className="fa-brands fa-twitter fa-2x"></i></a>
      </div>
      <p>© 2025 田栩宁资源站.</p>
    </footer>
  )
}
