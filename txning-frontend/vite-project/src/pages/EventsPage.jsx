import { useMemo } from 'react'
import MagazineCard from '../components/cards/MagazineCard'
import SelectFilter from '../components/SelectFilter'
import usePagedList from '../hooks/usePagedList'
import useResourceFilters from '../hooks/useResourceFilters'
import ResourceLibraryPage from '../components/channels/ResourceLibraryPage'
import { mockResources } from '../data/mockResources'

const PAGE_SIZE = 25

function getEventTypes(m) {
  // 兼容：types / type / tags
  if (Array.isArray(m.types) && m.types.length) return m.types
  if (m.type) return [m.type]
  if (Array.isArray(m.tags) && m.tags.length) return m.tags
  return []
}

export default function EventsPage() {
  const allEvents = useMemo(
    () => mockResources.filter((x) => x.category === 'events'),
    []
  )

  const schema = useMemo(
    () => [
      {
        name: 'year',
        label: '年份',
        defaultValue: 'all',
        getValue: (m) => m.year,
      },
      {
        name: 'type',
        label: '类型',
        defaultValue: 'all',
        getValue: (m) => getEventTypes(m), // array
      },
      {
        name: 'status',
        label: '状态',
        defaultValue: 'all',
        getValue: (m) => m.status,
      },
    ],
    []
  )

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
    items: allEvents,
    schema,
    searchKey: (m) => m.title,
  })

  const { page, totalPages, pageItems, goPrev, goNext, goPage } = usePagedList({
    items: filteredItems,
    pageSize: PAGE_SIZE,
    resetKey,
  })

  const filtersChildren = (
    <>
      <SelectFilter
        label="年份"
        value={filters.year}
        onChange={(v) => setFilter('year', v)}
        options={optionsMap.year}
      />
      <SelectFilter
        label="类型"
        value={filters.type}
        onChange={(v) => setFilter('type', v)}
        options={optionsMap.type}
      />
      <SelectFilter
        label="状态"
        value={filters.status}
        onChange={(v) => setFilter('status', v)}
        options={optionsMap.status}
      />
    </>
  )

  return (
    <ResourceLibraryPage
      q={q}
      setQ={setQ}
      count={filteredItems.length}
      onReset={reset}
      filtersChildren={filtersChildren}
      page={page}
      totalPages={totalPages}
      pageItems={pageItems}
      onPrev={goPrev}
      onNext={goNext}
      onGo={goPage}
      renderCard={(item) => <MagazineCard key={item.id} item={item} />}
      gridClassName="drama-grid"
    />
  )
}
