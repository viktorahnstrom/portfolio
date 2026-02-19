"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/data/content";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-start">
        {/* Logo with grain background */}
        <div className="bg-neutral-gray grain p-6">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="VA Logo"
              width={50}
              height={50}
              priority
            />
          </Link>
        </div>

        {/* Hamburger Menu */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-primary-orange w-24 h-24 sm:w-28 sm:h-28 flex flex-col items-center justify-center gap-2"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-9 h-0.5 bg-neutral-black transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-2.5" : ""
              }`}
            />
            <span
              className={`block w-9 h-0.5 bg-neutral-black transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-9 h-0.5 bg-neutral-black transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2.5" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-24 sm:top-28 right-0 bg-primary-orange min-w-56">
              <ul className="flex flex-col p-6 gap-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={`/${link.href}`}
                      className="text-neutral-black text-xl font-medium hover:opacity-70 transition-opacity"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/#contact"
                    className="text-neutral-black text-xl font-medium hover:opacity-70 transition-opacity"
                    onClick={() => setIsOpen(false)}
                  >
                    contact me
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}