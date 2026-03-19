import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/pages/LandingPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [language, setLanguage] = useState<'es' | 'en'>('es');

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
