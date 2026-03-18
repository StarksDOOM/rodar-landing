import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../App'
import { Globe, Menu, X } from 'lucide-react'

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  
  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full glass hover:bg-white/10 transition-all text-sm font-medium"
      title={language === 'en' ? 'Cambiar a Español' : 'Switch to English'}
    >
      <Globe size={16} className="text-brand-accent" />
      <span>{language === 'en' ? 'ES' : 'EN'}</span>
    </button>
  )
}

export function Navbar() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = React.useState(false)
  const location = useLocation()

  const navItems = [
    { name: t('menu.home'), path: '/' },
    { name: t('menu.about'), path: '/about' },
    { name: t('menu.fleet'), path: '/fleet' },
    { name: t('menu.support'), path: '/support' },
    { name: t('menu.contact'), path: '/contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass px-6 py-3 rounded-2xl">
        <Link to="/" className="text-2xl font-display font-bold tracking-tight text-white flex items-center gap-2">
          <span className="text-brand-accent">Rodar</span>
          <span className="opacity-80">.do</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-brand-accent ${
                location.pathname === item.path ? 'text-brand-accent' : 'text-white/70'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="h-4 w-px bg-white/20 mx-2" />
          <LanguageToggle />
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-6 right-6 p-6 glass rounded-2xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium ${
                    location.pathname === item.path ? 'text-brand-accent' : 'text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <hr className="border-white/10" />
              <button
                onClick={() => {
                  setIsOpen(false)
                }}
                className="w-full text-left font-medium flex items-center justify-between"
              >
                <span>Language / Idioma</span>
                <LanguageToggle />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage()
  return (
    <div className="relative overflow-hidden w-full min-h-screen">
      <Navbar />
      <main>{children}</main>
      <footer className="py-12 px-6 border-t border-white/5 bg-brand-deep/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-display font-bold">
            <span className="text-brand-accent">Rodar</span>.do
          </div>
          <p className="text-white/50 text-sm">{t('footer.rights')}</p>
          <div className="flex gap-6 text-white/40 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
             {/* Social placeholders could go here */}
          </div>
        </div>
      </footer>
    </div>
  )
}
