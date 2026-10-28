// @ts-nocheck — components are pure JSX; build is handled by Vite only
/* ============================================================
   APP ROOT — routing, global loading screen, route wipes,
   booking wizard context. Sub-routes are code-split (lazy).
   ============================================================ */
import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, animate } from "framer-motion";
import Layout from "./components/Layout.jsx";
import { BookingProvider } from "./components/BookingModal.jsx";
import { EASE, ToothLogo } from "./components/ui.jsx";
import Home from "./pages/Home.jsx";

/* Lazy-loaded sub-routes keep the initial bundle lean */
const About = lazy(() => import("./pages/About.jsx"));
const Treatments = lazy(() => import("./pages/Treatments.jsx"));
const TreatmentDetail = lazy(() => import("./pages/TreatmentDetail.jsx"));
const Dentists = lazy(() => import("./pages/Dentists.jsx"));
const Reviews = lazy(() => import("./pages/Reviews.jsx"));
const Blog = lazy(() => import("./pages/Blog.jsx"));
const BlogPost = lazy(() => import("./pages/BlogPost.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.jsx"));

/* ---------- Global loading overlay ---------- */
function LoadingScreen({ onDone }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 1.7,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setPct(Math.round(v)),
      onComplete: () => setTimeout(onDone, 250),
    });
    return () => controls.stop();
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ice"
      exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.7, ease: EASE } }}
    >
      {/* Soft brand aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,168,150,.14),transparent_55%)]" />
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative flex h-24 w-24 items-center justify-center"
      >
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand/40" />
        <span className="clay-teal flex h-20 w-20 items-center justify-center rounded-[1.6rem] shadow-none">
          <ToothLogo className="h-11 w-11" color="#fff" />
        </span>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="text-gradient mt-6 font-display text-xl font-extrabold tracking-tight"
      >
        Lumis Dental Studio
      </motion.p>
      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.32em] text-brand-deep">Polishing pixels…</p>

      {/* Progress bar */}
      <div className="mt-8 h-1.5 w-56 overflow-hidden rounded-full bg-ink/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand via-brand-deep to-navy"
          style={{ width: `${pct}%` }}
          transition={{ ease: "linear" }}
        />
      </div>
      <p className="mt-3 font-mono text-xs font-bold text-ink/40">{pct}%</p>
    </motion.div>
  );
}

/* Tiny fallback while a lazily-loaded route chunk streams in */
function ChunkLoader() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
        className="h-10 w-10 rounded-full border-[3px] border-mist border-t-brand"
      />
    </div>
  );
}

/* ---------- Animated route tree ---------- */
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<ChunkLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/treatments" element={<Treatments />} />
            <Route path="/treatments/:slug" element={<TreatmentDetail />} />
            <Route path="/dentists" element={<Dentists />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  return (
    <BrowserRouter>
      <BookingProvider>
        <AnimatePresence>{!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}</AnimatePresence>
        {/* App renders beneath the full-screen loader so content is warm on reveal */}
        <AnimatedRoutes />
      </BookingProvider>
    </BrowserRouter>
  );
}
