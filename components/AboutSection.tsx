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
const CONTAINER_SIZE = 620;
const CENTER = CONTAINER_SIZE / 2;
const INNER_R = 155;
const MID_R = 220;
const OUTER_R = 290;
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

  {
    name: "Tailwind",
    color: "#22D3EE",
    bg: "rgba(34,211,238,0.1)",
    radius: MID_R,
    startAngle: 0.2,
    duration: -18,
  },
  {
    name: "Framer",
    color: "#C084FC",
    bg: "rgba(192,132,252,0.1)",
    radius: MID_R,
    startAngle: 0.2 + (2 * Math.PI) / 4,
    duration: -18,
  },
  {
    name: "Node.js",
    color: "#4ADE80",
    bg: "rgba(74,222,128,0.1)",
    radius: MID_R,
    startAngle: 0.2 + (4 * Math.PI) / 4,
    duration: -18,
  },
  {
    name: "Redux",
    color: "#A78BFA",
    bg: "rgba(167,139,250,0.1)",
    radius: MID_R,
    startAngle: 0.2 + (6 * Math.PI) / 4,
    duration: -18,
  },

  {
    name: "Flutter",
    color: "#38BDF8",
    bg: "rgba(56,189,248,0.1)",
    radius: OUTER_R,
    startAngle: 0.5,
    duration: 28,
  },
  {
    name: "Laravel",
    color: "#FB7185",
    bg: "rgba(251,113,133,0.1)",
    radius: OUTER_R,
    startAngle: 0.5 + (2 * Math.PI) / 6,
    duration: 28,
  },
  {
    name: "Docker",
    color: "#60A5FA",
    bg: "rgba(96,165,250,0.1)",
    radius: OUTER_R,
    startAngle: 0.5 + (4 * Math.PI) / 6,
    duration: 28,
  },
  {
    name: "Git",
    color: "#FB923C",
    bg: "rgba(251,146,60,0.1)",
    radius: OUTER_R,
    startAngle: 0.5 + (6 * Math.PI) / 6,
    duration: 28,
  },
  {
    name: "Figma",
    color: "#F472B6",
    bg: "rgba(244,114,182,0.1)",
    radius: OUTER_R,
    startAngle: 0.5 + (8 * Math.PI) / 6,
    duration: 28,
  },
  {
    name: "Dart",
    color: "#34D399",
    bg: "rgba(52,211,153,0.1)",
    radius: OUTER_R,
    startAngle: 0.5 + (10 * Math.PI) / 6,
    duration: 28,
  },
];

// ─────────────────────────────────────────────
// Spark Particle
// ─────────────────────────────────────────────
const SPARKS = [
  { r: INNER_R, angle: 1.0, color: "#61DAFB", delay: 0, dur: 3.2 },
  { r: INNER_R, angle: 3.2, color: "#60A5FA", delay: 1.1, dur: 2.8 },
  { r: MID_R, angle: 0.5, color: "#22D3EE", delay: 0.4, dur: 4.0 },
  { r: MID_R, angle: 2.4, color: "#C084FC", delay: 1.8, dur: 3.5 },
  { r: MID_R, angle: 4.8, color: "#4ADE80", delay: 0.9, dur: 3.1 },
  { r: OUTER_R, angle: 1.2, color: "#FB7185", delay: 0.2, dur: 5.0 },
  { r: OUTER_R, angle: 3.0, color: "#38BDF8", delay: 2.0, dur: 4.5 },
  { r: OUTER_R, angle: 5.1, color: "#FB923C", delay: 1.4, dur: 3.8 },
  { r: OUTER_R, angle: 2.2, color: "#F472B6", delay: 0.7, dur: 4.2 },
];

function SparkParticle({ spark }: { spark: (typeof SPARKS)[0] }) {
  const x = CENTER + Math.cos(spark.angle) * spark.r;
  const y = CENTER + Math.sin(spark.angle) * spark.r;
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: 4,
        height: 4,
        left: x - 2,
        top: y - 2,
        background: spark.color,
        boxShadow: `0 0 8px ${spark.color}, 0 0 16px ${spark.color}80`,
      }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0.5, 1.8, 0.5],
        x: [0, (Math.random() - 0.5) * 24],
        y: [0, (Math.random() - 0.5) * 24],
      }}
      transition={{
        duration: spark.dur,
        delay: spark.delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

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
    {
      icon: <Github className="w-4 h-4" />,
      href: "https://github.com/bagasgmlngr",
      label: "GitHub",
    },
    {
      icon: <Linkedin className="w-4 h-4" />,
      href: "https://www.linkedin.com/in/bagas-gemilang-74265a24b/",
      label: "LinkedIn",
    },
    {
      icon: <Mail className="w-4 h-4" />,
      href: "mailto:bagasgr95@gmail.com",
      label: "Email",
    },
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
                  width: OUTER_R * 2 + 80,
                  height: OUTER_R * 2 + 80,
                  top: CENTER - OUTER_R - 40,
                  left: CENTER - OUTER_R - 40,
                  background:
                    "radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)",
                }}
              />

              {/* Orbit rings */}
              {[OUTER_R, MID_R, INNER_R].map((r, i) => (
                <div
                  key={r}
                  className="absolute rounded-full"
                  style={{
                    width: r * 2,
                    height: r * 2,
                    top: CENTER - r,
                    left: CENTER - r,
                    border: `1px solid ${["rgba(139,92,246,0.12)", "rgba(34,211,238,0.14)", "rgba(0,240,255,0.18)"][i]}`,
                  }}
                />
              ))}

              {/* Spark particles */}
              {SPARKS.map((spark, i) => (
                <SparkParticle key={i} spark={spark} />
              ))}

              {/* Central Card — sama seperti sebelumnya */}
              <div
                className="absolute"
                style={{ top: CENTER - 70, left: CENTER - 102 }}
              >
                <div className="absolute -inset-6 bg-linear-to-r from-cyan-500/25 via-purple-500/25 to-pink-500/25 rounded-2xl blur-2xl" />
                <div className="relative bg-slate-900/85 backdrop-blur-xl border border-slate-600/50 rounded-2xl px-10 py-7 text-center shadow-2xl">
                  <motion.div
                    className="text-3xl font-bold font-mono mb-1.5"
                    style={{
                      background: "linear-gradient(90deg, #00f0ff, #b000ff)",
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

              {/* Orbiting badges */}
              {techItems.map((tech) => {
                const absDuration = Math.abs(tech.duration);
                const isReverse = tech.duration < 0;
                const { x: rawX, y: rawY } = getOrbitKeyframes(
                  tech.radius,
                  tech.startAngle,
                );
                const animX = rawX.map(
                  (v) => (isReverse ? -v : v) + CENTER - BADGE_W / 2,
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

              {/* Ambient floating dots — sama */}
              {[
                {
                  top: "12%",
                  left: "6%",
                  color: "rgba(0,240,255,0.5)",
                  d: 2.1,
                },
                {
                  top: "75%",
                  left: "10%",
                  color: "rgba(176,0,255,0.5)",
                  d: 1.6,
                },
                {
                  top: "25%",
                  left: "90%",
                  color: "rgba(255,0,110,0.5)",
                  d: 2.4,
                },
                {
                  top: "82%",
                  left: "82%",
                  color: "rgba(0,240,255,0.4)",
                  d: 1.9,
                },
                {
                  top: "50%",
                  left: "3%",
                  color: "rgba(176,0,255,0.4)",
                  d: 2.7,
                },
              ].map((dot, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    top: dot.top,
                    left: dot.left,
                    background: dot.color,
                  }}
                  animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.4, 0.8] }}
                  transition={{
                    duration: dot.d,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
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
              Frontend Developer passionate about building digital experiences
              that feel{" "}
              <span className="text-cyan-400 font-semibold">simple</span>,{" "}
              <span className="text-purple-400 font-semibold">intuitive</span>,
              and enjoyable to use. I enjoy turning ideas into interfaces,
              constantly learning new technologies while staying focused on what
              matters most:{" "}
              <span className="text-white font-semibold">
                creating better experiences for users.
              </span>
            </p>

            {/* ── Stats Row ── */}
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  metric: "3+",
                  line1: "Years",
                  line2: "Coding",
                  linear: "from-cyan-400 to-blue-400",
                  glow: "rgba(0,240,255,0.15)",
                },
                {
                  metric: "10+",
                  line1: "Projects",
                  line2: "Built",
                  linear: "from-purple-400 to-pink-400",
                  glow: "rgba(176,0,255,0.15)",
                },
                {
                  metric: "∞",
                  line1: "Learning & ",
                  line2: "Growing",
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
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  label: "Frontend Engineering",
                  desc: "Building fast, scalable UI with modern frameworks",
                  color: "#00F0FF",
                  glow: "rgba(0,240,255,0.15)",
                },
                {
                  label: "Product Development",
                  desc: "Shipping end-to-end features from idea to production",
                  color: "#B000FF",
                  glow: "rgba(176,0,255,0.15)",
                },
                {
                  label: "User Experience",
                  desc: "Crafting interfaces that feel intuitive and delightful",
                  color: "#FF006E",
                  glow: "rgba(255,0,110,0.15)",
                },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: `0 0 24px ${item.glow}`,
                  }}
                  className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 flex flex-col gap-2 transition-all duration-300 cursor-default"
                  style={{ borderColor: "rgba(255,255,255,0.07)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      `${item.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      "rgba(255,255,255,0.07)";
                  }}
                >
                  <div
                    className="text-sm font-bold leading-tight"
                    style={{ color: item.color }}
                  >
                    {item.label}
                  </div>
                  <div className="text-slate-500 text-xs leading-relaxed">
                    {item.desc}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ── Beyond Coding ── */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-slate-500 text-xs font-medium uppercase tracking-wider shrink-0">
                Beyond Coding
              </span>
              <div className="h-px flex-1 bg-slate-800 min-w-5" />
              <div className="flex items-center gap-4 flex-wrap">
                {[
                  { icon: "☕", label: "Coffee", color: "#00F0FF" },
                  { icon: "🎧", label: "Music", color: "#B000FF" },
                  { icon: "💡", label: "Building Ideas", color: "#FF006E" },
                  { icon: "🎮", label: "Gaming", color: "#00F0FF" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-1.5">
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{
                        background: item.color,
                        boxShadow: `0 0 6px ${item.color}`,
                      }}
                    />
                    <span className="text-xs text-slate-400">
                      {item.icon} {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── CTA Row ── */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <motion.button
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 30px rgba(0,240,255,0.4)",
                }}
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
                <span className="text-slate-400 text-xs">
                  Open to freelance
                </span>
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
