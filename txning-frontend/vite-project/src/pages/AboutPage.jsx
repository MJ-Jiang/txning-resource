import { useEffect, useState } from 'react'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Banner from '../components/Banner'

import { CATEGORY_CODES } from '../dictionary/category'
import { getResources } from '../services/resources'

export default function AboutMePage() {
  const [aboutMeResource, setAboutMeResource] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const resources = await getResources()
      const found = resources.find(
        (item) => item.category === CATEGORY_CODES.ABOUTME
      )
      setAboutMeResource(found || null)
    }

    fetchData()
  }, [])

  if (!aboutMeResource) return null

  const { posterUrl, posterAlt, title, description } = aboutMeResource

  return (
    <div className="page">
      <Navbar />

      <div className="poster">
        <img
          className="poster-img"
          src={posterUrl}
          alt={posterAlt || '田栩宁 海报'}
        />
      </div>

      <div id="contact" className="marquee-strip">
        <div className="marquee-content" aria-label="contact marquee">
          <span className="marquee-item">
            <i className="fa-solid fa-bolt" aria-hidden="true"></i>
            {title}
          </span>

          <span className="marquee-sep">//</span>

          <span className="marquee-item">
            <i className="fa-solid fa-envelope" aria-hidden="true"></i>
            联系本站：{description}
          </span>

          <span className="marquee-sep">//</span>

          <span className="marquee-item">
            <i className="fa-solid fa-bolt" aria-hidden="true"></i>
            {title}
          </span>

          <span className="marquee-sep">//</span>

          <span className="marquee-item">
            <i className="fa-solid fa-envelope" aria-hidden="true"></i>
            联系本站：{description}
          </span>

          <span className="marquee-sep">//</span>
        </div>
      </div>

      <Footer />
    </div>
  )
}
