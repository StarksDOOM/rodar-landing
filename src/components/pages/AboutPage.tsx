import { motion } from 'motion/react';
import { getTranslations } from '../../lib/i18n';

/**
 * Props for the AboutPage component.
 */
interface AboutPageProps {
  /** The current language code ('es' or 'en'). */
  language: 'es' | 'en';
}

/**
 * AboutPage Component.
 * Displays institutional information about Rodar, including its mission, legal compliance, 
 * and core values. Features a fixed atmospheric background with a glassmorphism overlay.
 * 
 * @param props - Component properties including the active language.
 * @returns A scrollable page with localized institutional content.
 */
export function AboutPage({ language }: AboutPageProps) {
  /** Localized translation helper. */
  const t = getTranslations(language);

  return (
    <div 
      className="min-h-screen overflow-y-auto"
      style={{
        backgroundImage: 'url(https://dominicanexpert.com/wp-content/uploads/2017/07/dominican_republic_travel_203_boulevard_turistico_de_atlantico_samana.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundColor: '#1a1a1a'
      }}
    >
      {/* Dark Overlay for Readability */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'rgba(0, 0, 0, 0.60)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 pt-24 md:pt-32 pb-24 md:pb-32 px-3">
        <div className="max-w-[900px] mx-auto">
          
          {/* The Glass Slab Container */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl md:rounded-[32px] p-6 md:p-12 lg:p-16"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
            }}
          >
            {/* Title */}
            <h1 
              className="text-white mb-8"
              style={{
                fontFamily: '"SF Pro Display", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '32px',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: '1.2'
              }}
            >
              {t.about.title}
            </h1>

            {/* Introduction */}
            <p 
              className="text-white/80 mb-12"
              style={{
                fontFamily: '"SF Pro Display", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '15px',
                fontWeight: 400,
                lineHeight: '1.7',
                letterSpacing: '0.01em'
              }}
            >
              {t.about.intro}
            </p>

            {/* Mission */}
            <div className="mb-12">
              <h2 
                className="text-white mb-4"
                style={{
                  fontFamily: '"SF Pro Display", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '18px',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  color: '#00A86B'
                }}
              >
                {t.about.mission.title}
              </h2>
              <p 
                className="text-white/70"
                style={{
                  fontFamily: '"SF Pro Display", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '14px',
                  lineHeight: '1.7',
                  letterSpacing: '0.01em'
                }}
              >
                {t.about.mission.description}
              </p>
            </div>

            {/* Divider */}
            <div 
              className="w-full h-px mb-12"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)'
              }}
            ></div>

            {/* Legal Compliance */}
            <div className="mb-12">
              <h2 
                className="text-white mb-6"
                style={{
                  fontFamily: '"SF Pro Display", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '18px',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  color: '#00A86B'
                }}
              >
                {t.about.compliance.title}
              </h2>
              <div className="space-y-4">
                {t.about.compliance.items.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div 
                      className="w-1.5 h-1.5 rounded-full mt-2.5 shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, #00A86B 0%, #FFD700 100%)'
                      }}
                    ></div>
                    <p 
                      className="text-white/70"
                      style={{
                        fontFamily: '"SF Pro Display", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '13px',
                        lineHeight: '1.6',
                        letterSpacing: '0.01em'
                      }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div 
              className="w-full h-px mb-12"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)'
              }}
            ></div>

            {/* Values */}
            <div>
              <h2 
                className="text-white mb-6"
                style={{
                  fontFamily: '"SF Pro Display", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '18px',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  color: '#00A86B'
                }}
              >
                {t.about.values.title}
              </h2>
              <div className="space-y-4">
                {t.about.values.items.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div 
                      className="w-1.5 h-1.5 rounded-full mt-2.5 shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, #00A86B 0%, #FFD700 100%)'
                      }}
                    ></div>
                    <p 
                      className="text-white/70"
                      style={{
                        fontFamily: '"SF Pro Display", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '13px',
                        lineHeight: '1.6',
                        letterSpacing: '0.01em'
                      }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
