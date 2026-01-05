import { useMemo, useEffect, useState } from 'react'
import usePagedList from '../../hooks/usePagedList'
import useResourceFilters from '../../hooks/useResourceFilters'
import ResourceLibraryPage from './ResourceLibraryPage'
import FilterFields from './FilterFields'
import useResponsivePageSize from '../../hooks/useResponsivePageSize'

import { apiGet } from '@/services/api'

export default function ResourceListContainer({
  items, // ✅ NEW：允许外部直接传入 items（比如详情页 related）
  category, // number
  categories, // number[]
  schema,
  renderCard,

  pageSize,
  searchKey = (item) => item.title,

  gridClassName = 'card-grid',

  initialQuery = '',
  initialFilters = {},

  showSearch = true,
  showReset = true,
  stickyFilters = true,
}) {
  const responsivePageSize = useResponsivePageSize(12, 25, 768)
  const finalPageSize = pageSize ?? responsivePageSize

  const [fetchedResources, setFetchedResources] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  const categoryList = useMemo(() => {
    if (Array.isArray(categories) && categories.length) return categories
    if (typeof category === 'number') return [category]
    return []
  }, [category, categories])

  // ✅ 如果外部传了 items：不 fetch，直接用 items
  useEffect(() => {
    if (Array.isArray(items)) {
      setFetchedResources(items)
      setTotal(items.length)
      setLoading(false)
    }
  }, [items])

  // ✅ 只有在没传 items 时才走 fetch（保持原逻辑）
  useEffect(() => {
    let alive = true

    if (Array.isArray(items))
      return () => {
        alive = false
      }

    if (!categoryList.length) {
      setFetchedResources([])
      setTotal(0)
      setLoading(false)
      return () => {
        alive = false
      }
    }

    setLoading(true)
    ;(async () => {
      const params = new URLSearchParams()
      categoryList.forEach((c) => params.append('category', String(c)))
      params.set('limit', '100')
      params.set('offset', '0')

      const data = await apiGet(`/contents?${params.toString()}`)

      if (!alive) return

      setFetchedResources(Array.isArray(data.items) ? data.items : [])
      setTotal(Number.isFinite(data.total) ? data.total : 0)
      setLoading(false)
    })().catch((e) => {
      if (!alive) return
      setLoading(false)
      throw e
    })

    return () => {
      alive = false
    }
  }, [categoryList, items])

  const sourceItems = useMemo(() => {
    return fetchedResources
  }, [fetchedResources])

  const schemaWithDefaults = useMemo(() => {
    return (schema ?? []).map((f) => {
      const hasInit = Object.prototype.hasOwnProperty.call(
        initialFilters,
        f.name
      )
      return hasInit ? { ...f, defaultValue: initialFilters[f.name] } : f
    })
  }, [schema, initialFilters])

  const {
    q,
    setQ,
    filters,
    setFilter,
    optionsMap,
    filteredItems,
    reset,
    resetKey,
  } = useResourceFilters({
    items: sourceItems,
    schema: schemaWithDefaults,
    searchKey,
    initialQuery,
  })

  const { page, totalPages, pageItems, goPrev, goNext, goPage } = usePagedList({
    items: filteredItems,
    pageSize: finalPageSize,
    resetKey: [...resetKey, finalPageSize],
  })

  const qProp = showSearch ? q : ''
  const setQProp = showSearch ? setQ : () => {}
  const onResetProp = showReset ? reset : () => {}

  return (
    <ResourceLibraryPage
      stickyFilters={stickyFilters}
      q={qProp}
      setQ={setQProp}
      count={filteredItems.length}
      onReset={onResetProp}
      filtersChildren={
        <FilterFields
          schema={schemaWithDefaults}
          filters={filters}
          setFilter={setFilter}
          optionsMap={optionsMap}
        />
      }
      page={page}
      totalPages={totalPages}
      pageItems={pageItems}
      onPrev={goPrev}
      onNext={goNext}
      onGo={goPage}
      renderCard={renderCard}
      gridClassName={gridClassName}
      loading={loading}
      total={total}
    />
  )
}
