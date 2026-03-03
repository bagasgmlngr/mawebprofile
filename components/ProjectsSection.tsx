"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Project {
  id: string;
  code: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  status: "DEPLOYED" | "IN DEV" | "CLASSIFIED";
  tech: string[];
  accentColor: string;
  glowColor: string;
  image: string;
  url?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  gradient: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const PROJECTS: Project[] = [
  {
    id: "1",
    code: "PRJ-001",
    title: "Sibayar Dashboard",
    description: "Payment aggregator platform with real-time transaction monitoring.",
    longDescription:
      "Full-featured payment aggregator dashboard built for financial operations. Handles multi-gateway transactions, real-time analytics, reconciliation reports, and merchant management — all wrapped in a responsive, high-performance interface.",
    category: "Web App",
    status: "DEPLOYED",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts"],
    accentColor: "#00F0FF",
    glowColor: "rgba(0,240,255,0.3)",
    gradient: "from-cyan-950 via-slate-900 to-slate-950",
    image: "/projects/sibayar.png",
    url: "mysibayar.com",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: "2",
    code: "PRJ-002",
    title: "BossTopup",
    description: "Digital goods & game top-up storefront with instant delivery.",
    longDescription:
      "E-commerce platform for digital products — game credits, prepaid cards, and subscriptions. Features instant checkout flow, automated delivery system, and admin panel.",
    category: "E-Commerce",
    status: "DEPLOYED",
    tech: ["React", "TypeScript", "Node.js", "Tailwind CSS"],
    accentColor: "#B000FF",
    glowColor: "rgba(176,0,255,0.3)",
    gradient: "from-purple-950 via-slate-900 to-slate-950",
    image: "/projects/bosstopup.png",
    url: "bosstopup.com",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "3",
    code: "PRJ-003",
    title: "Easyday App",
    description: "Lifestyle super-app UI with seamless onboarding experience.",
    longDescription:
      "Consumer-facing lifestyle app interface with onboarding flows, home dashboard, and service discovery — optimized for mobile-first experience with smooth micro-interactions.",
    category: "Mobile",
    status: "DEPLOYED",
    tech: ["React Native", "TypeScript", "Expo", "Zustand"],
    accentColor: "#FF006E",
    glowColor: "rgba(255,0,110,0.3)",
    gradient: "from-rose-950 via-slate-900 to-slate-950",
    image: "/projects/easyday.png",
    url: "easyday.app",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "4",
    code: "PRJ-004",
    title: "Sahabat Topup",
    description: "B2B reseller platform for telco & digital product distribution.",
    longDescription:
      "Reseller portal for telco products with live pricing engine, inventory management, and multi-tier agent system.",
    category: "Web App",
    status: "DEPLOYED",
    tech: ["Next.js", "Tailwind CSS", "REST API", "TypeScript"],
    accentColor: "#0080FF",
    glowColor: "rgba(0,128,255,0.3)",
    gradient: "from-blue-950 via-slate-900 to-slate-950",
    image: "/projects/sahabattopup.png",
    url: "sahabattopup.com",
    liveUrl: "#",
    githubUrl: "#",
  },
];

const CATEGORIES = ["All", "Web App", "E-Commerce", "Mobile", "UI Kit"];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const ScanlineOverlay = () => (
  <div
    className="absolute inset-0 pointer-events-none z-0 opacity-[0.025]"
    style={{
      backgroundImage:
        "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.8) 2px, rgba(255,255,255,0.8) 4px)",
    }}
  />
);

const StatusBadge = ({ status }: { status: Project["status"] }) => {
  const map = {
    DEPLOYED: { color: "#00F0FF", pulse: "bg-cyan-400" },
    "IN DEV": { color: "#FFB800", pulse: "bg-yellow-400" },
    CLASSIFIED: { color: "#FF006E", pulse: "bg-pink-500" },
  };
  const { color, pulse } = map[status];
  return (
    <span
      className="flex items-center gap-1.5 text-[10px] font-mono font-bold px-2 py-1 rounded-sm border uppercase tracking-widest whitespace-nowrap"
      style={{ color, borderColor: color, background: `${color}12` }}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${pulse} animate-pulse`} />
      {status}
    </span>
  );
};

// ─── Screenshot Frame ─────────────────────────────────────────────────────────
const ScreenshotFrame = ({
  src,
  alt,
  url,
  accentColor,
  glowColor,
  hovered,
}: {
  src: string;
  alt: string;
  url?: string;
  accentColor: string;
  glowColor: string;
  hovered: boolean;
}) => {
  const displayUrl = url ?? `${alt.toLowerCase().replace(/\s/g, "")}.com`;

  return (
    <div className="relative w-full h-full">
      {/* Outer glow ring */}
      <motion.div
        className="absolute -inset-[2px] rounded-xl z-0"
        animate={{
          boxShadow: hovered
            ? `0 0 0 1px ${accentColor}80, 0 0 24px ${glowColor}, 0 0 48px ${glowColor}50`
            : `0 0 0 1px ${accentColor}30`,
        }}
        transition={{ duration: 0.4 }}
        style={{ borderRadius: "12px" }}
      />

      {/* Browser chrome bar */}
      <div
        className="relative z-10 rounded-t-xl px-3 py-2 flex items-center gap-2"
        style={{
          background: `linear-gradient(180deg, ${accentColor}18, ${accentColor}08)`,
          borderTop: `1px solid ${accentColor}40`,
          borderLeft: `1px solid ${accentColor}40`,
          borderRight: `1px solid ${accentColor}40`,
        }}
      >
        {/* Traffic lights */}
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: `${accentColor}90` }} />

        {/* URL bar */}
        <div
          className="flex-1 mx-2 px-3 py-0.5 rounded text-[10px] font-mono truncate"
          style={{
            background: "rgba(0,0,0,0.4)",
            color: `${accentColor}90`,
            border: `1px solid ${accentColor}20`,
          }}
        >
          https://{displayUrl}
        </div>
      </div>

      {/* Screenshot image */}
      <div
        className="relative z-10 overflow-hidden rounded-b-xl"
        style={{
          border: `1px solid ${accentColor}30`,
          borderTop: "none",
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={900}
          height={540}
          className="w-full object-cover object-top transition-transform duration-700"
          style={{
            transform: hovered ? "scale(1.03)" : "scale(1)",
            display: "block",
            maxHeight: "340px",
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: "linear-gradient(to top, #0f172a, transparent)" }}
        />
      </div>
    </div>
  );
};

// ─── Featured Card ────────────────────────────────────────────────────────────
const FeaturedCard = ({ project }: { project: Project }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative col-span-full rounded-2xl overflow-hidden cursor-pointer"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      style={{
        boxShadow: hovered
          ? `0 0 60px ${project.glowColor}, 0 0 100px ${project.glowColor}30`
          : `0 0 0 1px rgba(255,255,255,0.07)`,
        transition: "box-shadow 0.5s ease",
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
      <ScanlineOverlay />

      {/* Corner glows */}
      <div
        className="absolute top-0 right-0 w-64 h-64 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${project.accentColor}25, transparent 70%)`,
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-48 h-48 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at bottom left, ${project.accentColor}20, transparent 70%)`,
        }}
      />

      {/* Left accent bar */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{
          background: `linear-gradient(180deg, ${project.accentColor}, ${project.accentColor}20)`,
        }}
        animate={{ opacity: hovered ? 1 : 0.5 }}
      />

      {/* Layout: image | text */}
      <div className="relative z-10 flex flex-col lg:flex-row gap-0">
        {/* Image — left 58% */}
        <div className="lg:w-[58%] p-6 pb-0 lg:pb-6 lg:pr-0 flex items-center">
          <div className="w-full">
            <ScreenshotFrame
              src={project.image}
              alt={project.title}
              url={project.url}
              accentColor={project.accentColor}
              glowColor={project.glowColor}
              hovered={hovered}
            />
          </div>
        </div>

        {/* Info — right 42% */}
        <div className="lg:w-[42%] p-7 lg:p-10 flex flex-col justify-center">
          {/* Meta */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span
                className="font-mono text-[11px] tracking-[0.3em] font-bold"
                style={{ color: project.accentColor }}
              >
                {project.code}
              </span>
              <span
                className="font-mono text-[10px] tracking-widest uppercase"
                style={{ color: `${project.accentColor}50` }}
              >
                · FEATURED
              </span>
            </div>
            <StatusBadge status={project.status} />
          </div>

          {/* Category pill */}
          <span
            className="inline-flex w-fit text-[10px] font-mono font-bold px-2.5 py-1 rounded-full mb-4 uppercase tracking-widest"
            style={{ background: `${project.accentColor}15`, color: project.accentColor }}
          >
            {project.category}
          </span>

          <h3
            className="text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight transition-all duration-300"
            style={{
              textShadow: hovered ? `0 0 24px ${project.accentColor}70` : "none",
            }}
          >
            {project.title}
          </h3>

          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            {project.longDescription}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-[11px] font-mono px-2.5 py-1 rounded-sm border bg-black/20"
                style={{
                  borderColor: `${project.accentColor}35`,
                  color: `${project.accentColor}CC`,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-black"
                style={{
                  background: project.accentColor,
                  boxShadow: `0 0 20px ${project.glowColor}`,
                }}
              >
                <ExternalLink size={14} />
                Live Demo
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold border"
                style={{
                  color: project.accentColor,
                  borderColor: `${project.accentColor}50`,
                  background: `${project.accentColor}0D`,
                }}
              >
                <Github size={14} />
                Source
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Regular Card ─────────────────────────────────────────────────────────────
const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden cursor-pointer flex flex-col"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 200, damping: 20 }}
      whileHover={{ y: -6 }}
      style={{
        boxShadow: hovered
          ? `0 0 32px ${project.glowColor}, inset 0 0 0 1px ${project.accentColor}45`
          : `0 0 0 1px rgba(255,255,255,0.07)`,
        transition: "box-shadow 0.35s ease",
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
      <ScanlineOverlay />

      {/* Top accent line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] z-20"
        style={{
          background: `linear-gradient(90deg, ${project.accentColor}, ${project.accentColor}30, transparent)`,
        }}
        animate={{ opacity: hovered ? 1 : 0.35 }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Thumbnail */}
        <div className="relative overflow-hidden" style={{ height: "180px" }}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top transition-transform duration-700"
            style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, transparent 40%, #0f172a 100%)",
            }}
          />
          {/* Neon tint on hover */}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: hovered ? 0.15 : 0 }}
            style={{ background: project.accentColor }}
          />
          {/* Code badge */}
          <div className="absolute top-3 left-3">
            <span
              className="font-mono text-[10px] font-bold tracking-[0.25em] px-2 py-1 rounded-sm"
              style={{
                color: project.accentColor,
                background: "rgba(0,0,0,0.65)",
                border: `1px solid ${project.accentColor}40`,
                backdropFilter: "blur(4px)",
              }}
            >
              {project.code}
            </span>
          </div>
          {/* Status badge */}
          <div className="absolute top-3 right-3">
            <StatusBadge status={project.status} />
          </div>
        </div>

        {/* Info */}
        <div className="p-5 flex flex-col flex-1">
          <span
            className="inline-flex w-fit text-[10px] font-mono font-bold px-2 py-0.5 rounded-full mb-3 uppercase tracking-widest"
            style={{ background: `${project.accentColor}12`, color: project.accentColor }}
          >
            {project.category}
          </span>

          <h3
            className="text-lg font-bold text-white mb-2 transition-all duration-300"
            style={{ textShadow: hovered ? `0 0 14px ${project.accentColor}60` : "none" }}
          >
            {project.title}
          </h3>

          <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[10px] font-mono px-2 py-0.5 rounded-sm border"
                style={{
                  borderColor: `${project.accentColor}28`,
                  color: `${project.accentColor}AA`,
                }}
              >
                {t}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="text-[10px] font-mono px-2 py-0.5 text-slate-600">
                +{project.tech.length - 3}
              </span>
            )}
          </div>

          {/* Links */}
          <div
            className="flex items-center gap-2 pt-2 border-t"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-md flex-1 justify-center"
                style={{
                  color: "#000",
                  background: project.accentColor,
                  boxShadow: hovered ? `0 0 12px ${project.glowColor}` : "none",
                }}
              >
                <ArrowUpRight size={12} />
                Live
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-md border flex-1 justify-center"
                style={{
                  color: project.accentColor,
                  borderColor: `${project.accentColor}45`,
                  background: `${project.accentColor}0A`,
                }}
              >
                <Github size={12} />
                Code
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filtered =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  const featured = filtered.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-slate-900 py-24 px-4 overflow-hidden"
    >
      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,240,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient blobs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-[0.045] blur-[120px] bg-cyan-400 pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full opacity-[0.045] blur-[120px] bg-purple-500 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-cyan-400 tracking-[0.4em] uppercase">
              04 / PROJECTS
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/40 to-transparent" />
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Selected{" "}
            <span
              style={{
                color: "#00F0FF",
                textShadow:
                  "0 0 30px rgba(0,240,255,0.6), 0 0 60px rgba(0,240,255,0.25)",
              }}
            >
              Works
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl">
            A collection of projects built with precision — from payment platforms to consumer apps.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat;
            return (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-4 py-2 text-sm font-mono font-semibold rounded-lg border transition-all duration-200"
                style={{
                  color: active ? "#000" : "#94a3b8",
                  borderColor: active ? "#00F0FF" : "rgba(255,255,255,0.1)",
                  background: active ? "#00F0FF" : "rgba(255,255,255,0.03)",
                  boxShadow: active ? "0 0 16px rgba(0,240,255,0.4)" : "none",
                }}
              >
                {cat}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="flex flex-col gap-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Featured */}
            {featured && <FeaturedCard project={featured} />}

            {/* Rest — 3 col */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {rest.map((p, i) => (
                  <ProjectCard key={p.id} project={p} index={i} />
                ))}
              </div>
            )}

            {/* No featured (filtered state) */}
            {!featured && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((p, i) => (
                  <ProjectCard key={p.id} project={p} index={i} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm border transition-all duration-300"
            style={{
              color: "#00F0FF",
              borderColor: "rgba(0,240,255,0.35)",
              background: "rgba(0,240,255,0.04)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 24px rgba(0,240,255,0.3)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                "rgba(0,240,255,0.8)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                "rgba(0,240,255,0.35)";
            }}
          >
            <Github size={16} />
            View All on GitHub
            <ArrowUpRight size={14} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}