import { useMemo } from 'react'
import usePagedList from '../../hooks/usePagedList'
import useResourceFilters from '../../hooks/useResourceFilters'
import ResourceLibraryPage from './ResourceLibraryPage'
import FilterFields from './FilterFields'
import { mockResources } from '../../data/mockResources'

const DEFAULT_PAGE_SIZE = 25

/**
 * 高层容器：搜索 / 筛选 / 重置 / 列表 / 分页
 *
 * 用法 1：按 category 自动取数据
 * <ResourceListContainer category="dramas" schema={...} renderCard={...} />
 *
 * 用法 2：传入 items（例如详情页相关资源）
 * <ResourceListContainer items={related} schema={...} renderCard={...} />
 */
export default function ResourceListContainer({
  category,
  items,
  schema,
  renderCard,

  pageSize = DEFAULT_PAGE_SIZE,
  searchKey = (item) => item?.title ?? '',

  gridClassName = 'drama-grid',

  // 可选：初始搜索词/初始筛选（详情页很常用）
  initialQuery = '',
  initialFilters = {},

  // 可选：显示控制（详情页推荐区可能不需要搜索/重置）
  showSearch = true,
  showReset = true,
}) {
  const sourceItems = useMemo(() => {
    if (Array.isArray(items)) return items
    if (category) return mockResources.filter((x) => x.category === category)
    return []
  }, [items, category])

  // 把 initialFilters 合进 schema 的 defaultValue（不改你的 hook 结构的前提下）
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
    pageSize,
    resetKey,
  })

  // 详情页可能不想显示搜索框/重置按钮：这里通过“代理 setQ / reset”实现
  const qProp = showSearch ? q : ''
  const setQProp = showSearch ? setQ : () => {}
  const onResetProp = showReset ? reset : () => {}

  return (
    <ResourceLibraryPage
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
