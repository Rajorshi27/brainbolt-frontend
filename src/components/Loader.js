import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce" />
      <div className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
      <div className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
    </div>
  );
};

export default Loader;