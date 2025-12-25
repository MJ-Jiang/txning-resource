import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ResourceListContainer from '../components/channels/ResourceListContainer'
import GeneralCard from '../components/cards/GeneralCard'
import DramaDetailCard from '../components/detail/DramaDetailCard'
import { mockResources } from '../data/mockResources'
import useResponsivePageSize from '../hooks/useResponsivePageSize'

export default function DramaDetailPage() {
  const { category, slug } = useParams()
  const pageSize = useResponsivePageSize(12, 25, 768)

  const drama = mockResources.find(
    (x) => x.category === category && x.slug === slug
  )
  const relatedUGC = useMemo(() => {
    if (!drama) return []

    return mockResources.filter((x) => {
      if (x.category !== 'ugc') return false

      const p = x.parentId
      if (Array.isArray(p)) return p.includes(drama.id)
      if (typeof p === 'string' || typeof p === 'number')
        return String(p) === String(drama.id)

      return false
    })
  }, [drama])

  if (!drama) {
    return (
      <div className="page">
        <Navbar />
        <section className="library-section">
          <div className="empty-state">
            <h3>找不到该影视</h3>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  return (
    <div className="page">
      <Navbar />
      <section className="library-section">
        <DramaDetailCard drama={drama} />
      </section>

      <h3 className="section-title">相关内容</h3>

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
        ]}
        renderCard={(item) => <GeneralCard key={item.id} item={item} />}
      />

      <Footer />
    </div>
  )
}
