/* ============================================================
   ABOUT — philosophy, hygiene protocols, technology stack
   and an interactive clinic tour gallery
   ============================================================ */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, Wind, PackageCheck, Recycle, ScanFace, Microscope,
  FlaskConical, Zap, Heart, Eye, Quote, ArrowRight,
} from "lucide-react";
import { PageShell, Reveal, SectionHeading, Btn, Tilt, Stars, ToothLogo } from "../components/ui.jsx";
import { useBooking } from "../components/BookingModal.jsx";
import { TOUR, CLINIC } from "../data/content.js";

/* ---------- Philosophy hero ---------- */
function Philosophy() {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 sm:pt-44">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_circle_at_15%_10%,rgba(0,168,150,.16),transparent_55%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-mist px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand-deep">
              <Heart className="h-3.5 w-3.5" /> Our philosophy
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Nobody should
              <br />
              <span className="text-gradient">fear the chair.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink/60 sm:text-lg">
              Lumis was founded on a simple observation: most people don't fear dentistry — they fear the
              unknown. So we made everything visible. Your scan on a screen. Your plan in plain English.
              Your price in writing, before we begin.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-6 flex items-start gap-4 rounded-3xl border-l-4 border-brand bg-mist/60 p-5">
              <Quote className="h-6 w-6 shrink-0 -scale-x-100 text-brand" />
              <div>
                <p className="text-sm font-semibold italic leading-relaxed text-ink/75">
                  "Measure twice, treat once. And always explain like you'd explain to your own family."
                </p>
                <p className="mt-2 text-xs font-extrabold uppercase tracking-wider text-brand-deep">
                  Dr. Maya Chen — Founder & Lead Dentist
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.28}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn href={CLINIC.phoneHref} variant="teal">Talk to us</Btn>
              <Btn to="/treatments" variant="ghost" arrow>See treatments</Btn>
            </div>
          </Reveal>
        </div>

        {/* Layered image composition */}
        <Reveal delay={0.18}>
          <div className="relative">
            <div className="clay overflow-hidden p-3">
              <img
                src={TOUR[1].src} alt="Modern treatment suite at Lumis Dental Studio" loading="lazy"
                className="aspect-[4/5] w-full rounded-2xl object-cover sm:aspect-square"
              />
            </div>
            <div className="glass absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl px-5 py-4 sm:-left-8">
              <Stars value={5} />
              <div className="text-xs font-bold text-ink">{CLINIC.rating} · {CLINIC.reviewCount.toLocaleString()} reviews</div>
            </div>
            <div className="absolute -right-3 -top-3 -z-10 h-40 w-40 rounded-full bg-brand/20 blur-2xl" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Hygiene protocol cards ---------- */
function Hygiene() {
  const items = [
    { icon: PackageCheck, title: "Sealed instrument pouches", text: "Every instrument arrives at your chair in a sterile pouch opened in front of you — sealed, dated, single-load." },
    { icon: Wind, title: "HEPA air purification", text: "Medical-grade H13 HEPA filtration in every suite exchanges the full room volume twelve times per hour." },
    { icon: ScanFace, title: "Digital tracking", text: "Instruments are barcode-tracked through hospital-grade autoclaves with every cycle logged and audited." },
    { icon: Recycle, title: "Single-use where it matters", text: "Needles, cups, saliva ejectors and barriers are single-use, every time. No exceptions, no shortcuts." },
  ];
  return (
    <section className="bg-mist/60 py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="Hygiene protocols"
          title={<>Cleaner than <span className="text-gradient">you can see</span></>}
          sub="Sterilisation isn't a feature — it's the floor. Here's the protocol every room, every patient, every time."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.07}>
              <Tilt className="h-full" max={6}>
                <div className="clay h-full p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10">
                    <it.icon className="h-6 w-6 text-brand-deep" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-extrabold text-ink">{it.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{it.text}</p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Technology stack ---------- */
function Tech() {
  const tech = [
    { icon: ScanFace, name: "3D CBCT imaging", desc: "90% less radiation than film, rendered in full 3D on your chairside screen." },
    { icon: Microscope, name: "Operating microscopes", desc: "20× magnification finds cracks and canals the naked eye misses." },
    { icon: FlaskConical, name: "In-house ceramic lab", desc: "Crowns designed and milled on-site — same-week, shade-perfect." },
    { icon: Zap, name: "Laser gum therapy", desc: "Needle-free decontamination for early gum disease. Quiet and gentle." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-24">
      <SectionHeading
        eyebrow="Our tech stack"
        title={<>Technology that <span className="text-gradient">shortens visits</span></>}
        sub="We invest where patients feel it: fewer appointments, smaller needles, better fits."
      />
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {tech.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.07}>
            <div className="clay group flex items-start gap-5 p-7 transition-colors duration-500 hover:bg-gradient-to-br hover:from-white hover:to-mist">
              <span className="clay-teal flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-none transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                <t.icon className="h-6 w-6 text-white" />
              </span>
              <div>
                <h3 className="font-display text-lg font-extrabold text-ink">{t.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{t.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- Interactive tour gallery ---------- */
function Tour() {
  const [active, setActive] = useState(0);
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-ice py-24">
      <div className="dot-grid absolute inset-0 opacity-40 [mask-image:linear-gradient(black,transparent)]" />
      <div className="relative mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="Take the tour"
          title={<>Look around — <span className="text-gradient">before you arrive</span></>}
          sub="Click the stops below to walk through the studio. Arriving familiar is arriving calm."
        />
        <div className="mt-14 grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* Main viewer */}
          <Reveal>
            <div className="clay overflow-hidden p-3">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={active}
                    src={TOUR[active].src}
                    alt={TOUR[active].title}
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    loading="lazy"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                <div className="glass absolute bottom-4 left-4 right-4 rounded-2xl px-5 py-4 sm:left-6 sm:right-auto sm:max-w-sm">
                  <p className="font-display text-base font-extrabold text-ink">{TOUR[active].title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-ink/65">{TOUR[active].text}</p>
                </div>
              </div>
            </div>
          </Reveal>
          {/* Stop selector */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
            {TOUR.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <button
                  onClick={() => setActive(i)}
                  className={`group flex w-full items-center justify-between gap-3 rounded-2xl border-2 px-5 py-4 text-left transition-all duration-300 ${
                    active === i ? "border-brand bg-white shadow-[0_16px_36px_-18px_rgba(0,168,150,.5)]" : "border-ink/8 bg-white/60 hover:border-brand/40"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-extrabold ${active === i ? "bg-brand text-white" : "bg-mist text-brand-deep"}`}>
                      {i + 1}
                    </span>
                    <span className="text-sm font-extrabold text-ink">{s.title}</span>
                  </span>
                  <ArrowRight className={`h-4 w-4 transition-all ${active === i ? "translate-x-0 text-brand opacity-100" : "-translate-x-1 opacity-0"}`} />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  const booking = useBooking();
  return (
    <PageShell>
      <Philosophy />
      <Hygiene />
      <Tech />
      <Tour />
      {/* CTA */}
      <section className="px-5 pb-24">
        <Reveal>
          <div className="clay-teal relative mx-auto flex max-w-7xl flex-col items-center gap-6 overflow-hidden px-8 py-14 text-center">
            <Eye className="h-9 w-9 text-white/70" />
            <h2 className="max-w-2xl font-display text-2xl font-extrabold text-white sm:text-4xl">
              The best way to judge a clinic is to sit in the chair.
            </h2>
            <p className="max-w-md text-sm text-white/70">
              Tour + meet & greet + digital scan — free, 30 minutes, zero obligation.
            </p>
            <div className="flex items-center gap-2">
              <Btn variant="glass" onClick={() => booking.open()}>Book a free studio tour</Btn>
            </div>
          </div>
        </Reveal>
      </section>
    </PageShell>
  );
}
