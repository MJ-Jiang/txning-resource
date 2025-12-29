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

import { CATEGORY_CODES, CATEGORY_LABEL } from '@/dictionary/category'

const HOME_LIMITS = {
  [CATEGORY_CODES.DRAMA]: 6,
  [CATEGORY_CODES.ENDORSEMENT]: 4,
  [CATEGORY_CODES.EVENT]: 5,
  [CATEGORY_CODES.UGC]: 4,
  [CATEGORY_CODES.BANNERS]: 3,
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
      .filter((x) => x.category === CATEGORY_CODES.BANNERS)
      .slice(0, HOME_LIMITS.banners)
      .map((x) => ({
        posterUrl: x.posterUrl,
        href: x.href,
        posterAlt: x.posterAlt || 'Banner',
        platforms: x.platforms ?? [], // ✅ 关键：传 platforms
      }))
  }, [featured])

  // ✅ 主页四个 section 的推荐数据（带上限）
  const dramaItems = useMemo(() => {
    return featured
      .filter((x) => x.category === CATEGORY_CODES.DRAMA)
      .slice(0, HOME_LIMITS.drama)
  }, [featured])

  const endorsementItems = useMemo(() => {
    return featured
      .filter((x) => x.category === CATEGORY_CODES.ENDORSEMENT)
      .slice(0, HOME_LIMITS.endorsement)
  }, [featured])

  const eventItems = useMemo(() => {
    return featured
      .filter((x) => x.category === CATEGORY_CODES.EVENT)
      .slice(0, HOME_LIMITS.event)
  }, [featured])

  const galleryItems = useMemo(() => {
    return featured
      .filter((x) => x.category === CATEGORY_CODES.UGC)
      .slice(0, HOME_LIMITS.ugc)
  }, [featured])

  return (
    <div className="page">
      <Navbar />

      <main className="app-container">
        <Banner banners={bannerItems} />

        <HomeSection
          className="section section-movie"
          title={CATEGORY_LABEL[CATEGORY_CODES.DRAMA]}
          subtitle="DRAMA"
          to="/drama"
        >
          <DramaScroller items={dramaItems} />
        </HomeSection>

        <HomeSection
          title={CATEGORY_LABEL[CATEGORY_CODES.ENDORSEMENT]}
          subtitle="MAGAZINE"
          to="/endorsement"
        >
          <EndorsementGrid items={endorsementItems} />
        </HomeSection>

        <HomeSection
          className="section section-event"
          title={CATEGORY_LABEL[CATEGORY_CODES.EVENT]}
          subtitle="EVENT"
          to="/event"
        >
          <EventsTimeline items={eventItems} />
        </HomeSection>

        <HomeSection
          title={CATEGORY_LABEL[CATEGORY_CODES.UGC]}
          subtitle="GALLERY"
          to="/gallery"
        >
          <GalleryGrid items={galleryItems} />
        </HomeSection>
      </main>

      <Footer />
    </div>
  )
}
