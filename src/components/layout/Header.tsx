
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "@/components/ui/Logo";
import { Menu } from "lucide-react";

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: "/", text: "Home" },
    { href: "/features", text: "Features" },
    { href: "#", text: "Pricing" },
    { href: "#", text: "About" },
    { href: "#", text: "Contact" },
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

        <div className="flex items-center gap-2 text-white text-sm cursor-pointer bg-[#008000] px-3 py-2 rounded-lg max-sm:hidden">
          <svg
            width="12"
            height="13"
            viewBox="0 0 15 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_10_736)">
              <path
                d="M10.0938 4C10.0938 3.33696 9.83036 2.70107 9.36152 2.23223C8.89268 1.76339 8.25679 1.5 7.59375 1.5C6.93071 1.5 6.29482 1.76339 5.82598 2.23223C5.35714 2.70107 5.09375 3.33696 5.09375 4C5.09375 4.66304 5.35714 5.29893 5.82598 5.76777C6.29482 6.23661 6.93071 6.5 7.59375 6.5C8.25679 6.5 8.89268 6.23661 9.36152 5.76777C9.83036 5.29893 10.0938 4.66304 10.0938 4ZM3.59375 4C3.59375 2.93913 4.01518 1.92172 4.76532 1.17157C5.51547 0.421427 6.53288 0 7.59375 0C8.65462 0 9.67203 0.421427 10.4222 1.17157C11.1723 1.92172 11.5938 2.93913 11.5938 4C11.5938 5.06087 11.1723 6.07828 10.4222 6.82843C9.67203 7.57857 8.65462 8 7.59375 8C6.53288 8 5.51547 7.57857 4.76532 6.82843C4.01518 6.07828 3.59375 5.06087 3.59375 4ZM2.13437 14.5H13.0531C12.775 12.5219 11.075 11 9.02188 11H6.16563C4.1125 11 2.4125 12.5219 2.13437 14.5ZM0.59375 15.0719C0.59375 11.9937 3.0875 9.5 6.16563 9.5H9.02188C12.1 9.5 14.5938 11.9937 14.5938 15.0719C14.5938 15.5844 14.1781 16 13.6656 16H1.52188C1.00938 16 0.59375 15.5844 0.59375 15.0719Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_10_736">
                <path d="M0.59375 0H14.5938V16H0.59375V0Z" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <span>Login / Sign Up</span>
        </div>

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
              <div className="flex items-center gap-2 text-white text-sm cursor-pointer bg-[#008000] px-3 py-2 rounded-lg mt-4">
                <svg
                  width="12"
                  height="13"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_10_736)">
                    <path
                      d="M10.0938 4C10.0938 3.33696 9.83036 2.70107 9.36152 2.23223C8.89268 1.76339 8.25679 1.5 7.59375 1.5C6.93071 1.5 6.29482 1.76339 5.82598 2.23223C5.35714 2.70107 5.09375 3.33696 5.09375 4C5.09375 4.66304 5.35714 5.29893 5.82598 5.76777C6.29482 6.23661 6.93071 6.5 7.59375 6.5C8.25679 6.5 8.89268 6.23661 9.36152 5.76777C9.83036 5.29893 10.0938 4.66304 10.0938 4ZM3.59375 4C3.59375 2.93913 4.01518 1.92172 4.76532 1.17157C5.51547 0.421427 6.53288 0 7.59375 0C8.65462 0 9.67203 0.421427 10.4222 1.17157C11.1723 1.92172 11.5938 2.93913 11.5938 4C11.5938 5.06087 11.1723 6.07828 10.4222 6.82843C9.67203 7.57857 8.65462 8 7.59375 8C6.53288 8 5.51547 7.57857 4.76532 6.82843C4.01518 6.07828 3.59375 5.06087 3.59375 4ZM2.13437 14.5H13.0531C12.775 12.5219 11.075 11 9.02188 11H6.16563C4.1125 11 2.4125 12.5219 2.13437 14.5ZM0.59375 15.0719C0.59375 11.9937 3.0875 9.5 6.16563 9.5H9.02188C12.1 9.5 14.5938 11.9937 14.5938 15.0719C14.5938 15.5844 14.1781 16 13.6656 16H1.52188C1.00938 16 0.59375 15.5844 0.59375 15.0719Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_10_736">
                      <path d="M0.59375 0H14.5938V16H0.59375V0Z" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span>Login / Sign Up</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
