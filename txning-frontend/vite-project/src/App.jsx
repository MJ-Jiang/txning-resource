import './App.css'
import { Routes, Route } from 'react-router-dom'
import DramasPage from './pages/DramasPage'
import HomePage from './pages/HomePage'
import ScrollToTop from './components/ScrollToTop'
import EndorsementsPage from './pages/EndorsementsPage'
import EventsPage from './pages/EventsPage'
import DetailPage from './pages/DetailPage'
import AboutPage from './pages/AboutPage'
import GalleryPage from './pages/GalleryPage'
import { DictProvider } from './providers/DictProvider'
export default function App() {
  return (
    <>
      <DictProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/drama" element={<DramasPage />} />
          <Route path="/endorsement" element={<EndorsementsPage />} />
          <Route path="/event" element={<EventsPage />} />
          <Route path="/detail/:category/:id" element={<DetailPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/aboutme" element={<AboutPage />} />
        </Routes>
      </DictProvider>
    </>
  )
}
