import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DramaDetailCard from '../components/detail/DramaDetailCard'
import EndorsementDetailCard from '../components/detail/EndorsementDetailCard'
import EventDetailCard from '../components/detail/EventDetailCard'
import ResourceListContainer from '../components/channels/ResourceListContainer'
import GeneralCard from '../components/cards/GeneralCard'
import useResponsivePageSize from '../hooks/useResponsivePageSize'
import { useDict } from '../providers/useDict'
import { apiGet } from '@/services/api'

export default function DetailPage() {
  const { category, id } = useParams()
  const pageSize = useResponsivePageSize(12, 25, 768)

  const { categoryByCode, ugcPlatformNameById } = useDict()

  const [detail, setDetail] = useState(null)
  const [related, setRelated] = useState([]) // ✅ 直接存 ContentCardOut
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
      const res = await apiGet(`/contents/${id}`)
      if (!alive) return

      if (!res.ok) {
        setNotFound(true)
        setLoading(false)
        return
      }

      const data = await res.json()
      if (!alive) return

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
  // 2️⃣ 相关内容（关键修复点）
  // 👉 直接用后端的 /related
  // ===============================
  useEffect(() => {
    let alive = true

    ;(async () => {
      const res = await apiGet(`/contents/${id}/related`)
      if (!alive || !res.ok) return

      const data = await res.json()
      if (!alive) return

      setRelated(Array.isArray(data.items) ? data.items : [])
    })()

    return () => {
      alive = false
    }
  }, [id])

  // ===============================
  // 3️⃣ 详情卡片选择
  // ===============================
  const endorsementId = categoryByCode?.endorsement?.id
  const eventId = categoryByCode?.event?.id

  const detailCategoryId = detail?.content?.category_id ?? detail?.category_id

  const detailCard = (() => {
    if (!detail) return null
    if (category === 'endorsement' || detailCategoryId === endorsementId)
      return <EndorsementDetailCard detail={detail} />
    if (category === 'event' || detailCategoryId === eventId)
      return <EventDetailCard detail={detail} />
    return <DramaDetailCard detail={detail} />
  })()

  // ===============================
  // 4️⃣ 筛选 schema（直接用 card 字段）
  // ===============================
  const schema = useMemo(
    () => [
      {
        name: 'ugc_platform_id',
        label: '平台',
        defaultValue: 'all',
        getValue: (x) => x.ugc_platform_id ?? 'site',
        optionsLabel: (v) => {
          if (v === 'site') return '本站'
          return ugcPlatformNameById?.[v] ?? String(v)
        },
      },
      {
        name: 'ugc_type',
        label: '类型',
        defaultValue: 'all',
        getValue: (x) => x.ugc_type,
        optionsLabel: (v) => {
          if (v === 'video') return '视频'
          if (v === 'picture') return '图片'
          return String(v)
        },
      },
      {
        name: 'release_year',
        label: '年份',
        defaultValue: 'all',
        getValue: (x) => x.release_year,
      },
    ],
    [ugcPlatformNameById]
  )

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
            <h3>找不到该内容</h3>
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

      {related.length > 0 && (
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
            searchKey={(x) => x.title ?? ''}
            schema={schema}
            renderCard={(it) => (
              <GeneralCard
                key={`${it.category_id ?? 'c'}-${it.id}`}
                item={it}
              />
            )}
          />
        </>
      )}

      <Footer />
    </div>
  )
}
