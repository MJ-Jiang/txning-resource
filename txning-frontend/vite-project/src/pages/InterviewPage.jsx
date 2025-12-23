import { useMemo } from 'react'
import DramaCard from '../components/cards/DramaCard'
import ResourceListContainer from '../components/channels/ResourceListContainer'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
function getInterviewPlatform(d) {
  if (d.platform) return d.platform
  if (Array.isArray(d.platforms) && d.platforms.length) return d.platforms[0]
  return ''
}

function getInterviewTypes(d) {
  if (Array.isArray(d.types)) return d.types
  if (d.type) return [d.type]
  return []
}

export default function InterviewPage() {
  const schema = useMemo(
    () => [
      {
        name: 'platform',
        label: '平台',
        defaultValue: 'all',
        getValue: (d) => getInterviewPlatform(d),
      },
      {
        name: 'type',
        label: '类型',
        defaultValue: 'all',
        getValue: (d) => getInterviewTypes(d), // array
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
    <>
      <Navbar />
      <ResourceListContainer
        category="interviews"
        schema={schema}
        renderCard={(item) => <DramaCard key={item.id} item={item} />}
        gridClassName="card-grid"
        searchKey={(d) => d.title}
      />
      <Footer />
    </>
  )
}
