export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-deco">
        <i className="fa-solid fa-lemon"></i>
      </div>
      <h2 className="footer-title" >
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
        <div className="social-icons">
          <a
            href="https://weibo.com/u/5118293668"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="微博"
          >
            <i className="fa-brands fa-weibo"></i>
          </a>

          <a
            href="https://www.instagram.com/tianxvning"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>

          <a
            href="https://v.douyin.com/ZinSbNCTyQU/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="抖音"
          >
            <i className="fa-brands fa-tiktok"></i>
          </a>

          <a
            href="https://xhslink.com/m/3M0yZqRcwIC"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="小红书"
          >
            <img src="/icons/xhs.svg" alt="小红书" />
          </a>
        </div>
      </div>
      <p>© 2025 Tian Xuning Fan Resource Hub.</p>
    </footer>
  )
}
