import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { hamburger, close } from "../../public/assets/icons";
import { headerLogo } from "../assets/images";
import { navLinks } from "../constants";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle smooth scroll
  const scrollToSection = useCallback((e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      setIsMenuOpen(false); // Close menu after clicking
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  return (
    <header
      className={`padding-x py-8 fixed z-50 w-full transition-all duration-300 
        ${isScrolled ? "bg-white shadow-lg" : "bg-transparent"}`}
    >
      <nav className="flex justify-between items-center max-container">
        <a href="/" className="relative z-50">
          <img
            src={headerLogo}
            alt="433 Academy"
            width={129}
            height={29}
            className="m-0 w-[59px] h-[49px]"
          />
        </a>

        {/* Desktop Menu */}
        <ul className="flex-1 flex justify-end items-center gap-16 max-lg:hidden">
          {navLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`font-montserrat leading-normal text-lg
                  hover:text-coral-red transition-colors ${isScrolled ? "text-slate-gray" : "text-white"}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="hidden max-lg:block relative z-50"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <img
            src={isMenuOpen ? close : hamburger}
            alt={isMenuOpen ? "close" : "menu"}
            width={25}
            height={25}
            className={`${!isScrolled ? "invert" : null}`}
          />
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-0 bg-white z-40 lg:hidden"
            >
              <motion.ul
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                className="flex flex-col items-center justify-center h-full gap-8"
              >
                {navLinks.map((item) => (
                  <motion.li
                    key={item.label}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => scrollToSection(e, item.href)}
                      className="font-montserrat text-2xl text-slate-gray
                        hover:text-coral-red transition-colors"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Nav;
