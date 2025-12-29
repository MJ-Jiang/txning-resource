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
      value: String(opt), // ✅ value 仍然用 code，别改
      label: optionsLabel ? optionsLabel(opt) : String(opt), // ✅ 显示用中文
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
