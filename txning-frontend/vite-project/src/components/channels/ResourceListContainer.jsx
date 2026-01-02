import { useMemo, useEffect, useState } from 'react'
import usePagedList from '../../hooks/usePagedList'
import useResourceFilters from '../../hooks/useResourceFilters'
import ResourceLibraryPage from './ResourceLibraryPage'
import FilterFields from './FilterFields'
import useResponsivePageSize from '../../hooks/useResponsivePageSize'

export default function ResourceListContainer({
  category, // number
  categories, // number[] ✅ 新增：支持多分类
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

  useEffect(() => {
    let alive = true

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

      const res = await fetch(`/contents?${params.toString()}`)
      const data = await res.json()

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
  }, [categoryList])

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
