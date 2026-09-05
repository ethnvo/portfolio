import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-ground/85 backdrop-blur-sm border-b border-white/[0.08] z-50">
      <nav className="max-w-7xl mx-auto px-5 py-4 lg:px-32 flex items-center justify-between text-ink">
        <a
          href="#about"
          className="font-display text-xl md:text-2xl font-semibold tracking-tight text-ink hover:text-brand transition-colors duration-300"
        >
          ethanvo.dev
        </a>

        <ul className="hidden md:flex gap-10">
          <li className="opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300">
            <a href="#about">About</a>
          </li>
          <li className="opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300">
            <a href="#timeline">Timeline</a>
          </li>
          <li className="opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300">
            <a href="#hackathons">Hackathons</a>
          </li>
        </ul>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <BiMenu className="text-3xl" />
        </button>

        {isMenuOpen && (
          <ul className="md:hidden absolute top-16 left-0 w-full bg-ground border-b border-white/[0.08] shadow-xl shadow-black/50 py-12 text-center space-y-5 overflow-x-hidden">
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
              <a href="#hackathons" onClick={() => setIsMenuOpen(false)}>
                <span className="text-lg">Hackathons</span>
              </a>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
