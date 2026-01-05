const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function apiGet(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Accept: 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`GET ${path} failed: ${res.status} ${text}`)
  }

  return res.json()
}
