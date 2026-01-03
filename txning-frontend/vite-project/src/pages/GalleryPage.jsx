import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ResourceListContainer from '../components/channels/ResourceListContainer'
import { useDict } from '../providers/useDict'
import GeneralCard from '../components/cards/GeneralCard'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function GalleryPage() {
  const { ugcPlatformNameById, categoryByCode, categoryById } = useDict()

  const ugcId = categoryByCode?.ugc?.id
  const personalId = categoryByCode?.personal?.id

  // ✅ A2：反向 related 映射：{ "16": [1,2], "18": [1] }
  const [relatedFromMap, setRelatedFromMap] = useState({})

  // Gallery 的 target categories（ugc + personal）
  const targetCategories = useMemo(() => {
    const list = []
    if (ugcId) list.push(ugcId)
    if (personalId) list.push(personalId)
    return list
  }, [ugcId, personalId])

  // source categories：除 ugc/personal 外的所有分类
  const sourceCategories = useMemo(() => {
    const ids = Object.values(categoryByCode ?? {})
      .map((c) => c?.id)
      .filter(Boolean)
      .filter((id) => id !== ugcId && id !== personalId)
    return Array.from(new Set(ids))
  }, [categoryByCode, ugcId, personalId])

  // ✅ 拉 related-from-map
  useEffect(() => {
    let alive = true

    if (!targetCategories.length) return

    const params = new URLSearchParams()
    targetCategories.forEach((id) =>
      params.append('target_category', String(id))
    )
    sourceCategories.forEach((id) =>
      params.append('source_category', String(id))
    )

   fetch(`${API_BASE_URL}/contents/related-from-map?${params.toString()}`)

      .then((r) => (r.ok ? r.json() : {}))
      .then((data) => {
        if (!alive) return
        setRelatedFromMap(data ?? {})
      })
      .catch(() => {
        if (!alive) return
        setRelatedFromMap({})
      })

    return () => {
      alive = false
    }
  }, [targetCategories, sourceCategories])

  // ✅ schema：关键点是 related 的 match（解决 number vs string）
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

      // ✅ 新增：相关（来源分类）
      {
        name: 'related',
        label: '相关',
        defaultValue: 'all',
        // 返回数字数组也没关系：optionsMap 会 flatten
        getValue: (m) => {
          const arr = relatedFromMap?.[String(m?.id)] ?? []
          return Array.isArray(arr) ? arr : []
        },
        optionsLabel: (catId) =>
          categoryById?.[Number(catId)]?.name_zh ?? String(catId),

        // ✅ 关键：统一成字符串比较，避免 1 !== "1"
        match: (v, selected) => {
          const sel = String(selected)
          const arr = Array.isArray(v) ? v : [v]
          return arr.map((x) => String(x)).includes(sel)
        },
      },
    ],
    [ugcPlatformNameById, relatedFromMap, categoryById]
  )

  return (
    <div className="page">
      <Navbar />

      <ResourceListContainer
        categories={targetCategories}
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
