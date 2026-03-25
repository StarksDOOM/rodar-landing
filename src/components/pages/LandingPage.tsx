import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { X } from 'lucide-react';

interface LandingPageProps {
  language: 'es' | 'en';
}

/**
 * LandingPage Component
 * 
 * A pixel-perfect restoration of the Rodar.do landing page based on the user's master design snippet.
 * This component features:
 * - A high-performance background image with a dynamic atmospheric overlay.
 * - Framer Motion animations for fluid HERO messaging and waitlist transitions.
 * - A dual-layout waitlist form:
 *   - Desktop: A compact, single-row pill layout with glassmorphic styling.
 *   - Mobile: A responsive, collapsible form that expands into a full-width card.
 * - Technical Fixes:
 *   - Forced white placeholders using high-specificity CSS to override browser/component defaults.
 *   - Refined mobile proportions (smaller inputs/buttons) for a premium handheld experience.
 *   - Robust Mailchimp integration with /api/subscribe.
 * 
 * @param {LandingPageProps} props - Component props containing the current language ('es' | 'en').
 * @returns {JSX.Element} The rendered landing page.
 */
export function LandingPage({ language }: LandingPageProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '', // Honeypot field - bots will fill this
    dob: '',
    email: ''
  });
  const [formMountedAt] = useState(Date.now()); // Capture when the form was initially rendered
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobileFormExpanded, setIsMobileFormExpanded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const text = {
    es: {
      headline: 'Muévete a tu ritmo.',
      subheadline: 'La plataforma de movilidad compartida de la República Dominicana.',
      waitlistBadge: 'LISTA DE ESPERA RODAR',
      firstNamePlaceholder: 'Nombre',
      lastNamePlaceholder: 'Apellido',
      dobPlaceholder: 'DD/MM/YYYY',
      emailPlaceholder: 'Tu mejor correo...',
      cta: 'Solicitar Acceso',
      thankYou: '¡Listo! Te contactaremos pronto.',
      error: 'Error al unirse a la lista de espera. Por favor, inténtalo de nuevo.',
      copyright: '© 2026 FULCASTLE HOLDINGS, INC.',
      support: 'SUPPORT@RODAR.DO',
      terms: 'TÉRMINOS DE SERVICIO',
      privacy: 'POLÍTICA DE PRIVACIDAD',
      validation: {
        required: 'Por favor, completa este campo',
        tooYoung: 'Debes tener 18 años o más para unirte a la lista de espera'
      }
    },
    en: {
      headline: 'Move at your own pace.',
      subheadline: 'The shared mobility platform of the Dominican Republic.',
      waitlistBadge: 'RODAR WAITLIST',
      firstNamePlaceholder: 'First Name',
      lastNamePlaceholder: 'Last Name',
      dobPlaceholder: 'MM/DD/YYYY',
      emailPlaceholder: 'Your best email...',
      cta: 'Request Access',
      thankYou: 'Done! We will contact you soon.',
      error: 'Error joining waitlist. Please try again.',
      copyright: '© 2026 FULCASTLE HOLDINGS, INC.',
      support: 'SUPPORT@RODAR.DO',
      terms: 'TERMS OF SERVICE',
      privacy: 'PRIVACY POLICY',
      validation: {
        required: 'Please fill out this field',
        tooYoung: 'You must be 18 or older to join the waitlist'
      }
    }
  };

  /**
   * Parses localized date strings (DD/MM/YYYY for ES, MM/DD/YYYY for EN) into ISO YYYY-MM-DD.
   * If the input is already ISO (browser native) or invalid, returns as-is.
   */
  const parseLocalizedDate = (dobString: string) => {
    if (!dobString || dobString.includes('-')) return dobString; // Already ISO or empty

    const parts = dobString.split('/');
    if (parts.length !== 3) return dobString;

    const [p1, p2, p3] = parts;
    if (language === 'es') {
      // ES Format: DD/MM/YYYY -> Standardize to YYYY-MM-DD for API/Validation
      const day = p1.padStart(2, '0');
      const month = p2.padStart(2, '0');
      return `${p3}-${month}-${day}`;
    } else {
      // EN Format: MM/DD/YYYY -> Standardize to YYYY-MM-DD for API/Validation
      const month = p1.padStart(2, '0');
      const day = p2.padStart(2, '0');
      return `${p3}-${month}-${day}`;
    }
  };

  /**
   * Validates if the user is 18 years or older.
   * Handles both localized manual entry and native browser date values.
   */
  const validateAge = (dobString: string) => {
    if (!dobString) return true;
    
    // Convert to ISO format (YYYY-MM-DD) to ensure consistent Date parsing across regions
    const isoDate = parseLocalizedDate(dobString);
    const birthDate = new Date(isoDate);
    
    // If date is invalid after parsing, let HTML5 native validation fallback
    if (isNaN(birthDate.getTime())) return true;

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    
    // Adjust age if birthday hasn't occurred yet this year
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName && formData.dob && formData.email) {
      if (!validateAge(formData.dob)) {
        setError(text[language].validation.tooYoung);
        return;
      }

      setIsSubmitting(true);
      setError(null);

      try {
        // Standardize the DOB to YYYY-MM-DD before sending to the backend.
        // The backend expects this format to correctly calculate the Mailchimp BIRTHDAY merge field (MM/DD).
        const standardizedDob = parseLocalizedDate(formData.dob);
        
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            dob: standardizedDob,
            language,
            ms: Date.now() - formMountedAt
          }),
        });

        if (response.ok) {
          setIsSubmitted(true);
        } else {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || text[language].error);
        }
      } catch (err: any) {
        console.error('Waitlist Error:', err);
        setError(err.message || text[language].error);
      } finally {
        setIsSubmitting(false);
      }
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
      {/* High-Specificity White Color Enforcement */}
      <style dangerouslySetInnerHTML={{ __html: `
        input.white-placeholder::placeholder {
          color: white !important;
          opacity: 1 !important;
          -webkit-text-fill-color: white !important;
        }
        input.white-placeholder {
          color: white !important;
          -webkit-text-fill-color: white !important;
        }
        ::placeholder {
          color: white !important;
          opacity: 1 !important;
        }
      ` }} />

      {/* Atmospheric Overlay: 75% Black from bottom to 0% at horizon */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0) 50%)'
        }}
      ></div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        
        {/* The Hero Messaging - Upper-Middle, Centered */}
        <motion.div 
          className="flex-1 flex items-center justify-center"
          animate={{ 
            marginTop: isMobileFormExpanded ? '-320px' : '-60px'
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
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
        </motion.div>

        {/* The "Rodar Waitlist" Pill - Substantially adjusted for mobile height */}
        <div className="absolute left-0 right-0 mx-auto w-full max-w-[900px] px-2" style={{ bottom: 'clamp(85px, 13vh, 120px)' }}>
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            {!isSubmitted ? (
              <form onSubmit={handleWaitlistSubmit} className="w-full sm:max-w-fit mx-auto">
                {/* Mobile Layout - Collapsible */}
                <div className="flex sm:hidden flex-col w-full mx-auto px-1">
                  <AnimatePresence mode="wait">
                    {!isMobileFormExpanded ? (
                      // Collapsed - Just the CTA Button
                      <motion.div
                        key="collapsed"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Button
                          type="button"
                          onClick={() => setIsMobileFormExpanded(true)}
                          className="w-full h-12 font-bold text-black hover:scale-[1.02] transition-transform duration-200"
                          style={{
                            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                            borderRadius: '100px',
                            fontSize: '11px',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            boxShadow: '0 12px 48px rgba(0, 0, 0, 0.6), 0 4px 24px rgba(255, 215, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                          }}
                        >
                          {text[language].cta}
                        </Button>
                      </motion.div>
                    ) : (
                      // Expanded - Full Form
                      <motion.div
                        key="expanded"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col gap-2 p-2 relative w-full"
                        style={{
                          background: 'rgba(255, 255, 255, 0.14)',
                          backdropFilter: 'blur(34px)',
                          WebkitBackdropFilter: 'blur(34px)',
                          borderRadius: '28px',
                          border: '1px solid rgba(255, 255, 255, 0.25)',
                          boxShadow: '0 12px 48px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        {/* Close Button - Reduced size */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsMobileFormExpanded(false);
                          }}
                          className="absolute top-2.5 right-2.5 w-7 h-7 flex items-center justify-center rounded-full bg-black/15 hover:bg-black/30 transition-colors z-[100] cursor-pointer ring-1 ring-white/10"
                        >
                          <X className="w-3.5 h-3.5 text-white pointer-events-none" />
                        </button>

                        {/* Badge */}
                        <div className="w-full px-5 py-1.5 text-center">
                          <span 
                            className="font-bold"
                            style={{
                              color: '#00A86B',
                              fontSize: '10px',
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase'
                            }}
                          >
                            {text[language].waitlistBadge}
                          </span>
                        </div>

                        {/* Middle Name (Honeypot) - Hidden from humans */}
                        <div className="opacity-0 absolute pointer-events-none h-0 w-0 overflow-hidden">
                          <Input
                            type="text"
                            name="middleName"
                            autoComplete="off"
                            tabIndex={-1}
                            value={formData.middleName}
                            onChange={(e) => handleInputChange('middleName', e.target.value)}
                          />
                        </div>

                        {/* First Name */}
                        <Input
                          type="text"
                          placeholder={text[language].firstNamePlaceholder}
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="white-placeholder w-full h-10 border-0 !text-white focus-visible:ring-0 focus-visible:ring-offset-0 px-5"
                          style={{
                            background: 'rgba(255, 255, 255, 0.15)',
                            borderRadius: '20px',
                            fontSize: '13px',
                            fontWeight: 400
                          }}
                          required
                          onInvalid={(e: any) => e.target.setCustomValidity(text[language].validation.required)}
                          onInput={(e: any) => e.target.setCustomValidity('')}
                        />

                        {/* Last Name */}
                        <Input
                          type="text"
                          placeholder={text[language].lastNamePlaceholder}
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="white-placeholder w-full h-10 border-0 !text-white focus-visible:ring-0 focus-visible:ring-offset-0 px-5"
                          style={{
                            background: 'rgba(255, 255, 255, 0.15)',
                            borderRadius: '20px',
                            fontSize: '13px',
                            fontWeight: 400
                          }}
                          required
                          onInvalid={(e: any) => e.target.setCustomValidity(text[language].validation.required)}
                          onInput={(e: any) => e.target.setCustomValidity('')}
                        />

                        <Input
                          type={formData.dob ? "date" : "text"}
                          placeholder={text[language].dobPlaceholder}
                          value={formData.dob}
                          onFocus={(e) => (e.target.type = "date")}
                          onBlur={(e) => {
                            if (!e.target.value) {
                              e.target.type = "text";
                            }
                          }}
                          onChange={(e) => handleInputChange('dob', e.target.value)}
                          className="white-placeholder w-full h-10 border-0 !text-white focus-visible:ring-0 focus-visible:ring-offset-0 pl-4 pr-1 [&::-webkit-datetime-edit]:text-white [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:p-0 [&::-webkit-calendar-picker-indicator]:m-0 [&::-webkit-calendar-picker-indicator]:w-4 [&::-webkit-calendar-picker-indicator]:h-4"
                          style={{
                            background: 'rgba(255, 255, 255, 0.15)',
                            borderRadius: '20px',
                            fontSize: '13px',
                            fontWeight: 400,
                            colorScheme: 'dark',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                          required
                          onInvalid={(e: any) => {
                            if (e.target.value && !validateAge(e.target.value)) {
                              e.target.setCustomValidity(text[language].validation.tooYoung);
                            } else {
                              e.target.setCustomValidity(text[language].validation.required);
                            }
                          }}
                          onInput={(e: any) => {
                            e.target.setCustomValidity('');
                            if (e.target.value && !validateAge(e.target.value)) {
                              e.target.setCustomValidity(text[language].validation.tooYoung);
                            }
                          }}
                        />

                        {/* Email */}
                        <Input
                          type="email"
                          placeholder={text[language].emailPlaceholder}
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="white-placeholder w-full h-10 border-0 !text-white focus-visible:ring-0 focus-visible:ring-offset-0 px-5"
                          style={{
                            background: 'rgba(255, 255, 255, 0.15)',
                            borderRadius: '20px',
                            fontSize: '13px',
                            fontWeight: 400
                          }}
                          required
                          onInvalid={(e: any) => e.target.setCustomValidity(text[language].validation.required)}
                          onInput={(e: any) => e.target.setCustomValidity('')}
                        />

                        {/* Button */}
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-12 font-bold text-black hover:scale-[1.02] transition-transform duration-200"
                          style={{
                            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                            borderRadius: '20px',
                            fontSize: '11px',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            boxShadow: '0 4px 24px rgba(255, 215, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                          }}
                        >
                          {isSubmitting ? '...' : text[language].cta}
                        </Button>

                        {/* Error Message */}
                        {error && (
                          <p className="mt-1 text-center text-red-400 text-[10px] font-medium px-2">
                            {error}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Desktop Layout - Single Horizontal Pill */}
                <div 
                  className="hidden sm:flex items-center gap-2 px-2 py-2"
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
                    className="px-3 py-2.5 shrink-0"
                    style={{
                      background: '#00A86B',
                      borderRadius: '100px',
                      boxShadow: '0 4px 16px rgba(0, 168, 107, 0.7)'
                    }}
                  >
                    <span 
                      className="text-white font-bold whitespace-nowrap"
                      style={{
                        fontSize: '9px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase'
                      }}
                    >
                      {text[language].waitlistBadge}
                    </span>
                  </div>

                  {/* Middle Name (Honeypot) - Hidden from humans */}
                  <div className="opacity-0 absolute pointer-events-none h-0 w-0 overflow-hidden">
                    <Input
                      type="text"
                      name="middleName"
                      autoComplete="off"
                      tabIndex={-1}
                      value={formData.middleName}
                      onChange={(e) => handleInputChange('middleName', e.target.value)}
                    />
                  </div>

                  {/* First Name */}
                  <Input
                    type="text"
                    placeholder={text[language].firstNamePlaceholder}
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="white-placeholder w-[110px] h-auto py-2.5 border-0 bg-transparent !text-white focus-visible:ring-0 focus-visible:ring-offset-0 px-2"
                    style={{
                      fontSize: '13px',
                      fontWeight: 400
                    }}
                    required
                    onInvalid={(e: any) => e.target.setCustomValidity(text[language].validation.required)}
                    onInput={(e: any) => e.target.setCustomValidity('')}
                  />

                  {/* Last Name */}
                  <Input
                    type="text"
                    placeholder={text[language].lastNamePlaceholder}
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="white-placeholder w-[110px] h-auto py-2.5 border-0 bg-transparent !text-white focus-visible:ring-0 focus-visible:ring-offset-0 px-2"
                    style={{
                      fontSize: '13px',
                      fontWeight: 400
                    }}
                    required
                    onInvalid={(e: any) => e.target.setCustomValidity(text[language].validation.required)}
                    onInput={(e: any) => e.target.setCustomValidity('')}
                  />

                  {/* Date of Birth */}
                  <Input
                    type={formData.dob ? "date" : "text"}
                    placeholder={text[language].dobPlaceholder}
                    value={formData.dob}
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => {
                      if (!e.target.value) {
                        e.target.type = "text";
                      }
                    }}
                    onChange={(e) => handleInputChange('dob', e.target.value)}
                    className="white-placeholder w-[130px] h-auto py-2.5 border-0 bg-transparent !text-white focus-visible:ring-0 focus-visible:ring-offset-0 px-2 [&::-webkit-datetime-edit]:text-white [&::-webkit-calendar-picker-indicator]:invert"
                    style={{
                      fontSize: '12px',
                      fontWeight: 400,
                      colorScheme: 'dark'
                    }}
                    required
                    onInvalid={(e: any) => {
                      if (e.target.value && !validateAge(e.target.value)) {
                        e.target.setCustomValidity(text[language].validation.tooYoung);
                      } else {
                        e.target.setCustomValidity(text[language].validation.required);
                      }
                    }}
                    onInput={(e: any) => {
                      e.target.setCustomValidity('');
                      if (e.target.value && !validateAge(e.target.value)) {
                        e.target.setCustomValidity(text[language].validation.tooYoung);
                      }
                    }}
                  />

                  {/* Email */}
                  <Input
                    type="email"
                    placeholder={text[language].emailPlaceholder}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="white-placeholder w-[180px] h-auto py-2.5 border-0 bg-transparent !text-white focus-visible:ring-0 focus-visible:ring-offset-0 px-2"
                    style={{
                      fontSize: '13px',
                      fontWeight: 400
                    }}
                    required
                    onInvalid={(e: any) => e.target.setCustomValidity(text[language].validation.required)}
                    onInput={(e: any) => e.target.setCustomValidity('')}
                  />

                  {/* Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-11 px-5 shrink-0 font-bold text-black hover:scale-105 transition-transform duration-200"
                    style={{
                      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                      borderRadius: '100px',
                      fontSize: '10px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      boxShadow: '0 4px 24px rgba(255, 215, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                    }}
                  >
                    {isSubmitting ? '...' : text[language].cta}
                  </Button>
                </div>
                
                {/* Desktop Error Message */}
                {error && (
                  <p className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-red-400 text-sm font-medium w-full text-center">
                    {error}
                  </p>
                )}
              </form>
            ) : (
              <div 
                className="flex items-center justify-center gap-3 px-6 py-4 h-16"
                style={{
                  background: 'rgba(255, 255, 255, 0.14)',
                  backdropFilter: 'blur(40px)',
                  WebkitBackdropFilter: 'blur(40px)',
                  borderRadius: '100px',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  boxShadow: '0 12px 48px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)'
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
