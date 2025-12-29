import ThemeSelect from './ThemeSelect'

export default function SelectFilter({
  label,
  value,
  onChange,
  options,
  optionsLabel, // ✅ 新增
}) {
  const opts = [
    { value: 'all', label: '全部' },
    ...options.map((opt) => ({
      value: String(opt),
      label: optionsLabel ? optionsLabel(opt) : String(opt),
    })),
  ]

  return (
    <div className="filter-item">
      <ThemeSelect
        label={label}
        value={value}
        onChange={onChange}
        options={opts}
      />
    </div>
  )
}
