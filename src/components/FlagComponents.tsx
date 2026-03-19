import { cn } from "@/lib/utils";

interface FlagProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 'w-4 h-3',
  md: 'w-6 h-4',
  lg: 'w-8 h-6'
};

export function DominicanFlag({ className, size = 'md' }: FlagProps) {
  return (
    <svg 
      viewBox="0 0 32 20" 
      className={cn(sizeMap[size], className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="20" fill="#FFFFFF"/>
      {/* Top Left - Blue */}
      <rect width="14" height="8" fill="#002D62"/>
      {/* Top Right - Red */}
      <rect x="18" width="14" height="8" fill="#CE1126"/>
      {/* Bottom Left - Red */}
      <rect y="12" width="14" height="8" fill="#CE1126"/>
      {/* Bottom Right - Blue */}
      <rect x="18" y="12" width="14" height="8" fill="#002D62"/>
      {/* Simplified coat of arms in the center of the cross */}
      <rect x="14.5" y="8.5" width="3" height="3" fill="#007A33"/>
    </svg>
  );
}

export function USFlag({ className, size = 'md' }: FlagProps) {
  return (
    <svg 
      viewBox="0 0 741 390" 
      className={cn(sizeMap[size], className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="741" height="390" fill="#B22234"/>
      <path d="M0 30h741M0 90h741M0 150h741M0 210h741M0 270h741M0 330h741" stroke="#FFFFFF" strokeWidth="30"/>
      <rect width="296.4" height="210" fill="#3C3B6E"/>
      {/* Simplified stars for small sizes */}
      <circle cx="50" cy="50" r="10" fill="#FFFFFF" opacity="0.8"/>
    </svg>
  );
}
