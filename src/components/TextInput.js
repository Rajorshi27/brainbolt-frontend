import React from 'react';

const TextInput = ({
  name,
  value,
  onChange,
  onKeyPress,
  placeholder,
  type = 'text',
  className = ''
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      className={`w-full px-4 py-3 rounded-md bg-white/10 border border-pink-500/30 text-white
        placeholder-white/40 focus:outline-none focus:border-pink-500 focus:bg-white/15
        transition-all duration-300 ${className}`}
    />
  );
};

export default TextInput;