// components/HeroSection.tsx
'use client';

import { motion, useSpring, Variants } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ArrowRight, Download, Instagram } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Container animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  // Text animation variants - FIX: gunakan string preset atau type assertion
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut", // FIX: gunakan string preset
      },
    },
  };

  // Social media links
  const socialLinks = [
    { icon: Github, href: 'https://github.com/bagasgmlngr', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/bagas-gemilang-74265a24b/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/bagasgrrr', label: 'Instagram' },
    { icon: Mail, href: 'mailto:bagasgr95@gmail.com', label: 'Email' },
  ];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Animated linear Background */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-slate-900 to-purple-950 animate-linear-shift">
        <div className="absolute inset-0 bg-linear-to-tr from-slate-950/50 via-transparent to-slate-950/50" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-linear(#00F0FF 1px, transparent 1px), linear-linear(90deg, #00F0FF 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Floating Background Shapes */}
      <FloatingShapes mousePosition={mousePosition} />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 text-center lg:text-left"
          >
            {/* Greeting */}
            <motion.div variants={itemVariants}>
              <span className="inline-block text-sm md:text-base text-slate-400 font-medium tracking-wide glitch-text">
                Hello, I'm 👋
              </span>
            </motion.div>

            {/* Name with Neon Glow */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight"
            >
              <span className="inline-block neon-text-cyan">
                Bagas Gemilang
              </span>
            </motion.h1>

            {/* Role/Title */}
            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-3xl lg:text-4xl font-medium"
            >
              <span className="linear-text">
                Frontend Engineer
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
               I craft beautiful & functional web experiences using modern technologies. Specializing in building responsive interfaces that work seamlessly across web and mobile platforms.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
            >
              <button className="group relative px-8 py-4 bg-slate-50 text-slate-950 rounded-lg font-medium overflow-hidden transition-all duration-300 hover:scale-105">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  View My Work
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity neon-glow-cyan" />
              </button>

              <button className="group relative px-8 py-4 bg-transparent text-white rounded-lg font-medium border-2 border-cyan-400 overflow-hidden transition-all duration-300 hover:scale-105 neon-border-cyan">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Contact Me
                  <Mail className="w-4 h-4" />
                </span>
                <div className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-10 transition-opacity" />
              </button>
            </motion.div>

            {/* Social Media Icons */}
            <motion.div
              variants={itemVariants}
              className="flex gap-4 justify-center lg:justify-start pt-6"
            >
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="group relative p-3 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-cyan-400 transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors group-hover:rotate-12 duration-300" />
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity neon-glow-cyan" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Profile Image */}
          <ProfileImage mousePosition={mousePosition} />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
      >
        <div className="flex flex-col items-center gap-2 text-slate-400">
          <span className="text-xs tracking-widest uppercase">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border-2 border-cyan-400/50 flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-2 bg-cyan-400 rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

// Floating Shapes Component
const FloatingShapes = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const shapes = [
    { size: 300, color: 'cyan', x: '10%', y: '20%', delay: 0, speed: 0.5 },
    { size: 200, color: 'purple', x: '80%', y: '60%', delay: 2, speed: 0.7 },
    { size: 250, color: 'pink', x: '70%', y: '10%', delay: 4, speed: 0.6 },
    { size: 150, color: 'cyan', x: '15%', y: '70%', delay: 1, speed: 0.8 },
    { size: 180, color: 'purple', x: '85%', y: '80%', delay: 3, speed: 0.4 },
  ];

  const colorMap: Record<string, string> = {
    cyan: 'rgba(0, 240, 255, 0.1)',
    purple: 'rgba(176, 0, 255, 0.1)',
    pink: 'rgba(255, 0, 110, 0.1)',
  };

  const glowMap: Record<string, string> = {
    cyan: '0 0 60px rgba(0, 240, 255, 0.3), 0 0 100px rgba(0, 240, 255, 0.1)',
    purple: '0 0 60px rgba(176, 0, 255, 0.3), 0 0 100px rgba(176, 0, 255, 0.1)',
    pink: '0 0 60px rgba(255, 0, 110, 0.3), 0 0 100px rgba(255, 0, 110, 0.1)',
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-3xl"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            backgroundColor: colorMap[shape.color],
            boxShadow: glowMap[shape.color],
          }}
          animate={{
            x: [0, mousePosition.x * 20 * shape.speed, 0],
            y: [0, 30, 0, mousePosition.y * 20 * shape.speed],
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// Profile Image Component with 3D Tilt
const ProfileImage = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Smooth spring animations for tilt
  const springConfig = { stiffness: 150, damping: 15 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  useEffect(() => {
    if (isHovered) {
      rotateX.set(mousePosition.y * -15);
      rotateY.set(mousePosition.x * 15);
    } else {
      rotateX.set(0);
      rotateY.set(0);
    }
  }, [mousePosition, isHovered, rotateX, rotateY]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="relative flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating Decorative Shapes */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-20 h-20 border-2 border-cyan-400/30 rounded-lg"
          style={{ top: '10%', left: '5%' }}
          animate={{
            x: mousePosition.x * 15,
            y: mousePosition.y * 15,
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-16 h-16 border-2 border-purple-400/30 rounded-full"
          style={{ bottom: '15%', right: '10%' }}
          animate={{
            x: mousePosition.x * -10,
            y: mousePosition.y * -10,
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-12 h-12 bg-pink-400/20 blur-xl"
          style={{ top: '60%', left: '0%' }}
          animate={{
            x: mousePosition.x * 20,
            y: mousePosition.y * 20,
          }}
        />
      </div>

      {/* Main Image Container with 3D Tilt */}
      <motion.div
        className="relative z-10"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="relative group">
          {/* Neon Border Glow */}
          <div className="absolute -inset-4 bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-2xl opacity-75 blur-xl group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow" />
          
          {/* Image Container */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-transparent bg-linear-to-br from-cyan-400/20 via-purple-400/20 to-pink-400/20 p-1">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-xl overflow-hidden bg-slate-800">
              {/* Placeholder - Replace with actual image */}
              <div className="absolute inset-0 bg-linear-to-br from-cyan-900/50 via-purple-900/50 to-pink-900/50 flex items-center justify-center">
                <div className="text-6xl">👨‍💻</div>
              </div>
              
              {/* Uncomment when you have image */}
              <Image
                src="/your-image.jpg"
                alt="Profile"
                fill
                className="object-cover"
                priority
              />
              
              {/* Overlay linear */}
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/50 to-transparent" />
            </div>
          </div>

          {/* Hover Glow Effect */}
          <div className="absolute -inset-1 bg-linear-to-r from-cyan-400 to-purple-400 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-500" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;