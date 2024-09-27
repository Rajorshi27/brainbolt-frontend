import React from 'react';

const Header = () => {
  return (
    <header className="w-full py-4 bg-black text-white"> {/* Change background to black */}
      <h1 className="text-2xl font-bold text-center">BrainBolt</h1>
      <nav>
        <ul className="flex justify-center space-x-4">
          <li>
            <a href="/login" className="hover:underline text-pink-400">Login</a>
          </li>
          <li>
            <a href="/session" className="hover:underline text-pink-400">Session</a>
          </li>
          <li>
            <a href="/techniques" className="hover:underline text-pink-400">Techniques</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
