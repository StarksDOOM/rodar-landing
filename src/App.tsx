import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  const renderPage = () => {
    // Phase 1: Base Architecture (Empty placeholder)
    return (
      <div className="pt-32 pb-24 px-6 min-h-[60vh] flex items-center justify-center">
        <div className="text-center opacity-40">
          <h2 className="text-2xl font-display font-bold mb-2">Rodar.do</h2>
          <p>Base architecture active. Landing page loading in next branch...</p>
        </div>
      </div>
    );
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
