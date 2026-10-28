/* ============================================================
   LAYOUT — glass navbar, mobile menu, rich footer,
   floating WhatsApp CTA and scroll restoration
   ============================================================ */
import { useEffect, useState } from "react";
import { NavLink, Link, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Phone, MessageCircle, MapPin, Mail, Clock, ShieldCheck,
  Globe, AtSign, Share2, ArrowUpRight, Sparkle,
} from "lucide-react";
import { EASE, ToothLogo, Btn, Reveal } from "./ui.jsx";
import { useBooking } from "./BookingModal.jsx";
import { CLINIC, NAV_LINKS, TREATMENTS, HOURS } from "../data/content.js";

/* ---------- Scroll to top (placeholder preserved on route change) ---------- */
export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo({ top: 0, behavior: "instant" }), [pathname]);
  return null;
}

/* ---------- Header / Navbar ---------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const booking = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close drawer on navigation + lock scroll while open + Esc key */
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-5"
      >
        <nav
          aria-label="Primary"
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5 ${
            scrolled ? "glass shadow-[0_18px_40px_-20px_rgba(7,59,76,.35)]" : "border border-transparent bg-transparent"
          }`}
        >
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5" aria-label="Lumis Dental Studio — home">
            <span className="clay-teal flex h-11 w-11 items-center justify-center rounded-2xl shadow-none">
              <ToothLogo className="h-6 w-6" color="#fff" />
            </span>
            <span className="leading-tight">
              <span className="text-gradient block font-display text-lg font-extrabold tracking-tight">Lumis</span>
              <span className="block text-[9px] font-bold uppercase tracking-[0.28em] text-brand-deep">Dental Studio</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `relative rounded-full px-4 py-2 text-[13px] font-bold transition-colors duration-300 ${
                    isActive ? "text-white" : "text-ink/60 hover:text-ink"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="clay-teal absolute inset-0 -z-0 rounded-full shadow-none"
                        transition={{ duration: 0.45, ease: EASE }}
                      />
                    )}
                    <span className="relative z-10">{l.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <a
              href={CLINIC.phoneHref}
              className="hidden h-11 items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 text-sm font-bold text-ink transition hover:border-brand/40 hover:text-brand-deep md:flex"
            >
              <Phone className="h-4 w-4 text-brand" />
              <span className="hidden xl:inline">{CLINIC.phone}</span>
              <span className="xl:hidden">Call</span>
            </a>
            <button
              onClick={() => booking.open()}
              className="clay-coral hidden h-11 cursor-pointer items-center gap-2 rounded-full px-5 text-sm font-bold text-white transition-all duration-300 hover:brightness-110 active:scale-95 sm:flex"
            >
              <Sparkle className="h-4 w-4" /> Book a visit
            </button>
            {/* Mobile menu trigger */}
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="clay flex h-11 w-11 items-center justify-center rounded-full text-ink lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer — full-screen glass sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="glass fixed inset-0 z-[60] flex flex-col overflow-y-auto backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0, y: "-4%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-4%" }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {/* Dedicated close control — always reachable inside the drawer */}
            <motion.button
              initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6, rotate: 90 }}
              transition={{ duration: 0.4, ease: EASE, delay: 0.15 }}
              onClick={() => setOpen(false)}
              aria-label="Close navigation menu"
              autoFocus
              className="clay fixed right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full text-ink shadow-lg transition hover:rotate-90 hover:text-coral"
            >
              <X className="h-5 w-5" />
            </motion.button>
            <div className="flex flex-1 flex-col px-8 pb-10 pt-24">
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.08 + i * 0.05, duration: 0.5, ease: EASE } }}
                >
                  <NavLink
                    to={l.to}
                    end={l.to === "/"}
                    className={({ isActive }) =>
                      `flex items-center justify-between border-b border-ink/8 py-4 font-display text-3xl font-extrabold tracking-tight ${
                        isActive ? "text-brand-deep" : "text-ink"
                      }`
                    }
                  >
                    {l.label}
                    <ArrowUpRight className="h-6 w-6 text-brand/50" />
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                className="mt-8 flex flex-col gap-3"
              >
                <button
                  onClick={() => { setOpen(false); booking.open(); }}
                  className="clay-coral flex h-14 items-center justify-center gap-2 rounded-2xl text-base font-bold text-white"
                >
                  <Sparkle className="h-5 w-5" /> Book a visit
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <a href={CLINIC.phoneHref} className="clay flex h-12 items-center justify-center gap-2 rounded-2xl text-sm font-bold text-ink">
                    <Phone className="h-4 w-4 text-brand" /> Call
                  </a>
                  <a href={CLINIC.whatsapp} target="_blank" rel="noreferrer" className="clay flex h-12 items-center justify-center gap-2 rounded-2xl text-sm font-bold text-ink">
                    <MessageCircle className="h-4 w-4 text-brand" /> WhatsApp
                  </a>
                </div>
                {/* Secondary explicit close affordance */}
                <button
                  onClick={() => setOpen(false)}
                  className="link-underline mx-auto w-fit py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-ink/45 transition hover:text-ink"
                >
                  Close menu
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  const booking = useBooking();
  return (
    <footer className="px-3 pb-24 pt-6 sm:px-5 md:pb-6">
      {/* CTA ribbon — scroll revealed */}
      <Reveal className="mx-auto mb-6 max-w-7xl">
        <div className="clay-coral relative overflow-hidden px-8 py-10 sm:px-12">
          <div className="dot-grid absolute inset-0 opacity-20" />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h3 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
                Ready for your healthiest smile?
              </h3>
              <p className="mt-1.5 max-w-md text-sm text-white/80">
                First checkup is on the house. Book in 60 seconds — no account, no card, no pressure.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Btn variant="glass" onClick={() => booking.open()} arrow>Book free checkup</Btn>
              <Btn href={CLINIC.whatsapp} target="_blank" rel="noreferrer" variant="teal">
                <MessageCircle className="h-4 w-4" /> WhatsApp us
              </Btn>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Main footer body — scroll revealed */}
      <Reveal delay={0.1} className="mx-auto max-w-7xl">
      <div className="clay-teal overflow-hidden text-white">
        <div className="grid gap-10 px-8 py-12 sm:px-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/12">
                <ToothLogo className="h-6 w-6" color="#fff" />
              </span>
              <span className="leading-tight">
                <span className="block font-display text-lg font-extrabold">Lumis</span>
                <span className="block text-[9px] font-bold uppercase tracking-[0.28em] text-white/60">Dental Studio</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              Gentle, transparent, technology-driven dentistry in the heart of {CLINIC.city.split(",")[0]}.
            </p>
            <div className="mt-5 flex gap-2.5">
              {[Globe, AtSign, Share2].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social link" onClick={(e) => e.preventDefault()}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/25">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/50">Explore</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="link-underline text-white/80 transition hover:text-white">{l.label}</Link>
                </li>
              ))}
              <li><Link to="/privacy-policy" className="link-underline text-white/80 transition hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Treatments */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/50">Treatments</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {TREATMENTS.slice(0, 6).map((t) => (
                <li key={t.slug}>
                  <Link to={`/treatments/${t.slug}`} className="link-underline text-white/80 transition hover:text-white">{t.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + hours */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/50">Visit us</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/50" />{CLINIC.address}, {CLINIC.city}</li>
              <li><a href={CLINIC.phoneHref} className="flex items-center gap-2.5 transition hover:text-white"><Phone className="h-4 w-4 shrink-0 text-white/50" />{CLINIC.phone}</a></li>
              <li><a href={`mailto:${CLINIC.email}`} className="flex items-center gap-2.5 transition hover:text-white"><Mail className="h-4 w-4 shrink-0 text-white/50" />{CLINIC.email}</a></li>
              <li className="flex items-start gap-2.5"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-white/50" /><span>Mon–Fri {HOURS[0].time}<br />Sat {HOURS[5].time}</span></li>
            </ul>
          </div>
        </div>

        {/* Legal strip */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 px-8 py-5 text-[11px] text-white/55 sm:flex-row sm:px-12">
          <p>© 2026 {CLINIC.name}. Portfolio demonstration website — not a real clinic.</p>
          <p className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> Content is educational, not medical advice.</p>
        </div>
      </div>
      </Reveal>
    </footer>
  );
}

/* ---------- Floating WhatsApp action (sticky, all viewports) ---------- */
function WhatsAppFloat() {
  return (
    <motion.a
      href={CLINIC.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200, damping: 15 }}
      className="group fixed bottom-5 right-5 z-[70] flex items-center gap-0 rounded-full bg-[#25D366] p-3.5 text-white shadow-[0_16px_40px_-10px_rgba(37,211,102,.6)] transition-all duration-300 hover:pr-5 sm:bottom-7 sm:right-7"
    >
      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]" />
      <MessageCircle className="relative h-6 w-6" />
      <span className="relative max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold transition-all duration-300 group-hover:ml-2 group-hover:max-w-[140px]">
        WhatsApp us
      </span>
    </motion.a>
  );
}

/* ---------- Exported layout shell ---------- */
export default function Layout() {
  return (
    <div className="relative min-h-screen">
      {/* Skip link for keyboard users */}
      <a href="#page" className="sr-only z-[100] rounded-full bg-ink px-5 py-3 text-sm font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <ScrollToTop />
      <Navbar />
      <div id="page">
        <Outlet />
      </div>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
