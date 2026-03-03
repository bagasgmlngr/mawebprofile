"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Skill {
  name: string;
  level: number;
  icon: string;
}

interface SkillCategory {
  id: string;
  label: string;
  color: string;
  glowHex: string;
  skills: Skill[];
}

// ─── Data ────────────────────────────────────────────────────────────────────
const CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    color: "text-cyan-400",
    glowHex: "#00f0ff",
    skills: [
      { name: "React.js",      level: 90, icon: "⚛" },
      { name: "Next.js",       level: 99, icon: "▲" },
      { name: "TypeScript",    level: 99, icon: "TS" },
      { name: "JavaScript",    level: 90, icon: "JS" },
      { name: "Vue.js",        level: 75, icon: "🟩" },
      { name: "Tailwind CSS",  level: 99, icon: "🌊" },
      { name: "Bootstrap",     level: 80, icon: "🅱" },
      { name: "Shadcn/ui",     level: 95, icon: "◈" },
      { name: "Framer Motion", level: 78, icon: "✦" },
      { name: "HTML / CSS",    level: 97, icon: "</>" },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    color: "text-purple-400",
    glowHex: "#b000ff",
    skills: [
      { name: "React Native",  level: 70, icon: "📱" },
      { name: "Flutter",       level: 90, icon: "🐦" },
      { name: "Dart",          level: 88, icon: "◎" },
      { name: "Expo",          level: 70, icon: "🚀" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    color: "text-blue-400",
    glowHex: "#0080ff",
    skills: [
      { name: "Laravel",       level: 72, icon: "🔴" },
      { name: "PHP",           level: 75, icon: "🐘" },
      { name: "Node.js",       level: 95, icon: "🟢" },
      { name: "REST API",      level: 90, icon: "⇄" },
    ],
  },
  {
    id: "tools",
    label: "Tools & DevOps",
    color: "text-pink-400",
    glowHex: "#ff006e",
    skills: [
      { name: "Git / GitHub",  level: 88, icon: "⎇" },
      { name: "Docker",        level: 68, icon: "🐳" },
      { name: "XAMPP",         level: 80, icon: "🖥" },
      { name: "Postman",       level: 80, icon: "📬" },
      { name: "Figma",         level: 82, icon: "🎨" },
      { name: "VS Code",       level: 94, icon: "⬡" },
    ],
  },
];

// ─── SkillBar ─────────────────────────────────────────────────────────────────
function SkillBar({
  level,
  glowHex,
  delay,
  triggered,
}: {
  level: number;
  glowHex: string;
  delay: number;
  triggered: boolean;
}) {
  return (
    <div className="relative h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{
          background: `linear-gradient(90deg, ${glowHex}88, ${glowHex})`,
          boxShadow: `0 0 8px ${glowHex}`,
        }}
        initial={{ width: 0 }}
        animate={{ width: triggered ? `${level}%` : "0%" }}
        transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

// ─── SkillRow ─────────────────────────────────────────────────────────────────
function SkillRow({
  skill,
  glowHex,
  index,
  triggered,
}: {
  skill: Skill;
  glowHex: string;
  index: number;
  triggered: boolean;
}) {
  return (
    <motion.div
      className="group flex flex-col gap-1.5"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: triggered ? 1 : 0, x: triggered ? 0 : -20 }}
      transition={{ duration: 0.4, delay: 0.04 * index }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-mono w-7 text-center opacity-60 group-hover:opacity-100 transition-opacity"
            style={{ color: glowHex }}
          >
            {skill.icon}
          </span>
          <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
            {skill.name}
          </span>
        </div>
        <span className="text-xs font-mono tabular-nums" style={{ color: glowHex }}>
          {skill.level}%
        </span>
      </div>
      <SkillBar
        level={skill.level}
        glowHex={glowHex}
        delay={0.04 * index + 0.15}
        triggered={triggered}
      />
    </motion.div>
  );
}

// ─── CategoryCard ─────────────────────────────────────────────────────────────
function CategoryCard({
  category,
  isActive,
  onClick,
}: {
  category: SkillCategory;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="relative px-5 py-2.5 rounded-lg text-sm font-semibold font-mono transition-all duration-300 border"
      style={{
        background: isActive ? `${category.glowHex}18` : "transparent",
        borderColor: isActive ? `${category.glowHex}80` : "#334155",
        color: isActive ? category.glowHex : "#94a3b8",
        boxShadow: isActive ? `0 0 16px ${category.glowHex}40` : "none",
      }}
    >
      {isActive && (
        <motion.span
          layoutId="active-dot"
          className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
          style={{
            background: category.glowHex,
            boxShadow: `0 0 6px ${category.glowHex}`,
          }}
        />
      )}
      {category.label}
    </motion.button>
  );
}

// ─── HUD Decorations ──────────────────────────────────────────────────────────
function HUDLines() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-12 left-8 w-16 h-16 border-l-2 border-t-2 border-cyan-500/20" />
      <div className="absolute bottom-12 right-8 w-16 h-16 border-r-2 border-b-2 border-purple-500/20" />
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
        initial={{ top: "20%" }}
        animate={{ top: "80%" }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
      />
      {[
        { top: "15%", left: "5%",  size: 60, color: "#00f0ff", opacity: 0.05, duration: 8 },
        { top: "70%", right: "6%", size: 90, color: "#b000ff", opacity: 0.05, duration: 11 },
        { top: "40%", left: "2%",  size: 40, color: "#ff006e", opacity: 0.07, duration: 7 },
      ].map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{
            width: s.size,
            height: s.size,
            top: s.top,
            left: "left" in s ? (s as { left: string }).left : undefined,
            right: "right" in s ? (s as { right: string }).right : undefined,
            borderColor: s.color,
            opacity: s.opacity,
            boxShadow: `0 0 20px ${s.color}`,
          }}
          animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
          transition={{ duration: s.duration, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function SkillsSection() {
  const [activeId, setActiveId] = useState<string>("frontend");
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const active = CATEGORIES.find((c) => c.id === activeId)!;

  // Trigger animasi saat section masuk viewport
  useEffect(() => {
    if (inView) setTriggered(true);
  }, [inView]);

  // Re-trigger animasi saat ganti tab
  const handleTabChange = (id: string) => {
    setTriggered(false);
    setActiveId(id);
    setTimeout(() => setTriggered(true), 50);
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-24 px-4 bg-slate-950 overflow-hidden"
    >
      <HUDLines />

      {/* ── Section Header ── */}
      <motion.div
        className="text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className="text-xs font-mono text-cyan-400 tracking-[0.3em] uppercase mb-3">
          — System Scan —
        </p>
        <h2
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          style={{ textShadow: "0 0 30px #00f0ff60" }}
        >
          My{" "}
          <span
            style={{
              color: "#00f0ff",
              textShadow: "0 0 20px #00f0ff, 0 0 50px #00f0ff80",
            }}
          >
            Skills
          </span>
        </h2>
        <p className="text-slate-400 max-w-md mx-auto text-sm leading-relaxed">
          Technologies and tools I use to craft seamless, pixel-perfect digital experiences.
        </p>
        <div className="flex items-center justify-center gap-3 mt-6">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-500/60" />
          <div
            className="w-1.5 h-1.5 rounded-full bg-cyan-400"
            style={{ boxShadow: "0 0 6px #00f0ff" }}
          />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-500/60" />
        </div>
      </motion.div>

      {/* ── Main Content ── */}
      <div className="relative z-10 w-full max-w-5xl">

        {/* ── Tab Bar ── */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              isActive={activeId === cat.id}
              onClick={() => handleTabChange(cat.id)}
            />
          ))}
        </motion.div>

        {/* ── Content Panel ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Skills list card */}
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border p-6 backdrop-blur-sm"
            style={{
              background: "linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.6) 100%)",
              boxShadow: `0 0 40px ${active.glowHex}18`,
              borderColor: `${active.glowHex}30`,
            }}
          >
            {/* Card header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="text-xs font-mono text-slate-500">
                skills/{active.id}.scan
              </span>
              <div className="ml-auto flex items-center gap-1.5">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: active.glowHex }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
                <span className="text-xs font-mono" style={{ color: active.glowHex }}>
                  SCANNING
                </span>
              </div>
            </div>

            {/* Skill rows — custom neon scrollbar */}
            <style>{`
              .skills-scroll::-webkit-scrollbar {
                width: 3px;
              }
              .skills-scroll::-webkit-scrollbar-track {
                background: #0f172a;
                border-radius: 999px;
              }
              .skills-scroll::-webkit-scrollbar-thumb {
                background: ${active.glowHex}70;
                border-radius: 999px;
                box-shadow: 0 0 6px ${active.glowHex};
              }
              .skills-scroll::-webkit-scrollbar-thumb:hover {
                background: ${active.glowHex};
              }
            `}</style>
            <div
              className="skills-scroll flex flex-col gap-4 max-h-72 overflow-y-auto pr-2"
              style={{ scrollbarWidth: "thin", scrollbarColor: `${active.glowHex}70 #0f172a` }}
            >
              {active.skills.map((skill, i) => (
                <SkillRow
                  key={skill.name}
                  skill={skill}
                  glowHex={active.glowHex}
                  index={i}
                  triggered={triggered}
                />
              ))}
            </div>
          </motion.div>

          {/* Right column */}
          <div className="flex flex-col gap-6">

            {/* Avg proficiency */}
            <motion.div
              key={activeId + "-stat"}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-2xl border p-6 flex flex-col items-center justify-center text-center"
              style={{
                background: `linear-gradient(135deg, ${active.glowHex}0a, ${active.glowHex}18)`,
                borderColor: `${active.glowHex}40`,
                boxShadow: `inset 0 0 30px ${active.glowHex}10`,
              }}
            >
              <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">
                Average Proficiency
              </p>
              <motion.p
                className="text-7xl font-bold font-mono tabular-nums"
                style={{
                  color: active.glowHex,
                  textShadow: `0 0 30px ${active.glowHex}`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {Math.round(
                  active.skills.reduce((sum, s) => sum + s.level, 0) / active.skills.length
                )}
                <span className="text-3xl">%</span>
              </motion.p>
              <p className={`text-sm font-semibold mt-2 ${active.color}`}>
                {active.label}
              </p>
            </motion.div>

            {/* All categories overview */}
            <motion.div
              className="rounded-2xl border border-slate-800 p-6 flex-1"
              style={{ background: "rgba(15,23,42,0.8)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">
                All Categories
              </p>
              <div className="flex flex-col gap-3">
                {CATEGORIES.map((cat) => {
                  const avg = Math.round(
                    cat.skills.reduce((s, sk) => s + sk.level, 0) / cat.skills.length
                  );
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleTabChange(cat.id)}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <span
                        className="text-xs font-mono w-24 text-left transition-colors"
                        style={{ color: activeId === cat.id ? cat.glowHex : "#64748b" }}
                      >
                        {cat.label}
                      </span>
                      <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${cat.glowHex}60, ${cat.glowHex})`,
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: triggered ? `${avg}%` : "0%" }}
                          transition={{ duration: 1.2, delay: 0.1 }}
                        />
                      </div>
                      <span
                        className="text-xs font-mono tabular-nums w-8 text-right"
                        style={{ color: cat.glowHex }}
                      >
                        {avg}%
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Bottom ornament ── */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-2/3"
        style={{
          background:
            "linear-gradient(90deg, transparent, #00f0ff40, #b000ff40, transparent)",
        }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.5 }}
      />
    </section>
  );
}