import Navbar from '../Navbar'
import Footer from '../Footer'
import Pager from './Pager'
import FiltersBar from './FiltersBar'

/**
 * 通用资源列表页骨架：
 * - Navbar / Footer
 * - FiltersBar（children 插槽塞 SelectFilter）
 * - 空态
 * - Grid + Pager
 */
export default function ResourceLibraryPage({
  // FiltersBar props
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
  gridClassName = 'drama-grid',
}) {
  return (
    <div className="app-container">
      <Navbar />

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

      <Footer />
    </div>
  )
}
