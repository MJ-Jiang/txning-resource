export default function Banner() {
  return (
    <div className="app-container">
              {/* Banner 轮播区域 */}
      <header className="banner-section">
        <div className="banner-bg-pattern"></div>

        {/* 背景装饰闪电 */}
        <i className="fa-solid fa-bolt banner-lightning-bg"></i>

        {/* 漂浮柠檬 */}
        <div
          className="lemon-deco lemon-spin"
          style={{ top: '15%', left: '8%' }}
        ></div>
        <div
          className="lemon-deco"
          style={{ bottom: '20%', left: '45%', transform: 'scale(0.6)' }}
        ></div>

        <div className="banner-content">
          <div className="banner-tag">#全能艺人 / ALL ROUNDER</div>
          <h1 className="banner-title">
            BORN TO
            <br />
            <span style={{ color: 'white', WebkitTextStroke: '3px var(--dark)' }}>
              SHINE
            </span>
          </h1>
          <p
            style={{
              fontSize: '1.2rem',
              fontWeight: 600,
              marginBottom: '2.5rem',
              width: '80%',
            }}
          >
            2025 xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx。
          </p>
          <a href="#" className="banner-btn">
            了解行程 <i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>

        <div className="banner-visual">
          {/* 示意人物立绘，具有破格效果 */}
          <img
            src="https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=2787&auto=format&fit=crop"
            className="banner-person"
            alt="Star Portrait"
          />
        </div>

        <div className="banner-controls">
          <div className="control-dot active"></div>
          <div className="control-dot"></div>
          <div className="control-dot"></div>
        </div>
      </header>
    </div>
  );
}