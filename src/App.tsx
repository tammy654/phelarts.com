import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import OurWork from './pages/OurWork';
import CaseStudies from './pages/CaseStudies';
import About from './pages/About';
import Contact from './pages/Contact';
import BookCall from './pages/BookCall';
import Pricing from './pages/Pricing';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#f7f5f1',
            color: '#16161a',
            border: '1px solid rgba(22, 22, 26, 0.08)',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
          },
          success: { iconTheme: { primary: '#0f5132', secondary: '#f7f5f1' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#f7f5f1' } },
        }}
      />
      <div className="min-h-screen bg-[#f7f5f1]">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/our-work" element={<OurWork />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book-call" element={<BookCall />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
