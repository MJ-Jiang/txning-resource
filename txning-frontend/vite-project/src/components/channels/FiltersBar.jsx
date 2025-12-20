export default function FiltersBar({
  q,
  setQ,
  count,
  onReset,
  children,
}) {
  return (
    <div className="filters-bar">
      <div className="filters-left">
        <div className="filter-item">
          <label>搜索</label>
          <input
            className="filter-input"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="输入关键词…"
          />
        </div>

        {/* 各频道自定义筛选项插槽 */}
        {children}
      </div>

      <div className="filters-right">
        <button className="filter-btn" onClick={onReset}>
          重置
        </button>
        <div className="filter-count">
          共 <b>{count}</b> 条
        </div>
      </div>
    </div>
  )
}
