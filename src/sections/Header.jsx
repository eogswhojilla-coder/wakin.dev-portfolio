"use client"         
import React, { useState, useEffect } from "react";
import { FaReact } from "react-icons/fa";

const navLinks = [
  { label: "Home",       href: "home"       },
  { label: "About",      href: "about"      },
  { label: "Projects",   href: "projects"   },
  { label: "Experience", href: "experience" },
  { label: "Contact",    href: "contact"    },
];

export default function HeaderSection() {
    const [active, setActive] = useState("Home");
    const [scrolled, setScrolled] = useState(false);
    const [visible, setVisible] = useState(false);
    const [hoveredLink, setHoveredLink] = useState(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll);
        const timer = setTimeout(() => setVisible(true), 100);
        return () => {
            window.removeEventListener("scroll", onScroll);
            clearTimeout(timer);
        };
    }, []);

    // Auto-update active link based on which section is in view
    useEffect(() => {
        const sections = navLinks.map(({ href }) => document.getElementById(href)).filter(Boolean);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const match = navLinks.find(({ href }) => href === entry.target.id);
                        if (match) setActive(match.label);
                    }
                });
            },
            {
                rootMargin: "-40% 0px -55% 0px", // triggers when section is ~in the middle of viewport
                threshold: 0,
            }
        );

        sections.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleNavClick = (label, href) => {
        setActive(label);
        document.getElementById(href)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <style>{`
                @keyframes slideDown {
                    from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                    to   { opacity: 1; transform: translateX(-50%) translateY(0px); }
                }
                @keyframes pulseBorder {
                    0%, 100% { box-shadow: 0 0 24px rgba(168,85,247,0.15), 0 0 60px rgba(168,85,247,0.08), inset 0 1px 0 rgba(168,85,247,0.2); }
                    50%       { box-shadow: 0 0 32px rgba(168,85,247,0.3),  0 0 80px rgba(168,85,247,0.15), inset 0 1px 0 rgba(168,85,247,0.35); }
                }
                @keyframes shimmer {
                    0%   { background-position: -200% center; }
                    100% { background-position:  200% center; }
                }
                @keyframes starSpin {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                .nav-entrance {
                    animation: slideDown 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
                }
                .nav-pill {
                    animation: pulseBorder 4s ease-in-out infinite;
                }
                .logo-shimmer {
                    background: linear-gradient(90deg, #e9d5ff, #a855f7, #7c3aed, #a855f7, #e9d5ff);
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: shimmer 3s linear infinite;
                }
                .star-spin {
                    display: inline-block;
                    animation: starSpin 6s linear infinite;
                }
                .nav-link-btn {
                    position: relative;
                    overflow: hidden;
                }
                .nav-link-btn::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    border-radius: 999px;
                    background: radial-gradient(circle at center, rgba(168,85,247,0.25), transparent 70%);
                    opacity: 0;
                    transition: opacity 0.2s ease;
                }
                .nav-link-btn:hover::after {
                    opacity: 1;
                }
            `}</style>

            <div
                className={`fixed top-5 left-1/2 z-50 w-full max-w-6xl px-4 ${visible ? "nav-entrance" : "opacity-0"}`}
                style={{ transform: "translateX(-50%)" }}
            >
                <nav
                    className={`
                        nav-pill
                        flex items-center justify-between
                        px-5 py-2.5
                        rounded-full
                        border border-purple-500/30
                        backdrop-blur-xl
                        transition-all duration-500
                        ${scrolled
                            ? "bg-[#09090b]/90 border-purple-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                            : "bg-purple-950/20"
                        }
                    `}
                >
                    {/* Logo */}
                    <span className="font-semibold text-sm tracking-wide select-none flex items-center gap-2">
                        <FaReact className="star-spin text-purple-300 text-lg" />
                        <span className="logo-shimmer">Wacky D. Hojilla</span>
                    </span>

                    {/* Nav Links */}
                    <ul className="flex items-center gap-1">
                        {navLinks.map(({ label, href }, i) => (
                            <li
                                key={label}
                                style={{
                                    opacity: visible ? 1 : 0,
                                    transform: visible ? "translateY(0)" : "translateY(-8px)",
                                    transition: `opacity 0.4s ease ${0.2 + i * 0.07}s, transform 0.4s ease ${0.2 + i * 0.07}s`,
                                }}
                            >
                                <button
                                    onClick={() => handleNavClick(label, href)}
                                    onMouseEnter={() => setHoveredLink(label)}
                                    onMouseLeave={() => setHoveredLink(null)}
                                    className={`
                                        nav-link-btn
                                        px-4 py-1.5 rounded-full text-sm font-medium
                                        transition-all duration-200 cursor-pointer
                                        ${active === label
                                            ? "text-white bg-purple-500/20 shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                                            : "text-white/60 hover:text-white"
                                        }
                                    `}
                                >
                                    {label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    );
}