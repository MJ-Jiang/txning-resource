import { useEffect, useMemo, useState } from 'react'

/**
 * 通用分页逻辑：
 * - items: 已经过滤好的数组
 * - pageSize: 每页多少条（默认25）
 * - resetKey: 任意会导致筛选变化的依赖数组（变化就回到第1页）
 */
export default function usePagedList({
  items = [],
  pageSize = 25,
  resetKey = [],
}) {
  const [page, setPage] = useState(1)

  // 总页数
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(items.length / pageSize))
  }, [items.length, pageSize])

  // 保护 page 不越界
  const safePage = useMemo(() => {
    return Math.min(Math.max(1, page), totalPages)
  }, [page, totalPages])

  // 当前页 items：不满25就全显示，满25就只显示25；第2页从第26条开始
  const pageItems = useMemo(() => {
    const start = (safePage - 1) * pageSize
    const end = start + pageSize
    return items.slice(start, end)
  }, [items, safePage, pageSize])

  // 筛选变化：回到第一页
  useEffect(() => {
    setPage(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, resetKey)

  function goPrev() {
    setPage((p) => Math.max(1, p - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goNext() {
    setPage((p) => Math.min(totalPages, p + 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goPage(n) {
    setPage(() => {
      const nn = Number(n)
      if (Number.isNaN(nn)) return 1
      return Math.min(Math.max(1, nn), totalPages)
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return {
    page: safePage,
    setPage,
    totalPages,
    pageItems,
    goPrev,
    goNext,
    goPage,
  }
}
