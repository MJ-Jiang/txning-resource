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
        name: 'year',
        label: '年份',
        defaultValue: 'all',
        getValue: (m) => m.year ?? 'unknown',
        optionsLabel: (v) => (v === 'unknown' ? '未知' : String(v)),
      },
      {
        name: 'status',
        label: '状态',
        defaultValue: 'all',
        getValue: (m) => m.status ?? 'unknown',
        optionsLabel: (code) =>
          code === 'unknown'
            ? '未知'
            : (STATUS_FILTER_LABEL?.[code] ?? String(code)),
      },
      {
        name: 'type',
        label: '类型',
        defaultValue: 'all',
        getValue: (m) => m.type ?? 'unknown',

        optionsLabel: (code) =>
          code === 'unknown' ? '未知' : (TYPE_LABEL?.[code] ?? String(code)),
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
        category={CATEGORY_CODES.EVENT}
        schema={schema}
        renderCard={(item) => <EventpageCard key={item.id} item={item} />}
        gridClassName="card-grid"
        searchKey={(m) => m.title ?? ''}
      />
      <Footer />
    </div>
  )
}
