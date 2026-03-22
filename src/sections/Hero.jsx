
"use client"         

import React, { useEffect, useRef, useState } from 'react'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;1,300&display=swap');

  .hero-root {
    position: relative;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Syne', sans-serif;
    overflow: hidden;
  }

  /* ── CONTENT ── */
  .hero-content {
    position: relative;
    z-index: 10;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 5px 16px;
    background: rgba(124, 58, 237, 0.1);
    border: 1px solid rgba(124, 58, 237, 0.28);
    border-radius: 100px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: #a78bfa;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    margin-bottom: 32px;
    opacity: 0;
    animation: fadeUp 0.7s ease 0.3s forwards;
  }

  .badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #22d3ee;
    box-shadow: 0 0 8px #22d3ee;
    animation: pulse-dot 2s ease-in-out infinite;
    flex-shrink: 0;
  }

  .hero-name {
    font-size: clamp(48px, 7.5vw, 92px);
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -0.03em;
    color: #fff;
    opacity: 0;
    animation: fadeUp 0.7s ease 0.45s forwards;
  }

  .hero-name .gradient-line {
    display: block;
    background: linear-gradient(120deg, #a78bfa 0%, #22d3ee 50%, #818cf8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-role {
    margin-top: 18px;
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    font-weight: 300;
    font-style: italic;
    color: rgba(255, 255, 255, 0.4);
    letter-spacing: 0.07em;
    min-height: 20px;
    opacity: 0;
    animation: fadeUp 0.7s ease 0.6s forwards;
  }

  .role-cursor::after {
    content: '|';
    color: #22d3ee;
    margin-left: 2px;
    animation: blink 1s step-end infinite;
  }

  .hero-desc {
    margin-top: 26px;
    max-width: 400px;
    font-size: 15px;
    font-weight: 400;
    line-height: 1.75;
    color: rgba(255, 255, 255, 0.45);
    opacity: 0;
    animation: fadeUp 0.7s ease 0.75s forwards;
  }

  /* ── CTA BUTTONS ── */
  .hero-cta {
    margin-top: 44px;
    display: flex;
    align-items: center;
    gap: 12px;
    opacity: 0;
    animation: fadeUp 0.7s ease 0.9s forwards;
    pointer-events: auto;
  }

  .btn-primary {
    padding: 12px 30px;
    background: linear-gradient(135deg, #7c3aed, #4f1d96);
    border: none;
    border-radius: 100px;
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    letter-spacing: 0.02em;
    box-shadow: 0 0 28px rgba(124, 58, 237, 0.45);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    position: relative;
    overflow: hidden;
  }

  .btn-primary::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.14), transparent);
    opacity: 0;
    transition: opacity 0.25s ease;
    border-radius: inherit;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 48px rgba(124, 58, 237, 0.65);
  }

  .btn-primary:hover::before { opacity: 1; }

  .btn-ghost {
    padding: 12px 30px;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.13);
    border-radius: 100px;
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    letter-spacing: 0.02em;
    transition: border-color 0.25s ease, color 0.25s ease, transform 0.25s ease;
  }

  .btn-ghost:hover {
    border-color: rgba(255, 255, 255, 0.32);
    color: #fff;
    transform: translateY(-2px);
  }

  /* ── STATS ── */
  .hero-stats {
    position: absolute;
    bottom: 48px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    opacity: 0;
    animation: fadeUp 0.7s ease 1.1s forwards;
    white-space: nowrap;
  }

  .stat-item {
    padding: 0 36px;
    text-align: center;
    border-right: 1px solid rgba(255, 255, 255, 0.07);
  }

  .stat-item:last-child { border-right: none; }

  .stat-num {
    font-size: 24px;
    font-weight: 800;
    letter-spacing: -0.02em;
    background: linear-gradient(120deg, #a78bfa, #22d3ee);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .stat-label {
    margin-top: 3px;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.28);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  /* ── SCROLL INDICATOR ── */
  .scroll-hint {
    position: absolute;
    right: 48px;
    bottom: 48px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    opacity: 0;
    animation: fadeIn 0.7s ease 1.3s forwards;
  }

  .scroll-track {
    width: 1px;
    height: 56px;
    background: rgba(255,255,255,0.1);
    position: relative;
    overflow: hidden;
    border-radius: 1px;
  }

  .scroll-track::after {
    content: '';
    position: absolute;
    top: -100%;
    left: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(to bottom, transparent, #22d3ee);
    animation: scroll-run 2s ease-in-out infinite;
  }

  .scroll-label {
    writing-mode: vertical-rl;
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    color: rgba(255, 255, 255, 0.22);
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  /* ── KEYFRAMES ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }

  @keyframes pulse-dot {
    0%, 100% { box-shadow: 0 0 8px #22d3ee; }
    50%       { box-shadow: 0 0 3px #22d3ee; }
  }

  @keyframes scroll-run {
    0%   { top: -100%; }
    100% { top: 100%; }
  }

  @media (max-width: 600px) {
    .hero-stats { bottom: 32px; }
    .stat-item { padding: 0 20px; }
    .scroll-hint { display: none; }
  }
`

const ROLES = ['Full Stack Developer', 'UI/UX Enthusiast', 'React Developer', 'Problem Solver']

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const t = useRef(null)

  useEffect(() => {
    const current = ROLES[roleIndex]
    if (!deleting) {
      if (displayed.length < current.length) {
        t.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60)
      } else {
        t.current = setTimeout(() => setDeleting(true), 2400)
      }
    } else {
      if (displayed.length > 0) {
        t.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
      } else {
        setDeleting(false)
        setRoleIndex(i => (i + 1) % ROLES.length)
      }
    }
    return () => clearTimeout(t.current)
  }, [displayed, deleting, roleIndex])

  return (
    <>
      <style>{styles}</style>

      <section className="hero-root">

        {/* Main content */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            Available for hire
          </div>

          <h1 className="hero-name">
           
            <span className="gradient-line">Wacky D. Hojilla</span>
          </h1>

          <p className="hero-role">
            <span className="role-cursor">{displayed}</span>
          </p>

          <p className="hero-desc">
            I craft pixel-perfect interfaces and scalable backends — turning complex ideas into elegant digital experiences.
          </p>

          <div className="hero-cta">
            <button className="btn-primary">View Projects</button>
            <button className="btn-ghost">Download CV</button>
          </div>
        </div>

        {/* Stats */}
        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-num">1+</div>
            <div className="stat-label">Years Exp.</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">5+</div>
            <div className="stat-label">Projects</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">15+</div>
            <div className="stat-label">Clients</div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="scroll-hint">
          <div className="scroll-label">scroll</div>
          <div className="scroll-track" />
        </div>

      </section>
    </>
  )
}