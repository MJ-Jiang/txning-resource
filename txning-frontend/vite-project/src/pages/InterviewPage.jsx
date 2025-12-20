import { useMemo } from 'react'
import DramaCard from '../components/cards/DramaCard'
import SelectFilter from '../components/SelectFilter'
import usePagedList from '../hooks/usePagedList'
import useResourceFilters from '../hooks/useResourceFilters'
import ResourceLibraryPage from '../components/channels/ResourceLibraryPage'
import { mockResources } from '../data/mockResources'

const PAGE_SIZE = 25

function getInterviewPlatform(d) {
  if (d.platform) return d.platform
  if (Array.isArray(d.platforms) && d.platforms.length) return d.platforms[0]
  return ''
}

function getInterviewTypes(d) {
  if (Array.isArray(d.types)) return d.types
  if (d.type) return [d.type]
  return []
}

export default function InterviewPage() {
  const allInterviews = useMemo(
    () => mockResources.filter((x) => x.category === 'interviews'),
    []
  )

  const schema = useMemo(
    () => [
      {
        name: 'platform',
        label: '平台',
        defaultValue: 'all',
        getValue: (d) => getInterviewPlatform(d),
      },
      {
        name: 'type',
        label: '类型',
        defaultValue: 'all',
        getValue: (d) => getInterviewTypes(d), // array
      },
      {
        name: 'year',
        label: '年份',
        defaultValue: 'all',
        getValue: (d) => d.year,
      },
      {
        name: 'status',
        label: '状态',
        defaultValue: 'all',
        getValue: (d) => d.status,
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
    items: allInterviews,
    schema,
    searchKey: (d) => d.title,
  })

  const { page, totalPages, pageItems, goPrev, goNext, goPage } = usePagedList({
    items: filteredItems,
    pageSize: PAGE_SIZE,
    resetKey,
  })

  const filtersChildren = (
    <>
      <SelectFilter
        label="平台"
        value={filters.platform}
        onChange={(v) => setFilter('platform', v)}
        options={optionsMap.platform}
      />
      <SelectFilter
        label="类型"
        value={filters.type}
        onChange={(v) => setFilter('type', v)}
        options={optionsMap.type}
      />
      <SelectFilter
        label="年份"
        value={filters.year}
        onChange={(v) => setFilter('year', v)}
        options={optionsMap.year}
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
      renderCard={(item) => <DramaCard key={item.id} item={item} />}
      gridClassName="drama-grid"
    />
  )
}
