import { createContext, useContext, useEffect, useState } from 'react'

const DictContext = createContext(null)

export function DictProvider({ children }) {
  const [statusNameById, setStatusNameById] = useState({})
  const [typeNameById, setTypeNameById] = useState({})
  const [genreNameById, setGenreNameById] = useState({})
  const [platformNameById, setPlatformNameById] = useState({})
  const [platformCodeById, setPlatformCodeById] = useState({}) // ✅ NEW
  const [platformById, setPlatformById] = useState({}) // ✅ NEW

  const [typeCodeById, setTypeCodeById] = useState({})
  const [cityNameById, setCityNameById] = useState({})
  const [categoryById, setCategoryById] = useState({})
  const [categoryByCode, setCategoryByCode] = useState({})

  const [ugcPlatformNameById, setUgcPlatformNameById] = useState({})
  const [ugcPlatformByCode, setUgcPlatformByCode] = useState({})

  const [bookingPlatformNameById, setBookingPlatformNameById] = useState({})
  const [bookingPlatformCodeById, setBookingPlatformCodeById] = useState({}) // ✅ NEW
  const [bookingPlatformById, setBookingPlatformById] = useState({}) // ✅ NEW
  const [bookingPlatformByCode, setBookingPlatformByCode] = useState({})

  useEffect(() => {
    let alive = true

    async function loadDicts() {
      const [
        statusRes,
        typeRes,
        genreRes,
        platformRes,
        citiesRes,
        categoriesRes,
        ugcPlatformsRes,
        bookingPlatformsRes,
      ] = await Promise.all([
        fetch('/dict/statuses'),
        fetch('/dict/types'),
        fetch('/dict/genres'),
        fetch('/dict/platforms'),
        fetch('/dict/cities'),
        fetch('/dict/categories'),
        fetch('/dict/ugc-platforms'),
        fetch('/dict/booking-platforms'),
      ])

      const [
        statuses,
        types,
        genres,
        platforms,
        cities,
        categories,
        ugcPlatforms,
        bookingPlatforms,
      ] = await Promise.all([
        statusRes.json(),
        typeRes.json(),
        genreRes.json(),
        platformRes.json(),
        citiesRes.json(),
        categoriesRes.json(),
        ugcPlatformsRes.json(),
        bookingPlatformsRes.json(),
      ])

      if (!alive) return

      setStatusNameById(
        Object.fromEntries((statuses ?? []).map((s) => [s.id, s.name_zh]))
      )

      setTypeNameById(
        Object.fromEntries((types ?? []).map((t) => [t.id, t.name_zh]))
      )
      setTypeCodeById(
        Object.fromEntries((types ?? []).map((t) => [t.id, t.code]))
      )

      setGenreNameById(
        Object.fromEntries((genres ?? []).map((g) => [g.id, g.name_zh]))
      )

      // ✅ platforms
      setPlatformNameById(
        Object.fromEntries((platforms ?? []).map((p) => [p.id, p.name_zh]))
      )
      setPlatformCodeById(
        Object.fromEntries((platforms ?? []).map((p) => [p.id, p.code]))
      )
      setPlatformById(
        Object.fromEntries((platforms ?? []).map((p) => [p.id, p]))
      )

      setCityNameById(
        Object.fromEntries((cities ?? []).map((c) => [c.id, c.name_zh]))
      )

      setCategoryById(
        Object.fromEntries((categories ?? []).map((c) => [c.id, c]))
      )
      setCategoryByCode(
        Object.fromEntries((categories ?? []).map((c) => [c.code, c]))
      )

      // ✅ ugc platforms
      setUgcPlatformNameById(
        Object.fromEntries((ugcPlatforms ?? []).map((p) => [p.id, p.name_zh]))
      )
      setUgcPlatformByCode(
        Object.fromEntries((ugcPlatforms ?? []).map((p) => [p.code, p]))
      )

      // ✅ booking platforms
      setBookingPlatformNameById(
        Object.fromEntries(
          (bookingPlatforms ?? []).map((p) => [p.id, p.name_zh])
        )
      )
      setBookingPlatformCodeById(
        Object.fromEntries((bookingPlatforms ?? []).map((p) => [p.id, p.code]))
      )
      setBookingPlatformById(
        Object.fromEntries((bookingPlatforms ?? []).map((p) => [p.id, p]))
      )
      setBookingPlatformByCode(
        Object.fromEntries((bookingPlatforms ?? []).map((p) => [p.code, p]))
      )
    }

    loadDicts().catch((e) => {
      if (!alive) return
      console.error('Failed to load dicts', e)
    })

    return () => {
      alive = false
    }
  }, [])

  return (
    <DictContext.Provider
      value={{
        statusNameById,
        typeNameById,
        typeCodeById,
        genreNameById,

        platformNameById,
        platformCodeById,
        platformById,

        cityNameById,
        categoryById,
        categoryByCode,

        ugcPlatformNameById,
        ugcPlatformByCode,

        bookingPlatformNameById,
        bookingPlatformCodeById,
        bookingPlatformById,
        bookingPlatformByCode,
      }}
    >
      {children}
    </DictContext.Provider>
  )
}

export function useDictContext() {
  const ctx = useContext(DictContext)
  if (!ctx) throw new Error('useDictContext must be used within DictProvider')
  return ctx
}
