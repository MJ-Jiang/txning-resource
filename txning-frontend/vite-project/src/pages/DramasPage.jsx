import { useEffect, useMemo, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DramaCard from '../components/cards/DramaCard'
import { mockResources } from '../data/mockResources'

const MAX_ROWS = 5
const DEFAULT_COLS = 5 // 先定 5 列，CSS 会在更宽屏时自动变 6

function uniqSorted(arr) {
  return Array.from(new Set(arr.filter(Boolean))).sort((a, b) =>
    String(a).localeCompare(String(b), 'zh-Hans-CN')
  )
}

function getDramaPlatform(d) {
  // 兼容不同 mock 字段写法
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

  // 下拉“加行”用
  const [rowsToShow, setRowsToShow] = useState(2) // 先显示 2 行，滚动加载到 5 行
  const sentinelRef = useRef(null)

  // filters
  const [q, setQ] = useState('')
  const [platform, setPlatform] = useState('all')
  const [genre, setGenre] = useState('all')
  const [year, setYear] = useState('all')
   const [status, setStatus] = useState('all')

  // pagination（一页=5行）
  const pageSize = DEFAULT_COLS * MAX_ROWS
  const [page, setPage] = useState(1)

  // options
  const platformOptions = useMemo(() => {
    const vals = allDramas.map(getDramaPlatform)
    return uniqSorted(vals)
  }, [allDramas])

  const genreOptions = useMemo(() => {
    const vals = allDramas.flatMap(getDramaGenres)
    return uniqSorted(vals)
  }, [allDramas])

  const yearOptions = useMemo(() => {
    const vals = allDramas.map((d) => d.year).filter(Boolean)
    // 年份建议倒序更符合直觉
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

  // reset page / rows when filters change
  useEffect(() => {
    setPage(1)
    setRowsToShow(2)
  }, [q, platform, genre, year,status])

  // pagination meta
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const safePage = Math.min(Math.max(1, page), totalPages)

  const pageItems = useMemo(() => {
    const start = (safePage - 1) * pageSize
    const end = start + pageSize
    return filtered.slice(start, end)
  }, [filtered, safePage, pageSize])

  // within page: “滚动加行”最多 MAX_ROWS
  const visibleCount = Math.min(pageItems.length, rowsToShow * DEFAULT_COLS)
  const visibleItems = pageItems.slice(0, visibleCount)

  // IntersectionObserver: 下拉加载更多行（到 5 行停止）
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return

    // 到 5 行就不再自动加
    if (rowsToShow >= MAX_ROWS) return

    const obs = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((e) => e.isIntersecting)
        if (!hit) return
        setRowsToShow((r) => Math.min(MAX_ROWS, r + 1))
      },
      { root: null, threshold: 0.1 }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [rowsToShow])

  function resetFilters() {
    setQ('')
    setPlatform('all')
    setGenre('all')
    setYear('all')
    setStatus('all')
  }

  function goPrev() {
    setPage((p) => Math.max(1, p - 1))
    setRowsToShow(MAX_ROWS)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goNext() {
    setPage((p) => Math.min(totalPages, p + 1))
    setRowsToShow(MAX_ROWS)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goPage(n) {
    setPage(n)
    setRowsToShow(MAX_ROWS)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const showPager = true

  return (
    <div className="app-container">
      <Navbar />

      {/* Header */}
      <header className="library-header">
      </header>

      {/* Filters */}
      <div className="filters-bar">
        <div className="filters-left">
          <div className="filter-item">
            <label>搜索</label>
            <input
              className="filter-input"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="输入标题关键词…"
            />
          </div>

          <div className="filter-item">
            <label>平台</label>
            <select
              className="filter-select"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option value="all">全部</option>
              {platformOptions.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <label>类型</label>
            <select
              className="filter-select"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="all">全部</option>
              {genreOptions.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <label>年份</label>
            <select
              className="filter-select"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="all">全部</option>
              {yearOptions.map((y) => (
                <option key={String(y)} value={String(y)}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-item">
            <label>状态</label>
            <select
              className="filter-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">全部</option>
              {statusOptions.map((s) => (
                <option key={String(s)} value={String(s)}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="filters-right">
          <button className="filter-btn" onClick={resetFilters}>
            重置
          </button>
          <div className="filter-count">
            共 <b>{filtered.length}</b> 条
          </div>
        </div>
      </div>

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
              {visibleItems.map((item) => (
                <DramaCard key={item.id} item={item} />
              ))}
            </div>

            {/* sentinel：滚动到这里会“加行”，最多 5 行 */}
            {!showPager && <div ref={sentinelRef} className="scroll-sentinel" />}

            {/* 分页：达到 5 行后出现 */}
            {showPager && (
              <Pager
                page={safePage}
                totalPages={totalPages}
                onPrev={goPrev}
                onNext={goNext}
                onGo={goPage}
              />
            )}
          </>
        )}
      </section>

      <Footer />
    </div>
  )
}

function Pager({ page, totalPages, onPrev, onNext, onGo }) {
  const pages = useMemo(() => {
    // 生成：1 2 3 … n（带省略号）
    const res = []
    const push = (x) => res.push(x)

    const show = new Set([1, 2, totalPages - 1, totalPages, page - 1, page, page + 1])
    const list = Array.from(show)
      .filter((n) => n >= 1 && n <= totalPages)
      .sort((a, b) => a - b)

    let prev = 0
    for (const n of list) {
      if (prev && n - prev > 1) push('…')
      push(n)
      prev = n
    }
    return res
  }, [page, totalPages])

  return (
    <div className="pager">
      <button className="pager-btn" onClick={onPrev} disabled={page <= 1}>
        上一页
      </button>

      <div className="pager-pages">
        {pages.map((p, idx) =>
          p === '…' ? (
            <span key={`e-${idx}`} className="pager-ellipsis">
              …
            </span>
          ) : (
            <button
              key={p}
              className={`pager-page ${p === page ? 'active' : ''}`}
              onClick={() => onGo(p)}
            >
              {p}
            </button>
          )
        )}
      </div>

      <button className="pager-btn" onClick={onNext} disabled={page >= totalPages}>
        下一页
      </button>
    </div>
  )
}
