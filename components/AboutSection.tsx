"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download } from "lucide-react";

// ─────────────────────────────────────────────
// Orbit Math Helper
// ─────────────────────────────────────────────
function getOrbitKeyframes(radius: number, startAngle: number, points = 60) {
  const xs: number[] = [];
  const ys: number[] = [];
  for (let i = 0; i <= points; i++) {
    const angle = startAngle + (i / points) * 2 * Math.PI;
    xs.push(parseFloat((Math.cos(angle) * radius).toFixed(2)));
    ys.push(parseFloat((Math.sin(angle) * radius).toFixed(2)));
  }
  return { x: xs, y: ys };
}

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────
const CONTAINER_SIZE = 580;
const CENTER = CONTAINER_SIZE / 2;
const INNER_R = 155;
const OUTER_R = 262;
const BADGE_W = 110;
const BADGE_H = 34;

// ─────────────────────────────────────────────
// Tech Stack Data
// ─────────────────────────────────────────────
interface TechItem {
  name: string;
  color: string;
  bg: string;
  radius: number;
  startAngle: number;
  duration: number;
}

const techItems: TechItem[] = [
  // Inner orbit — 3 items
  {
    name: "React",
    color: "#61DAFB",
    bg: "rgba(97,218,251,0.1)",
    radius: INNER_R,
    startAngle: 0,
    duration: 13,
  },
  {
    name: "Next.js",
    color: "#e2e8f0",
    bg: "rgba(226,232,240,0.08)",
    radius: INNER_R,
    startAngle: (2 * Math.PI) / 3,
    duration: 13,
  },
  {
    name: "TypeScript",
    color: "#60A5FA",
    bg: "rgba(96,165,250,0.1)",
    radius: INNER_R,
    startAngle: (4 * Math.PI) / 3,
    duration: 13,
  },
  // Outer orbit — 5 items (counter-clockwise)
  {
    name: "Tailwind",
    color: "#22D3EE",
    bg: "rgba(34,211,238,0.1)",
    radius: OUTER_R,
    startAngle: 0.4,
    duration: -22,
  },
  {
    name: "Framer",
    color: "#C084FC",
    bg: "rgba(192,132,252,0.1)",
    radius: OUTER_R,
    startAngle: 0.4 + (2 * Math.PI) / 5,
    duration: -22,
  },
  {
    name: "Node.js",
    color: "#4ADE80",
    bg: "rgba(74,222,128,0.1)",
    radius: OUTER_R,
    startAngle: 0.4 + (4 * Math.PI) / 5,
    duration: -22,
  },
  {
    name: "Redux",
    color: "#A78BFA",
    bg: "rgba(167,139,250,0.1)",
    radius: OUTER_R,
    startAngle: 0.4 + (6 * Math.PI) / 5,
    duration: -22,
  },
  {
    name: "Git",
    color: "#FB923C",
    bg: "rgba(251,146,60,0.1)",
    radius: OUTER_R,
    startAngle: 0.4 + (8 * Math.PI) / 5,
    duration: -22,
  },
];

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  const socialLinks = [
    { icon: <Github className="w-4 h-4" />, href: "#", label: "GitHub" },
    { icon: <Linkedin className="w-4 h-4" />, href: "#", label: "LinkedIn" },
    { icon: <Mail className="w-4 h-4" />, href: "#", label: "Email" },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-black py-24"
    >
      {/* ── Ambient Background Glows ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 rounded-full bg-cyan-500/5 blur-3xl"
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 right-20 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl"
          animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-pink-500/3 blur-3xl"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ── Main Grid ── */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center"
        >
          {/* ════════════════════════════════
              LEFT — 3D Tech Orbit
          ════════════════════════════════ */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center lg:justify-center"
          >
            <div
              className="relative shrink-0"
              style={{ width: CONTAINER_SIZE, height: CONTAINER_SIZE }}
            >
              {/* Outer ambient glow */}
              <div
                className="absolute rounded-full"
                style={{
                  width: OUTER_R * 2 + 60,
                  height: OUTER_R * 2 + 60,
                  top: CENTER - OUTER_R - 30,
                  left: CENTER - OUTER_R - 30,
                  background:
                    "radial-linear(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)",
                }}
              />

              {/* Outer orbit ring */}
              <div
                className="absolute rounded-full border border-purple-500/15"
                style={{
                  width: OUTER_R * 2,
                  height: OUTER_R * 2,
                  top: CENTER - OUTER_R,
                  left: CENTER - OUTER_R,
                }}
              />

              {/* Inner orbit ring */}
              <div
                className="absolute rounded-full border border-cyan-500/20"
                style={{
                  width: INNER_R * 2,
                  height: INNER_R * 2,
                  top: CENTER - INNER_R,
                  left: CENTER - INNER_R,
                }}
              />

              {/* ── Central Card ── */}
              <div
                className="absolute"
                style={{
                  top: CENTER - 64,
                  left: CENTER - 92,
                }}
              >
                {/* Glow behind card */}
                <div className="absolute -inset-6 bg-linear-to-r from-cyan-500/25 via-purple-500/25 to-pink-500/25 rounded-2xl blur-2xl" />

                {/* Card */}
                <div className="relative bg-slate-900/85 backdrop-blur-xl border border-slate-600/50 rounded-2xl px-10 py-7 text-center shadow-2xl">
                  <motion.div
                    className="text-3xl font-bold font-mono mb-1.5"
                    style={{
                      background: "linear-linear(90deg, #00f0ff, #b000ff)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    &lt;/&gt;
                  </motion.div>
                  <div className="text-white font-bold text-base tracking-wide">
                    Bagas Gemilang
                  </div>
                  <div className="text-cyan-400 text-xs font-medium mt-1 tracking-widest uppercase">
                    Frontend Dev
                  </div>
                </div>
              </div>

              {/* ── Orbiting Tech Badges ── */}
              {techItems.map((tech) => {
                const absDuration = Math.abs(tech.duration);
                const isReverse = tech.duration < 0;

                const { x: rawX, y: rawY } = getOrbitKeyframes(
                  tech.radius,
                  tech.startAngle
                );
                const animX = rawX.map(
                  (v) => (isReverse ? -v : v) + CENTER - BADGE_W / 2
                );
                const animY = rawY.map((v) => v + CENTER - BADGE_H / 2);

                return (
                  <motion.div
                    key={tech.name}
                    className="absolute left-0 top-0 flex items-center justify-center"
                    style={{ width: BADGE_W, height: BADGE_H }}
                    animate={{ x: animX, y: animY }}
                    transition={{
                      duration: absDuration,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm whitespace-nowrap select-none"
                      style={{
                        color: tech.color,
                        background: tech.bg,
                        borderColor: `${tech.color}45`,
                        boxShadow: `0 0 14px ${tech.color}28, inset 0 0 8px ${tech.color}10`,
                        fontSize: "11px",
                      }}
                    >
                      {tech.name}
                    </span>
                  </motion.div>
                );
              })}

              {/* ── Ambient floating dots ── */}
              {[
                { top: "18%", left: "8%", color: "rgba(0,240,255,0.5)", d: 2.1 },
                { top: "72%", left: "12%", color: "rgba(176,0,255,0.5)", d: 1.6 },
                { top: "30%", left: "88%", color: "rgba(255,0,110,0.5)", d: 2.4 },
                { top: "80%", left: "80%", color: "rgba(0,240,255,0.4)", d: 1.9 },
                { top: "55%", left: "5%", color: "rgba(176,0,255,0.4)", d: 2.7 },
              ].map((dot, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{ top: dot.top, left: dot.left, background: dot.color }}
                  animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.4, 0.8] }}
                  transition={{ duration: dot.d, repeat: Infinity, delay: i * 0.4 }}
                />
              ))}
            </div>
          </motion.div>

          {/* ════════════════════════════════
              RIGHT — Professional Content
          ════════════════════════════════ */}
          <motion.div variants={itemVariants} className="space-y-7">
            {/* ── Section Label ── */}
            <div className="flex items-center gap-3">
              <motion.div
                className="h-px bg-linear-to-r from-cyan-500 to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              />
              <span className="text-cyan-400 font-semibold text-xs tracking-[0.25em] uppercase">
                About Me
              </span>
            </div>

            {/* ── Headline ── */}
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.1]">
              I Don't Just Build UIs.{" "}
              <span className="relative inline-block mt-1">
                <span
                  className="relative z-10 bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-linear(90deg, #00f0ff, #b000ff, #ff006e)",
                  }}
                >
                  I Engineer Experiences.
                </span>
                <span
                  className="absolute inset-0 blur-2xl opacity-35 -z-10"
                  style={{
                    backgroundImage:
                      "linear-linear(90deg, #00f0ff, #b000ff, #ff006e)",
                  }}
                />
              </span>
            </h2>

            {/* ── Bio ── */}
            <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-xl">
              Frontend Developer with a sharp focus on{" "}
              <span className="text-cyan-400 font-semibold">fintech</span> and{" "}
              <span className="text-purple-400 font-semibold">e-commerce</span>
              . I bridge the gap between pixel-perfect design and production-grade
              engineering—delivering interfaces that are fast, scalable, and
              trusted by users handling{" "}
              <span className="text-white font-semibold">
                thousands of transactions daily.
              </span>
            </p>

            {/* ── Stats Row ── */}
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  metric: "2+",
                  line1: "Years in",
                  line2: "Fintech",
                  linear: "from-cyan-400 to-blue-400",
                  glow: "rgba(0,240,255,0.15)",
                },
                {
                  metric: "10+",
                  line1: "Projects",
                  line2: "Shipped",
                  linear: "from-purple-400 to-pink-400",
                  glow: "rgba(176,0,255,0.15)",
                },
                {
                  metric: "5+",
                  line1: "Satisfied",
                  line2: "Clients",
                  linear: "from-pink-400 to-rose-400",
                  glow: "rgba(255,0,110,0.15)",
                },
              ].map((s) => (
                <motion.div
                  key={s.metric}
                  whileHover={{ scale: 1.04, boxShadow: `0 0 28px ${s.glow}` }}
                  className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 text-center hover:border-slate-500/60 transition-all duration-300 cursor-default"
                >
                  <div
                    className={`text-2xl font-bold bg-linear-to-r ${s.linear} bg-clip-text text-transparent`}
                  >
                    {s.metric}
                  </div>
                  <div className="text-slate-400 text-xs mt-1.5 font-medium leading-tight">
                    {s.line1}
                    <br />
                    {s.line2}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ── Currently Building Card ── */}
            <motion.div
              whileHover={{ borderColor: "rgba(0,240,255,0.35)" }}
              className="bg-slate-900/40 border border-slate-700/50 rounded-xl p-4 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-slate-500 text-[10px] font-semibold uppercase tracking-[0.2em]">
                  Currently Building
                </span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-white font-bold text-base">Sibayar</div>
                  <div className="text-slate-400 text-sm mt-0.5 leading-snug">
                    Payment aggregator platform · Fintech infrastructure
                  </div>
                </div>
                <span className="shrink-0 px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-semibold">
                  Full-time
                </span>
              </div>
              <div className="mt-3 flex gap-2 flex-wrap">
                {["React", "TypeScript", "Next.js", "Tailwind"].map((t) => (
                  <span
                    key={t}
                    className="text-xs text-slate-500 bg-slate-800/60 px-2.5 py-0.5 rounded-md border border-slate-700/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* ── Previous Clients ── */}
            <div className="flex items-center gap-3 text-sm">
              <span className="text-slate-500 text-xs font-medium uppercase tracking-wider shrink-0">
                Also built for
              </span>
              <div className="h-px flex-1 bg-slate-800" />
              <div className="flex gap-2">
                {["Bosstopup", "Easyday", "Sahabat Topup"].map((c) => (
                  <span
                    key={c}
                    className="text-xs text-slate-400 bg-slate-800/50 border border-slate-700/50 px-2.5 py-1 rounded-lg"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* ── CTA Row ── */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(0,240,255,0.4)" }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 bg-linear-to-r from-cyan-500 to-purple-600 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </motion.button>

              <div className="flex gap-2">
                {socialLinks.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-slate-800/60 border border-slate-700/50 rounded-lg flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300"
                    aria-label={s.label}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-slate-400 text-xs">Open to freelance</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom linear separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan-500/40 to-transparent" />
    </section>
  );
}