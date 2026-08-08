import React from 'react';

interface VivoLogoProps {
  className?: string;
  showBackground?: boolean;
  bgColor?: string;
  textColor?: string;
}

export const VivoLogo: React.FC<VivoLogoProps> = ({ 
  className = "h-7 w-auto", 
  showBackground = true,
  bgColor = "#0066B2",
  textColor = "#FFFFFF" 
}) => {
  if (showBackground) {
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 520 310" 
        className={`${className} shadow-sm rounded-md overflow-hidden`}
        aria-label="Vivo Logo"
      >
        <rect width="520" height="310" rx="12" fill={bgColor} />
        <g transform="translate(0, 65)" fill={textColor}>
          {/* First 'v' */}
          <path d="M 25 72 C 25 66 30 62 36 62 C 41 62 45 65 48 71 L 88 138 C 90 142 95 142 97 138 L 137 71 C 140 65 144 62 149 62 C 155 62 160 66 160 72 C 160 75 159 78 157 82 L 109 161 C 102 173 83 173 76 161 L 28 82 C 26 78 25 75 25 72 Z" />
          
          {/* 'i' stem */}
          <path d="M 182 72 C 182 66 187 62 193 62 C 199 62 204 66 204 72 L 204 158 C 204 164 199 168 193 168 C 187 168 182 164 182 158 Z" />
          
          {/* 'i' diamond dot */}
          <path d="M 193 18 L 209 34 L 193 50 L 177 34 Z" />
          
          {/* Second 'v' */}
          <path d="M 222 72 C 222 66 227 62 233 62 C 238 62 242 65 245 71 L 285 138 C 287 142 292 142 294 138 L 334 71 C 337 65 341 62 346 62 C 352 62 357 66 357 72 C 357 75 356 78 354 82 L 306 161 C 299 173 280 173 273 161 L 225 82 C 223 78 222 75 222 72 Z" />
          
          {/* 'o' outer and inner path */}
          <path fillRule="evenodd" d="M 432 62 C 472 62 498 78 498 115 C 498 152 472 168 432 168 L 418 168 C 378 168 352 152 352 115 C 352 78 378 62 418 62 Z M 428 88 C 394 88 377 96 377 115 C 377 134 394 142 428 142 L 422 142 C 456 142 473 134 473 115 C 473 96 456 88 422 88 Z" />
        </g>
      </svg>
    );
  }

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 520 180" 
      className={className} 
      fill={textColor}
      aria-label="Vivo Logo"
    >
      <g>
        {/* First 'v' */}
        <path d="M 25 72 C 25 66 30 62 36 62 C 41 62 45 65 48 71 L 88 138 C 90 142 95 142 97 138 L 137 71 C 140 65 144 62 149 62 C 155 62 160 66 160 72 C 160 75 159 78 157 82 L 109 161 C 102 173 83 173 76 161 L 28 82 C 26 78 25 75 25 72 Z" />
        
        {/* 'i' stem */}
        <path d="M 182 72 C 182 66 187 62 193 62 C 199 62 204 66 204 72 L 204 158 C 204 164 199 168 193 168 C 187 168 182 164 182 158 Z" />
        
        {/* 'i' diamond dot */}
        <path d="M 193 18 L 209 34 L 193 50 L 177 34 Z" />
        
        {/* Second 'v' */}
        <path d="M 222 72 C 222 66 227 62 233 62 C 238 62 242 65 245 71 L 285 138 C 287 142 292 142 294 138 L 334 71 C 337 65 341 62 346 62 C 352 62 357 66 357 72 C 357 75 356 78 354 82 L 306 161 C 299 173 280 173 273 161 L 225 82 C 223 78 222 75 222 72 Z" />
        
        {/* 'o' outer and inner path */}
        <path fillRule="evenodd" d="M 432 62 C 472 62 498 78 498 115 C 498 152 472 168 432 168 L 418 168 C 378 168 352 152 352 115 C 352 78 378 62 418 62 Z M 428 88 C 394 88 377 96 377 115 C 377 134 394 142 428 142 L 422 142 C 456 142 473 134 473 115 C 473 96 456 88 422 88 Z" />
      </g>
    </svg>
  );
};

