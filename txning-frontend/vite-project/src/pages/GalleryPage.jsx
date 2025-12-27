import { useMemo } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ResourceListContainer from '../components/channels/ResourceListContainer'
import GeneralCard from '../components/cards/GeneralCard'
import GalleryCard from '../components/cards/GalleryCard'

function getRelatedTypes(item) {
  const p = item.parentId
  if (!Array.isArray(p)) return []

  const types = []

  if (p.some((id) => String(id).startsWith('drama-'))) {
    types.push('影视剧综')
  }
  if (p.some((id) => String(id).startsWith('evt-'))) {
    types.push('官方活动')
  }
  if (p.some((id) => String(id).startsWith('endorse-'))) {
    types.push('商务杂志')
  }
  if (p.some((id) => String(id).startsWith('personal'))) {
    types.push('个人营业')
  }

  return types
}

export default function GalleryPage() {
  const schema = useMemo(
    () => [
      {
        name: 'year',
        label: '年份',
        defaultValue: 'all',
        getValue: (m) => m.year, // 单值
      },
      {
        name: 'mediaType',
        label: '类型',
        defaultValue: 'all',
        getValue: (m) => m.mediaType, // 单值
      },
      {
        name: 'platform',
        label: '平台',
        defaultValue: 'all',
        getValue: (m) => m.platform, // 单值
      },
      {
        name: 'related',
        label: '相关',
        defaultValue: 'all',
        getValue: (m) => getRelatedTypes(m),
      },
    ],
    []
  )

  return (
    <div className="page">
      <Navbar />

      <ResourceListContainer
        category="ugc"
        schema={schema}
        renderCard={(item) => <GeneralCard key={item.id} item={item} />}
        gridClassName="card-grid"
        searchKey={(m) => m.title}
      />

      <Footer />
    </div>
  )
}
