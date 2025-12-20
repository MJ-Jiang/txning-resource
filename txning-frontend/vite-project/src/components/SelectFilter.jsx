export default function SelectFilter({ label, value, onChange, options }) {
  return (
    <div className="filter-item">
      <label>{label}</label>
      <select
        className="filter-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="all">全部</option>
        {options.map((opt) => (
          <option key={String(opt)} value={String(opt)}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  )
}
