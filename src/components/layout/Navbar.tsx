"use client";

import { useState } from "react";
import Image from "next/image";
import { navLinks } from "@/data/content";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-start">
        {/* Logo */}
        <div className="p-6">
          <a href="#">
            <Image
              src="/logo.svg"
              alt="VA Logo"
              width={50}
              height={50}
              priority
            />
          </a>
        </div>

        {/* Hamburger Menu - always visible */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-primary-orange w-20 h-20 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-8 h-0.5 bg-neutral-black transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-8 h-0.5 bg-neutral-black transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-8 h-0.5 bg-neutral-black transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-20 right-0 bg-primary-orange min-w-56">
              <ul className="flex flex-col p-6 gap-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-neutral-black text-xl font-medium hover:opacity-70 transition-opacity"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#contact"
                    className="text-neutral-black text-xl font-medium hover:opacity-70 transition-opacity"
                    onClick={() => setIsOpen(false)}
                  >
                    contact me
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}