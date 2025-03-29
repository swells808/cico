
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import Index from './pages/Index';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Timeclock from './pages/Timeclock';
import { LanguageProvider } from "./contexts/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/timeclock" element={<Timeclock />} />
          <Route path="*" element={
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
              </main>
              <Footer />
            </div>
          } />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
