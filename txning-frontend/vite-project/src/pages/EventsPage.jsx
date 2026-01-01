import { useMemo } from 'react'
import ResourceListContainer from '../components/channels/ResourceListContainer'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import EventpageCard from '../components/cards/EventpageCard'
import { CATEGORY_CODES } from '../dictionary/category'
import { TYPE_LABEL } from '../dictionary/type'
import { STATUS_FILTER_LABEL } from '../dictionary/status'
import { CITY_LABEL } from '../dictionary/city'

export default function EventsPage() {
  const schema = useMemo(
    () => [
      {
        name: 'release_year',
        label: '年份',
        defaultValue: 'all',
        // ✅ 新字段：release_year: number | null
        getValue: (d) => d.release_year,
      },
      {
        name: 'status_id',
        label: '状态',
        defaultValue: 'all',
        // ✅ 新字段：status_id: number | null
        getValue: (d) => d.status_id,
        optionsLabel: (v) => STATUS_FILTER_LABEL[v] ?? String(v),
      },
      {
        name: 'type_id',
        label: '类型',
        defaultValue: 'all',
        // ✅ 新字段：type_id: number | null
        getValue: (d) => d.type_id,
        optionsLabel: (v) => TYPE_LABEL[v] ?? String(v),
      },
      {
        name: 'city',
        label: '地点',
        defaultValue: 'all',

        getValue: (m) =>
          Array.isArray(m.cityCodes)
            ? m.cityCodes.filter(Boolean)
            : m.cityCode
              ? [m.cityCode]
              : [],
        optionsLabel: (code) => CITY_LABEL?.[code] ?? String(code),
      },
    ],
    []
  )

  return (
    <div className="page">
      <Navbar />
      <ResourceListContainer
        category={3}
        schema={schema}
        renderCard={(item) => <EventpageCard key={item.id} item={item} />}
        gridClassName="card-grid"
        searchKey={(m) => m.title ?? ''}
      />
      <Footer />
    </div>
  )
}
