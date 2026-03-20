import { motion } from 'motion/react';
import { getTranslations } from '../lib/i18n';

interface FooterProps {
  /** The current language code ('es' or 'en'). */
  language: 'es' | 'en';
  /** Callback to trigger a page change in the root App state. */
  onPageChange: (page: string) => void;
}

/**
 * Footer Component.
 * Fixed-bottom institutional footer containing corporate info, contact, and legal links.
 * Uses a glassmorphic design and SF Mono typography for a technical, premium feel.
 * 
 * @param props - Footer properties including language and navigation callback.
 */
export function Footer({ language, onPageChange }: FooterProps) {
  const t = getTranslations(language);

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40">
      {/* The Institutional Fixed Footer - Non-Negotiable */}
      <div 
        className="w-full"
        style={{
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="max-w-7xl mx-auto px-3 md:px-8 py-2.5 md:py-3">
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-1.5 md:gap-0 text-center md:text-left"
            style={{
              fontFamily: '"SF Mono", "SF Pro Text", "Menlo", "Consolas", "Monaco", monospace',
              fontSize: '9px',
              color: '#9CA3AF',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              lineHeight: '1.6'
            }}
          >
            
            {/* Left: Corporate Info */}
            <div>
              <p>© 2026 FulCastle Holdings, Inc.</p>
              <p className="hidden md:block">8 The Green, Ste B, Dover, DE 19901</p>
            </div>

            {/* Center: Support Email */}
            <div className="md:text-center">
              <a 
                href="mailto:support@rodar.do" 
                className="hover:text-white transition-colors duration-200"
              >
                support@rodar.do
              </a>
            </div>

            {/* Right: Legal Links */}
            <div className="md:text-right">
              <button 
                onClick={() => onPageChange('terms')}
                className="hover:text-white transition-colors duration-200 uppercase"
              >
                {t.footer.legal.terms}
              </button>
              {' | '}
              <button 
                onClick={() => onPageChange('privacy')}
                className="hover:text-white transition-colors duration-200 uppercase"
              >
                {t.footer.legal.privacy}
              </button>
            </div>

          </motion.div>
        </div>
      </div>
    </footer>
  );
}
