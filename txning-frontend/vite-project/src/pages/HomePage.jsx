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
import { mockFeatured } from '../data/mockFeatured'
export default function HomePage() {
  const magazineItems = mockResources
    .filter((x) => x.category === 'magazines')
    .filter((x) => mockFeatured.magazines.includes(x.id))
  const dramaItems = mockResources
    .filter((x) => x.category === 'dramas')
    .filter((x) => mockFeatured.dramas.includes(x.id))
  const interviewItems = mockResources
    .filter((x) => x.category === 'interviews')
    .filter((x) => mockFeatured.interviews.includes(x.id))
  const eventItems = mockResources
    .filter((x) => x.category === 'events')
    .filter((x) => mockFeatured.events.includes(x.id))
  const galleryItems = mockResources
    .filter((x) => x.category === 'gallery')
    .filter((x) => mockFeatured.gallery.includes(x.id))
  return (
    <>
      <Navbar />
      <main className="app-container">
        <Banner />
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
        <Footer />
      </main>
    </>
  )
}
