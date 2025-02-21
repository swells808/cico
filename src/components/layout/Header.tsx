
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "@/components/ui/Logo";
import { Menu, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: "/", text: "Home" },
    { href: "/features", text: "Features" },
    { href: "/pricing", text: "Pricing" },
    { href: "/about", text: "About" },
    { href: "/contact", text: "Contact" },
  ];

  return (
    <header className="fixed h-[65px] border-b-gray-100 z-[1000] bg-[rgba(255,255,255,0.95)] border-b border-solid top-0 inset-x-0">
      <div className="max-w-screen-xl h-full flex items-center justify-between mx-auto my-0 px-20 py-0 max-md:px-10 max-md:py-0 max-sm:p-4">
        <Logo />

        <nav className="flex gap-[30px] max-sm:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.text}
              to={link.href}
              className={`text-base no-underline ${
                location.pathname === link.href ? "text-[#008000]" : "text-gray-700 hover:text-[#4BA0F4]"
              }`}
            >
              {link.text}
            </Link>
          ))}
        </nav>

        <Link to="/login" className="max-sm:hidden">
          <Button
            variant="default"
            className="bg-[#008000] hover:bg-[#008000]/90 text-white flex items-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            Login / Sign Up
          </Button>
        </Link>

        <button
          className="hidden max-sm:block text-gray-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {isMobileMenuOpen && (
          <div className="hidden max-sm:block fixed inset-0 top-[65px] bg-white z-50">
            <div className="flex flex-col p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.text}
                  to={link.href}
                  className={`text-base no-underline py-3 border-b border-gray-100 ${
                    location.pathname === link.href ? "text-[#008000]" : "text-gray-700"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.text}
                </Link>
              ))}
              <Link
                to="/login"
                className="flex items-center gap-2 text-white text-sm cursor-pointer bg-[#008000] px-3 py-2 rounded-lg mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LogIn className="w-4 h-4" />
                Login / Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
