import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Banner from '../components/Banner.jsx'
import HomeSection from '../components/lists/HomeSection.jsx'
import EndorsementGrid from '../components/lists/EndorsementGrid.jsx'
import DramaScroller from '../components/lists/DramaScroller.jsx'
import EventsTimeline from '../components/lists/EventsTimeline.jsx'
import GalleryGrid from '../components/lists/GalleryGrid.jsx'
import { getResources } from '@/services/resources'

const HOME_LIMITS = {
  drama: 6,
  endorsement: 4,
  event: 5,
  ugc: 4,
  banners: 3,
}

export default function HomePage() {
  const [resources, setResources] = useState([])

  useEffect(() => {
    let alive = true
    ;(async () => {
      const data = await getResources()
      if (alive) setResources(Array.isArray(data) ? data : [])
    })()
    return () => {
      alive = false
    }
  }, [])

  // ✅ featured 数据（只算一次）
  const featured = useMemo(
    () => resources.filter((x) => x?.isFeatured === true),
    [resources]
  )

  // ✅ Banner 数据（从 resources 中筛选 category=banners）
  const bannerItems = useMemo(() => {
    return featured
      .filter((x) => x.category === 'banners')
      .slice(0, HOME_LIMITS.banners)
      .map((x) => ({
        posterUrl: x.posterUrl,
        href: x.href,
        alt: x.posterAlt || 'Banner',
        platform: x.platform,
      }))
  }, [featured])

  // ✅ 主页四个 section 的推荐数据（带上限）
  const dramaItems = useMemo(() => {
    return featured
      .filter((x) => x.category === 'drama')
      .slice(0, HOME_LIMITS.drama)
  }, [featured])

  const endorsementItems = useMemo(() => {
    return featured
      .filter((x) => x.category === 'endorsement')
      .slice(0, HOME_LIMITS.endorsement)
  }, [featured])

  const eventItems = useMemo(() => {
    return featured
      .filter((x) => x.category === 'event')
      .slice(0, HOME_LIMITS.event)
  }, [featured])

  const galleryItems = useMemo(() => {
    return featured
      .filter((x) => x.category === 'ugc')
      .slice(0, HOME_LIMITS.ugc)
  }, [featured])

  return (
    <div className="page">
      <Navbar />

      <main className="app-container">
        <Banner banners={bannerItems} />

        <HomeSection
          className="section section-movie"
          title="影视剧综"
          subtitle="DRAMA"
          to="/drama"
        >
          <DramaScroller items={dramaItems} />
        </HomeSection>

        <HomeSection title="商务杂志" subtitle="MAGAZINE" to="/endorsement">
          <EndorsementGrid items={endorsementItems} />
        </HomeSection>

        <HomeSection
          className="section section-event"
          title="官方活动"
          subtitle="EVENT"
          to="/event"
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
