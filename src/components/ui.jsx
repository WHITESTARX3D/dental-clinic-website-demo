/* ============================================================
   UI KIT — shared motion primitives, buttons, accordions,
   route transition shell and micro-components
   ============================================================ */
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useReducedMotion,
  useInView,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  animate,
  AnimatePresence,
} from "framer-motion";
import { Star, StarHalf, Plus, ArrowRight } from "lucide-react";

/* Shared easing — smooth, premium deceleration */
export const EASE = [0.22, 1, 0.36, 1];

/* ---------- Brand mark: custom tooth ------------- */
export function ToothLogo({ className = "h-7 w-7", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <path
        fill={color}
        d="M16 5c-2.2-1.6-5.4-2.3-7.9-1.2C5.4 4.9 4 7.4 4 10.3c0 2.7 1.2 5.2 2.1 7.7.9 2.6 1.2 5.3 1.7 7.9.2 1.2 1.5 1.9 2.5 1.2.9-.7 1.2-1.8 1.5-2.8.4-1.4.7-2.9 1.3-4.2.5-1.1 1.4-2.1 2.9-2.1s2.4 1 2.9 2.1c.6 1.3.9 2.8 1.3 4.2.3 1 .6 2.1 1.5 2.8 1 .7 2.3 0 2.5-1.2.5-2.6.8-5.3 1.7-7.9.9-2.5 2.1-5 2.1-7.7 0-2.9-1.4-5.4-4.1-6.5-2.5-1.1-5.7-.4-7.9 1.2z"
      />
      <path
        fill="#fff"
        opacity=".55"
        d="M8.6 7.6c.9-1 2.2-1.7 3.4-1.9.7-.1 1.2.4 1.3 1 .1.7-.4 1.2-1 1.3-.9.2-1.8.7-2.4 1.3-.5.5-1.3.5-1.7 0-.5-.4-.5-1.2.4-1.7z"
      />
    </svg>
  );
}

/* ---------- Scroll reveal wrapper (stagger-capable) ---------- */
export function Reveal({ children, delay = 0, y = 30, className = "", once = true }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Section heading with eyebrow chip ---------- */
export function SectionHeading({ eyebrow, title, sub, center = true, light = false }) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <Reveal>
          <span
            className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] ${
              light ? "bg-white/15 text-white" : "bg-mist text-brand-deep"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${light ? "bg-coral" : "bg-brand"}`} />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2
          className={`mt-4 font-display text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-[2.75rem] ${
            light ? "text-gradient-light" : "text-gradient"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? "text-white/75" : "text-ink/60"}`}>
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------- Magnetic hover wrapper (spring physics) ---------- */
export function Magnetic({ children, strength = 0.35, className = "" }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 16 });
  const sy = useSpring(y, { stiffness: 200, damping: 16 });

  const onMove = (e) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.span>
  );
}

/* ---------- Buttons (clay + coral CTA variants) ---------- */
export function Btn({
  children,
  variant = "coral",
  href,
  to,
  onClick,
  className = "",
  arrow = false,
  type,
}) {
  const styles = {
    coral:
      "clay-coral text-white hover:brightness-110 active:scale-[0.97] shadow-none hover:shadow-[0_18px_38px_-14px_rgba(255,107,53,.65)]",
    teal:
      "clay-teal text-white hover:brightness-110 active:scale-[0.97]",
    ghost:
      "clay text-ink hover:text-brand-deep active:scale-[0.97]",
    glass:
      "glass text-ink border border-white/60 hover:bg-white/80 active:scale-[0.97]",
  }[variant];

  const inner = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {arrow && <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
      </span>
    </>
  );
  const cls = `group relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold tracking-wide transition-all duration-300 ${styles} ${className}`;

  if (href)
    return (
      <Magnetic>
        <a href={href} onClick={onClick} className={cls}>
          {inner}
        </a>
      </Magnetic>
    );
  if (to)
    return (
      <Magnetic>
        <Link to={to} onClick={onClick} className={cls}>
          {inner}
        </Link>
      </Magnetic>
    );
  return (
    <Magnetic>
      <button type={type || "button"} onClick={onClick} className={cls}>
        {inner}
      </button>
    </Magnetic>
  );
}

/* ---------- 3D tilt card (pointer-tracked, springed) ---------- */
export function Tilt({ children, className = "", max = 8, glare = true }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 260, damping: 20 });
  const sry = useSpring(ry, { stiffness: 260, damping: 20 });
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const onMove = (e) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * max * 2);
    rx.set((0.5 - py) * max * 2);
    glareX.set(px * 100);
    glareY.set(py * 100);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d", perspective: 900 }}
      className={`group relative ${className}`}
    >
      {children}
      {glare && (
        <Glare x={glareX} y={glareY} />
      )}
    </motion.div>
  );
}

/* Live glare position derived from pointer motion values */
function Glare({ x, y }) {
  const bg = useMotionTemplate`radial-gradient(480px circle at ${x}% ${y}%, rgba(255,255,255,.22), transparent 55%)`;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 [div:hover>&]:opacity-100 group-hover:opacity-100"
      style={{ background: bg }}
    />
  );
}

/* ---------- Star rating row ---------- */
export function Stars({ value = 5, className = "h-4 w-4" }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full)
          return <Star key={i} className={`${className} fill-amber text-amber`} />;
        if (i === full && half)
          return <StarHalf key={i} className={`${className} fill-amber text-amber`} />;
        return <Star key={i} className={`${className} text-ink/20`} />;
      })}
    </div>
  );
}

/* ---------- Animated counter ---------- */
export function Counter({ value, suffix = "", decimals = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, value, decimals]);
  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

/* ---------- Interactive FAQ accordion ---------- */
export function Faq({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="space-y-3.5">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={i} delay={i * 0.05}>
            <div
              className={`clay overflow-hidden transition-shadow duration-300 ${
                isOpen ? "shadow-[0_30px_60px_-26px_rgba(7,59,76,.3)]" : ""
              }`}
            >
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-7"
              >
                <span className="font-display text-base font-bold text-ink sm:text-lg">{f.q}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                    isOpen ? "clay-coral text-white shadow-none" : "bg-mist text-brand-deep"
                  }`}
                >
                  <Plus className="h-4 w-4" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    <p className="px-6 pb-6 text-sm leading-relaxed text-ink/65 sm:px-7 sm:text-base">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

/* ---------- Demo-mode badge ---------- */
export function DemoTag({ dark = false }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] ${
        dark ? "bg-white/15 text-white" : "bg-coral/10 text-coral"
      }`}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-coral" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-coral" />
      </span>
      Demo Mode: Simulated Booking System
    </span>
  );
}

/* ============================================================
   Route transition shell — signature "pearl shine" double wipe:
   a deep mint curtain chased by a white gloss pane, with the
   tooth mark + sparkles pulsing at center. Dental-fresh.
   Used by every lazy page via <PageShell>.
   ============================================================ */
export function PageShell({ children }) {
  const reduce = useReducedMotion();
  return (
    <>
      {/* Double curtain wipe (skipped entirely for reduced-motion users) */}
      {!reduce && (
        <>
          {/* Layer 1 — deep mint/ocean curtain */}
          <motion.div
            className="pointer-events-none fixed inset-0 z-[85] origin-top bg-gradient-to-b from-brand via-brand-deep to-navy"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0, transition: { duration: 0.7, ease: EASE, delay: 0.16 } }}
            exit={{ scaleY: 1, transformOrigin: "bottom", transition: { duration: 0.42, ease: EASE } }}
          />
          {/* Layer 2 — white "enamel gloss" pane chasing a beat behind */}
          <motion.div
            className="pointer-events-none fixed inset-0 z-[84] origin-top bg-gradient-to-b from-ice via-mist to-[#d6efec]"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0, transition: { duration: 0.7, ease: EASE, delay: 0.3 } }}
            exit={{ scaleY: 1, transformOrigin: "bottom", transition: { duration: 0.42, ease: EASE, delay: 0.08 } }}
          />
          {/* Layer 3 — centered tooth mark with pulsing halo + sparkles */}
          <motion.div
            className="pointer-events-none fixed inset-0 z-[86] flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0, transition: { duration: 0.45, ease: EASE, delay: 0.55 } }}
            exit={{ opacity: 1, transition: { duration: 0.22, ease: EASE } }}
          >
            <motion.span
              initial={{ scale: 0.6, rotate: -14 }}
              animate={{ scale: 1, rotate: 0, transition: { duration: 0.5, ease: EASE } }}
              exit={{ scale: 0.85, rotate: 10, transition: { duration: 0.25, ease: EASE } }}
              className="relative flex h-24 w-24 items-center justify-center"
            >
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-white/30" />
              <span className="flex h-20 w-20 items-center justify-center rounded-[1.6rem] bg-white/10 ring-1 ring-white/30 backdrop-blur-sm">
                <ToothLogo className="h-11 w-11" color="#ffffff" />
              </span>
              {/* Tiny sparkle accents */}
              <span className="absolute -right-2 -top-2 h-2.5 w-2.5 rounded-full bg-white/80" />
              <span className="absolute -bottom-1 -left-3 h-1.5 w-1.5 rounded-full bg-mist/80" />
            </motion.span>
          </motion.div>
        </>
      )}
      {/* Page body fades up underneath the wipe */}
      <motion.main
        initial={reduce ? {} : { opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay: reduce ? 0 : 0.3 } }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16, transition: { duration: 0.3, ease: EASE } }}
      >
        {children}
      </motion.main>
    </>
  );
}
