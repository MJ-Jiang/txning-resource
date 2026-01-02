import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DramaDetailCard from '../components/detail/DramaDetailCard'
import EndorsementDetailCard from '../components/detail/EndorsementDetailCard'
import EventDetailCard from '../components/detail/EventDetailCard'
import ResourceListContainer from '../components/channels/ResourceListContainer'
import GeneralCard from '../components/cards/GeneralCard'
import { CATEGORY_CODES } from '../dictionary/category'
import useResponsivePageSize from '../hooks/useResponsivePageSize'

export default function DetailPage() {
  const { category, id } = useParams()
  const pageSize = useResponsivePageSize(12, 25, 768)

  const [detail, setDetail] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  // ===============================
  // 1️⃣ 详情
  // ===============================
  useEffect(() => {
    let alive = true
    setLoading(true)
    setNotFound(false)
    ;(async () => {
      const res = await fetch(`/contents/${id}`)
      if (!alive) return

      if (!res.ok) {
        setNotFound(true)
        setLoading(false)
        return
      }

      const data = await res.json()
      setDetail(data)
      setLoading(false)
    })().catch(() => {
      if (!alive) return
      setNotFound(true)
      setLoading(false)
    })

    return () => {
      alive = false
    }
  }, [id])

  // ===============================
  // 2️⃣ 相关内容
  // ===============================
  useEffect(() => {
    let alive = true

    ;(async () => {
      const res = await fetch(`/contents/${id}/related`)
      if (!alive || !res.ok) return

      const data = await res.json()
      setRelated(Array.isArray(data.items) ? data.items : [])
    })()

    return () => {
      alive = false
    }
  }, [id])

  // ===============================
  // 3️⃣ 详情卡片选择
  // ===============================
  const detailCard = (() => {
    if (!detail) return null
    if (category === CATEGORY_CODES.ENDORSEMENT)
      return <EndorsementDetailCard detail={detail} />
    if (category === CATEGORY_CODES.EVENT)
      return <EventDetailCard detail={detail} />
    return <DramaDetailCard detail={detail} />
  })()

  // ===============================
  // 4️⃣ 空态文案
  // ===============================
  const emptyText =
    category === CATEGORY_CODES.ENDORSEMENT
      ? '找不到该商务／杂志'
      : category === CATEGORY_CODES.EVENT
        ? '找不到该活动'
        : '找不到该影视'

  // ===============================
  // 5️⃣ loading / not found
  // ===============================
  if (loading) {
    return (
      <div className="page">
        <Navbar />
        <section className="library-section">
          <div className="empty-state">加载中…</div>
        </section>
        <Footer />
      </div>
    )
  }

  if (notFound || !detail) {
    return (
      <div className="page">
        <Navbar />
        <section className="library-section">
          <div className="empty-state">
            <h3>{emptyText}</h3>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  // ===============================
  // 6️⃣ 正常渲染
  // ===============================
  return (
    <div className="page">
      <Navbar />

      <section className="library-section detail-design">{detailCard}</section>

      {related.length > 0 ? (
        <>
          <section className="library-section related-header">
            <div className="related-head">
              <h2>相关内容</h2>
            </div>
            <div className="related-divider" />
          </section>

          <ResourceListContainer
            withShell={false}
            stickyFilters={false}
            items={related}
            pageSize={pageSize}
            gridClassName="card-grid"
            searchKey={(x) => x.title}
            schema={[]}
            renderCard={(it) => <GeneralCard key={it.id} item={it} />}
          />
        </>
      ) : null}

      <Footer />
    </div>
  )
}
