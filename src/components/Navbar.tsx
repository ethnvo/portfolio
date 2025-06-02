import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full backdrop-blur-md bg-black/40 border-b border-gray-700 border-opacity-20 z-50">
      <nav className="max-w-7xl mx-auto px-5 py-4 lg:px-32 flex items-center justify-between text-white">
        <a
          href="#about"
          className="text-xl md:text-2xl font-semibold bg-gradient-to-r  from-rose-500 via-pink-400 to-orange-200 text-transparent bg-clip-text hover:scale-110 transition-all duration-300"
        >
          Ethan Vo
        </a>

        <ul className="hidden md:flex gap-10">
          <li className="opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300">
            <a href="#about">About</a>
          </li>
          <li className="opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300">
            <a href="#timeline">Timeline</a>
          </li>
          <li className="opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300">
            <a href="#projects">Projects</a>
          </li>
        </ul>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <BiMenu className="text-3xl" />
        </button>

        {isMenuOpen && (
          <ul className="md:hidden absolute top-16 left-0 w-full bg-black/90 border-t border-gray-800 py-16 text-center space-y-5 overflow-x-hidden">
            <li className="px-10 opacity-80 hover:opacity-100 transition-opacity">
              <a href="#about" onClick={() => setIsMenuOpen(false)}>
                <span className="text-lg">About</span>
              </a>
            </li>
            <li className="px-10 opacity-80 hover:opacity-100 transition-opacity">
              <a href="#timeline" onClick={() => setIsMenuOpen(false)}>
                <span className="text-lg">Timeline</span>
              </a>
            </li>
            <li className="px-10 opacity-80 hover:opacity-100 transition-opacity">
              <a href="#projects" onClick={() => setIsMenuOpen(false)}>
                <span className="text-lg">Projects</span>
              </a>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
