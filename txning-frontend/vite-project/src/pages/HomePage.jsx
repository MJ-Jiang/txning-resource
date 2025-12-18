import Navbar from "../components/Navbar";
import Footer from '../components/Footer'
export default function HomePage() {
  return (
    <div className="app-container">
      {/* 导航栏 */}
      <Navbar />

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
            2023 世界巡演即将启航，全新专辑《Flash Point》震撼发布，定义属于你的高光时刻。
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

      {/* 跑马灯 */}
      <div className="marquee-strip">
        <div className="marquee-content">
          <i className="fa-solid fa-lemon"></i> ALEX ZHANG OFFICIAL WEBSITE
          <span style={{ margin: '0 40px' }}>//</span>
          <i className="fa-solid fa-bolt"></i> NEW BUSINESS COLLABORATION
          <span style={{ margin: '0 40px' }}>//</span>
          <i className="fa-solid fa-video"></i> SUMMER MOVIE FESTIVAL
          <span style={{ margin: '0 40px' }}>//</span>
          <i className="fa-solid fa-lemon"></i> ALEX ZHANG OFFICIAL WEBSITE
          <span style={{ margin: '0 40px' }}>//</span>
          <i className="fa-solid fa-bolt"></i> NEW BUSINESS COLLABORATION
          <span style={{ margin: '0 40px' }}>//</span>
        </div>
      </div>

      {/* 01 商务杂志 (Business & Magazines) */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">商务杂志 / MAGAZINE</h2>
          <a href="#" className="more-link">
            VIEW ALL <i className="fa-solid fa-circle-arrow-right"></i>
          </a>
        </div>

        <div className="mag-grid">
          <div className="mag-card">
            <div className="mag-img-container">
              <div className="mag-sticker">OCT COVER</div>
              <img
                src="https://images.unsplash.com/photo-1542206395-9feb3edaa68d?q=80&w=2864&auto=format&fit=crop"
                className="mag-img"
                alt="Mag"
              />
            </div>
            <div className="mag-info">
              <h3 className="mag-title">VOGUE me 十月刊</h3>
              <p className="mag-sub">封面人物 / 独家专访</p>
            </div>
          </div>

          <div className="mag-card">
            <div className="mag-img-container">
              <div
                className="mag-sticker"
                style={{ background: 'var(--white)', color: 'var(--dark)' }}
              >
                BRAND
              </div>
              <img
                src="https://images.unsplash.com/photo-1611048267451-e6ed903d4a38?q=80&w=2944&auto=format&fit=crop"
                className="mag-img"
                alt="Brand"
              />
            </div>
            <div className="mag-info">
              <h3 className="mag-title">GENTLE MONSTER</h3>
              <p className="mag-sub">全球品牌代言人</p>
            </div>
          </div>

          <div className="mag-card">
            <div className="mag-img-container">
              <div className="mag-sticker">SEP ISSUE</div>
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2940&auto=format&fit=crop"
                className="mag-img"
                alt="Mag"
              />
            </div>
            <div className="mag-info">
              <h3 className="mag-title">ELLE MEN 秋季刊</h3>
              <p className="mag-sub">内页大片 / 时尚解析</p>
            </div>
          </div>

          <div className="mag-card">
            <div className="mag-img-container">
              <div
                className="mag-sticker"
                style={{ background: '#FF5E57', color: 'white' }}
              >
                NEW
              </div>
              <img
                src="https://images.unsplash.com/photo-1550614000-4b9519e020d9?q=80&w=2836&auto=format&fit=crop"
                className="mag-img"
                alt="Mag"
              />
            </div>
            <div className="mag-info">
              <h3 className="mag-title">TIFFANY &amp; CO.</h3>
              <p className="mag-sub">品牌挚友推广</p>
            </div>
          </div>
        </div>
      </section>

      {/* 02 影视剧 (Movies & TV) - Dark Mode */}
      <section className="section section-movie">
        <div className="section-header">
          <i
            className="fa-solid fa-bolt"
            style={{ fontSize: '2.5rem', color: 'var(--primary)' }}
          ></i>
          <h2 className="section-title" style={{ color: 'var(--white)' }}>
            影视剧 / MOVIES &amp; TV
          </h2>
          <a href="#" className="more-link" style={{ color: 'var(--primary)' }}>
            FILMOGRAPHY <i className="fa-solid fa-circle-arrow-right"></i>
          </a>
        </div>

        <div className="movie-scroller">
          <div className="movie-item">
            <div className="movie-tag">上映中</div>
            <img
              src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2940&auto=format&fit=crop"
              className="movie-poster"
              alt="Movie"
            />
            <div className="movie-desc">
              <h4>深海救援</h4>
              <p style={{ color: '#aaa', fontSize: '0.8rem' }}>
                2023 | 动作 / 冒险
              </p>
            </div>
          </div>

          <div className="movie-item">
            <div className="movie-tag" style={{ background: '#888' }}>
              待播
            </div>
            <img
              src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2825&auto=format&fit=crop"
              className="movie-poster"
              alt="Movie"
            />
            <div className="movie-desc">
              <h4>霓虹街区</h4>
              <p style={{ color: '#aaa', fontSize: '0.8rem' }}>
                2024 | 赛博朋克剧集
              </p>
            </div>
          </div>

          <div className="movie-item">
            <img
              src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2940&auto=format&fit=crop"
              className="movie-poster"
              alt="Movie"
            />
            <div className="movie-desc">
              <h4>沉默的证人</h4>
              <p style={{ color: '#aaa', fontSize: '0.8rem' }}>
                2022 | 悬疑 / 犯罪
              </p>
            </div>
          </div>

          <div className="movie-item">
            <img
              src="https://images.unsplash.com/photo-1594909122845-861c4f9c16cb?q=80&w=2940&auto=format&fit=crop"
              className="movie-poster"
              alt="Movie"
            />
            <div className="movie-desc">
              <h4>青春派对</h4>
              <p style={{ color: '#aaa', fontSize: '0.8rem' }}>
                2021 | 综艺常驻
              </p>
            </div>
          </div>

          <div className="movie-item">
            <img
              src="https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=2940&auto=format&fit=crop"
              className="movie-poster"
              alt="Movie"
            />
            <div className="movie-desc">
              <h4>极速狂飙</h4>
              <p style={{ color: '#aaa', fontSize: '0.8rem' }}>
                2020 | 动作
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 访谈 (Interviews) */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">访谈 / INTERVIEWS</h2>
          <i className="fa-regular fa-comments" style={{ fontSize: '2.5rem' }}></i>
        </div>

        <div className="interview-grid">
          <div className="interview-card">
            <i className="fa-solid fa-quote-left"></i>
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop"
              className="inv-thumb"
              alt="Interview"
            />
            <div className="inv-content">
              <h3>《人物》封面专访</h3>
              <p className="inv-quote">
                “我不定义自己，因为定义往往意味着限制。我更喜欢在未知中寻找新的能量。”
              </p>
            </div>
          </div>

          <div className="interview-card">
            <i className="fa-solid fa-quote-left"></i>
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop"
              className="inv-thumb"
              alt="Interview"
            />
            <div className="inv-content">
              <h3>新浪娱乐：这就爱了</h3>
              <p className="inv-quote">
                “演戏就像是一次灵魂的旅行，能在不同的角色里活一次，本身就很酷。”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 04 官方活动 (Official Events) */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">官方活动 / EVENTS</h2>
          <i
            className="fa-solid fa-calendar-check"
            style={{ fontSize: '2.5rem' }}
          ></i>
        </div>

        <div className="events-list">
          <div className="event-item">
            <div className="event-marker"></div>
            <div className="event-card">
              <div className="event-date">
                24<span>NOV</span>
              </div>
              <div className="event-details">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>
                  上海粉丝见面会
                </h3>
                <p style={{ color: '#666' }}>
                  <i className="fa-solid fa-location-dot"></i>{' '}
                  上海梅赛德斯奔驰文化中心 | 19:30 PM
                </p>
              </div>
              <a
                href="#"
                style={{
                  background: 'var(--dark)',
                  color: 'white',
                  padding: '10px 20px',
                  fontWeight: 'bold',
                  borderRadius: '5px',
                }}
              >
                TICKETS
              </a>
            </div>
          </div>

          <div className="event-item">
            <div className="event-marker"></div>
            <div className="event-card">
              <div className="event-date">
                10<span>DEC</span>
              </div>
              <div className="event-details">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>
                  年度时尚盛典红毯
                </h3>
                <p style={{ color: '#666' }}>
                  <i className="fa-solid fa-location-dot"></i> 北京 ｜ 待定
                </p>
              </div>
              <a
                href="#"
                style={{
                  border: '2px solid var(--dark)',
                  padding: '8px 18px',
                  fontWeight: 'bold',
                  borderRadius: '5px',
                }}
              >
                INFO
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 05 图频 (Photos & Clips) */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="section-header">
          <h2 className="section-title">图频 / GALLERY</h2>
          <i
            className="fa-solid fa-camera-retro"
            style={{ fontSize: '2.5rem' }}
          ></i>
        </div>

        <div className="gallery-grid">
          <div className="gallery-item">
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=2787&auto=format&fit=crop"
              style={{ height: '100%', objectFit: 'cover' }}
              alt="Pic"
            />
            <div className="gallery-overlay">
              <i className="fa-solid fa-heart" style={{ fontSize: '2rem' }}></i>
            </div>
          </div>

          <div className="gallery-item">
            <img
              src="https://images.unsplash.com/photo-1520342868574-5fa3804e551c?q=80&w=2803&auto=format&fit=crop"
              style={{ height: '100%', objectFit: 'cover' }}
              alt="Pic"
            />
            <div className="gallery-overlay">
              <i className="fa-solid fa-play" style={{ fontSize: '2rem' }}></i>
            </div>
          </div>

          <div className="gallery-item">
            <img
              src="https://images.unsplash.com/photo-1496345647009-l6d9506e23b9?q=80&w=2836&auto=format&fit=crop"
              style={{ height: '100%', objectFit: 'cover' }}
              alt="Pic"
            />
            <div className="gallery-overlay">
              <i className="fa-solid fa-heart" style={{ fontSize: '2rem' }}></i>
            </div>
          </div>

          <div className="gallery-item">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2788&auto=format&fit=crop"
              style={{ height: '100%', objectFit: 'cover' }}
              alt="Pic"
            />
            <div className="gallery-overlay">
              <i className="fa-solid fa-expand" style={{ fontSize: '2rem' }}></i>
            </div>
          </div>

          <div className="gallery-item">
            <img
              src="https://images.unsplash.com/photo-1516726817505-f5ed825624d8?q=80&w=2787&auto=format&fit=crop"
              style={{ height: '100%', objectFit: 'cover' }}
              alt="Pic"
            />
            <div className="gallery-overlay">
              <i className="fa-solid fa-heart" style={{ fontSize: '2rem' }}></i>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
