
"use client"         
import React, { useEffect, useState } from "react";

export default function AboutSection() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const skills = [
        "React",
        "Node.js",
        "TypeScript",
        "Tailwind",
        "Next.js",
        "Laravel",
    ];
    const stats = [
        { value: "2+", label: "Years Exp." },
        { value: "20+", label: "Projects" },
        { value: "10+", label: "Clients" },
    ];

    return (
        <section className="relative w-full min-h-screen bg-[#09090b] overflow-hidden flex items-center px-4 md:px-8 lg:px-12 py-24 selection:bg-purple-500/30">
            {/* Background Ambient Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

            <div className="w-full flex items-center justify-between gap-12">
                {/* Image Column - Left Side */}
                <div
                    className={`flex-shrink-0 transition-all duration-1000 ease-out transform ${
                        isVisible
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-12"
                    }`}
                    style={{ marginLeft: "5%" }}
                >
                    {/* Gradient Border Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-[2rem] blur opacity-30 hover:opacity-60 transition duration-500"></div>

                    <div className="relative w-72 h-72 md:w-[380px] md:h-[480px] lg:w-[420px] lg:h-[520px] rounded-[1.5rem] overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl group">
                        <img
                            src="images/me.png"
                            alt="Wacky D. Hojilla"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />

                        {/* Floating Badge */}
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-950/60 backdrop-blur-md border border-white/10 w-fit shadow-lg">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                </span>
                                <span className="text-sm font-medium text-neutral-200">
                                    Available for work
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Column - Right Side */}
                <div
                    className={`flex-1 transition-all duration-1000 ease-out delay-300 transform ${
                        isVisible
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 translate-x-12"
                    }`}
                    style={{ marginRight: "5%", maxWidth: "55%" }}
                >
                    <div className="flex flex-col gap-10">
                        {/* Header */}
                        <div className="space-y-5">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium uppercase tracking-wider">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                                About Me
                            </div>

                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                                Hi, I'm{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-blue-400">
                                    Wacky D. Hojilla
                                </span>
                            </h2>

                            <p className="text-xl text-neutral-400 leading-relaxed max-w-2xl">
                                A passionate full-stack developer who loves
                                building clean, performant web experiences. I
                                specialize in React, Node.js, and turning ideas
                                into polished digital products.
                            </p>
                        </div>

                        {/* Skills */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">
                                Tech Stack
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-4 py-2 rounded-lg text-sm font-medium text-neutral-300 bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 hover:text-white hover:scale-105 transition-all duration-300 cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-8 py-6 border-y border-white/5">
                            {stats.map((stat) => (
                                <div key={stat.label} className="space-y-1">
                                    <h4 className="text-4xl md:text-5xl font-bold text-white">
                                        {stat.value}
                                    </h4>
                                    <p className="text-sm text-neutral-500 font-medium">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
