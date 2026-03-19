import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface LandingPageProps {
  language: 'es' | 'en';
}

export function LandingPage({ language }: LandingPageProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const text = {
    es: {
      headline: 'Muévete a tu ritmo.',
      subheadline: 'La plataforma de movilidad compartida de la República Dominicana.',
      waitlistBadge: 'LISTA DE ESPERA RODAR',
      emailPlaceholder: 'Tu correo electrónico...',
      cta: 'UNIRME',
      thankYou: '¡Listo! Te contactaremos pronto.'
    },
    en: {
      headline: 'Move at your own pace.',
      subheadline: 'The Dominican Republic\'s car-sharing mobility platform.',
      waitlistBadge: 'RODAR WAITLIST',
      emailPlaceholder: 'Your email address...',
      cta: 'JOIN',
      thankYou: 'Done! We\'ll contact you soon.'
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      console.log('Waitlist submission:', { email });
    }
  };

  return (
    <div 
      className="fixed inset-0 overflow-hidden"
      style={{
        backgroundImage: 'url(https://dominicanexpert.com/wp-content/uploads/2017/07/dominican_republic_travel_203_boulevard_turistico_de_atlantico_samana.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#1a1a1a'
      }}
    >
      {/* Atmospheric Overlay: 75% Black from bottom to 0% at horizon */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0) 50%)'
        }}
      ></div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-3">
        
        {/* The Hero Messaging - Upper-Middle, Centered */}
        <div className="flex-1 flex items-center justify-center" style={{ marginTop: '-60px' }}>
          <div className="text-center max-w-5xl px-4">
            <motion.h1 
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-white mb-4"
              style={{
                fontFamily: '"SF Pro Display", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: 'clamp(28px, 10vw, 80px)',
                fontWeight: 700,
                lineHeight: '1.1',
                textShadow: '0 4px 40px rgba(0, 0, 0, 0.8)',
                letterSpacing: '-0.02em'
              }}
            >
              {text[language].headline}
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-white"
              style={{
                fontFamily: '"SF Pro Display", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: 'clamp(14px, 4vw, 32px)',
                fontWeight: 400,
                opacity: 0.7,
                textShadow: '0 2px 20px rgba(0, 0, 0, 0.6)',
                letterSpacing: '-0.01em'
              }}
            >
              {text[language].subheadline}
            </motion.p>
          </div>
        </div>

        {/* The "Rodar Waitlist" Pill - 120px from bottom */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-[600px] px-4" style={{ bottom: 'clamp(80px, 12vh, 120px)' }}>
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                {/* Mobile Layout */}
                <div 
                  className="flex sm:hidden flex-col gap-2.5 p-2.5"
                  style={{
                    background: 'rgba(255, 255, 255, 0.14)',
                    backdropFilter: 'blur(40px)',
                    WebkitBackdropFilter: 'blur(40px)',
                    borderRadius: '32px',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    boxShadow: '0 12px 48px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {/* Badge - Just text, no pill */}
                  <div className="w-full px-5 py-2 text-center">
                    <span 
                      className="font-bold"
                      style={{
                        color: '#00A86B',
                        fontSize: '11px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase'
                      }}
                    >
                      {text[language].waitlistBadge}
                    </span>
                  </div>

                  {/* Input - with background */}
                  <Input
                    type="email"
                    placeholder={text[language].emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 border-0 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0 px-5 text-center"
                    style={{
                      background: 'rgba(255, 255, 255, 0.15)',
                      borderRadius: '24px',
                      fontSize: '15px',
                      fontWeight: 400
                    }}
                    required
                  />

                  {/* Button */}
                  <Button
                    type="submit"
                    className="w-full h-14 font-bold text-black hover:scale-[1.02] transition-transform duration-200"
                    style={{
                      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                      borderRadius: '24px',
                      fontSize: '12px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      boxShadow: '0 4px 24px rgba(255, 215, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                    }}
                  >
                    {text[language].cta}
                  </Button>
                </div>

                {/* Desktop Layout */}
                <div 
                  className="hidden sm:flex items-center gap-2.5 px-2 py-2"
                  style={{
                    background: 'rgba(255, 255, 255, 0.14)',
                    backdropFilter: 'blur(40px)',
                    WebkitBackdropFilter: 'blur(40px)',
                    borderRadius: '100px',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    boxShadow: '0 12px 48px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {/* Badge */}
                  <div 
                    className="px-4 py-2.5 shrink-0"
                    style={{
                      background: '#00A86B',
                      borderRadius: '100px',
                      boxShadow: '0 4px 16px rgba(0, 168, 107, 0.7)'
                    }}
                  >
                    <span 
                      className="text-white font-bold"
                      style={{
                        fontSize: '11px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase'
                      }}
                    >
                      {text[language].waitlistBadge}
                    </span>
                  </div>

                  {/* Input */}
                  <Input
                    type="email"
                    placeholder={text[language].emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 h-auto border-0 bg-transparent text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0 px-4"
                    style={{
                      fontSize: '15px',
                      fontWeight: 400
                    }}
                    required
                  />

                  {/* Button */}
                  <Button
                    type="submit"
                    className="h-11 px-7 shrink-0 font-bold text-black hover:scale-105 transition-transform duration-200"
                    style={{
                      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                      borderRadius: '100px',
                      fontSize: '12px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      boxShadow: '0 4px 24px rgba(255, 215, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                    }}
                  >
                    {text[language].cta}
                  </Button>
                </div>
              </form>
            ) : (
              <div 
                className="flex items-center justify-center gap-3 px-6 py-4 h-16"
                style={{
                  background: 'rgba(255, 255, 255, 0.14)',
                  backdropFilter: 'blur(40px)',
                  borderRadius: '100px',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  boxShadow: '0 12px 48px rgba(0, 0, 0, 0.6)'
                }}
              >
                <div 
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{
                    background: '#00A86B'
                  }}
                >
                  <span className="text-white text-base font-bold">✓</span>
                </div>
                <span className="text-white font-semibold text-sm sm:text-base">{text[language].thankYou}</span>
              </div>
            )}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
