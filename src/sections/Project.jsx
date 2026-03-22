
"use client"         
import React, { useEffect, useState } from "react";
import DotGrid from "./DotGrid";


const projects = [
    {
        title: "Digitized Barangay Management System",
        description:
            "A comprehensive barangay management system for handling residents, officials, certificates, blotter records, inventory, and reports with an organized and efficient digital workflow.",
        tags: ["React", "Laravel", "MySQL"],
        accent: "#a855f7",
        bg: "#7c3aed",
        link: "https://scc-digitized-barangay.online/",
    },
    {
        title: "EmpireOne Unified System",
        description:
            "Designed and developed a unified enterprise system for EmpireOne, enabling centralized data management, service integration, and a scalable admin dashboard for operational efficiency.",
        tags: ["React", "Tailwind CSS", "REST API", "System Architecture"],
        accent: "#3b82f6",
        bg: "#1d4ed8",
        link: null,
    },
    {
        title: "EmpireOne Ticketing System",
        description:
            "A ticket management system I developed for EmpireOne to handle support requests, track issues, and streamline communication between users and administrators.",
        tags: ["React", "Laravel", "Tailwind CSS"],
        accent: "#14b8a6",
        bg: "#0f766e",
        link: null,
    },
    {
        title: "NoteSync",
        description:
            "A markdown note-taking app with cloud sync, tags, and full-text search.",
        tags: ["React", "Firebase", "Markdown"],
        accent: "#a855f7",
        bg: "#7c3aed",
        link: null,
    },
    {
        title: "GymSync",
        description:
            "A comprehensive gym management system that streamlines member tracking, attendance monitoring, equipment management, and announcements in one modern dashboard.",
        tags: ["React", "Laravel", "MySQL", "Tailwind"],
        accent: "#3b82f6",
        bg: "#1d4ed8",
        link: null,
    },
    {
        title: "PortfolioGen",
        description:
            "A no-code portfolio builder for developers — pick a theme and publish.",
        tags: ["Next.js", "MongoDB", "Vercel"],
        accent: "#14b8a6",
        bg: "#0f766e",
        link: null,
    },
];

export default function ProjectSection() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="relative w-full h-screen bg-[#09090b] overflow-hidden selection:bg-purple-500/30">
            {/* DotGrid background */}
            <div className="absolute inset-0 z-0">
                <DotGrid
                    dotSize={4}
                    gap={28}
                    baseColor="#2a1a4a"
                    activeColor="#a855f7"
                    proximity={120}
                    shockRadius={220}
                    shockStrength={4}
                    returnDuration={1.5}
                    resistance={750}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full h-full px-[5%] pt-16 pb-10 flex flex-col font-sans">
                {/* Header */}
                <div className="mb-8 flex-shrink-0">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        Portfolio
                    </span>
                    <h2 className="text-white text-5xl lg:text-6xl font-bold leading-tight mt-4">
                        My{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-blue-400">
                            Projects
                        </span>
                    </h2>
                    <p className="text-neutral-400 text-base mt-3 max-w-md leading-relaxed">
                        A collection of things I've built — from side projects
                        to client work.
                    </p>
                </div>

                {/* Grid */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 content-start">
                    {projects.map((project, i) => (
                        <div
                            key={project.title}
                            onClick={() =>
                                project.link &&
                                window.open(
                                    project.link,
                                    "_blank",
                                    "noopener,noreferrer",
                                )
                            }
                            className="group relative bg-neutral-900/70 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:-translate-y-1.5 hover:border-purple-500/30 hover:shadow-[0_0_36px_rgba(168,85,247,0.14)] transition-all duration-500"
                            style={{
                                opacity: visible ? 1 : 0,
                                transform: visible
                                    ? "translateY(0)"
                                    : "translateY(20px)",
                                transition: `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`,
                                cursor: project.link ? "pointer" : "default",
                            }}
                        >
                            {/* Hover glow */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{
                                    background: `radial-gradient(circle at 50% 0%, ${project.accent}15, transparent 70%)`,
                                }}
                            />

                            {/* Thumbnail */}
                            <div
                                className="w-full h-32 flex items-center justify-center relative overflow-hidden"
                                style={{
                                    background: `linear-gradient(135deg, ${project.bg}20 0%, #09090b 100%)`,
                                }}
                            >
                                <div
                                    className="absolute w-24 h-24 rounded-full -top-6 -right-6 blur-xl"
                                    style={{
                                        background: `${project.accent}28`,
                                    }}
                                />
                                <div
                                    className="absolute w-16 h-16 rounded-full -bottom-4 left-4 blur-lg"
                                    style={{
                                        background: `${project.accent}18`,
                                    }}
                                />

                                <span
                                    className="text-5xl font-bold relative z-10 transition-transform duration-500 group-hover:scale-110"
                                    style={{
                                        background: `linear-gradient(135deg, ${project.accent}, rgba(255,255,255,0.3))`,
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    {project.title[0]}
                                </span>

                                {/* Arrow icon — only shown if card has a link */}
                                {project.link && (
                                    <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-neutral-900/80 border border-white/10 flex items-center justify-center opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                        <svg
                                            className="w-3.5 h-3.5 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                            />
                                        </svg>
                                    </div>
                                )}

                                {/* "Soon" badge — shown on cards without a link */}
                                {!project.link && (
                                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-neutral-900/80 border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <span className="text-[10px] font-medium text-neutral-500">
                                            Coming soon
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-5 relative z-10">
                                <div className="flex items-start justify-between gap-2 mb-1.5">
                                    <h3 className="text-white text-base font-semibold group-hover:text-purple-300 transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                    {/* Live indicator for linked projects */}
                                    {project.link && (
                                        <span className="flex-shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mt-0.5">
                                            <span className="relative flex h-1.5 w-1.5">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                                            </span>
                                            <span className="text-[10px] font-medium text-emerald-400">
                                                Live
                                            </span>
                                        </span>
                                    )}
                                </div>

                                <p className="text-neutral-500 text-xs leading-relaxed mb-3">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-1.5">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2.5 py-0.5 rounded-md text-xs font-medium text-neutral-300 bg-white/5 border border-white/5 group-hover:border-white/10 group-hover:bg-white/10 transition-all duration-300"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-6 flex justify-end flex-shrink-0">
                    <button className="group inline-flex items-center gap-2 px-7 py-2.5 text-sm font-semibold text-white bg-neutral-900/80 backdrop-blur-sm rounded-full border border-white/10 hover:bg-neutral-800 hover:ring-2 hover:ring-offset-2 hover:ring-offset-[#09090b] hover:ring-purple-500 transition-all duration-200 cursor-pointer">
                        View all projects
                        <svg
                            className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}
