import { useMemo, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ResourceListContainer from '../components/channels/ResourceListContainer'
import GeneralCard from '../components/cards/GeneralCard'
import DramaDetailCard from '../components/detail/DramaDetailCard'
import EndorsementDetailCard from '../components/detail/EndorsementDetailCard'
import EventDetailCard from '../components/detail/EventDetailCard'
import { getResources } from '@/services/resources'
import { CATEGORY_CODES } from '../dictionary/category'
import useResponsivePageSize from '../hooks/useResponsivePageSize'

function toArray(v) {
  if (!v) return []
  return Array.isArray(v) ? v : [v]
}

/** 实体 → GeneralCard 可用结构 */
function toGeneralEntityCard(entity) {
  return {
    ...entity,

    // 封面统一
    posterUrl: entity.posterUrl,

    // 站内跳转
    url: `/detail/${entity.category}/${entity.id}`,
    isExternal: false,

    // 给「来源」筛选用
    sourceType: entity.category,

    // ⚠️ 关键：实体卡【不提供 mediaType】
    mediaType: undefined,

    // 其他字段给筛选兜底
    platform: entity.platform ?? '本站',
    year: entity.year ?? 'all',
  }
}

export default function DetailPage() {
  const { category, id } = useParams()
  const pageSize = useResponsivePageSize(12, 25, 768)
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
  /** 当前详情页对象 */
  const item = useMemo(() => {
    return resources.find((x) => x.category === category && x.id === id)
  }, [category, id, resources])

  const emptyText =
    category === CATEGORY_CODES.ENDORSEMENT
      ? '找不到该商务／杂志'
      : category === CATEGORY_CODES.EVENT
        ? '找不到该活动'
        : '找不到该影视'

  /** 大卡片 */
  const detailCard = useMemo(() => {
    if (!item) return null
    if (category === CATEGORY_CODES.ENDORSEMENT)
      return <EndorsementDetailCard endorsement={item} />
    if (category === CATEGORY_CODES.EVENT)
      return <EventDetailCard event={item} />
    return <DramaDetailCard drama={item} />
  }, [item, category])

  /** 相关 UGC（老逻辑，不动） */
  const relatedUGC = useMemo(() => {
    if (!item) return []
    const selfId = String(item.id)

    return resources.filter((x) => {
      if (x.category !== CATEGORY_CODES.UGC) return false
      const p = x.parentId
      if (Array.isArray(p)) return p.map(String).includes(selfId)
      if (typeof p === 'string' || typeof p === 'number')
        return String(p) === selfId
      return false
    })
  }, [item])

  /** 相关实体（incoming：谁把自己挂到我下面） */
  const relatedEntities = useMemo(() => {
    if (!item) return []
    const selfId = String(item.id)

    return resources
      .filter((x) => x.category !== CATEGORY_CODES.UGC)
      .filter((x) => toArray(x.relatedId).map(String).includes(selfId))
      .filter((x) => String(x.id) !== selfId)
      .map(toGeneralEntityCard)
  }, [item])

  /** 合并 + 去重 */
  const relatedItems = useMemo(() => {
    const all = [...relatedEntities, ...relatedUGC]
    const seen = new Set()
    const out = []

    for (const x of all) {
      const id = String(x.id ?? '')
      if (!id || seen.has(id)) continue
      seen.add(id)
      out.push(x)
    }
    return out
  }, [relatedEntities, relatedUGC])

  /** ✅ 关键判断：是否存在 UGC */
  const hasUGC = relatedItems.some((x) => x.category === CATEGORY_CODES.UGC)

  /** ✅ 关键：动态构造筛选 schema */
  const schema = [
    {
      name: 'platform',
      label: '平台',
      defaultValue: 'all',
      getValue: (x) => x.platform ?? 'all',
    },

    // ⭐ 只有在【存在 UGC】时，才提供「类型」筛选
    ...(hasUGC
      ? [
          {
            name: 'mediaType',
            label: '类型',
            defaultValue: 'all',
            getValue: (x) => x.mediaType,
          },
        ]
      : []),

    {
      name: 'year',
      label: '年份',
      defaultValue: 'all',
      getValue: (x) => x.year ?? 'all',
    },
  ]

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
        items={relatedItems}
        pageSize={pageSize}
        gridClassName="card-grid"
        searchKey={(x) => x.title}
        schema={schema}
        renderCard={(it) => <GeneralCard key={it.id} item={it} />}
      />

      <Footer />
    </div>
  )
}
