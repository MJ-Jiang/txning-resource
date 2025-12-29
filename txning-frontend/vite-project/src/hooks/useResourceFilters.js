import { useCallback, useMemo, useState } from 'react'

function uniqSorted(arr) {
  return Array.from(new Set(arr.filter(Boolean))).sort((a, b) =>
    String(a).localeCompare(String(b), 'zh-Hans-CN')
  )
}

function uniqNumbersDesc(arr) {
  const nums = arr
    .filter((x) => x !== null && x !== undefined && x !== '')
    .map((x) => Number(x))
    .filter((x) => !Number.isNaN(x))
  return Array.from(new Set(nums)).sort((a, b) => b - a)
}

function normalizeQuery(q) {
  return String(q ?? '')
    .trim()
    .toLowerCase()
}

export default function useResourceFilters({
  items,
  schema,
  searchKey = (item) => item?.title ?? '',
  initialQuery = '',
}) {
  const [q, setQ] = useState(initialQuery)

  // 初始化各字段状态
  const initialFilters = useMemo(() => {
    const obj = {}
    for (const f of schema) {
      obj[f.name] = f.defaultValue ?? 'all'
    }
    return obj
  }, [schema])

  const [filters, setFilters] = useState(initialFilters)

  // 如果 schema 变了，确保 filters 至少有这些 key（不会主动清空用户已选）
  // （避免热更新/以后扩字段时出现 undefined）
  const safeFilters = useMemo(() => {
    const next = { ...initialFilters, ...filters }
    return next
  }, [filters, initialFilters])

  const setFilter = useCallback((name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }))
  }, [])

  const reset = useCallback(() => {
    setQ(initialQuery)
    setFilters(initialFilters)
  }, [initialFilters, initialQuery])

  const helpers = useMemo(
    () => ({
      uniqSorted,
      uniqNumbersDesc,
    }),
    []
  )

  // optionsMap: { [name]: optionsArray }
  const optionsMap = useMemo(() => {
    const map = {}
    for (const f of schema) {
      if (typeof f.buildOptions === 'function') {
        map[f.name] = f.buildOptions(items, helpers)
        continue
      }

      // 默认：从 getValue 抽取
      const raw = items.flatMap((it) => {
        const v = f.getValue(it)
        return Array.isArray(v) ? v : [v]
      })

      // year 倾向数字降序，其它用中文排序
      if (f.name === 'year') map[f.name] = uniqNumbersDesc(raw)
      else map[f.name] = uniqSorted(raw)
    }
    return map
  }, [items, schema, helpers])

  const filteredItems = useMemo(() => {
    const query = normalizeQuery(q)

    return items.filter((item) => {
      // 文本搜索（仅标题）
      if (query) {
        const text = normalizeQuery(searchKey(item))
        if (!text.includes(query)) return false
      }

      // 逐字段筛选
      for (const f of schema) {
        const selected = safeFilters[f.name]
        if (selected === 'all') continue

        const v = f.getValue(item)

        if (typeof f.match === 'function') {
          if (!f.match(v, selected, item)) return false
          continue
        }

        // 默认命中规则：
        // - v 是数组：includes
        // - 否则：字符串化 equals
        if (Array.isArray(v)) {
          if (!v.includes(selected)) return false
        } else {
          if (String(v) !== String(selected)) return false
        }
      }

      return true
    })
  }, [items, schema, q, safeFilters, searchKey])

  // 用于 usePagedList resetKey：query + 全部筛选值
  const resetKey = useMemo(() => {
    return [q, ...schema.map((f) => safeFilters[f.name])]
  }, [q, schema, safeFilters])

  return {
    q,
    setQ,

    filters: safeFilters,
    setFilter,

    optionsMap,

    filteredItems,
    reset,
    resetKey,
  }
}
