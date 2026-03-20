import { motion } from 'motion/react';

/**
 * Props for the PrivacyPage component.
 */
interface PrivacyPageProps {
  /** The current language code ('es' or 'en'). */
  language: 'es' | 'en';
}

/**
 * PrivacyPage Component.
 * Displays the Privacy Policy for Rodar.do in a cinematic, glassmorphic design.
 * Features a fixed background with a scrollable content slab and bilingual support.
 * 
 * @param props - Component properties including the active language.
 * @returns A full-screen scrollable page with the Privacy Policy content.
 */
export function PrivacyPage({ language }: PrivacyPageProps) {
  /**
   * Localized legal text for the Privacy Policy.
   */
  const text = {
    es: {
      title: 'Política de Privacidad',
      lastUpdated: 'Última actualización: 20 de marzo de 2026',
      sections: [
        {
          number: '1.0',
          title: 'INTRODUCCIÓN',
          content: [
            'FulCastle Holdings, Inc. ("Rodar.do", "nosotros", "nuestro") se compromete a proteger la privacidad de los usuarios que visitan nuestro sitio web y se registran en nuestra lista de espera.',
            'Esta Política de Privacidad describe cómo recopilamos, usamos, compartimos y protegemos su información personal de acuerdo con la Ley 172-13 de Protección de Datos Personales de la República Dominicana y las mejores prácticas de privacidad de Estados Unidos.'
          ]
        },
        {
          number: '2.0',
          title: 'DATOS QUE RECOPILAMOS',
          content: [
            'Recopilamos la siguiente información personal cuando usted interactúa con Rodar.do:',
            '• Dirección de correo electrónico — proporcionada a través del "Waitlist Pill" en la página de inicio.',
            '• Nombre completo y mensaje — proporcionados opcionalmente a través del formulario de contacto.',
            '• Datos técnicos — dirección IP, tipo de navegador, dispositivo, y datos de cookies para análisis de tráfico y optimización del sitio.',
            'NO recopilamos información de tarjetas de crédito, números de identificación gubernamental, ni datos de ubicación en tiempo real durante la fase de lista de espera.'
          ]
        },
        {
          number: '3.0',
          title: 'PROPÓSITO DEL PROCESAMIENTO DE DATOS',
          content: [
            'Utilizamos sus datos personales para los siguientes propósitos:',
            '• Notificaciones de acceso anticipado — enviarle invitaciones cuando Rodar.do lance oficialmente.',
            '• Marketing y actualizaciones — comunicarle novedades de la plataforma, mejoras de producto y ofertas promocionales mediante Mailchimp.',
            '• Desarrollo interno — análisis de interés geográfico, mejora de experiencia de usuario y planificación de infraestructura.',
            '• Cumplimiento legal — verificación KYC (Know Your Customer) para futuros usuarios activos de la plataforma de movilidad compartida.'
          ]
        },
        {
          number: '4.0',
          title: 'COMPARTIR CON TERCEROS',
          content: [
            'Compartimos sus datos con los siguientes proveedores de servicios confiables:',
            '• Mailchimp (The Rocket Science Group LLC) — procesamiento de campañas de marketing por correo electrónico y gestión de listas de espera.',
            '• Stripe, Inc. — infraestructura de verificación de identidad y procesamiento de pagos (para futuros usuarios activos de alquiler de vehículos).',
            '• Proveedores de análisis web — Google Analytics para métricas de tráfico anónimas.',
            'NO vendemos, alquilamos ni compartimos sus datos personales con terceros para fines publicitarios no autorizados.'
          ]
        },
        {
          number: '5.0',
          title: 'CUMPLIMIENTO LEGAL',
          content: [
            'Esta Política de Privacidad cumple con:',
            '• Ley 172-13 de Protección de Datos Personales de la República Dominicana — garantizando derechos de acceso, rectificación, cancelación y oposición (derechos ARCO).',
            '• Prácticas de privacidad estándar de Estados Unidos — incluyendo transparencia en el procesamiento de datos y consentimiento del usuario.',
            'Al proporcionar su correo electrónico, usted consiente el procesamiento de sus datos según lo descrito en esta política.'
          ]
        },
        {
          number: '6.0',
          title: 'RETENCIÓN DE DATOS',
          content: [
            'Retenemos sus datos personales durante el tiempo necesario para cumplir los propósitos descritos en esta política.',
            '• Datos de lista de espera — se conservarán hasta el lanzamiento oficial de la plataforma o hasta que solicite su eliminación.',
            '• Datos de contacto — se conservarán durante 2 años después de su última interacción con Rodar.do.',
            'Puede solicitar la eliminación de sus datos en cualquier momento contactando a support@rodar.do.'
          ]
        },
        {
          number: '7.0',
          title: 'SUS DERECHOS (ARCO)',
          content: [
            'De acuerdo con la Ley 172-13, usted tiene los siguientes derechos:',
            '• Acceso — solicitar una copia de los datos personales que tenemos sobre usted.',
            '• Rectificación — corregir datos inexactos o incompletos.',
            '• Cancelación — solicitar la eliminación de sus datos personales.',
            '• Oposición — oponerse al procesamiento de sus datos para fines de marketing.',
            'Para ejercer estos derechos, envíe un correo a support@rodar.do con el asunto "Solicitud ARCO".'
          ]
        },
        {
          number: '8.0',
          title: 'SEGURIDAD DE DATOS',
          content: [
            'Implementamos medidas de seguridad técnicas y organizativas para proteger sus datos personales contra acceso no autorizado, alteración, divulgación o destrucción.',
            'Utilizamos cifrado SSL/TLS para la transmisión de datos, almacenamiento seguro en servidores con cumplimiento SOC 2, y controles de acceso basados en roles para personal autorizado.'
          ]
        },
        {
          number: '9.0',
          title: 'COOKIES Y TECNOLOGÍAS DE RASTREO',
          content: [
            'Utilizamos cookies esenciales para el funcionamiento del sitio web y cookies analíticas para mejorar la experiencia del usuario.',
            'Puede desactivar las cookies en la configuración de su navegador, aunque esto puede afectar algunas funcionalidades del sitio.'
          ]
        },
        {
          number: '10.0',
          title: 'CAMBIOS A ESTA POLÍTICA',
          content: [
            'FulCastle Holdings, Inc. se reserva el derecho de actualizar esta Política de Privacidad en cualquier momento.',
            'Las modificaciones se publicarán en rodar.do con una nueva fecha de "Última actualización". Le notificaremos por correo electrónico sobre cambios materiales.'
          ]
        },
        {
          number: '11.0',
          title: 'CONTACTO',
          content: [
            'Para preguntas sobre esta Política de Privacidad, solicitudes de eliminación de datos, o ejercicio de derechos ARCO, contacte a:',
            'Email: support@rodar.do',
            'Dirección postal: FulCastle Holdings, Inc. — 8 The Green, Ste B, Dover, DE 19901'
          ]
        }
      ]
    },
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: March 20, 2026',
      sections: [
        {
          number: '1.0',
          title: 'INTRODUCTION',
          content: [
            'FulCastle Holdings, Inc. ("Rodar.do", "we", "our") is committed to protecting the privacy of users who visit our website and register for our waitlist.',
            'This Privacy Policy describes how we collect, use, share, and protect your personal information in accordance with Law 172-13 on Personal Data Protection of the Dominican Republic and standard U.S. privacy practices.'
          ]
        },
        {
          number: '2.0',
          title: 'DATA WE COLLECT',
          content: [
            'We collect the following personal information when you interact with Rodar.do:',
            '• Email address — provided through the "Waitlist Pill" on the homepage.',
            '• Full name and message — optionally provided through the contact form.',
            '• Technical data — IP address, browser type, device, and cookie data for traffic analysis and site optimization.',
            'We do NOT collect credit card information, government ID numbers, or real-time location data during the waitlist phase.'
          ]
        },
        {
          number: '3.0',
          title: 'PURPOSE OF DATA PROCESSING',
          content: [
            'We use your personal data for the following purposes:',
            '• Early access notifications — sending you invitations when Rodar.do officially launches.',
            '• Marketing and updates — communicating platform news, product improvements, and promotional offers via Mailchimp.',
            '• Internal development — analyzing geographic interest, improving user experience, and planning infrastructure.',
            '• Legal compliance — KYC (Know Your Customer) verification for future active users of the car-sharing platform.'
          ]
        },
        {
          number: '4.0',
          title: 'THIRD-PARTY SHARING',
          content: [
            'We share your data with the following trusted service providers:',
            '• Mailchimp (The Rocket Science Group LLC) — processing email marketing campaigns and waitlist management.',
            '• Stripe, Inc. — identity verification infrastructure and payment processing (for future active vehicle rental users).',
            '• Web analytics providers — Google Analytics for anonymous traffic metrics.',
            'We do NOT sell, rent, or share your personal data with third parties for unauthorized advertising purposes.'
          ]
        },
        {
          number: '5.0',
          title: 'LEGAL COMPLIANCE',
          content: [
            'This Privacy Policy complies with:',
            '• Law 172-13 on Personal Data Protection of the Dominican Republic — ensuring rights of access, rectification, cancellation, and opposition (ARCO rights).',
            '• Standard U.S. privacy practices — including transparency in data processing and user consent.',
            'By providing your email, you consent to the processing of your data as described in this policy.'
          ]
        },
        {
          number: '6.0',
          title: 'DATA RETENTION',
          content: [
            'We retain your personal data for as long as necessary to fulfill the purposes described in this policy.',
            '• Waitlist data — will be retained until the official platform launch or until you request deletion.',
            '• Contact data — will be retained for 2 years after your last interaction with Rodar.do.',
            'You may request deletion of your data at any time by contacting support@rodar.do.'
          ]
        },
        {
          number: '7.0',
          title: 'YOUR RIGHTS (ARCO)',
          content: [
            'In accordance with Law 172-13, you have the following rights:',
            '• Access — request a copy of the personal data we hold about you.',
            '• Rectification — correct inaccurate or incomplete data.',
            '• Cancellation — request deletion of your personal data.',
            '• Opposition — object to the processing of your data for marketing purposes.',
            'To exercise these rights, email support@rodar.do with the subject "ARCO Request".'
          ]
        },
        {
          number: '8.0',
          title: 'DATA SECURITY',
          content: [
            'We implement technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.',
            'We use SSL/TLS encryption for data transmission, secure storage on SOC 2 compliant servers, and role-based access controls for authorized personnel.'
          ]
        },
        {
          number: '9.0',
          title: 'COOKIES AND TRACKING TECHNOLOGIES',
          content: [
            'We use essential cookies for website functionality and analytical cookies to improve user experience.',
            'You can disable cookies in your browser settings, although this may affect some site functionalities.'
          ]
        },
        {
          number: '10.0',
          title: 'CHANGES TO THIS POLICY',
          content: [
            'FulCastle Holdings, Inc. reserves the right to update this Privacy Policy at any time.',
            'Modifications will be posted to rodar.do with a new "Last updated" date. We will notify you by email of material changes.'
          ]
        },
        {
          number: '11.0',
          title: 'CONTACT',
          content: [
            'For questions about this Privacy Policy, data deletion requests, or to exercise ARCO rights, contact:',
            'Email: support@rodar.do',
            'Postal address: FulCastle Holdings, Inc. — 8 The Green, Ste B, Dover, DE 19901'
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
