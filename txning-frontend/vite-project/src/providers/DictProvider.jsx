import { createContext, useContext, useEffect, useState } from 'react'

const DictContext = createContext(null)

export function DictProvider({ children }) {
  const [statusNameById, setStatusNameById] = useState({})
  const [typeNameById, setTypeNameById] = useState({})
  const [genreNameById, setGenreNameById] = useState({})
  const [platformNameById, setPlatformNameById] = useState({})
  const [typeCodeById, setTypeCodeById] = useState({})
  useEffect(() => {
    async function loadDicts() {
      const [statusRes, typeRes, genreRes, platformRes] = await Promise.all([
        fetch('/dict/statuses'),
        fetch('/dict/types'),
        fetch('/dict/genres'),
        fetch('/dict/platforms'),
      ])

      const [statuses, types, genres, platforms] = await Promise.all([
        statusRes.json(),
        typeRes.json(),
        genreRes.json(),
        platformRes.json(),
      ])

      setStatusNameById(
        Object.fromEntries(statuses.map((s) => [s.id, s.name_zh]))
      )
      setTypeNameById(Object.fromEntries(types.map((t) => [t.id, t.name_zh])))
      setTypeCodeById(Object.fromEntries(types.map((t) => [t.id, t.code])))

      setGenreNameById(Object.fromEntries(genres.map((g) => [g.id, g.name_zh])))
      setPlatformNameById(
        Object.fromEntries(platforms.map((p) => [p.id, p.name_zh]))
      )
    }

    loadDicts().catch((e) => {
      console.error('Failed to load dicts', e)
    })
  }, [])

  return (
    <DictContext.Provider
      value={{
        statusNameById,
        typeNameById,
        typeCodeById,
        genreNameById,
        platformNameById,
      }}
    >
      {children}
    </DictContext.Provider>
  )
}

export function useDictContext() {
  const ctx = useContext(DictContext)
  if (!ctx) {
    throw new Error('useDictContext must be used within DictProvider')
  }
  return ctx
}
