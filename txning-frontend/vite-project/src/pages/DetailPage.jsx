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
import { PLATFORM_LABEL } from '../dictionary/ugcPlatform'

function toArray(v) {
  if (!v) return []
  return Array.isArray(v) ? v : [v]
}

/** 实体 → GeneralCard 可用结构（站内实体：drama/event/endorsement 等） */
function toGeneralEntityCard(entity) {
  return {
    ...entity,
    posterUrl: entity.posterUrl,

    // 站内跳转
    url: `/detail/${entity.category}/${entity.id}`,
    isExternal: false,

    sourceType: entity.category,

    // 站内实体卡不提供媒体类型（避免出现在“类型”筛选中）
    ugcType: undefined,

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

  /** 当前详情对象（id 统一 string 比较） */
  const item = useMemo(() => {
    return resources.find(
      (x) => x.category === category && String(x.id) === String(id)
    )
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

  /**
   * ✅ 相关媒体内容：UGC + PERSONAL
   * 规则：x.relatedIds 包含当前 item.id
   */
  const relatedMedia = useMemo(() => {
    if (!item) return []
    const selfId = String(item.id)

    return resources.filter((x) => {
      const isMedia =
        x.category === CATEGORY_CODES.UGC ||
        x.category === CATEGORY_CODES.PERSONAL
      if (!isMedia) return false
      return toArray(x.relatedIds).map(String).includes(selfId)
    })
  }, [item, resources])

  /**
   * ✅ 相关站内实体（incoming）：排除 UGC + PERSONAL
   * 规则：其它实体.relatedIds 包含当前 item.id
   */
  const relatedEntities = useMemo(() => {
    if (!item) return []
    const selfId = String(item.id)

    return resources
      .filter(
        (x) =>
          x.category !== CATEGORY_CODES.UGC &&
          x.category !== CATEGORY_CODES.PERSONAL
      )
      .filter((x) => toArray(x.relatedIds).map(String).includes(selfId))
      .filter((x) => String(x.id) !== selfId)
      .map(toGeneralEntityCard)
  }, [item, resources])

  /** 合并 + 去重 */
  const relatedItems = useMemo(() => {
    const all = [...relatedEntities, ...relatedMedia]
    const seen = new Set()
    const out = []

    for (const x of all) {
      const k = `${x.category}:${String(x.id)}`
      if (seen.has(k)) continue
      seen.add(k)
      out.push(x)
    }
    return out
  }, [relatedEntities, relatedMedia])

  /** 是否存在媒体（UGC 或 PERSONAL） */
  const hasMedia = relatedItems.some(
    (x) =>
      x.category === CATEGORY_CODES.UGC ||
      x.category === CATEGORY_CODES.PERSONAL
  )

  /**
   * ✅ 筛选 schema
   * - 平台：UGC+PERSONAL 用 ugcPlatform；其它为 site
   * - 类型：UGC+PERSONAL 用 ugcType；其它不参与
   */
  const schema = [
    {
      name: 'platform',
      label: '平台',
      defaultValue: 'all',
      getValue: (m) => {
        const isMedia =
          m.category === CATEGORY_CODES.UGC ||
          m.category === CATEGORY_CODES.PERSONAL
        return isMedia ? m.ugcPlatform : 'site'
      },
      optionsLabel: (code) =>
        code === 'site' ? '本站' : (PLATFORM_LABEL?.[code] ?? code),
    },

    ...(hasMedia
      ? [
          {
            name: 'ugcType',
            label: '类型',
            defaultValue: 'all',
            getValue: (m) => {
              const isMedia =
                m.category === CATEGORY_CODES.UGC ||
                m.category === CATEGORY_CODES.PERSONAL
              return isMedia ? m.ugcType : undefined
            },
            optionsLabel: (v) => {
              if (v === 'video') return '视频'
              if (v === 'picture') return '图片'
              return v
            },
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
        renderCard={(it) => (
          <GeneralCard key={`${it.category}-${it.id}`} item={it} />
        )}
      />

      <Footer />
    </div>
  )
}
