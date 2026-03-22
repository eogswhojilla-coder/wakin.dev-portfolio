"use client"
import React, { useState, useEffect, useRef } from "react";
import { FaReact } from "react-icons/fa";

const navLinks = [
  { label: "Home",       href: "home"       },
  { label: "About",      href: "about"      },
  { label: "Projects",   href: "projects"   },
  { label: "Experience", href: "experience" },
  { label: "Contact",    href: "contact"    },
];

export default function HeaderSection() {
    const [active, setActive]           = useState("Home");
    const [scrolled, setScrolled]       = useState(false);
    const [visible, setVisible]         = useState(false);
    const [menuOpen, setMenuOpen]       = useState(false);
    const menuRef                       = useRef(null);

    // Scroll & entrance
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll);
        const timer = setTimeout(() => setVisible(true), 100);
        return () => {
            window.removeEventListener("scroll", onScroll);
            clearTimeout(timer);
        };
    }, []);

    // Close menu on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuOpen]);

    // Close menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 640) setMenuOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Auto-update active link based on section in view
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
            { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
        );
        sections.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleNavClick = (label, href) => {
        setActive(label);
        setMenuOpen(false);
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
                    50%      { box-shadow: 0 0 32px rgba(168,85,247,0.3),  0 0 80px rgba(168,85,247,0.15), inset 0 1px 0 rgba(168,85,247,0.35); }
                }
                @keyframes shimmer {
                    0%   { background-position: -200% center; }
                    100% { background-position:  200% center; }
                }
                @keyframes starSpin {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                @keyframes mobileMenuSlide {
                    from { opacity: 0; transform: translateY(-8px) scale(0.97); }
                    to   { opacity: 1; transform: translateY(0)    scale(1); }
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
                .mobile-menu-open {
                    animation: mobileMenuSlide 0.25s cubic-bezier(0.22, 1, 0.36, 1) forwards;
                }
                .hamburger-line {
                    display: block;
                    width: 20px;
                    height: 2px;
                    background: rgba(255,255,255,0.7);
                    border-radius: 2px;
                    transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
                    transform-origin: center;
                }
                .hamburger-open .line-1 {
                    transform: translateY(6px) rotate(45deg);
                    background: rgba(168,85,247,0.9);
                }
                .hamburger-open .line-2 {
                    opacity: 0;
                    transform: scaleX(0);
                }
                .hamburger-open .line-3 {
                    transform: translateY(-6px) rotate(-45deg);
                    background: rgba(168,85,247,0.9);
                }
            `}</style>

            <div
                ref={menuRef}
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
                        ${menuOpen ? "rounded-2xl" : "rounded-full"}
                    `}
                    style={{ borderRadius: menuOpen ? "1.25rem" : undefined }}
                >
                    <div className="flex items-center justify-between w-full">
                        {/* Logo */}
                        <span className="font-semibold text-sm tracking-wide select-none flex items-center gap-2">
                            <FaReact className="star-spin text-purple-300 text-lg" />
                            <span className="logo-shimmer">Wacky D. Hojilla</span>
                        </span>

                        {/* Desktop Nav Links */}
                        <ul className="hidden sm:flex items-center gap-1">
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

                        {/* Hamburger Button — mobile only */}
                        <button
                            onClick={() => setMenuOpen((o) => !o)}
                            className={`sm:hidden flex flex-col gap-[5px] p-2 rounded-full transition-all duration-200 hover:bg-purple-500/10 cursor-pointer ${menuOpen ? "hamburger-open" : ""}`}
                            aria-label="Toggle navigation menu"
                            aria-expanded={menuOpen}
                        >
                            <span className="hamburger-line line-1" />
                            <span className="hamburger-line line-2" />
                            <span className="hamburger-line line-3" />
                        </button>
                    </div>

                    {/* Mobile Dropdown Menu */}
                    {menuOpen && (
                        <div className="mobile-menu-open sm:hidden mt-3 pb-2 border-t border-purple-500/20 pt-3">
                            <ul className="flex flex-col gap-1">
                                {navLinks.map(({ label, href }, i) => (
                                    <li key={label}>
                                        <button
                                            onClick={() => handleNavClick(label, href)}
                                            style={{
                                                animationDelay: `${i * 0.04}s`,
                                            }}
                                            className={`
                                                nav-link-btn
                                                w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium
                                                transition-all duration-200 cursor-pointer
                                                ${active === label
                                                    ? "text-white bg-purple-500/20 shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                                                    : "text-white/60 hover:text-white hover:bg-purple-500/10"
                                                }
                                            `}
                                        >
                                            <span className="flex items-center gap-2">
                                                {active === label && (
                                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_6px_rgba(168,85,247,0.8)]" />
                                                )}
                                                {label}
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </nav>
            </div>
        </>
    );
}