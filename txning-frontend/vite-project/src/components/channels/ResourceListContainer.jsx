import { useMemo, useEffect, useState } from 'react'
import usePagedList from '../../hooks/usePagedList'
import useResourceFilters from '../../hooks/useResourceFilters'
import ResourceLibraryPage from './ResourceLibraryPage'
import FilterFields from './FilterFields'
import useResponsivePageSize from '../../hooks/useResponsivePageSize'
import { getResources } from '@/services/resources'

export default function ResourceListContainer({
  category,
  items,
  schema,
  renderCard,

  pageSize,
  searchKey = (item) => item?.title ?? '',

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

  useEffect(() => {
    let alive = true

    ;(async () => {
      const data = await getResources()
      if (alive) setFetchedResources(data)
    })()

    return () => {
      alive = false
    }
  }, [])

  function getIdNum(item) {
    if (!item || !item.id) return -1
    const match = String(item.id).match(/(\d+)\s*$/)
    return match ? Number(match[1]) : -1
  }

  // ✅ category 支持 string / array / empty
  const categoryList = useMemo(() => {
    if (!category) return []
    return Array.isArray(category) ? category.filter(Boolean) : [category]
  }, [category])

  const sourceItems = useMemo(() => {
    const list = Array.isArray(items)
      ? items
      : categoryList.length
        ? fetchedResources.filter((x) => categoryList.includes(x.category))
        : fetchedResources

    return [...list].sort((a, b) => getIdNum(b) - getIdNum(a))
  }, [items, categoryList, fetchedResources])

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
    />
  )
}
