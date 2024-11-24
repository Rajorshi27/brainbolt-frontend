import React from 'react';

const Button = ({ children, variant = 'primary', onClick, className = '' }) => {
  const baseStyles = 'font-bold rounded-full transition-all duration-300 transform hover:-translate-y-1';
  const variants = {
    primary: 'bg-gradient-to-r from-yellow-300 to-yellow-600 text-indigo-900 px-10 py-4 text-lg shadow-lg hover:shadow-xl',
    secondary: 'bg-transparent border-2 border-pink-500 text-white px-8 py-3 hover:bg-pink-500/10',
    submit: 'w-full bg-yellow-400 text-gray-900 py-3.5 rounded-md hover:bg-yellow-500 shadow-lg hover:shadow-xl'
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
