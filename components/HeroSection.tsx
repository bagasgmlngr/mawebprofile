// components/HeroSection.tsx
'use client';

import { motion, Variants } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight, Instagram, Lock, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mouse tracking for parallax (disabled on mobile)
  useEffect(() => {
    if (isMobile) return;

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
  }, [isMobile]);

  // Container animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.15,
        delayChildren: isMobile ? 0.2 : 0.3,
      },
    },
  };

  // Text animation variants
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.5 : 0.8,
        ease: "easeOut",
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
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-16 md:pt-20"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950">
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/50 via-transparent to-slate-950/50" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.05] md:opacity-[0.07]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(#00F0FF 1px, transparent 1px), linear-gradient(90deg, #00F0FF 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      {/* Floating Background Shapes */}
      <FloatingShapes mousePosition={mousePosition} isMobile={isMobile} />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 md:py-0">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4 md:space-y-6 text-center lg:text-left order-2 lg:order-1"
          >
            {/* Greeting */}
            <motion.div variants={itemVariants}>
              <span className="inline-block text-xs sm:text-sm md:text-base text-slate-400 font-medium tracking-wide">
                Hello, I'm 👋
              </span>
            </motion.div>

            {/* Name with Neon Glow */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
            >
              <span className="inline-block neon-text-cyan">
                Bagas Gemilang
              </span>
            </motion.h1>

            {/* Role/Title */}
            <motion.h2
              variants={itemVariants}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium"
            >
              <span className="gradient-text">
                Frontend Engineer
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base md:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed px-4 lg:px-0"
            >
              I craft beautiful & functional web experiences using modern technologies. Specializing in building responsive interfaces that work seamlessly across web and mobile platforms.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start pt-2 md:pt-4 px-4 lg:px-0"
            >
              <button className="group relative px-6 sm:px-8 py-3 md:py-4 bg-slate-50 text-slate-950 rounded-lg font-medium overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation">
                <span className="relative z-10 flex items-center justify-center gap-2 text-sm md:text-base">
                  View My Work
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity neon-glow-cyan" />
              </button>

              <button className="group relative px-6 sm:px-8 py-3 md:py-4 bg-transparent text-white rounded-lg font-medium border-2 border-cyan-400 overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 neon-border-cyan touch-manipulation">
                <span className="relative z-10 flex items-center justify-center gap-2 text-sm md:text-base">
                  Contact Me
                  <Mail className="w-4 h-4" />
                </span>
                <div className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-10 transition-opacity" />
              </button>
            </motion.div>

            {/* Social Media Icons */}
            <motion.div
              variants={itemVariants}
              className="flex gap-3 md:gap-4 justify-center lg:justify-start pt-4 md:pt-6"
            >
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group relative p-2.5 md:p-3 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-cyan-400 transition-all duration-300 hover:scale-110 active:scale-95 touch-manipulation"
                >
                  <social.icon className="w-4 h-4 md:w-5 md:h-5 text-slate-400 group-hover:text-cyan-400 transition-colors group-hover:rotate-12 duration-300" />
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity neon-glow-cyan" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Device Mockups */}
          <div className="order-1 lg:order-2">
            <ResponsiveDeviceMockup mousePosition={mousePosition} isMobile={isMobile} />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="flex flex-col items-center gap-2 text-slate-400">
          <span className="text-xs tracking-widest uppercase">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-9 md:w-6 md:h-10 rounded-full border-2 border-cyan-400/50 flex items-start justify-center p-1.5 md:p-2"
          >
            <motion.div className="w-1 h-2 bg-cyan-400 rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

// Floating Shapes Component
const FloatingShapes = ({ 
  mousePosition, 
  isMobile 
}: { 
  mousePosition: { x: number; y: number };
  isMobile: boolean;
}) => {
  const desktopShapes = [
    { size: 300, color: 'cyan', x: '10%', y: '20%', delay: 0, speed: 0.5 },
    { size: 200, color: 'purple', x: '80%', y: '60%', delay: 2, speed: 0.7 },
    { size: 250, color: 'pink', x: '70%', y: '10%', delay: 4, speed: 0.6 },
    { size: 150, color: 'cyan', x: '15%', y: '70%', delay: 1, speed: 0.8 },
    { size: 180, color: 'purple', x: '85%', y: '80%', delay: 3, speed: 0.4 },
  ];

  const mobileShapes = [
    { size: 200, color: 'cyan', x: '10%', y: '15%', delay: 0, speed: 0.3 },
    { size: 150, color: 'purple', x: '80%', y: '70%', delay: 2, speed: 0.4 },
    { size: 120, color: 'pink', x: '70%', y: '30%', delay: 1, speed: 0.3 },
  ];

  const shapes = isMobile ? mobileShapes : desktopShapes;

  const colorMap: Record<string, string> = {
    cyan: 'rgba(0, 240, 255, 0.08)',
    purple: 'rgba(176, 0, 255, 0.08)',
    pink: 'rgba(255, 0, 110, 0.08)',
  };

  const glowMap: Record<string, string> = {
    cyan: '0 0 40px rgba(0, 240, 255, 0.2), 0 0 80px rgba(0, 240, 255, 0.1)',
    purple: '0 0 40px rgba(176, 0, 255, 0.2), 0 0 80px rgba(176, 0, 255, 0.1)',
    pink: '0 0 40px rgba(255, 0, 110, 0.2), 0 0 80px rgba(255, 0, 110, 0.1)',
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-2xl md:blur-3xl"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            backgroundColor: colorMap[shape.color],
            boxShadow: glowMap[shape.color],
          }}
          animate={isMobile ? {
            y: [0, 20, 0],
            scale: [1, 1.05, 1],
          } : {
            x: [0, mousePosition.x * 20 * shape.speed, 0],
            y: [0, 30, 0, mousePosition.y * 20 * shape.speed],
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: isMobile ? 15 : 20,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// API Request Simulation Component
const APIRequestSimulation = () => {
  const [apiState, setApiState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  useEffect(() => {
    const cycle = async () => {
      // Idle state
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Loading state
      setApiState('loading');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success state
      setApiState('success');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Back to idle and repeat
      setApiState('idle');
    };

    cycle();
    const interval = setInterval(cycle, 5500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-2 right-2 flex items-center gap-2">
      {/* Network Activity Indicator */}
      <motion.div
        animate={{
          opacity: apiState === 'loading' ? [0.5, 1, 0.5] : 0.3,
        }}
        transition={{
          duration: 1,
          repeat: apiState === 'loading' ? Infinity : 0,
        }}
        className="flex items-center gap-1.5 text-[9px] md:text-[10px] px-2 py-1 rounded bg-slate-800/50 border border-slate-700/50"
      >
        {apiState === 'loading' && (
          <>
            <Loader2 className="w-2.5 h-2.5 text-cyan-400 animate-spin" />
            <span className="text-cyan-400 font-medium">Fetching...</span>
          </>
        )}
        {apiState === 'success' && (
          <>
            <CheckCircle2 className="w-2.5 h-2.5 text-green-400" />
            <span className="text-green-400 font-medium">200 OK</span>
          </>
        )}
        {apiState === 'idle' && (
          <span className="text-slate-500 font-medium">Ready</span>
        )}
      </motion.div>
    </div>
  );
};

// Responsive Device Mockup Component with API Animation
const ResponsiveDeviceMockup = ({ 
  mousePosition,
  isMobile 
}: { 
  mousePosition: { x: number; y: number };
  isMobile: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative flex items-center justify-center perspective-1000"
    >
      <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
        
        {/* Desktop Browser Window */}
        <motion.div
          className="relative"
          style={!isMobile ? {
            rotateY: mousePosition.x * 5,
            rotateX: mousePosition.y * -5,
          } : {}}
        >
          {/* Browser Chrome */}
          <div className="relative glass-strong rounded-lg overflow-hidden border border-cyan-400/30 shadow-2xl shadow-cyan-400/20">
            {/* Browser Top Bar */}
            <div className="bg-slate-800/90 px-3 py-2 flex items-center gap-2 border-b border-slate-700/50">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
              </div>
              <div className="flex-1 bg-slate-700/50 rounded px-3 py-1 text-[10px] text-slate-400 flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-cyan-400" />
                <span>localhost:3000</span>
              </div>
              
              {/* API Status Indicator */}
              <APIRequestSimulation />
            </div>

            {/* Browser Content */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 md:p-8 aspect-[16/10] relative">
              
              {/* Animated Code Lines with API Request */}
              <APICodeAnimation />

              {/* Decorative Elements */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <div className="w-8 h-8 rounded bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center">
                  <div className="text-cyan-400 text-xs">⚛️</div>
                </div>
                <div className="w-8 h-8 rounded bg-purple-400/10 border border-purple-400/30 flex items-center justify-center">
                  <div className="text-purple-400 text-xs">📱</div>
                </div>
              </div>
            </div>
          </div>

          {/* Glow Effect */}
          <div className="absolute -inset-2 bg-gradient-to-br from-cyan-400/20 via-purple-400/20 to-pink-400/20 blur-xl -z-10 rounded-lg" />
        </motion.div>

        {/* Mobile Device - Overlapping */}
        <motion.div
          initial={{ opacity: 0, x: 50, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute -bottom-8 -right-4 md:-right-8 w-24 md:w-32 lg:w-36 hidden sm:block"
          style={!isMobile ? {
            rotateY: mousePosition.x * -8,
            rotateX: mousePosition.y * 8,
          } : {}}
        >
          {/* Phone Frame */}
          <div className="relative glass-strong rounded-2xl overflow-hidden border-2 border-purple-400/30 shadow-2xl shadow-purple-400/20">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-4 bg-slate-900 rounded-b-2xl z-10" />
            
            {/* Screen */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 aspect-[9/19] p-3 pt-6">
              {/* Mini UI Elements */}
              <div className="space-y-1.5">
                <div className="h-1.5 bg-cyan-400/30 rounded w-3/4" />
                <div className="h-1.5 bg-purple-400/30 rounded w-1/2" />
                <div className="h-1.5 bg-pink-400/30 rounded w-2/3" />
                
                <div className="pt-2 space-y-1">
                  <div className="h-6 bg-cyan-400/10 rounded border border-cyan-400/30" />
                  <div className="h-6 bg-purple-400/10 rounded border border-purple-400/30" />
                </div>
              </div>
            </div>
          </div>

          {/* Phone Glow */}
          <div className="absolute -inset-1 bg-purple-400/30 blur-lg -z-10 rounded-2xl" />
        </motion.div>

        {/* Code Brackets Decoration */}
        <motion.div
          className="absolute -top-6 -left-6 text-cyan-400 text-4xl md:text-5xl font-bold neon-text-cyan opacity-50"
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {'</>'}
        </motion.div>
      </div>
    </motion.div>
  );
};

// API Code Animation Component
const APICodeAnimation = () => {
  const [codeState, setCodeState] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCodeState(prev => (prev + 1) % 3);
    }, 5500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-2 font-mono text-xs md:text-sm">
      {/* Initial Code */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="text-slate-500"
      >
        <span className="text-pink-400">// Fetching portfolio data</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
        className="text-purple-400"
      >
        <span className="text-pink-400">const</span> <span className="text-cyan-400">getData</span> = <span className="text-pink-400">async</span> () {'=>'} {'{'}
      </motion.div>
      
      {/* API Request Line */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9 }}
        className="pl-4 text-slate-300"
      >
        <span className="text-pink-400">const</span> <span className="text-cyan-400">res</span> = <span className="text-pink-400">await</span> <span className="text-yellow-400">fetch</span>(
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1 }}
        className="pl-8 text-green-400"
      >
        '/api/developer'
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
        className="pl-4 text-slate-300"
      >
        );
      </motion.div>

      {/* Response State - Changes based on API state */}
      {codeState === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pl-4 text-slate-500 flex items-center gap-2"
        >
          <span>// Waiting...</span>
        </motion.div>
      )}

      {codeState === 1 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="pl-4"
        >
          <div className="flex items-center gap-2 text-cyan-400">
            <Loader2 className="w-3 h-3 animate-spin" />
            <span>// Loading...</span>
          </div>
        </motion.div>
      )}

      {codeState === 2 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-1"
        >
          <div className="pl-4 text-green-400 flex items-center gap-2">
            <CheckCircle2 className="w-3 h-3" />
            <span>// Success! 200 OK</span>
          </div>
          <div className="pl-4 text-slate-300">
            <span className="text-pink-400">return</span> {'{'}
          </div>
          <div className="pl-8 text-slate-300">
            <span className="text-cyan-400">name:</span> <span className="text-green-400">'Bagas'</span>,
          </div>
          <div className="pl-8 text-slate-300">
            <span className="text-cyan-400">role:</span> <span className="text-green-400">'Frontend'</span>
          </div>
          <div className="pl-4 text-slate-300">{'};'}</div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4 }}
        className="text-purple-400"
      >
        {'};'}
      </motion.div>

      {/* Blinking Cursor */}
      <motion.div
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="inline-block w-2 h-4 bg-cyan-400 ml-1"
      />
    </div>
  );
};

export default HeroSection;