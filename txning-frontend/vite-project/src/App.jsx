import './App.css'
import { Routes, Route } from 'react-router-dom'
import DramasPage from './pages/DramasPage'
import HomePage from './pages/HomePage'
import ScrollToTop from './components/ScrollToTop'
import MagazinesPage from './pages/MagazinesPage'
import EventsPage from './pages/EventsPage'
import DramaDetailPage from './pages/DramaDetailPage'
import AboutPage from './pages/AboutPage'
import GalleryPage from './pages/GalleryPage'
export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dramas" element={<DramasPage />} />
        <Route path="/endorsements" element={<MagazinesPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/detail/:category/:slug" element={<DramaDetailPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/aboutme" element={<AboutPage />} />
      </Routes>
    </>
  )
}
