import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Banner from '../components/Banner.jsx'
import HomeSection from '../components/lists/HomeSection.jsx'
import MagazineGrid from '../components/lists/MagazineGrid.jsx'
import DramaScroller from '../components/lists/DramaScroller.jsx'
import InterviewGrid from '../components/lists/InterviewGrid.jsx'
import EventsTimeline from '../components/lists/EventsTimeline.jsx'
import GalleryGrid from '../components/lists/GalleryGrid.jsx'
import { mockResources } from '../data/mockResources'

export default function HomePage() {
  const getFeaturedByCategory = (category) =>
    mockResources.filter(
      (x) => x.category === category && x.isFeatured === true
    )

  const magazineItems = getFeaturedByCategory('magazines')
  const dramaItems = getFeaturedByCategory('dramas')
  const interviewItems = getFeaturedByCategory('interviews')
  const eventItems = getFeaturedByCategory('events')
  const galleryItems = getFeaturedByCategory('gallery')

  return (
    <div className="page">
      <Navbar />
      <main className="app-container">
        <Banner
          banners={[
            {
              imgSrc: '/banner1.jpg',
              href: '/page1',
              alt: 'Banner 1',
            },
            {
              imgSrc: '/banner2.jpg',
              href: '/page2',
              alt: 'Banner 2',
            },
            {
              imgSrc: '/banner3.jpg',
              href: '/page3',
              alt: 'Banner 3',
            },
          ]}
        />
        <HomeSection
          className="section section-movie"
          title="影视剧"
          subtitle="MOVIES & TV "
          to="/dramas"
        >
          <DramaScroller items={dramaItems} />
        </HomeSection>
        <HomeSection title="商务杂志" subtitle="MAGAZINE" to="/magazines">
          <MagazineGrid items={magazineItems} />
        </HomeSection>

        <HomeSection
          className="section section-interview"
          title="综艺访谈"
          subtitle="SHOWS & INTERVIEWS"
          to="/interviews"
        >
          <InterviewGrid items={interviewItems} />
        </HomeSection>
        <HomeSection title="官方活动" subtitle="EVENTS" to="/events">
          <EventsTimeline items={eventItems} />
        </HomeSection>
        <HomeSection title="图频" subtitle="GALLERY" to="/gallery">
          <GalleryGrid items={galleryItems} />
        </HomeSection>
      </main>
      <Footer />
    </div>
  )
}
