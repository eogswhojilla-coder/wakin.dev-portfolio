"use client"         
import React, { useEffect, useState } from "react";
import ShapeGrid from "./ShapeGrid";

const experiences = [
  {
    step: "01",
    period: "1 months",
    date: "2025 · Internship",
    role: "Creative Team Assistant",
    company: "EmpireOne",
    type: "OJT",
    description:
      "Supported the design team with graphic design, video editing, and on-site photo shooting — building a strong visual foundation before moving into tech.",
    skills: ["Graphic Design", "Video Editing", "Photo Shooting", "Adobe Suite"],
    accent: "#a855f7",
    current: false,
  },
  {
    step: "02",
    period: "2 months",
    date: "2025 · OJT",
    role: "Web Developer",
    company: "EmpireOne",
    type: "OJT",
    description:
      "Transitioned into web development within the same company, building and maintaining web features using modern frontend tools.",
    skills: ["React", "JavaScript", "HTML & CSS", "Tailwind CSS"],
    accent: "#3b82f6",
    current: false,
  },
  {
    step: "03",
    period: "1+ year",
    date: "2025 – Present",
    role: "Web Developer",
    company: "EmpireOne",
    type: "Full-time",
    description:
      "Absorbed as a full-time developer after OJT. Now building production web apps and collaborating with the team on client projects.",
    skills: ["React", "Node.js", "TypeScript", "Next.js", "Tailwind CSS"],
    accent: "#14b8a6",
    current: true,
  },
];

export default function ExperienceSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full h-screen bg-[#09090b] overflow-hidden selection:bg-purple-500/30">

      {/* ✅ ShapeGrid background */}
      <div className="absolute inset-0 z-0">
        <ShapeGrid
          direction="diagonal"
          speed={0.4}
          borderColor="rgba(168, 85, 247, 0.08)"
          squareSize={44}
          hoverFillColor="rgba(168, 85, 247, 0.06)"
          shape="square"
          hoverTrailAmount={4}
        />
      </div>

      {/* ✅ Content on top */}
      <div className="relative z-10 w-full h-full px-[5%] pt-16 pb-12 font-sans flex flex-col">

        {/* Header */}
        <div className="mb-8 flex-shrink-0">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-medium uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            Career
          </span>
          <h2
            className="text-white font-bold leading-tight mt-3"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)" }}
          >
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-blue-400">
              Experience
            </span>
          </h2>
          <p className="text-neutral-500 text-sm mt-2 max-w-md leading-relaxed">
            My journey from creative intern to full-time web developer at EmpireOne.
          </p>
        </div>

        {/* Stepper */}
        <div className="flex-1 flex flex-col justify-between">
          {experiences.map((exp, i) => (
            <div
              key={exp.step}
              className="flex items-stretch"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.45s ease ${i * 0.1}s, transform 0.45s ease ${i * 0.1}s`,
              }}
            >
              {/* Dot + connector line */}
              <div className="flex flex-col items-center flex-shrink-0 w-12">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                  style={{ background: "#0d0d14", border: `2px solid ${exp.accent}` }}
                >
                  <span className="text-[11px] font-bold" style={{ color: exp.accent }}>
                    {exp.step}
                  </span>
                </div>
                {i < experiences.length - 1 && (
                  <div
                    className="w-0.5 flex-1 min-h-3 mt-1"
                    style={{ background: `linear-gradient(to bottom, ${exp.accent}50, transparent)` }}
                  />
                )}
              </div>

              {/* Card */}
              <div className="flex-1 ml-3.5">
                <div
                  className="group relative bg-neutral-900/70 backdrop-blur-sm border border-white/[0.06] rounded-xl p-3.5 px-4 overflow-hidden
                              hover:border-purple-500/25 transition-colors duration-300"
                >
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl"
                    style={{ background: `linear-gradient(to right, ${exp.accent}, transparent)` }}
                  />

                  {/* Header row */}
                  <div className="flex items-start justify-between flex-wrap gap-1.5 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white text-sm font-semibold">{exp.role}</span>
                        {exp.current && (
                          <span className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-medium" style={{ color: exp.accent }}>
                          {exp.company}
                        </span>
                        <span className="text-neutral-600 text-xs">·</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-medium text-neutral-400 bg-white/5 border border-white/[0.07]">
                          {exp.type}
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-neutral-500 text-[11px]">{exp.date}</div>
                      <div className="text-[11px] font-medium mt-0.5" style={{ color: exp.accent }}>
                        {exp.period}
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-white/[0.05] mb-2" />

                  {/* Description */}
                  <p className="text-neutral-500 text-xs leading-relaxed mb-2.5">
                    {exp.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded text-[11px] font-medium text-purple-300 bg-purple-500/10 border border-purple-500/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}