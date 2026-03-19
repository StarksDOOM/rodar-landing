interface FooterProps {
  language: 'es' | 'en';
}

export function Footer({ language }: FooterProps) {
  const text = {
    es: {
      copyright: '© 2026 FULCASTLE HOLDINGS, INC.',
      address: '8 THE GREEN, STE B, DOVER, DE 19901',
      terms: 'TÉRMINOS DE SERVICIO',
      privacy: 'POLÍTICA DE PRIVACIDAD'
    },
    en: {
      copyright: '© 2026 FULCASTLE HOLDINGS, INC.',
      address: '8 THE GREEN, STE B, DOVER, DE 19901',
      terms: 'TERMS OF SERVICE',
      privacy: 'PRIVACY POLICY'
    }
  };

  return (
    <footer className="w-full py-8 px-6 border-t border-white/5 bg-black/20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-left">
          <p className="text-[10px] font-bold tracking-widest text-white/40 mb-1">
            {text[language].copyright}
          </p>
          <p className="text-[9px] text-white/20 tracking-wider">
            {text[language].address}
          </p>
        </div>

        <div className="flex flex-col items-center">
          <a href="mailto:support@rodar.do" className="text-[10px] font-bold tracking-widest text-white/40 hover:text-brand-accent transition-colors uppercase">
            support@rodar.do
          </a>
        </div>

        <div className="flex gap-8">
          <a href="#" className="text-[9px] font-bold tracking-widest text-white/30 hover:text-white/60 transition-colors uppercase">
            {text[language].terms}
          </a>
          <span className="text-white/10">|</span>
          <a href="#" className="text-[9px] font-bold tracking-widest text-white/30 hover:text-white/60 transition-colors uppercase">
            {text[language].privacy}
          </a>
        </div>
      </div>
    </footer>
  );
}
