import { useMemo } from 'react'
import DramaCard from '../components/cards/DramaCard'
import ResourceListContainer from '../components/channels/ResourceListContainer'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function DramasPage() {
  const schema = useMemo(
    () => [
      {
        name: 'platform',
        label: '平台',
        defaultValue: 'all',
        getValue: (d) => d.platforms.map((item) => item.key),
      },
      {
        name: 'type',
        label: '类型',
        defaultValue: 'all',
        getValue: (d) => d.type,
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
        getValue: (d) => d.status,
      },
    ],
    []
  )
  return (
    <div className="page">
      <Navbar />
      <ResourceListContainer
        category="dramas"
        schema={schema}
        renderCard={(item) => <DramaCard key={item.id} item={item} />}
        gridClassName="card-grid"
        searchKey={(d) => d.title}
      />
      <Footer />
    </div>
  )
}
