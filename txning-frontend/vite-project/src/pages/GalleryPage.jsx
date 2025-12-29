import { useMemo } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ResourceListContainer from '../components/channels/ResourceListContainer'
import GeneralCard from '../components/cards/GeneralCard'
import GalleryCard from '../components/cards/GalleryCard'
import { CATEGORY_CODES } from '../dictionary/category'
import { PLATFORM_LABEL } from '../dictionary/ugcPlatform'

// 先忽略 related 的业务含义
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
        getValue: (m) => m.year,
      },

      // ✅ UGC 类型（内部 code，UI 显示中文可后续加）
      {
        name: 'ugcType',
        label: '类型',
        defaultValue: 'all',
        getValue: (m) => m.ugcType, // video | picture
        optionsLabel: (v) => {
          if (v === 'video') return '视频'
          if (v === 'picture') return '图片'
          return v
        },
      },

      // ✅ 平台：code → 中文（关键修复点）
      {
        name: 'ugcPlatform',
        label: '平台',
        defaultValue: 'all',
        getValue: (m) => m.ugcPlatform, // bilibili / douyin / weibo / xiaohongshu
        optionsLabel: (code) => PLATFORM_LABEL?.[code] ?? code,
      },

      // 先保留 related
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
        category={CATEGORY_CODES.UGC ?? 'ugc'}
        schema={schema}
        renderCard={(item) => <GeneralCard key={item.id} item={item} />}
        gridClassName="card-grid"
        searchKey={(m) => m.title}
      />

      <Footer />
    </div>
  )
}
