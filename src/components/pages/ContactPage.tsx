import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { getTranslations } from '../../lib/i18n';

/**
 * Props for the ContactPage component.
 */
interface ContactPageProps {
  /** The current language code ('es' or 'en'). */
  language: 'es' | 'en';
}

/**
 * ContactPage Component.
 * Provides a contact form for users to send messages to Rodar.
 * Includes localized inputs, basic validation, and integration with the /api/contact endpoint.
 * 
 * @param props - Component properties including the active language.
 * @returns A scrollable page with a message form and localized contact information.
 */
export function ContactPage({ language }: ContactPageProps) {
  /** 
   * Local form state for name, email, and message.
   */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  /** Tracks loading state during message submission. */
  const [isSubmitting, setIsSubmitting] = useState(false);
  /** Tracks if the message was successfully sent. */
  const [isSubmitted, setIsSubmitted] = useState(false);
  /** Stores any error messages during the submission process. */
  const [error, setError] = useState<string | null>(null);
  
  /** Localized translation helper. */
  const t = getTranslations(language);

  /**
   * Handles the contact form submission.
   * Sends the form data to the /api/contact serverless function.
   * 
   * @param e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    // Validation
    const errors: string[] = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedName) errors.push(t.contact.form.errors.nameRequired);
    if (!emailRegex.test(trimmedEmail)) errors.push(t.contact.form.errors.emailInvalid);
    if (!trimmedMessage) errors.push(t.contact.form.errors.messageRequired);
    if (trimmedMessage.length > 5000) errors.push(t.contact.form.errors.messageTooLong);

    if (errors.length > 0) {
      setError(errors[0]); // Show first error
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
        }),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to send message';
        try {
          const text = await response.text();
          try {
            const result = JSON.parse(text);
          const errorData = result.error || result.message;
          if (typeof errorData === 'object') {
            errorMessage = errorData.message || JSON.stringify(errorData);
          } else {
            errorMessage = errorData || errorMessage;
          }
          } catch (e) {
            errorMessage = text || errorMessage;
          }
        } catch (e) {
          // ignore
        }
        throw new Error(errorMessage);
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Submission Error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Updates specific fields in the local form state.
   * 
   * @param field - The field name to update.
   * @param value - The new value for the field.
   */
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
              className="text-white mb-4"
              style={{
                fontFamily: '"SF Pro Display", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '32px',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: '1.2'
              }}
            >
              {t.contact.title}
            </h1>

            <p 
              className="text-white/70 mb-12"
              style={{
                fontFamily: '"SF Pro Display", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '14px',
                lineHeight: '1.6'
              }}
            >
              {t.contact.subtitle}
            </p>

            {!isSubmitted ? (
              <>
                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-5 mb-12">
                  
                  {/* Name Input - Pill Style */}
                  <div>
                    <Input
                      type="text"
                      placeholder={t.contact.form.name}
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full h-14 px-6 text-white border-0 placeholder:text-white/40"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '100px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        fontSize: '15px'
                      }}
                      required
                    />
                  </div>

                  {/* Email Input - Pill Style */}
                  <div>
                    <Input
                      type="email"
                      placeholder={t.contact.form.email}
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full h-14 px-6 text-white border-0 placeholder:text-white/40"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '100px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        fontSize: '15px'
                      }}
                      required
                    />
                  </div>

                  {/* Message Textarea - Pill Style */}
                  <div>
                    <Textarea
                      placeholder={t.contact.form.messagePlaceholder}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="w-full px-6 py-4 text-white border-0 placeholder:text-white/40 min-h-[140px] resize-none"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '24px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        fontSize: '15px'
                      }}
                      required
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <p className="text-red-400 text-sm pl-2">{error}</p>
                  )}

                  {/* Submit Button - Gold Gradient Pill */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 font-bold text-black hover:scale-[1.02] transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                      borderRadius: '100px',
                      fontSize: '13px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      boxShadow: '0 4px 24px rgba(255, 215, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                    }}
                  >
                    {isSubmitting ? '...' : t.contact.form.submit}
                  </Button>
                </form>

                {/* Divider */}
                <div 
                  className="w-full h-px mb-12"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)'
                  }}
                ></div>

                {/* Contact Information */}
                <div>
                  <h3 
                    className="text-white mb-6"
                    style={{
                      fontFamily: '"SF Pro Display", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '20px',
                      fontWeight: 600,
                      letterSpacing: '0.01em',
                      color: '#00A86B'
                    }}
                  >
                    {t.contact.info.title}
                  </h3>
                  <div className="space-y-3">
                    <p 
                      className="text-white/70"
                      style={{
                        fontFamily: '"SF Pro Display", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '15px'
                      }}
                    >
                      📧 {t.contact.info.email}
                    </p>
                    <p 
                      className="text-white/70"
                      style={{
                        fontFamily: '"SF Pro Display", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '15px'
                      }}
                    >
                      📞 {t.contact.info.phone}
                    </p>
                    <p 
                      className="text-white/70"
                      style={{
                        fontFamily: '"SF Pro Display", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '15px'
                      }}
                    >
                      📍 {t.contact.info.location}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              /* Success State */
              <div className="text-center py-12">
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{
                    background: '#00A86B',
                    boxShadow: '0 8px 24px rgba(0, 168, 107, 0.5)'
                  }}
                >
                  <span className="text-white text-3xl">✓</span>
                </div>
                <h3 
                  className="text-white mb-3"
                  style={{
                    fontFamily: '"SF Pro Display", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '28px',
                    fontWeight: 600
                  }}
                >
                  {t.contact.success.title}
                </h3>
                <p 
                  className="text-white/70"
                  style={{
                    fontFamily: '"SF Pro Display", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '16px'
                  }}
                >
                  {t.contact.success.description}
                </p>
              </div>
            )}

          </motion.div>
        </div>
      </div>
    </div>
  );
}
