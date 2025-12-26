import Pager from './Pager'
import FiltersBar from './FiltersBar'

export default function ResourceLibraryPage({
  // FiltersBar props
  stickyFilters = true,
  q,
  setQ,
  count,
  onReset,
  filtersChildren,

  // List + pagination
  page,
  totalPages,
  pageItems,
  onPrev,
  onNext,
  onGo,

  // render
  renderCard,
  gridClassName = 'card-grid',
}) {
  return (
    <div
      className={`app-container ${stickyFilters ? 'filters-sticky' : 'filters-static'}`}
    >
      <FiltersBar q={q} setQ={setQ} count={count} onReset={onReset}>
        {filtersChildren}
      </FiltersBar>

      <section className="library-section">
        {count === 0 ? (
          <div className="empty-state">
            <h3>没有匹配结果</h3>
            <p>试试换个关键词或清空筛选条件。</p>
            <button className="filter-btn" onClick={onReset}>
              清空筛选
            </button>
          </div>
        ) : (
          <>
            <div className={gridClassName}>
              {pageItems.map((item) => renderCard(item))}
            </div>

            <Pager
              page={page}
              totalPages={totalPages}
              onPrev={onPrev}
              onNext={onNext}
              onGo={onGo}
            />
          </>
        )}
      </section>
    </div>
  )
}
