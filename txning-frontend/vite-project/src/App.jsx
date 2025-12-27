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
export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dramas" element={<DramasPage />} />
        <Route path="/endorsements" element={<EndorsementsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/detail/:category/:slug" element={<DetailPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/aboutme" element={<AboutPage />} />
      </Routes>
    </>
  )
}
