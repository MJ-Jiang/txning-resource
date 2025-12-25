import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function AboutPage() {
  return (
    <div className="page">
      <Navbar />
      <div className="app-container">
        <h1>About Us</h1>
        <p>Welcome to the About Page!</p>
      </div>
      <Footer />
    </div>
  )
}
