import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function PageLayout({ children }) {
  return (
    <div className="page">
      <header className="navbar">
        <Navbar />
      </header>

      <main className="main">{children}</main>

      <footer className="site-footer">
        <Footer />
      </footer>
    </div>
  )
}
