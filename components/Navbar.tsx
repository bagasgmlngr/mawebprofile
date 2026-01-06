'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, Sparkles, Send } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = navLinks.map(link => link.href.replace('#', ''));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-900/80 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-cyan-500/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl md:text-2xl font-bold">
                  <span className="text-gray-100">BAGAS</span>
                  <span className="text-cyan-400">.</span>
                </span>
              </div>
              {/* Neon glow effect */}
              <div className="absolute -inset-1 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-300" />
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="relative group cursor-pointer"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className={`text-sm font-medium transition-colors duration-300 ${
                      isActive 
                        ? 'text-cyan-400' 
                        : 'text-slate-300 hover:text-white'
                    }`}>
                      {link.name}
                    </span>
                    
                    {/* Active indicator - neon underline */}
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-linear-to-r from-cyan-400 to-purple-400"
                        style={{
                          boxShadow: '0 0 10px rgba(34, 211, 238, 0.8)',
                        }}
                      />
                    )}
                    
                    {/* Hover effect - neon glow */}
                    {!isActive && (
                      <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-linear-to-r from-cyan-400/0 via-cyan-400/50 to-cyan-400/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" 
                        style={{
                          boxShadow: '0 0 8px rgba(34, 211, 238, 0.6)',
                        }}
                      />
                    )}
                  </motion.a>
                );
              })}
            </div>

            {/* CTA Button - Desktop */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="hidden md:block relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500 to-purple-500 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-300" />
              <div className="relative px-6 py-2.5 bg-slate-900 rounded-lg flex items-center gap-2 border border-cyan-500/50 group-hover:border-cyan-500 transition-colors duration-300">
                <Send className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-white">Hire Me</span>
              </div>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative group p-2"
              whileTap={{ scale: 0.9 }}
            >
              <div className="absolute inset-0 bg-cyan-500/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition duration-300" />
              <div className="relative">
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-cyan-400" />
                ) : (
                  <Menu className="w-6 h-6 text-cyan-400" />
                )}
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-16 right-0 bottom-0 w-64 bg-slate-900/95 backdrop-blur-xl border-l border-cyan-500/20 z-40 md:hidden shadow-2xl shadow-cyan-500/10"
            >
              <div className="flex flex-col h-full p-6">
                {/* Mobile Nav Links */}
                <nav className="flex-1 space-y-2">
                  {navLinks.map((link, index) => {
                    const isActive = activeSection === link.href.replace('#', '');
                    return (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(link.href);
                        }}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                          isActive
                            ? 'bg-linear-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/50 text-cyan-400 shadow-lg shadow-cyan-500/20'
                            : 'text-slate-300 hover:bg-slate-800/50 hover:text-white border border-transparent'
                        }`}
                      >
                        <span className="text-base font-medium">{link.name}</span>
                        {isActive && (
                          <motion.div
                            layoutId="activeMobile"
                            className="h-0.5 bg-linear-to-r from-cyan-400 to-purple-400 mt-2 rounded-full"
                            style={{
                              boxShadow: '0 0 8px rgba(34, 211, 238, 0.8)',
                            }}
                          />
                        )}
                      </motion.a>
                    );
                  })}
                </nav>

                {/* Mobile CTA Button */}
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="relative group w-full"
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500 to-purple-500 rounded-lg blur opacity-60 group-active:opacity-100 transition duration-300" />
                  <div className="relative px-6 py-3 bg-slate-900 rounded-lg flex items-center justify-center gap-2 border border-cyan-500/50 group-active:border-cyan-500 transition-colors duration-300">
                    <Send className="w-5 h-5 text-cyan-400" />
                    <span className="text-base font-medium text-white">Hire Me</span>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}