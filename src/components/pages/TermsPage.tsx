import { motion } from 'motion/react';

/**
 * Props for the TermsPage component.
 */
interface TermsPageProps {
  /** The current language code ('es' or 'en'). */
  language: 'es' | 'en';
}

/**
 * TermsPage Component.
 * Displays the Terms of Service for Rodar.do in a cinematic, glassmorphic design.
 * Features a fixed background with a scrollable content slab and bilingual support.
 * 
 * @param props - Component properties including the active language.
 * @returns A full-screen scrollable page with the Terms of Service content.
 */
export function TermsPage({ language }: TermsPageProps) {
  /**
   * Localized legal text for the Terms of Service.
   */
  const text = {
    es: {
      title: 'Términos de Servicio',
      lastUpdated: 'Última actualización: 20 de marzo de 2026',
      sections: [
        {
          number: '1.0',
          title: 'INTRODUCCIÓN',
          content: [
            'Rodar.do es una plataforma de movilidad compartida operada por FulCastle Holdings, Inc., una corporación constituida en Delaware, Estados Unidos, con domicilio registrado en 8 The Green, Ste B, Dover, DE 19901.',
            'Al acceder a este sitio web y registrarse en nuestra lista de espera, usted acepta estar sujeto a estos Términos de Servicio. Si no está de acuerdo con estos términos, no utilice esta plataforma.'
          ]
        },
        {
          number: '2.0',
          title: 'TÉRMINOS DE LA LISTA DE ESPERA',
          content: [
            'La inscripción en la lista de espera de Rodar.do es una expresión de interés en acceso anticipado a la plataforma cuando se lance oficialmente.',
            'La inscripción NO constituye: (a) una garantía de alquiler de vehículo, (b) una promesa de listado de vehículo, (c) un contrato financiero vinculante.',
            'FulCastle Holdings, Inc. se reserva el derecho de invitar usuarios de la lista de espera según criterios internos de verificación, disponibilidad regional y cumplimiento regulatorio.'
          ]
        },
        {
          number: '3.0',
          title: 'ELEGIBILIDAD DEL USUARIO',
          content: [
            'Para registrarse en la lista de espera, usted debe: (a) tener al menos 18 años de edad, (b) tener capacidad legal para celebrar contratos vinculantes.',
            'Para alquilar un vehículo cuando la plataforma esté operativa, deberá tener la edad legal para conducir en la República Dominicana (18 años) y poseer una licencia de conducir válida.',
            'Nos reservamos el derecho de verificar la identidad mediante procesos KYC (Know Your Customer) antes de otorgar acceso completo a la plataforma.'
          ]
        },
        {
          number: '4.0',
          title: 'LEY APLICABLE Y JURISDICCIÓN',
          content: [
            'Estos Términos de Servicio se rigen por las leyes del Estado de Delaware, Estados Unidos.',
            'Las operaciones de Rodar.do en República Dominicana cumplirán con la Ley 63-17 de Movilidad, Transporte Terrestre, Tránsito y Seguridad Vial de la República Dominicana.',
            'Cualquier disputa derivada de estos términos se someterá a la jurisdicción exclusiva de los tribunales del Estado de Delaware.'
          ]
        },
        {
          number: '5.0',
          title: 'PROPIEDAD INTELECTUAL',
          content: [
            'Todos los derechos de marca, diseño visual, arquitectura de software y contenido de Rodar.do son propiedad exclusiva de FulCastle Holdings, Inc.',
            'El nombre "Rodar", el sistema de diseño "Rodar Horizon" y los elementos visuales inspirados en Samaná están protegidos por derechos de autor y leyes de marcas registradas.',
            'Queda prohibido el uso no autorizado de cualquier elemento de marca sin consentimiento previo por escrito de FulCastle Holdings, Inc.'
          ]
        },
        {
          number: '6.0',
          title: 'LIMITACIÓN DE RESPONSABILIDAD',
          content: [
            'FulCastle Holdings, Inc. no será responsable de: (a) daños indirectos, incidentales o consecuentes derivados del uso de la plataforma, (b) interrupciones del servicio durante la fase de desarrollo.',
            'El acceso a la lista de espera se proporciona "tal cual" sin garantías de ningún tipo, ya sean expresas o implícitas.'
          ]
        },
        {
          number: '7.0',
          title: 'MODIFICACIONES',
          content: [
            'FulCastle Holdings, Inc. se reserva el derecho de modificar estos Términos de Servicio en cualquier momento.',
            'Las modificaciones entrarán en vigor inmediatamente después de su publicación en rodar.do. El uso continuo del sitio constituye aceptación de los términos modificados.'
          ]
        },
        {
          number: '8.0',
          title: 'CONTACTO',
          content: [
            'Para preguntas sobre estos Términos de Servicio, contacte a: support@rodar.do'
          ]
        }
      ]
    },
    en: {
      title: 'Terms of Service',
      lastUpdated: 'Last updated: March 20, 2026',
      sections: [
        {
          number: '1.0',
          title: 'INTRODUCTION',
          content: [
            'Rodar.do is a car-sharing mobility platform operated by FulCastle Holdings, Inc., a corporation incorporated in Delaware, United States, with registered address at 8 The Green, Ste B, Dover, DE 19901.',
            'By accessing this website and registering for our waitlist, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use this platform.'
          ]
        },
        {
          number: '2.0',
          title: 'WAITLIST TERMS',
          content: [
            'Registration on the Rodar.do waitlist is an expression of interest for early access to the platform when it officially launches.',
            'Registration does NOT constitute: (a) a guarantee of vehicle rental, (b) a promise of vehicle listing, (c) a binding financial contract.',
            'FulCastle Holdings, Inc. reserves the right to invite users from the waitlist based on internal verification criteria, regional availability, and regulatory compliance.'
          ]
        },
        {
          number: '3.0',
          title: 'USER ELIGIBILITY',
          content: [
            'To register for the waitlist, you must: (a) be at least 18 years of age, (b) have legal capacity to enter into binding contracts.',
            'To rent a vehicle when the platform is operational, you must be of legal driving age in the Dominican Republic (18 years) and possess a valid driver\'s license.',
            'We reserve the right to verify identity through KYC (Know Your Customer) processes before granting full platform access.'
          ]
        },
        {
          number: '4.0',
          title: 'GOVERNING LAW AND JURISDICTION',
          content: [
            'These Terms of Service are governed by the laws of the State of Delaware, United States.',
            'Rodar.do operations in the Dominican Republic will comply with Law 63-17 for Mobility, Land Transport, Traffic and Road Safety of the Dominican Republic.',
            'Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of the State of Delaware.'
          ]
        },
        {
          number: '5.0',
          title: 'INTELLECTUAL PROPERTY',
          content: [
            'All trademark rights, visual design, software architecture, and content of Rodar.do are the exclusive property of FulCastle Holdings, Inc.',
            'The "Rodar" name, "Rodar Horizon" design system, and Samaná-inspired visual elements are protected by copyright and trademark laws.',
            'Unauthorized use of any brand elements without prior written consent from FulCastle Holdings, Inc. is prohibited.'
          ]
        },
        {
          number: '6.0',
          title: 'LIMITATION OF LIABILITY',
          content: [
            'FulCastle Holdings, Inc. shall not be liable for: (a) indirect, incidental, or consequential damages arising from use of the platform, (b) service interruptions during the development phase.',
            'Waitlist access is provided "as is" without warranties of any kind, whether express or implied.'
          ]
        },
        {
          number: '7.0',
          title: 'MODIFICATIONS',
          content: [
            'FulCastle Holdings, Inc. reserves the right to modify these Terms of Service at any time.',
            'Modifications will take effect immediately upon posting to rodar.do. Continued use of the site constitutes acceptance of the modified terms.'
          ]
        },
        {
          number: '8.0',
          title: 'CONTACT',
          content: [
            'For questions regarding these Terms of Service, contact: support@rodar.do'
          ]
        }
      ]
    }
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
      <div className="relative z-10 pt-24 md:pt-32 pb-32 md:pb-40 px-3">
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
              className="text-white mb-2"
              style={{
                fontFamily: '"SF Pro Display", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '32px',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: '1.2'
              }}
            >
              {text[language].title}
            </h1>

            {/* Last Updated */}
            <p 
              className="text-white/50 mb-12"
              style={{
                fontFamily: '"SF Mono", "SF Pro Text", "Menlo", "Consolas", monospace',
                fontSize: '11px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}
            >
              {text[language].lastUpdated}
            </p>

            {/* Sections */}
            <div className="space-y-10">
              {text[language].sections.map((section, index) => (
                <div key={index}>
                  {/* Section Header */}
                  <h2 
                    className="mb-4"
                    style={{
                      fontFamily: '"SF Mono", "SF Pro Text", "Menlo", "Consolas", monospace',
                      fontSize: '16px',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      color: '#00A86B',
                      textTransform: 'uppercase'
                    }}
                  >
                    {section.number} {section.title}
                  </h2>

                  {/* Section Content */}
                  <div className="space-y-4">
                    {section.content.map((paragraph, pIndex) => (
                      <p 
                        key={pIndex}
                        className="text-white/70"
                        style={{
                          fontFamily: '"SF Pro Display", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '14px',
                          lineHeight: '1.7',
                          letterSpacing: '0.01em'
                        }}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Divider (except last section) */}
                  {index < text[language].sections.length - 1 && (
                    <div 
                      className="w-full h-px mt-10"
                      style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)'
                      }}
                    ></div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer Notice */}
            <div 
              className="mt-12 pt-8"
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <p 
                className="text-white/50 text-center"
                style={{
                  fontFamily: '"SF Mono", "SF Pro Text", "Menlo", "Consolas", monospace',
                  fontSize: '10px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  lineHeight: '1.6'
                }}
              >
                FulCastle Holdings, Inc. © 2026<br />
                8 The Green, Ste B, Dover, DE 19901
              </p>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
