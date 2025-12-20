import SelectFilter from '../SelectFilter'

/**
 * 根据 schema 自动渲染 SelectFilter
 * schema: [{ name, label, defaultValue, ... }]
 * optionsMap: { [name]: optionsArray }
 * filters: { [name]: selectedValue }
 */
export default function FilterFields({
  schema,
  filters,
  setFilter,
  optionsMap,
}) {
  return (
    <>
      {schema.map((f) => (
        <SelectFilter
          key={f.name}
          label={f.label}
          value={filters[f.name]}
          onChange={(v) => setFilter(f.name, v)}
          options={optionsMap[f.name] ?? []}
        />
      ))}
    </>
  )
}
