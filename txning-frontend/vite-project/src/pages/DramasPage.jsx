import { useMemo } from 'react'
import DramaCard from '../components/cards/DramaCard'
import SelectFilter from '../components/SelectFilter'
import usePagedList from '../hooks/usePagedList'
import useResourceFilters from '../hooks/useResourceFilters'
import ResourceLibraryPage from '../components/channels/ResourceLibraryPage'
import { mockResources } from '../data/mockResources'

const PAGE_SIZE = 25

function getDramaPlatform(d) {
  if (d.platform) return d.platform
  if (Array.isArray(d.platforms) && d.platforms.length) return d.platforms[0]
  return ''
}

function getDramaGenres(d) {
  if (Array.isArray(d.genres)) return d.genres
  if (d.genre) return [d.genre]
  return []
}

export default function DramasPage() {
  const allDramas = useMemo(
    () => mockResources.filter((x) => x.category === 'dramas'),
    []
  )

  const schema = useMemo(
    () => [
      {
        name: 'platform',
        label: '平台',
        defaultValue: 'all',
        getValue: (d) => getDramaPlatform(d),
      },
      {
        name: 'genre',
        label: '类型',
        defaultValue: 'all',
        getValue: (d) => getDramaGenres(d), // array
      },
      {
        name: 'year',
        label: '年份',
        defaultValue: 'all',
        getValue: (d) => d.year,
        // 年份通常希望是数字降序：useResourceFilters 默认 name==='year' 会这样做
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
    items: allDramas,
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
        value={filters.genre}
        onChange={(v) => setFilter('genre', v)}
        options={optionsMap.genre}
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
