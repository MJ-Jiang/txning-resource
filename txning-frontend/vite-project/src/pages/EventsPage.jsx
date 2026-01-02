// src/pages/EventsPage.jsx
import { useMemo } from 'react'
import ResourceListContainer from '../components/channels/ResourceListContainer'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import EventpageCard from '../components/cards/EventpageCard'
import { useDict } from '../providers/useDict'

export default function EventsPage() {
  const { statusNameById, typeNameById, cityNameById, categoryByCode } =
    useDict()

  const categoryId = categoryByCode?.event?.id
  if (!categoryId) return null

  const schema = useMemo(
    () => [
      {
        name: 'release_year',
        label: '年份',
        defaultValue: 'all',
        getValue: (d) => d.release_year,
      },
      {
        name: 'status_id',
        label: '状态',
        defaultValue: 'all',
        getValue: (d) => d.status_id,
        optionsLabel: (id) => statusNameById?.[id] ?? String(id),
      },
      {
        name: 'type_id',
        label: '类型',
        defaultValue: 'all',
        getValue: (d) => d.type_id,
        optionsLabel: (id) => typeNameById?.[id] ?? String(id),
      },
      {
        name: 'city_id',
        label: '地点',
        defaultValue: 'all',
        getValue: (d) => (Array.isArray(d.city_ids) ? d.city_ids : []),
        optionsLabel: (id) => cityNameById?.[id] ?? String(id),
      },
    ],
    [statusNameById, typeNameById, cityNameById]
  )

  return (
    <div className="page">
      <Navbar />
      <ResourceListContainer
        category={categoryId}
        schema={schema}
        renderCard={(item) => <EventpageCard key={item.id} item={item} />}
        gridClassName="card-grid"
        searchKey={(m) => m.title ?? ''}
      />
      <Footer />
    </div>
  )
}
