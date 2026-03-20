import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/pages/LandingPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';

/**
 * Root Application Component.
 * Manages the global state for language and current page navigation.
 * Uses a simple state-based router to switch between main pages.
 * 
 * @returns The full layout of the site, including Header, current Page, and Footer.
 */
export default function App() {
  /**
   * State to track the active page ('home', 'about', or 'contact').
   */
  const [currentPage, setCurrentPage] = useState('home');

  /**
   * Global state for internationalization ('es' for Spanish, 'en' for English).
   */
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  /**
   * Helper function to determine which component to render based on the current page state.
   */
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage language={language} />;
      case 'about':
        return <AboutPage language={language} />;
      case 'contact':
        return <ContactPage language={language} />;
      default:
        return <LandingPage language={language} />;
    }
  };

  return (
    <div className="min-h-screen relative">
      <Header
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        language={language}
        onLanguageChange={setLanguage}
      />
      
      {renderPage()}
      
      <Footer language={language} />
    </div>
  );
}
