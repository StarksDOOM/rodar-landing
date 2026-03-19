export const DominicanFlag = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="24" fill="#FFFFFF"/>
    <rect width="14" height="10" fill="#002D62"/>
    <rect x="18" width="14" height="10" fill="#CE1126"/>
    <rect y="14" width="14" height="10" fill="#CE1126"/>
    <rect x="18" y="14" width="14" height="10" fill="#002D62"/>
    <path d="M14 0H18V24H14V0Z" fill="#FFFFFF"/>
    <path d="M0 10H32V14H0V10Z" fill="#FFFFFF"/>
  </svg>
);

export const USFlag = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="24" fill="#B22234"/>
    <path d="M0 1.846h32M0 5.538h32M0 9.231h32M0 12.923h32M0 16.615h32M0 20.308h32" stroke="#FFF" strokeWidth="1.846"/>
    <rect width="12.8" height="12.923" fill="#3C3B6E"/>
    <circle cx="2.133" cy="2.154" r="0.4" fill="#FFF"/>
    <circle cx="4.267" cy="2.154" r="0.4" fill="#FFF"/>
    <circle cx="6.4" cy="2.154" r="0.4" fill="#FFF"/>
    <circle cx="8.533" cy="2.154" r="0.4" fill="#FFF"/>
    <circle cx="10.667" cy="2.154" r="0.4" fill="#FFF"/>
    <circle cx="3.2" cy="4.308" r="0.4" fill="#FFF"/>
    <circle cx="5.333" cy="4.308" r="0.4" fill="#FFF"/>
    <circle cx="7.467" cy="4.308" r="0.4" fill="#FFF"/>
    <circle cx="9.6" cy="4.308" r="0.4" fill="#FFF"/>
  </svg>
);
