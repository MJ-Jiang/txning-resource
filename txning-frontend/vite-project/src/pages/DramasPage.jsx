import { useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DramaCard from '../components/cards/DramaCard'
import Pager from '../components//channels/Pager'
import FiltersBar from '../components/channels/FiltersBar'
import SelectFilter from '../components/SelectFilter'
import usePagedList from '../hooks/usePagedList'
import { mockResources } from '../data/mockResources'

const PAGE_SIZE = 25

function uniqSorted(arr) {
  return Array.from(new Set(arr.filter(Boolean))).sort((a, b) =>
    String(a).localeCompare(String(b), 'zh-Hans-CN')
  )
}

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

  // filters
  const [q, setQ] = useState('')
  const [platform, setPlatform] = useState('all')
  const [genre, setGenre] = useState('all')
  const [year, setYear] = useState('all')
  const [status, setStatus] = useState('all')

  // options
  const platformOptions = useMemo(() => {
    return uniqSorted(allDramas.map(getDramaPlatform))
  }, [allDramas])

  const genreOptions = useMemo(() => {
    return uniqSorted(allDramas.flatMap(getDramaGenres))
  }, [allDramas])

  const yearOptions = useMemo(() => {
    const vals = allDramas.map((d) => d.year).filter(Boolean)
    return Array.from(new Set(vals)).sort((a, b) => Number(b) - Number(a))
  }, [allDramas])

  const statusOptions = useMemo(() => {
    const vals = allDramas.map((d) => d.status).filter(Boolean)
    return uniqSorted(vals)
  }, [allDramas])

  // filtered
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()

    return allDramas.filter((d) => {
      const title = String(d.title ?? '').toLowerCase()
      const okQ = query ? title.includes(query) : true

      const p = getDramaPlatform(d)
      const okP = platform === 'all' ? true : p === platform

      const gs = getDramaGenres(d)
      const okG = genre === 'all' ? true : gs.includes(genre)

      const okY = year === 'all' ? true : String(d.year) === String(year)

      const okS = status === 'all' ? true : String(d.status) === String(status)

      return okQ && okP && okG && okY && okS
    })
  }, [allDramas, q, platform, genre, year, status])

  // pagination（复用你的 usePagedList）
  const { page, totalPages, pageItems, goPrev, goNext, goPage } = usePagedList({
    items: filtered,
    pageSize: PAGE_SIZE,
    resetKey: [q, platform, genre, year, status],
  })

  function resetFilters() {
    setQ('')
    setPlatform('all')
    setGenre('all')
    setYear('all')
    setStatus('all')
  }

  return (
    <div className="app-container">
      <Navbar />

      {/* 通用筛选栏 */}
      <FiltersBar q={q} setQ={setQ} count={filtered.length} onReset={resetFilters}>
        <SelectFilter
          label="平台"
          value={platform}
          onChange={setPlatform}
          options={platformOptions}
        />
        <SelectFilter
          label="类型"
          value={genre}
          onChange={setGenre}
          options={genreOptions}
        />
        <SelectFilter
          label="年份"
          value={year}
          onChange={setYear}
          options={yearOptions}
        />
        <SelectFilter
          label="状态"
          value={status}
          onChange={setStatus}
          options={statusOptions}
        />
      </FiltersBar>

      {/* Grid */}
      <section className="library-section">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <h3>没有匹配结果</h3>
            <p>试试换个关键词或清空筛选条件。</p>
            <button className="filter-btn" onClick={resetFilters}>
              清空筛选
            </button>
          </div>
        ) : (
          <>
            <div className="drama-grid">
              {pageItems.map((item) => (
                <DramaCard key={item.id} item={item} />
              ))}
            </div>

            {/* 分页（始终显示） */}
            <Pager
              page={page}
              totalPages={totalPages}
              onPrev={goPrev}
              onNext={goNext}
              onGo={goPage}
            />
          </>
        )}
      </section>

      <Footer />
    </div>
  )
}
