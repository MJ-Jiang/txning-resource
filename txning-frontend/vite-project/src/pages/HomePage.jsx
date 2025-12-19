import Navbar from "../components/Navbar";
import Footer from '../components/Footer'
import Banner from '../components/Banner.jsx'
import Marquee from "../components/Marquee.jsx";
import HomeSection from '../components/HomeSection'
import MagazineGrid from '../components/lists/MagazineGrid'
import DramaScroller from '../components/lists/DramaScroller'
import InterviewGrid from '../components/lists/InterviewGrid'
import EventsTimeline from '../components/lists/EventsTimeline'
import { mockResources } from '../data/mockResources'
import { mockFeatured } from '../data/mockFeatured'
export default function HomePage() {
    const magazineItems = mockResources
    .filter((r) => r.category === 'magazines')
    .filter((r) => mockFeatured.magazines.includes(r.id))
    const dramaItems = mockResources
  .filter((x) => x.category === 'dramas')
  .filter((x) => mockFeatured.dramas.includes(x.id))
  const interviewItems = mockResources
  .filter((x) => x.category === 'interviews')
  .filter((x) => mockFeatured.interviews.includes(x.id))
  const eventItems = mockResources
  .filter((x) => x.category === 'events')
  .filter((x) => mockFeatured.events.includes(x.id))
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
  title="影视剧综"
  subtitle="MOVIES & TV & SHOWS"
  to="/dramas"
>
  <DramaScroller items={dramaItems} />
</HomeSection>
<HomeSection title="访谈" subtitle="INTERVIEWS" to="/interviews">
  <InterviewGrid items={interviewItems} />
</HomeSection>
<HomeSection title="官方活动" subtitle="EVENTS" to="/events">
  <EventsTimeline items={eventItems} />
</HomeSection>
     

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
