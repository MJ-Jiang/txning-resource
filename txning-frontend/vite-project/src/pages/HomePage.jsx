import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Banner from '../components/Banner.jsx'
import HomeSection from '../components/lists/HomeSection.jsx'
import EndorsementGrid from '../components/lists/EndorsementGrid.jsx'
import DramaScroller from '../components/lists/DramaScroller.jsx'
import EventsTimeline from '../components/lists/EventsTimeline.jsx'
import GalleryGrid from '../components/lists/GalleryGrid.jsx'

import { apiGet } from '@/services/api'
function onlyFeatured(arr) {
  return (Array.isArray(arr) ? arr : []).filter((x) => x?.is_featured === true)
}

export default function HomePage() {
  const [bannerItems, setBannerItems] = useState([])
  const [dramaItems, setDramaItems] = useState([])
  const [endorsementItems, setEndorsementItems] = useState([])
  const [eventItems, setEventItems] = useState([])
  const [galleryItems, setGalleryItems] = useState([])
  const [categoryNameByKey, setCategoryNameByKey] = useState({})

  useEffect(() => {
    let alive = true

    ;(async () => {
      const [homeRes, dictRes] = await Promise.all([
        apiGet('/home'),
        apiGet('/dict/categories'),
      ])

      const homeData = await homeRes.json()
      const categories = await dictRes.json()

      if (!alive) return

      const nameByCode = {}
      ;(categories || []).forEach((c) => {
        if (c?.code) nameByCode[c.code] = c.name_zh
      })
      setCategoryNameByKey(nameByCode)

      setBannerItems(onlyFeatured(homeData?.banners))
      setDramaItems(onlyFeatured(homeData?.featured_drama))
      setEndorsementItems(onlyFeatured(homeData?.featured_endorsement))
      setEventItems(onlyFeatured(homeData?.featured_event))
      setGalleryItems(onlyFeatured(homeData?.featured_media))
    })().catch((e) => {
      console.error('HomePage failed to load /home', e)
    })

    return () => {
      alive = false
    }
  }, [])

  return (
    <div className="page">
      <Navbar />

      <main className="app-container">
        <Banner banners={bannerItems} />

        <HomeSection
          className="section section-movie"
          title={categoryNameByKey?.drama}
          subtitle="DRAMA"
          to="/drama"
        >
          <DramaScroller items={dramaItems} />
        </HomeSection>

        <HomeSection
          title={categoryNameByKey?.endorsement}
          subtitle="MAGAZINE"
          to="/endorsement"
        >
          <EndorsementGrid items={endorsementItems} />
        </HomeSection>

        <HomeSection
          className="section section-event"
          title={categoryNameByKey?.event}
          subtitle="EVENT"
          to="/event"
        >
          <EventsTimeline items={eventItems} />
        </HomeSection>

        <HomeSection
          title={categoryNameByKey?.ugc}
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
