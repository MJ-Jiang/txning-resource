import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ResourceListContainer from '../components/channels/ResourceListContainer'
import GeneralCard from '../components/cards/GeneralCard'
import DramaDetailCard from '../components/detail/DramaDetailCard'
import EndorsementDetailCard from '../components/detail/EndorsementDetailCard'
import EventDetailCard from '../components/detail/EventDetailCard'
import { mockResources } from '../data/mockResources'
import useResponsivePageSize from '../hooks/useResponsivePageSize'

export default function DetailPage() {
  const { category, slug } = useParams()
  const pageSize = useResponsivePageSize(12, 25, 768)

  // 1) 通用变量名
  const item = mockResources.find(
    (x) => x.category === category && x.slug === slug
  )

  // 2) 找不到文案按分类变
  const emptyText =
    category === 'endorsements'
      ? '找不到该商务／杂志'
      : category === 'events'
        ? '找不到该活动'
        : '找不到该影视' // 默认按 drama

  // 3) 大卡片按分类变
  const detailCard = useMemo(() => {
    if (!item) return null

    if (category === 'endorsements') {
      return <EndorsementDetailCard endorsement={item} />
    }
    if (category === 'events') {
      return <EventDetailCard event={item} />
    }
    // 默认 drama
    return <DramaDetailCard drama={item} />
  }, [item, category])

  // 4) relatedUGC：逻辑不变，改用 item
  const relatedUGC = useMemo(() => {
    if (!item) return []

    return mockResources.filter((x) => {
      if (x.category !== 'ugc') return false

      const p = x.parentId
      if (Array.isArray(p)) return p.includes(item.id)
      if (typeof p === 'string' || typeof p === 'number')
        return String(p) === String(item.id)

      return false
    })
  }, [item])

  if (!item) {
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

  return (
    <div className="page">
      <Navbar />

      <section className="library-section detail-design">{detailCard}</section>

      <section className="library-section related-header">
        <div className="related-head">
          <h2>相关内容</h2>
        </div>
        <div className="related-divider" />
      </section>

      <ResourceListContainer
        withShell={false}
        stickyFilters={false}
        items={relatedUGC}
        pageSize={pageSize}
        gridClassName="card-grid"
        searchKey={(x) => x.title}
        schema={[
          {
            name: 'platform',
            label: '平台',
            defaultValue: 'all',
            getValue: (x) => x.platform,
          },
          {
            name: 'mediaType',
            label: '类型',
            defaultValue: 'all',
            getValue: (x) => x.mediaType,
          },
          {
            name: 'year',
            label: '年份',
            defaultValue: 'all',
            getValue: (x) => x.year,
          },
        ]}
        renderCard={(item) => <GeneralCard key={item.id} item={item} />}
      />

      <Footer />
    </div>
  )
}
