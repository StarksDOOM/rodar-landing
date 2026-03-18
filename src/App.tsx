import React, { createContext, useContext, useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LandingPage from './pages/LandingPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import FleetPage from './pages/FleetPage'
import SupportPage from './pages/SupportPage'

// Simple translation context
type Language = 'en' | 'es'
interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'landing.title': 'The Caribbean\'s Premier Mobility Platform',
    'landing.subtitle': 'Rodar.do is coming to redefine how you move across the Dominican Republic.',
    'landing.cta': 'Join the Waitlist',
    'landing.scroll': 'Discover More',
    'menu.home': 'Home',
    'menu.about': 'About',
    'menu.fleet': 'Fleet',
    'menu.support': 'Support',
    'menu.contact': 'Contact',
    'footer.rights': '© 2024 Rodar.do - A FulCastle Holdings, Inc. project',
  },
  es: {
    'landing.title': 'La plataforma de movilidad líder del Caribe',
    'landing.subtitle': 'Rodar.do llega para rediseñar cómo te mueves por la República Dominicana.',
    'landing.cta': 'Únete a la lista de espera',
    'landing.scroll': 'Descubre más',
    'menu.home': 'Inicio',
    'menu.about': 'Nosotros',
    'menu.fleet': 'Flota',
    'menu.support': 'Soporte',
    'menu.contact': 'Contacto',
    'footer.rights': '© 2024 Rodar.do - Un proyecto de FulCastle Holdings, Inc.',
  }
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider')
  return context
}

export default function App() {
  const [language, setLanguage] = useState<Language>('es')
  const location = useLocation()

  const t = (key: string) => translations[language][key] || key

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className="min-h-screen bg-brand-deep text-white font-sans selection:bg-brand-coral/30">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/fleet" element={<FleetPage />} />
            <Route path="/support" element={<SupportPage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </LanguageContext.Provider>
  )
}
