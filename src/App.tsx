
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
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Timeclock from './pages/Timeclock';
import Projects from './pages/Projects';
import EditProject from './pages/EditProject';
import Users from './pages/Users';
import { LanguageProvider } from "./contexts/LanguageContext";
import EditUser from './pages/EditUser';
import Reports from './pages/Reports';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/timeclock" element={<Timeclock />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/new" element={<EditProject />} />
          <Route path="/projects/edit/:projectId" element={<EditProject />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/new" element={<EditUser />} />
          <Route path="/users/edit/:userId" element={<EditUser />} />
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
