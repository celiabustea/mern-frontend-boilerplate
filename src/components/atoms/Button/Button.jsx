import React from 'react';

const Button = ({ 
  label, 
  onClick, 
  type = "button", 
  variant = "primary", 
  size = "medium",
  disabled = false,
  className = "",
  icon,
  fullWidth = false
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors";
  
  const variants = {
    primary: "bg-[#1e293b] text-white hover:bg-[#334155]",
    secondary: "bg-[#e5e7eb] text-[#374151] hover:bg-[#d1d5db]",
    danger: "bg-[#dc2626] text-white hover:bg-[#b91c1c]",
    ghost: "bg-transparent text-[#1e293b] hover:bg-[#f3f4f6]"
  };

  const sizes = {
    small: "px-3 py-2 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg"
  };

  const buttonClasses = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
};

export default Button;