import { useState } from 'react';
import { motion } from 'motion/react';
import { DominicanFlag, USFlag } from './FlagComponents';
import { getTranslations } from '../lib/i18n';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  language: 'es' | 'en';
  onLanguageChange: (lang: 'es' | 'en') => void;
}

export function Header({ currentPage, onPageChange, language, onLanguageChange }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = getTranslations(language);

  const handleNavClick = (pageId: string) => {
    onPageChange(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-3 md:px-6 pt-3 md:pt-6"
    >
      {/* The Fixed Navigation - Floating Pill */}
      <nav 
        className="w-full max-w-4xl mx-auto px-3 md:px-6 py-2 md:py-3 flex items-center justify-between gap-2 md:gap-8"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          borderRadius: '100px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15)'
        }}
      >
        {/* Left: Rodar Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2"
        >
          <div 
            className="w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center"
            style={{
              background: '#00A86B',
              boxShadow: '0 2px 8px rgba(0, 168, 107, 0.4)'
            }}
          >
            <span className="text-white font-bold text-sm md:text-base">R</span>
          </div>
          <span 
            className="text-white font-semibold text-sm md:text-base hidden sm:inline"
            style={{
              letterSpacing: '-0.01em'
            }}
          >
            Rodar
          </span>
        </motion.div>

        {/* Center: Navigation Links */}
        <div className="flex items-center gap-3 md:gap-6">
          {t.header.nav.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-[11px] md:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                currentPage === item.id 
                  ? 'text-white' 
                  : 'text-white/60 hover:text-white'
              }`}
              style={currentPage === item.id ? {
                textShadow: '0 0 20px rgba(0, 168, 107, 0.8)'
              } : {}}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right: Bilingual Toggle [ 🇩🇴 ES | 🇺🇸 EN ] */}
        <div className="flex items-center gap-1 md:gap-2">
          <button
            onClick={() => onLanguageChange('es')}
            className={`flex items-center gap-1 md:gap-1.5 px-1.5 md:px-2.5 py-1.5 rounded-lg transition-all duration-200 ${
              language === 'es' 
                ? 'opacity-100' 
                : 'opacity-50 hover:opacity-75'
            }`}
            style={language === 'es' ? {
              boxShadow: '0 0 16px rgba(0, 168, 107, 0.6)',
              background: 'rgba(0, 168, 107, 0.15)'
            } : {}}
          >
            <DominicanFlag size="sm" />
            <span 
              className="text-white text-[10px] md:text-xs font-bold hidden sm:inline"
              style={{
                letterSpacing: '0.05em'
              }}
            >
              ES
            </span>
          </button>

          <span className="text-white/30 text-xs font-light hidden sm:inline">|</span>

          <button
            onClick={() => onLanguageChange('en')}
            className={`flex items-center gap-1 md:gap-1.5 px-1.5 md:px-2.5 py-1.5 rounded-lg transition-all duration-200 ${
              language === 'en' 
                ? 'opacity-100' 
                : 'opacity-50 hover:opacity-75'
            }`}
            style={language === 'en' ? {
              boxShadow: '0 0 16px rgba(0, 168, 107, 0.6)',
              background: 'rgba(0, 168, 107, 0.15)'
            } : {}}
          >
            <USFlag size="sm" />
            <span 
              className="text-white text-[10px] md:text-xs font-bold hidden sm:inline"
              style={{
                letterSpacing: '0.05em'
              }}
            >
              EN
            </span>
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
