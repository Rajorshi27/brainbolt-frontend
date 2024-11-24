import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full py-6 px-8 bg-slate-900/80 backdrop-blur-lg border-b border-pink-500/20 z-10">
      <h1 className="text-2xl font-semibold tracking-tight">
        <Link to="/" className="text-white hover:opacity-90 transition-opacity">
          BrainBolt
        </Link>
      </h1>
    </header>
  );
};

export default Header;