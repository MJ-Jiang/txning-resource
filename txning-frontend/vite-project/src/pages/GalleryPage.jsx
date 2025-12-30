import { useMemo, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ResourceListContainer from '../components/channels/ResourceListContainer'
import GeneralCard from '../components/cards/GeneralCard'
import { CATEGORY_CODES, CATEGORY_LABEL } from '../dictionary/category'
import { PLATFORM_LABEL } from '../dictionary/ugcPlatform'
import { getResources } from '@/services/resources'

function toArray(v) {
  if (!v) return []
  return Array.isArray(v) ? v : [v]
}

export default function GalleryPage() {
  const [resources, setResources] = useState([])

  useEffect(() => {
    let alive = true
    ;(async () => {
      const data = await getResources()
      if (alive) setResources(Array.isArray(data) ? data : [])
    })()
    return () => {
      alive = false
    }
  }, [])

  // id(string) -> category
  const idToCategory = useMemo(() => {
    const m = new Map()
    for (const r of resources) {
      const key = r?.id == null ? '' : String(r.id)
      if (!key) continue
      if (r?.category) m.set(key, r.category)
    }
    return m
  }, [resources])

  // ✅ 页面 items：包含 UGC + PERSONAL，并补 relatedCategoryCodes
  const pageItems = useMemo(() => {
    const allow = new Set([CATEGORY_CODES.UGC, CATEGORY_CODES.PERSONAL])

    return resources
      .filter((x) => allow.has(x?.category))
      .map((x) => {
        const relIds = toArray(x?.relatedIds ?? x?.relatedId).map((v) =>
          String(v)
        )

        const set = new Set()

        // 由 relatedIds 反查母资源类别
        for (const rid of relIds) {
          const cat = idToCategory.get(rid)
          if (cat) set.add(cat)
        }

        // ✅ 额外逻辑：如果卡片本身是 personal，也算“相关=个人营业”
        if (x?.category === CATEGORY_CODES.PERSONAL) {
          set.add(CATEGORY_CODES.PERSONAL)
        }

        return {
          ...x,
          relatedCategoryCodes: Array.from(set),
        }
      })
  }, [resources, idToCategory])

  const schema = useMemo(
    () => [
      {
        name: 'year',
        label: '年份',
        defaultValue: 'all',
        getValue: (m) => m.year,
      },
      {
        name: 'ugcType',
        label: '类型',
        defaultValue: 'all',
        getValue: (m) => m.ugcType, // video | picture（personal 通常没有，会是 undefined）
        optionsLabel: (v) => {
          if (v === 'video') return '视频'
          if (v === 'picture') return '图片'
          return v
        },
      },
      {
        name: 'ugcPlatform',
        label: '平台',
        defaultValue: 'all',
        getValue: (m) => m.ugcPlatform,
        optionsLabel: (code) => PLATFORM_LABEL?.[code] ?? code,
      },
      {
        name: 'related',
        label: '相关',
        defaultValue: 'all',
        getValue: (m) =>
          Array.isArray(m.relatedCategoryCodes) ? m.relatedCategoryCodes : [],
        optionsLabel: (catCode) => CATEGORY_LABEL?.[catCode] ?? String(catCode),
      },
    ],
    []
  )

  return (
    <div className="page">
      <Navbar />

      <ResourceListContainer
        items={pageItems}
        schema={schema}
        renderCard={(item) => (
          <GeneralCard key={`${item.category}-${item.id}`} item={item} />
        )}
        gridClassName="card-grid"
        searchKey={(m) => m.title}
      />

      <Footer />
    </div>
  )
}
