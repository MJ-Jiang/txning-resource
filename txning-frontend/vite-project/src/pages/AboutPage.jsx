import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Banner from '../components/Banner'

export default function AboutMePage() {
  const marqueeText =
    '本站是关于「田栩宁」的资源站，整理作品、官方活动与商务/杂志合作信息，方便快速检索与浏览。'
  const portraitUrl =
    'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=2787&auto=format&fit=crop'

  const contactEmail = 'contact@example.com'

  return (
    <div className="page">
      <Navbar />

      <div className="poster">
        <img className="poster-img" src={portraitUrl} alt="田栩宁 海报" />
      </div>

      {/* 跑马灯：联系我们 + 站点说明 */}
      <div id="contact" className="marquee-strip">
        <div className="marquee-content" aria-label="contact marquee">
          <span className="marquee-item">
            <i className="fa-solid fa-bolt" aria-hidden="true"></i>
            {marqueeText}
          </span>

          <span className="marquee-sep">//</span>

          <span className="marquee-item">
            <i className="fa-solid fa-envelope" aria-hidden="true"></i>
            联系本站：{contactEmail}
          </span>

          <span className="marquee-sep">//</span>

          {/* 复制一遍，保证无缝滚动观感更好 */}
          <span className="marquee-item">
            <i className="fa-solid fa-bolt" aria-hidden="true"></i>
            {marqueeText}
          </span>

          <span className="marquee-sep">//</span>

          <span className="marquee-item">
            <i className="fa-solid fa-envelope" aria-hidden="true"></i>
            联系本站：{contactEmail}
          </span>

          <span className="marquee-sep">//</span>
        </div>
      </div>

      <Footer />
    </div>
  )
}
