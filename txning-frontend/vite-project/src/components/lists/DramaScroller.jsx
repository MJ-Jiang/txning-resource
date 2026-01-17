import { useEffect, useState } from 'react'
import DramaCard from '../cards/DramaCard'
import { useDict } from '../../providers/useDict'
import { apiGet } from '@/services/api'

export default function DramaScroller() {
  const { categoryByCode } = useDict()
  const categoryId = categoryByCode?.drama?.id

  const [items, setItems] = useState([])

  useEffect(() => {
    if (!categoryId) return

    const params = new URLSearchParams()
    params.append('category', String(categoryId))
    params.append('is_featured', 'true')  
    params.set('limit', '100')
    params.set('offset', '0')

    apiGet(`/contents?${params.toString()}`).then((data) => {
      setItems(Array.isArray(data.items) ? data.items : [])
    })
  }, [categoryId])

  return (
    <div className="movie-scroller">
      {items.map((item) => (
        <DramaCard key={item.id} item={item} />
      ))}
    </div>
  )
}
