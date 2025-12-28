import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Banner from '../components/Banner.jsx'
import HomeSection from '../components/lists/HomeSection.jsx'
import EndorsementGrid from '../components/lists/EndorsementGrid.jsx'
import DramaScroller from '../components/lists/DramaScroller.jsx'
import EventsTimeline from '../components/lists/EventsTimeline.jsx'
import GalleryGrid from '../components/lists/GalleryGrid.jsx'
import { useEffect, useState } from 'react'
import { getResources } from '@/services/resources'

export default function HomePage() {
  const [resources, setResources] = useState([])
  useEffect(() => {
    async function loadResources() {
      const data = await getResources()
      setResources(data)
    }
    loadResources()
  }, [])

  const getFeaturedByCategory = (category) =>
    resources.filter((x) => x.category === category && x.isFeatured === true)

  const endorsementItems = getFeaturedByCategory('endorsements')
  const dramaItems = getFeaturedByCategory('dramas')
  const eventItems = getFeaturedByCategory('events')
  const galleryItems = getFeaturedByCategory('ugc')

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
          title="影视剧综"
          subtitle="DRAMAS "
          to="/dramas"
        >
          <DramaScroller items={dramaItems} />
        </HomeSection>
        <HomeSection title="商务杂志" subtitle="MAGAZINE" to="/endorsements">
          <EndorsementGrid items={endorsementItems} />
        </HomeSection>
        <HomeSection
          className="section section-event"
          title="官方活动"
          subtitle="EVENTS"
          to="/events"
        >
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
