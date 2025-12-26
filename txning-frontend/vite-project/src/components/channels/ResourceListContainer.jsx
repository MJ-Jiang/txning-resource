import { useMemo } from 'react'
import usePagedList from '../../hooks/usePagedList'
import useResourceFilters from '../../hooks/useResourceFilters'
import ResourceLibraryPage from './ResourceLibraryPage'
import FilterFields from './FilterFields'
import { mockResources } from '../../data/mockResources'
import useResponsivePageSize from '../../hooks/useResponsivePageSize'

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
  // ✅ hook 放在组件内部
  const responsivePageSize = useResponsivePageSize(12, 25, 768)

  // ✅ 最终 pageSize：props 优先，否则用响应式的
  const finalPageSize = pageSize ?? responsivePageSize

  function getIdNum(item) {
    if (!item || !item.id) return -1
    const match = String(item.id).match(/(\d+)\s*$/)
    return match ? Number(match[1]) : -1
  }

  const sourceItems = useMemo(() => {
    const list = Array.isArray(items)
      ? items
      : category
        ? mockResources.filter((x) => x.category === category)
        : []

    // ✅ 按 id 数字部分倒序
    return [...list].sort((a, b) => getIdNum(b) - getIdNum(a))
  }, [items, category])

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
    resetKey: [...resetKey, finalPageSize], // ✅ 关键：pageSize变化也回到第一页
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
