import { useMemo } from 'react'
import DramaCard from '../components/cards/DramaCard'
import ResourceListContainer from '../components/channels/ResourceListContainer'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { TYPE_LABEL } from '../dictionary/type'
import { STATUS_FILTER_LABEL } from '../dictionary/status'
import { PLATFORM_LABEL } from '../dictionary/platform'

export default function DramasPage() {
  const schema = useMemo(
    () => [
      {
        name: 'platform',
        label: '平台',
        defaultValue: 'all',
        getValue: (d) => d.platforms.map((p) => p.code),
        optionsLabel: (v) => PLATFORM_LABEL[v] ?? v,
      },

      {
        name: 'type',
        label: '类型',
        defaultValue: 'all',
        getValue: (d) => d.type,
        optionsLabel: (v) => TYPE_LABEL[v] ?? v,
      },
      {
        name: 'year',
        label: '年份',
        defaultValue: 'all',
        getValue: (d) => d.year,
      },
      {
        name: 'status',
        label: '状态',
        defaultValue: 'all',
        getValue: (d) => d.status, // code
        optionsLabel: (v) => STATUS_FILTER_LABEL[v] ?? v,
      },
    ],
    []
  )
  return (
    <div className="page">
      <Navbar />
      <ResourceListContainer
        category="drama"
        schema={schema}
        renderCard={(item) => <DramaCard key={item.id} item={item} />}
        gridClassName="card-grid"
        searchKey={(d) => d.title}
      />
      <Footer />
    </div>
  )
}
