import Navbar from "../components/Navbar";
import Footer from '../components/Footer'
import Banner from '../components/Banner.jsx'
import Marquee from "../components/Marquee.jsx";
import HomeSection from '../components/HomeSection'
import MagazineGrid from '../components/lists/MagazineGrid'
import DramaScroller from '../components/lists/DramaScroller'
import { mockResources } from '../data/mockResources'
import { mockFeatured } from '../data/mockFeatured'
export default function HomePage() {
    const magazineItems = mockResources
    .filter((r) => r.category === 'magazines')
    .filter((r) => mockFeatured.magazines.includes(r.id))
    const dramaItems = mockResources
  .filter((x) => x.category === 'dramas')
  .filter((x) => mockFeatured.dramas.includes(x.id))
  return (
    <div className="app-container">

      <Navbar />

      <Banner />

     <Marquee />
    <HomeSection title="商务杂志" subtitle="MAGAZINE" to="#">
        <MagazineGrid items={magazineItems} />
      </HomeSection>

      <HomeSection
  className="section section-movie"
  title="影视剧"
  subtitle="MOVIES & TV"
  to="/dramas"
>
  <DramaScroller items={dramaItems} />
</HomeSection>

      {/* 02 影视剧 (Movies & TV) - Dark Mode
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
            VIEW ALL <i className="fa-solid fa-circle-arrow-right"></i>
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
      </section> */}

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
