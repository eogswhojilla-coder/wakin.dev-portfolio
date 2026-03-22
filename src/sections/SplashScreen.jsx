
"use client"         
import { useEffect, useState } from "react";

export default function SplashScreen({ onComplete }) {
    const [phase, setPhase] = useState("intro");   // intro → counting → reveal → done
    const [count, setCount] = useState(3);
    const [progress, setProgress] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Phase 1 — brief pause then start counting
        const introTimer = setTimeout(() => setPhase("counting"), 600);
        return () => clearTimeout(introTimer);
    }, []);

    // Progress bar fills over 3 seconds total
    useEffect(() => {
        if (phase !== "counting") return;

        const duration = 3000;
        const interval = 16;
        const step = (interval / duration) * 100;
        let current = 0;

        const progressTimer = setInterval(() => {
            current += step;
            if (current >= 100) {
                current = 100;
                setProgress(100);
                clearInterval(progressTimer);
            } else {
                setProgress(current);
            }
        }, interval);

        return () => clearInterval(progressTimer);
    }, [phase]);

    // Countdown 3 → 2 → 1
    useEffect(() => {
        if (phase !== "counting") return;

        const t1 = setTimeout(() => setCount(2), 1000);
        const t2 = setTimeout(() => setCount(1), 2000);
        const t3 = setTimeout(() => {
            setPhase("reveal");
        }, 3000);

        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, [phase]);

    // Phase 3 — fade out and notify parent
    useEffect(() => {
        if (phase !== "reveal") return;

        const t1 = setTimeout(() => setFadeOut(true), 200);
        const t2 = setTimeout(() => {
            setPhase("done");
            onComplete?.();
        }, 900);

        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [phase]);

    if (phase === "done") return null;

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 99999,
                background: "#09090b",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                opacity: fadeOut ? 0 : 1,
                transition: "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                pointerEvents: fadeOut ? "none" : "all",
            }}
        >
            <style>{`
                @keyframes splash-pulse {
                    0%, 100% { opacity: 0.4; transform: scale(1); }
                    50%       { opacity: 1;   transform: scale(1.08); }
                }
                @keyframes splash-ring {
                    0%   { transform: scale(0.85); opacity: 0; }
                    40%  { opacity: 1; }
                    100% { transform: scale(1.5); opacity: 0; }
                }
                @keyframes splash-fade-up {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes splash-count {
                    0%   { opacity: 0; transform: scale(1.4); }
                    20%  { opacity: 1; transform: scale(1); }
                    80%  { opacity: 1; transform: scale(1); }
                    100% { opacity: 0; transform: scale(0.6); }
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                @keyframes shimmer-text {
                    0%   { background-position: -200% center; }
                    100% { background-position:  200% center; }
                }
            `}</style>

            {/* Ambient background glows */}
            <div style={{
                position: "absolute", top: "20%", left: "30%",
                width: 500, height: 500,
                background: "radial-gradient(circle, rgba(124,58,237,0.15), transparent 70%)",
                borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none",
            }} />
            <div style={{
                position: "absolute", bottom: "20%", right: "25%",
                width: 400, height: 400,
                background: "radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%)",
                borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none",
            }} />

            {/* Center content */}
            <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 40 }}>

                {/* Logo + rings */}
                <div style={{ position: "relative", width: 120, height: 120, display: "flex", alignItems: "center", justifyContent: "center" }}>

                    {/* Pulsing rings */}
                    {[1, 2, 3].map((ring) => (
                        <div key={ring} style={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: "50%",
                            border: "1px solid rgba(168,85,247,0.3)",
                            animation: `splash-ring 2.4s ease-out ${ring * 0.5}s infinite`,
                        }} />
                    ))}

                    {/* Spinning arc */}
                    <svg
                        width="120" height="120"
                        style={{
                            position: "absolute",
                            inset: 0,
                            animation: "spin-slow 3s linear infinite",
                        }}
                        viewBox="0 0 120 120"
                    >
                        <circle
                            cx="60" cy="60" r="54"
                            fill="none"
                            stroke="url(#arcGrad)"
                            strokeWidth="1.5"
                            strokeDasharray="80 260"
                            strokeLinecap="round"
                        />
                        <defs>
                            <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
                                <stop offset="100%" stopColor="#a855f7" stopOpacity="1" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Center circle */}
                    <div style={{
                        width: 72, height: 72,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(168,85,247,0.15))",
                        border: "1px solid rgba(168,85,247,0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backdropFilter: "blur(8px)",
                    }}>
                        {/* Countdown number */}
                        <span
                            key={count}
                            style={{
                                fontSize: 28,
                                fontWeight: 700,
                                background: "linear-gradient(135deg, #e9d5ff, #a855f7)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                animation: phase === "counting" ? "splash-count 1s ease forwards" : "none",
                                lineHeight: 1,
                            }}
                        >
                            {count}
                        </span>
                    </div>
                </div>

                {/* Name / brand */}
                <div style={{
                    textAlign: "center",
                    animation: "splash-fade-up 0.6s ease 0.3s both",
                }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 6 }}>
                        {/* Spinning React-like icon */}
                        <svg width="18" height="18" viewBox="0 0 24 24" style={{ animation: "spin-slow 6s linear infinite", flexShrink: 0 }}>
                            <circle cx="12" cy="12" r="2.5" fill="#a855f7"/>
                            <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#a855f7" strokeWidth="1.2" fill="none"/>
                            <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#a855f7" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)"/>
                            <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#a855f7" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)"/>
                        </svg>
                        <span style={{
                            fontSize: 22,
                            fontWeight: 700,
                            letterSpacing: "-0.02em",
                            background: "linear-gradient(90deg, #e9d5ff, #a855f7, #7c3aed, #a855f7, #e9d5ff)",
                            backgroundSize: "200% auto",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            animation: "shimmer-text 3s linear infinite",
                        }}>
                            Wakin Dev
                        </span>
                    </div>
                    <p style={{
                        fontSize: 12,
                        color: "rgba(255,255,255,0.35)",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        fontWeight: 500,
                    }}>
                        Full-Stack Developer
                    </p>
                </div>

                {/* Progress bar */}
                <div style={{
                    width: 220,
                    animation: "splash-fade-up 0.6s ease 0.5s both",
                }}>
                    {/* Track */}
                    <div style={{
                        width: "100%",
                        height: 2,
                        background: "rgba(255,255,255,0.06)",
                        borderRadius: 999,
                        overflow: "hidden",
                        marginBottom: 10,
                    }}>
                        {/* Fill */}
                        <div style={{
                            height: "100%",
                            width: `${progress}%`,
                            background: "linear-gradient(90deg, #7c3aed, #a855f7, #818cf8)",
                            borderRadius: 999,
                            transition: "width 0.05s linear",
                            boxShadow: "0 0 8px rgba(168,85,247,0.8)",
                            position: "relative",
                        }}>
                            {/* Glowing tip */}
                            <div style={{
                                position: "absolute",
                                right: 0, top: "50%",
                                transform: "translateY(-50%)",
                                width: 5, height: 5,
                                borderRadius: "50%",
                                background: "#c084fc",
                                boxShadow: "0 0 6px #a855f7, 0 0 12px #c084fc",
                                opacity: progress > 2 ? 1 : 0,
                            }} />
                        </div>
                    </div>

                    {/* Percentage label */}
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                            Loading
                        </span>
                        <span style={{ fontSize: 10, color: "rgba(168,85,247,0.7)", fontWeight: 600, letterSpacing: "0.05em" }}>
                            {Math.round(progress)}%
                        </span>
                    </div>
                </div>

            </div>

            {/* Bottom tagline */}
            <div style={{
                position: "absolute",
                bottom: 32,
                textAlign: "center",
                animation: "splash-fade-up 0.6s ease 0.8s both",
            }}>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.18)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    Crafting digital experiences
                </p>
            </div>
        </div>
    );
}