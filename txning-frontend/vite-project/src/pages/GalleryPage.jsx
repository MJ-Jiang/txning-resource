import { useMemo } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ResourceListContainer from '../components/channels/ResourceListContainer'
import { useDict } from '../providers/useDict'
import GeneralCard from '../components/cards/GeneralCard'

export default function GalleryPage() {
  const { ugcPlatformNameById, categoryByCode } = useDict()

  const ugcId = categoryByCode?.ugc?.id
  const personalId = categoryByCode?.personal?.id

  const schema = useMemo(
    () => [
      {
        name: 'release_year',
        label: '年份',
        defaultValue: 'all',
        getValue: (m) => m.release_year,
      },
      {
        name: 'ugc_type',
        label: '类型',
        defaultValue: 'all',
        getValue: (m) => m.ugc_type,
        optionsLabel: (v) => {
          if (v === 'video') return '视频'
          if (v === 'picture') return '图片'
          return String(v)
        },
      },
      {
        name: 'ugc_platform_id',
        label: '平台',
        defaultValue: 'all',
        getValue: (m) => m.ugc_platform_id,
        optionsLabel: (id) => ugcPlatformNameById?.[id] ?? String(id),
      },
    ],
    [ugcPlatformNameById]
  )

  const categories = useMemo(() => {
    const list = []
    if (ugcId) list.push(ugcId)
    if (personalId) list.push(personalId)
    return list
  }, [ugcId, personalId])

  return (
    <div className="page">
      <Navbar />

      <ResourceListContainer
        categories={categories}
        schema={schema}
        renderCard={(item) => (
          <GeneralCard key={`${item.category_id}-${item.id}`} item={item} />
        )}
        gridClassName="card-grid"
        searchKey={(m) => m.title ?? ''}
      />

      <Footer />
    </div>
  )
}
