import { useEffect, useMemo, useState } from 'react'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import { useDict } from '../providers/useDict'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
function normalizeList(data) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.items)) return data.items
  if (Array.isArray(data?.data)) return data.data
  return []
}

export default function AboutMePage() {
  const { categoryByCode } = useDict()
  const [items, setItems] = useState([])
  const [loaded, setLoaded] = useState(false)

  const categoryId = categoryByCode?.aboutme?.id ?? 7

  useEffect(() => {
    let alive = true

    fetch(`${API_BASE_URL}/contents?category=${categoryId}`, {
  headers: { Accept: 'application/json' },
})

      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (!alive) return
        setItems(normalizeList(data))
        setLoaded(true)
      })
      .catch(() => {
        if (!alive) return
        setLoaded(true)
      })

    return () => {
      alive = false
    }
  }, [categoryId])

  // ✅ 使用后端真实字段：is_featured
  const aboutMe = useMemo(
    () => items.find((item) => item.is_featured === true) ?? null,
    [items]
  )

  return (
    <div className="page">
      <Navbar />

      {loaded && aboutMe && (
        <>
          <div className="poster">
            <img
              className="poster-img"
              src={aboutMe.cover_url}
              alt={aboutMe.title}
            />
          </div>

          <div id="contact" className="marquee-strip">
            <div className="marquee-content" aria-label="contact marquee">
              <span className="marquee-item">
                <i className="fa-solid fa-bolt" aria-hidden="true"></i>
                {aboutMe.title}
              </span>

              <span className="marquee-sep">//</span>

              <span className="marquee-item">
                <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                联系本站
              </span>

              <span className="marquee-sep">//</span>

              <span className="marquee-item">
                <i className="fa-solid fa-bolt" aria-hidden="true"></i>
                {aboutMe.title}
              </span>

              <span className="marquee-sep">//</span>

              <span className="marquee-item">
                <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                联系本站
              </span>

              <span className="marquee-sep">//</span>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  )
}
