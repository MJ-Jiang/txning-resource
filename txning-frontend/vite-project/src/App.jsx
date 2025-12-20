import './App.css'
import { Routes, Route } from 'react-router-dom'
import DramasPage from './pages/DramasPage'
import HomePage from './pages/HomePage'
import ScrollToTop from './components/ScrollToTop'
import MagazinesPage from './pages/MagazinesPage'
import InterviewPage from './pages/InterviewPage'
import EventsPage from './pages/EventsPage'
export default function App() {
return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dramas" element={<DramasPage />} />
        <Route path="/endorsements" element={<MagazinesPage />} />
        <Route path="/interviews" element={<InterviewPage />} />
        <Route path="/events" element={<EventsPage />} />
      </Routes>
    </>
  )
}
