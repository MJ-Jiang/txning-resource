import { useMemo, useEffect, useState } from 'react'
import usePagedList from '../../hooks/usePagedList'
import useResourceFilters from '../../hooks/useResourceFilters'
import ResourceLibraryPage from './ResourceLibraryPage'
import FilterFields from './FilterFields'
import useResponsivePageSize from '../../hooks/useResponsivePageSize'

export default function ResourceListContainer({
  category, // ✅ 后端 category_id（number）
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

  useEffect(() => {
    let alive = true
    setLoading(true)
    ;(async () => {
      const res = await fetch(`/channels/${category}?limit=100&offset=0`)
      const data = await res.json()

      if (!alive) return

      setFetchedResources(data.items)
      setTotal(data.total)
      setLoading(false)

      console.log('channel data:', data)
    })().catch((e) => {
      if (!alive) return
      setLoading(false)
      throw e
    })

    return () => {
      alive = false
    }
  }, [category])

  const sourceItems = useMemo(() => {
    // ✅ 只走接口返回，无任何 category 字段过滤，无排序兼容
    return fetchedResources
  }, [fetchedResources])

  const schemaWithDefaults = useMemo(() => {
    return schema.map((f) => {
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
