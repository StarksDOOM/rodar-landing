import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/pages/LandingPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { TermsPage } from './components/pages/TermsPage';
import { PrivacyPage } from './components/pages/PrivacyPage';

/**
 * Root Application Component.
 * Manages the global state for language and current page navigation.
 * Uses a simple state-based router to switch between main pages.
 * 
 * @returns The full layout of the site, including Header, current Page, and Footer.
 */
export default function App() {
  /**
   * State to track the active page ('home', 'about', 'contact', 'terms', or 'privacy').
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
      case 'terms':
        return <TermsPage language={language} />;
      case 'privacy':
        return <PrivacyPage language={language} />;
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
      
      <Footer 
        language={language} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
}
