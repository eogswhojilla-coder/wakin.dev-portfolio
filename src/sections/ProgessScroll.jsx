
"use client"         
import { useEffect, useState, useRef } from "react";

const SECTIONS = [
    { id: "home",       label: "Home"       },
    { id: "about",      label: "About"      },
    { id: "projects",   label: "Projects"   },
    { id: "experience", label: "Experience" },
    { id: "contact",    label: "Contact"    },
];

export default function ProgressScrollSection() {
    const [scrollPct, setScrollPct] = useState(0);
    const [activeId,  setActiveId]  = useState("home");
    const [visible,   setVisible]   = useState(false);
    const [dotHover,  setDotHover]  = useState(null);
    const rafRef = useRef(null);

    useEffect(() => {
        // ✅ FIX: find the actual scrolling container at mount time
        // overflow-x-hidden on the root div makes it the scroll container,
        // not window — so we target document.documentElement as fallback
        const getScrollTop = () =>
            window.scrollY ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;

        const getScrollHeight = () =>
            Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight
            ) - window.innerHeight;

        const onScroll = () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => {
                const scrollTop = getScrollTop();
                const docH     = getScrollHeight();
                const pct      = docH > 0 ? Math.min(100, (scrollTop / docH) * 100) : 0;

                setScrollPct(pct);
                setVisible(scrollTop > 80);

                let current = SECTIONS[0].id;
                for (const sec of SECTIONS) {
                    const el = document.getElementById(sec.id);
                    if (el) {
                        const top = el.getBoundingClientRect().top;
                        if (top <= window.innerHeight * 0.45) current = sec.id;
                    }
                }
                setActiveId(current);
            });
        };

        // ✅ Listen on BOTH window and document to cover all scroll containers
        window.addEventListener("scroll",                  onScroll, { passive: true });
        document.addEventListener("scroll",                onScroll, { passive: true });
        document.documentElement.addEventListener("scroll",onScroll, { passive: true });

        onScroll(); // run once on mount
        return () => {
            window.removeEventListener("scroll",                  onScroll);
            document.removeEventListener("scroll",                onScroll);
            document.documentElement.removeEventListener("scroll",onScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            {/* ── TOP PROGRESS BAR ── */}
            <div
                style={{
                    position: "fixed",
                    top: 0, left: 0, right: 0,
                    height: 2,
                    zIndex: 9999,
                    background: "rgba(255,255,255,0.04)",
                }}
            >
                <div
                    style={{
                        height: "100%",
                        width: `${scrollPct}%`,
                        background: "linear-gradient(90deg, #7c3aed, #a855f7 50%, #818cf8)",
                        borderRadius: "0 2px 2px 0",
                        transition: "width 0.08s linear",
                        position: "relative",
                        boxShadow: "0 0 12px rgba(168,85,247,0.7), 0 0 24px rgba(168,85,247,0.3)",
                    }}
                >
                    {/* glowing tip */}
                    <div
                        style={{
                            position: "absolute",
                            right: 0,
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: "#c084fc",
                            boxShadow: "0 0 8px #a855f7, 0 0 16px #c084fc",
                            opacity: scrollPct > 1 ? 1 : 0,
                            transition: "opacity 0.2s",
                        }}
                    />
                </div>
            </div>

            {/* ── SIDE DOT NAVIGATOR ── */}
            <nav
                aria-label="Page sections"
                style={{
                    position: "fixed",
                    right: 24,
                    top: "50%",
                    transform: `translateY(-50%) translateX(${visible ? 0 : 56}px)`,
                    zIndex: 9000,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: 12,
                    opacity: visible ? 1 : 0,
                    pointerEvents: visible ? "auto" : "none",
                    transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease",
                }}
            >
                {SECTIONS.map((sec) => {
                    const isActive  = activeId === sec.id;
                    const isHovered = dotHover === sec.id;

                    return (
                        <button
                            key={sec.id}
                            onClick={() => scrollTo(sec.id)}
                            onMouseEnter={() => setDotHover(sec.id)}
                            onMouseLeave={() => setDotHover(null)}
                            aria-label={`Go to ${sec.label}`}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: "3px 0",
                            }}
                        >
                            {/* Label */}
                            <span
                                style={{
                                    fontSize: 10,
                                    fontWeight: 600,
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                    whiteSpace: "nowrap",
                                    color: isActive ? "#e9d5ff" : "rgba(255,255,255,0.4)",
                                    opacity: isHovered || isActive ? 1 : 0,
                                    transform: isHovered || isActive
                                        ? "translateX(0)"
                                        : "translateX(8px)",
                                    transition: "all 0.22s ease",
                                    textShadow: isActive
                                        ? "0 0 12px rgba(168,85,247,0.8)"
                                        : "0 1px 4px rgba(0,0,0,0.6)",
                                    pointerEvents: "none",
                                }}
                            >
                                {sec.label}
                            </span>

                            {/* Dot / pill */}
                            <div
                                style={{
                                    flexShrink: 0,
                                    width:  isActive ? 8 : isHovered ? 7 : 5,
                                    height: isActive ? 28 : isHovered ? 8 : 5,
                                    borderRadius: isActive ? 4 : "50%",
                                    background: isActive
                                        ? "linear-gradient(180deg, #a855f7, #6366f1)"
                                        : isHovered
                                            ? "rgba(168,85,247,0.6)"
                                            : "rgba(255,255,255,0.2)",
                                    boxShadow: isActive
                                        ? "0 0 10px rgba(168,85,247,0.8), 0 0 20px rgba(168,85,247,0.3)"
                                        : isHovered
                                            ? "0 0 6px rgba(168,85,247,0.4)"
                                            : "none",
                                    border: isActive
                                        ? "1px solid rgba(168,85,247,0.5)"
                                        : isHovered
                                            ? "1px solid rgba(168,85,247,0.3)"
                                            : "1px solid rgba(255,255,255,0.15)",
                                    transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                                }}
                            />
                        </button>
                    );
                })}
            </nav>
        </>
    );
}