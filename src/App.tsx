import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/pages/LandingPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  const renderPage = () => {
    switch (currentPage) {
      // In follow-up feature branches, other pages will be registered here.
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
