"use client"         
import React, { useEffect, useRef, useState } from "react";

const techStack = [
  {
    name: "React",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <circle cx="12" cy="12" r="2.5" fill="#61DAFB"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)"/>
      </svg>
    ),
    color: "#61DAFB",
  },
  {
    name: "Next.js",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
        <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747C21.75 4.355 18.543.568 14.193.073c-.394-.046-.271-.04-2.621-.07z"/>
      </svg>
    ),
    color: "#ffffff",
  },
  {
    name: "TypeScript",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <rect width="24" height="24" rx="3" fill="#3178C6"/>
        <path d="M13.5 12H11v7H9.5v-7H7v-1.5h6.5V12zm1 5.5c.3.2.8.4 1.3.4.7 0 1.2-.4 1.2-.9 0-.5-.3-.8-1-1.1-1-.4-1.5-.9-1.5-1.6 0-.9.8-1.6 1.9-1.6.6 0 1 .1 1.3.3l-.3 1c-.2-.1-.6-.3-1-.3-.6 0-.9.3-.9.7 0 .4.3.7 1 1 1 .4 1.5 1 1.5 1.8 0 1-.8 1.7-2 1.7-.6 0-1.1-.1-1.5-.4l.3-1z" fill="white"/>
      </svg>
    ),
    color: "#3178C6",
  },
  {
    name: "Node.js",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M12 1.85c-.27 0-.55.07-.78.2L3.78 6.35c-.48.28-.78.79-.78 1.34v8.62c0 .55.3 1.06.78 1.34l7.44 4.3c.23.13.5.2.78.2s.55-.07.78-.2l7.44-4.3c.48-.28.78-.79.78-1.34V7.69c0-.55-.3-1.06-.78-1.34L12.78 2.05c-.23-.13-.5-.2-.78-.2z" fill="#339933"/>
        <path d="M12 4.6L6.5 7.78v6.44L12 17.4l5.5-3.18V7.78L12 4.6z" fill="#fff" opacity=".2"/>
        <path d="M12 6.5l-3.5 2v4l3.5 2 3.5-2v-4L12 6.5z" fill="#fff" opacity=".3"/>
      </svg>
    ),
    color: "#339933",
  },
  {
    name: "Tailwind",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M12 6C9.33 6 7.67 7.33 7 10c1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.09 2.15 4.59 2.15C19.67 12 21.33 10.67 22 8c-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.61 7.15 14.5 6 12 6zm-4 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C9.39 17.85 10.5 19 13 19c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C11.61 13.15 10.5 12 8 12z" fill="#38BDF8"/>
      </svg>
    ),
    color: "#38BDF8",
  },
  {
    name: "PostgreSQL",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M17.128 0a10.134 10.134 0 0 0-2.755.403l-.063.02A10.922 10.922 0 0 0 12.6.258C11.422.238 10.41.524 9.594 1 8.58.823 7.43.858 6.28 1.156 3.585 1.858 1.427 3.881.47 6.385c-.43 1.116-.577 2.22-.535 3.214.033.726.168 1.37.373 1.888a3.52 3.52 0 0 0 .583.997c.226.254.503.465.837.6a1.8 1.8 0 0 0 .686.126c.486 0 .936-.176 1.28-.43.344-.254.597-.583.762-.928.082-.173.148-.348.195-.517a3.27 3.27 0 0 0 .068-.686v-.086c0-.386-.097-.754-.245-1.042-.148-.288-.343-.515-.537-.67.128-.073.27-.126.425-.155.177-.033.356-.04.532-.024.245.022.487.09.72.198.355.163.708.422 1.05.765.344.344.688.772 1.023 1.27.353.52.674 1.079.949 1.655.072.15.14.3.205.45.21-.049.425-.083.644-.104.242-.024.49-.033.733-.028l.22.01c.097-.309.17-.618.22-.926.06-.368.082-.733.07-1.092-.012-.36-.067-.71-.157-1.034a4.253 4.253 0 0 0-.337-.862 3.875 3.875 0 0 0-.52-.727 3.523 3.523 0 0 0-.67-.573 4.146 4.146 0 0 0 1.157-.768c.37-.35.67-.785.862-1.284.193-.5.277-1.059.24-1.652L17.128 0z" fill="#336791"/>
        <ellipse cx="12" cy="12" rx="7" ry="8" fill="none" stroke="#336791" strokeWidth="1.5"/>
      </svg>
    ),
    color: "#336791",
  },
  {
    name: "MongoDB",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M17.193 9.555c-1.264-5.58-4.252-7.243-4.573-8.227-.28-.907-.316-1.328-.247-1.328h.004c.370.748.925 1.755 1.573 2.28.175.14.237.232.237.232-.013-.002.025.157.005.432-.04.535-.156.768-.156.768l.013.023c.13.228.264.428.406.604.266.33.542.57.8.78.497.392.994.66 1.243.79l.194.09c.218.1.462.153.72.167h.064c.258-.015.502-.065.722-.164l.194-.09c.248-.13.745-.397 1.243-.79.258-.21.534-.45.8-.78.142-.177.278-.376.406-.604l.012-.023s-.117-.233-.156-.768c-.02-.275.018-.434.005-.432 0 0 .062-.09.238-.232.647-.524 1.202-1.53 1.572-2.279h.004c.07 0 .033.42-.246 1.328-.322.985-3.31 2.648-4.574 8.227z" fill="#47A248"/>
        <path d="M12 22.5c0 0-.492-.244-.739-.674C11.014 21.397 11 21 11 21l1-1.5 1 1.5s-.014.397-.261.826c-.247.43-.739.674-.739.674z" fill="#47A248"/>
        <rect x="11.5" y="5" width="1" height="15" fill="#47A248"/>
      </svg>
    ),
    color: "#47A248",
  },
  {
    name: "Docker",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.567 1.86-1.300 2.61-2.162 1.252-1.417 1.994-2.999 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z" fill="#2496ED"/>
      </svg>
    ),
    color: "#2496ED",
  },
  {
    name: "Git",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.6.190-.191.404-.33.629-.425V8.895c-.225-.096-.440-.234-.629-.424-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" fill="#F05032"/>
      </svg>
    ),
    color: "#F05032",
  },
  {
    name: "Prisma",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M1.927 20.817L12 0l10.073 20.817-10.073-4.03L1.927 20.817zm3.014-.85l7.059 2.824V9.683L4.94 19.967z" fill="#2D3748"/>
        <path d="M1.927 20.817L12 0l10.073 20.817-10.073-4.03L1.927 20.817zm3.014-.85l7.059 2.824V9.683L4.94 19.967z" fill="white" opacity="0.6"/>
      </svg>
    ),
    color: "#5A67D8",
  },
  {
    name: "Firebase",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M3.89 15.672L6.255.461A.542.542 0 0 1 7.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 0 0-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 0 0 1.588 0zM14.3 7.148l-1.82-3.482a.542.542 0 0 0-.96 0L3.53 17.984z" fill="#FFCA28"/>
      </svg>
    ),
    color: "#FFCA28",
  },
  {
    name: "Redux",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M16.634 16.504c.87-.075 1.543-.84 1.5-1.754-.043-.914-.796-1.635-1.72-1.635h-.043c-.957.043-1.69.838-1.647 1.794.043.463.204.85.462 1.14-1.01 1.88-2.547 3.25-4.842 4.404-1.547.777-3.16 1.057-4.773.84-1.398-.185-2.504-.777-3.182-1.73-.988-1.388-1.078-2.907-.248-4.426.592-1.077 1.527-1.872 2.13-2.3-.13-.42-.323-1.12-.42-1.64-4.55 3.26-4.076 7.686-2.698 9.768 1.032 1.572 3.158 2.547 5.49 2.547.63 0 1.26-.065 1.89-.194 4.042-.786 7.117-3.16 8.1-6.814zm5.026-2.12c-2.4-2.815-5.943-4.37-10-4.37h-.516c-.27-.55-.84-.926-1.487-.926h-.043c-.957.043-1.69.838-1.647 1.794.043.914.797 1.635 1.72 1.635h.043c.678-.032 1.27-.44 1.57-1.03h.56c2.4 0 4.675.7 6.728 2.077 1.582 1.056 2.72 2.438 3.375 4.102.55 1.335.516 2.628-.065 3.737-.882 1.647-2.364 2.53-4.327 2.53-1.27 0-2.473-.388-3.095-.668-.356.313-.992.81-1.453 1.12 1.357.626 2.745.98 4.07.98 3.03 0 5.274-1.658 6.125-3.31.915-1.8.85-4.87-1.558-7.64zM6.252 17.966c.043.914.797 1.635 1.72 1.635h.043c.957-.043 1.69-.838 1.647-1.794-.043-.914-.797-1.635-1.72-1.635h-.043c-.065 0-.14.01-.205.022-1.194-1.97-1.688-4.11-1.504-6.42.118-1.722.657-3.216 1.592-4.436.775-1.034 2.274-1.54 3.29-1.56 2.83-.054 4.025 3.487 4.11 4.896l1.567.47C16.392 4.78 14.145 2 11.174 2c-2.936 0-5.63 2.13-6.717 5.264-1.518 4.33-.527 8.5 1.398 11.81-.14.28-.215.602-.204.893z" fill="#764ABC"/>
      </svg>
    ),
    color: "#764ABC",
  },
];

const row1 = [...techStack.slice(0, 7), ...techStack.slice(0, 7)];
const row2 = [...techStack.slice(5), ...techStack.slice(5)];

function MarqueeRow({ items, direction = "left", speed = 40, paused }) {
  return (
    // ✅ KEY FIX 1: py-3 gives vertical room so scaled cards aren't clipped.
    // overflow-hidden is on a OUTER wrapper that only clips horizontally via the mask.
    // The inner track uses overflow: visible so cards can lift upward freely.
    <div
      className="relative w-full py-3"
      style={{
        // ✅ KEY FIX 2: mask only clips left/right edges, NOT top/bottom
        maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        // overflow hidden only on x axis so hover lift is never clipped
        overflowX: "hidden",
        overflowY: "visible",
      }}
    >
      <div
        className="flex gap-4 w-max"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {items.map((tech, i) => (
          <TechCard key={`${tech.name}-${i}`} tech={tech} />
        ))}
      </div>
    </div>
  );
}

function TechCard({ tech }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex-shrink-0 flex flex-col items-center justify-center gap-3 w-32 h-32 rounded-2xl cursor-default select-none"
      style={{
        background: hovered
          ? `radial-gradient(circle at 50% 40%, ${tech.color}22, #0d0d14 70%)`
          : "rgba(255,255,255,0.03)",
        border: hovered
          ? `1px solid ${tech.color}55`
          : "1px solid rgba(255,255,255,0.06)",
        // ✅ KEY FIX 3: transition on transform and box-shadow separately for smoothness
        transform: hovered ? "translateY(-6px) scale(1.08)" : "translateY(0) scale(1)",
        boxShadow: hovered
          ? `0 12px 40px ${tech.color}30, 0 0 0 1px ${tech.color}25`
          : "none",
        transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease, background 0.25s ease, border-color 0.25s ease",
        // ✅ KEY FIX 4: ensure hovered card is always on top of siblings
        zIndex: hovered ? 10 : 1,
        position: "relative",
      }}
    >
      {/* Corner accent */}
      <div
        className="absolute top-0 left-0 w-8 h-8 rounded-tl-2xl overflow-hidden pointer-events-none"
        style={{
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{ background: `linear-gradient(135deg, ${tech.color}45 0%, transparent 60%)` }}
        />
      </div>

      {/* Icon */}
      <div
        style={{
          transform: hovered ? "scale(1.18)" : "scale(1)",
          filter: hovered ? `drop-shadow(0 0 10px ${tech.color}90)` : "none",
          transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), filter 0.25s ease",
        }}
      >
        {tech.icon}
      </div>

      {/* Name */}
      <span
        className="text-xs font-semibold tracking-wide"
        style={{
          color: hovered ? tech.color : "rgba(255,255,255,0.4)",
          transition: "color 0.25s ease",
        }}
      >
        {tech.name}
      </span>

      {/* Bottom glow line */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px"
        style={{
          width: hovered ? "60%" : "0%",
          background: `linear-gradient(to right, transparent, ${tech.color}, transparent)`,
          transition: "width 0.3s ease",
        }}
      />
    </div>
  );
}

export default function CarouselSection() {
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full bg-[#09090b] py-24 selection:bg-purple-500/30"
      // ✅ KEY FIX 5: section itself must NOT clip overflow so rows can breathe
      style={{ overflow: "visible" }}
    >
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10">

        {/* Header */}
        <div
          className="text-center mb-14 px-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            Tech Stack
          </div>
          <h2 className="text-white text-5xl md:text-6xl font-bold leading-tight">
            Tools I{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-blue-400">
              Work With
            </span>
          </h2>
          <p className="text-neutral-500 text-base mt-4 max-w-md mx-auto leading-relaxed">
            Technologies I use to build fast, scalable, and modern web applications.
          </p>
        </div>

        {/* Carousels */}
        <div
          className="flex flex-col gap-2"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <MarqueeRow items={row1} direction="left"  speed={35} paused={paused} />
          <MarqueeRow items={row2} direction="right" speed={45} paused={paused} />
        </div>

        {/* Hover hint */}
        <p
          className="text-center text-neutral-600 text-xs mt-6"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease 0.3s",
          }}
        >
          Hover to pause · Hover a card to explore
        </p>

      </div>
    </section>
  );
}