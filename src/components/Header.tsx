import { useState } from 'react';
import { motion } from 'framer-motion';
import { DominicanFlag, USFlag } from './FlagComponents';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  language: 'es' | 'en';
  onLanguageChange: (lang: 'es' | 'en') => void;
}

export function Header({ currentPage, onPageChange, language, onLanguageChange }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = {
    es: [
      { id: 'home', label: 'Inicio' },
      { id: 'about', label: 'Nosotros' },
      { id: 'contact', label: 'Contacto' }
    ],
    en: [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'contact', label: 'Contact' }
    ]
  };

  const handleNavClick = (pageId: string) => {
    onPageChange(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none"
    >
      <div className="w-full max-w-5xl flex items-center justify-between pointer-events-auto h-16 px-6 glass rounded-full">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleNavClick('home')}
        >
          <div className="w-8 h-8 rounded-lg bg-brand-accent flex items-center justify-center text-brand-deep font-bold text-xl group-hover:scale-110 transition-transform">
            R
          </div>
          <span className="text-white font-display font-bold text-xl tracking-tight">Rodar</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navigation[language].map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-sm font-medium transition-all hover:text-brand-accent ${
                currentPage === item.id ? 'text-brand-accent' : 'text-white/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Language & Actions */}
        <div className="flex items-center gap-4">
          <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
            <button
              onClick={() => onLanguageChange('es')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
                language === 'es' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'
              }`}
            >
              <DominicanFlag className="w-4 h-4" />
              <span className="text-[10px] font-bold tracking-widest">ES</span>
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
                language === 'en' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'
              }`}
            >
              <USFlag className="w-4 h-4" />
              <span className="text-[10px] font-bold tracking-widest">EN</span>
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
