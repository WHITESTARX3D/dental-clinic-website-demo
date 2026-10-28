/* ============================================================
   HOME — hero with interactive 3D tooth, quick booking bar,
   features, popular services, team teaser, Swiper testimonials,
   FAQ accordion and CTA band.
   ============================================================ */
import { useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  ShieldCheck, Cpu, BadgeDollarSign, PhoneCall, ArrowRight, ChevronRight,
  BadgeCheck, Sparkles, CalendarDays, HeartPulse, Quote, AlertCircle,
} from "lucide-react";
import { FallbackTooth } from "../components/ToothFallback.jsx";

/* 3D hero chunk loads lazily — polished 2D tooth shows instantly */
const ToothScene = lazy(() => import("../components/ToothScene.jsx"));
import {
  PageShell, Reveal, SectionHeading, Btn, Tilt, Stars, Counter, Faq, DemoTag, ToothLogo, EASE,
} from "../components/ui.jsx";
import { TreatmentCard } from "./Treatments.jsx";
import { useBooking } from "../components/BookingModal.jsx";
import { TREATMENTS, DENTISTS, REVIEWS, FAQS, STATS, CLINIC } from "../data/content.js";

/* ---------- Hero: copy + 3D canvas + floating glass chips ---------- */
function Hero() {
  const booking = useBooking();
  return (
    <section className="relative overflow-hidden pb-10 pt-32 sm:pt-36 lg:min-h-[92vh] lg:pb-0">
      {/* Ambient background: brand gradients + dot texture */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_circle_at_82%_18%,rgba(0,168,150,.18),transparent_55%),radial-gradient(800px_circle_at_12%_80%,rgba(5,102,141,.12),transparent_55%)]" />
        <div className="dot-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(900px_circle_at_75%_20%,black,transparent_70%)]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-2 lg:gap-4">
        {/* Copy column */}
        <div className="relative z-10 max-w-xl">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 1.9 }}>
            <div className="flex flex-wrap items-center gap-2.5">
              <DemoTag />
              <span className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-brand-deep">
                <HeartPulse className="h-3 w-3" /> Accepting new patients
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 2 }}
            className="mt-6 font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.2rem]"
          >
            <span className="text-gradient">Gentle care.</span>
            <br />
            <span className="text-gradient-coral">Brilliant smiles.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 2.1 }}
            className="mt-5 max-w-md text-base leading-relaxed text-ink/60 sm:text-lg"
          >
            Anxiety-free dentistry powered by 3D imaging, microscope precision and transparent,
            flat pricing — right here in {CLINIC.city.split(",")[0]}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 2.2 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Btn onClick={() => booking.open()} arrow>Book free checkup</Btn>
            <Btn variant="ghost" to="/treatments">
              Explore treatments
            </Btn>
          </motion.div>

          {/* Trust row: overlapping avatars + rating */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 2.35 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <div className="flex -space-x-3">
              {REVIEWS.slice(0, 4).map((r) => (
                <img
                  key={r.name}
                  src={r.avatar}
                  alt={r.name}
                  loading="lazy"
                  className="h-11 w-11 rounded-full border-[3px] border-white object-cover shadow-md"
                />
              ))}
              <span className="flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-white bg-brand-deep text-[11px] font-extrabold text-white shadow-md">
                +{CLINIC.reviewCount.toLocaleString()}
              </span>
            </div>
            <div>
              <Stars value={CLINIC.rating} />
              <p className="mt-1 text-xs font-semibold text-ink/55">
                {CLINIC.rating} from {CLINIC.reviewCount.toLocaleString()} verified patient reviews
              </p>
            </div>
          </motion.div>
        </div>

        {/* 3D canvas column with floating parallax chips */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 2.05 }}
          className="relative z-0 mx-auto aspect-square w-full max-w-[440px] sm:max-w-[560px] lg:max-w-none"
        >
          {/* 3D canvas with polished instant 2D fallback while the chunk streams in */}
          <Suspense fallback={<div className="absolute inset-0"><FallbackTooth /></div>}>
            <ToothScene className="absolute inset-0" />
          </Suspense>

          {/* Floating glass chips — anchored to safe corners, stacked above the canvas (z-20),
              compact paddings on mobile, GPU-only float transforms. Never overlap each other. */}
          <div className="glass absolute left-[2%] top-[7%] z-20 flex animate-float items-center gap-2 rounded-2xl px-3 py-2.5 sm:left-[5%] sm:top-[10%] sm:gap-2.5 sm:px-4 sm:py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand/12 sm:h-9 sm:w-9"><ShieldCheck className="h-4 w-4 text-brand-deep sm:h-5 sm:w-5" /></span>
            <div><p className="text-[11px] font-extrabold text-ink sm:text-xs">Painless pledge</p><p className="text-[9px] font-semibold text-ink/50 sm:text-[10px]">Or your visit is free</p></div>
          </div>
          <div className="glass absolute right-[2%] top-[34%] z-20 flex animate-float-slow items-center gap-2 rounded-2xl px-3 py-2.5 [animation-delay:1.2s] sm:right-[4%] sm:gap-2.5 sm:px-4 sm:py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-coral/12 sm:h-9 sm:w-9"><Sparkles className="h-4 w-4 text-coral sm:h-5 sm:w-5" /></span>
            <div><p className="text-[11px] font-extrabold text-ink sm:text-xs">Same-day crowns</p><p className="text-[9px] font-semibold text-ink/50 sm:text-[10px]">In-house ceramic lab</p></div>
          </div>
          <div className="glass absolute bottom-[5%] left-1/2 z-20 flex -translate-x-1/2 animate-float items-center gap-2 rounded-2xl px-3 py-2.5 [animation-delay:2.1s] sm:gap-2.5 sm:px-4 sm:py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber/15 sm:h-9 sm:w-9"><BadgeCheck className="h-4 w-4 text-amber sm:h-5 sm:w-5" /></span>
            <div><p className="text-[11px] font-extrabold text-ink sm:text-xs">4.9 rated care</p><p className="text-[9px] font-semibold text-ink/50 sm:text-[10px]">1,284 verified reviews</p></div>
          </div>
        </motion.div>
      </div>

      {/* ---- Quick booking bar ---- */}
      <QuickBar />
    </section>
  );
}

/* Compact booking bar under the hero — feeds the wizard */
function QuickBar() {
  const booking = useBooking();
  const [treatment, setTreatment] = useState("");
  const [day, setDay] = useState("");
  const go = () => booking.open({ treatment });
  return (
    <Reveal y={36} className="relative z-10 mx-auto -mb-2 mt-2 max-w-5xl px-5 lg:-mt-4 lg:translate-y-1/2">
      <div className="glass flex flex-col items-stretch gap-3 rounded-3xl p-4 sm:flex-row sm:items-center sm:rounded-full sm:py-3 sm:pl-7">
        <div className="flex flex-1 items-center gap-3 border-b border-ink/8 pb-3 sm:border-b-0 sm:border-r sm:pb-0">
          <ToothLogo className="h-5 w-5 shrink-0" color="#028090" />
          <select
            value={treatment} onChange={(e) => setTreatment(e.target.value)}
            className="w-full cursor-pointer bg-transparent text-sm font-bold text-ink outline-none"
            aria-label="Choose treatment"
          >
            <option value="">What do you need?</option>
            {TREATMENTS.map((t) => <option key={t.slug} value={t.title}>{t.title}</option>)}
          </select>
        </div>
        <div className="flex flex-1 items-center gap-3 border-b border-ink/8 pb-3 sm:border-b-0 sm:border-r sm:pb-0">
          <CalendarDays className="h-5 w-5 shrink-0 text-brand-deep" />
          <select
            value={day} onChange={(e) => setDay(e.target.value)}
            className="w-full cursor-pointer bg-transparent text-sm font-bold text-ink outline-none"
            aria-label="Preferred day"
          >
            <option value="">Any day works</option>
            <option>Today</option><option>Tomorrow</option><option>This week</option>
          </select>
        </div>
        <button
          onClick={go}
          className="clay-coral flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white transition hover:brightness-110 active:scale-95"
        >
          Find my slot <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </Reveal>
  );
}

/* Infinite marquee of treatment names — pure CSS translation */
function Marquee() {
  const items = TREATMENTS.map((t) => t.title);
  return (
    <section className="mt-20 border-y border-brand/10 bg-mist/60 py-5 lg:mt-[4.5rem]" aria-hidden="true">
      <Reveal y={16}>
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {[...items, ...items].map((name, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-lg font-bold text-brand-deep/60">
            {name}
            <ToothLogo className="h-4 w-4" color="#00a896" />
          </span>
        ))}
      </div>
      </Reveal>
    </section>
  );
}

/* Why-us clay feature cards with tilt + icon glow */
function Features() {
  const feats = [
    { icon: ShieldCheck, title: "Painless pledge", text: "Buffered anaesthesia, numbing gel as standard and a 'raise your hand to stop' promise on every appointment." },
    { icon: Cpu, title: "Digital dentistry", text: "3D CBCT imaging, microscope endodontics and guided implant surgery — fewer visits, better outcomes." },
    { icon: BadgeDollarSign, title: "Transparent pricing", text: "Every plan itemised before we start. 0% monthly plans on treatments over $300. No surprise bills, ever." },
    { icon: PhoneCall, title: "24/7 emergency line", text: "Chipped at midnight? Swelling on Sunday? Real humans answer — and we hold same-day slots for pain." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-24">
      <SectionHeading
        eyebrow="Why Lumis"
        title={<>Dentistry, redesigned around <span className="text-gradient">comfort</span></>}
        sub="Every detail of the studio — from buffered anaesthesia to pricing you can screenshot — exists to remove the reasons people avoid the dentist."
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {feats.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.08}>
            <Tilt className="h-full">
              <div className="clay group flex h-full flex-col p-7">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-mist transition-all duration-500 group-hover:scale-110 group-hover:bg-brand group-hover:shadow-[0_14px_30px_-10px_rgba(0,168,150,.6)]">
                  <f.icon className="h-6 w-6 text-brand-deep transition-colors duration-500 group-hover:text-white" />
                </span>
                <h3 className="mt-5 font-display text-lg font-extrabold text-ink">{f.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink/60">{f.text}</p>
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- Popular services grid ---------- */
function Popular() {
  const popular = TREATMENTS.filter((t) => t.popular).concat(TREATMENTS.filter((t) => !t.popular).slice(0, 2)).slice(0, 6);
  return (
    <section className="bg-mist/60 py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            center={false}
            eyebrow="Most booked"
            title={<>Popular <span className="text-gradient">treatments</span></>}
            sub="Flat pricing, honest timelines, and a comfort-first approach — choose a treatment to see exactly what happens."
          />
          <Reveal delay={0.2}>
            <Link to="/treatments" className="group flex items-center gap-2 text-sm font-extrabold text-brand-deep">
              View all 12 treatments
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/12 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-brand group-hover:text-white">
                <ChevronRight className="h-4 w-4" />
              </span>
            </Link>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((t, i) => <TreatmentCard key={t.slug} t={t} i={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ---------- Team teaser: scroll-snap profile row ---------- */
function TeamTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24">
      <SectionHeading
        eyebrow="Meet the team"
        title={<>Specialists who <span className="text-gradient">smile back</span></>}
        sub="Four lead clinicians, one shared obsession: results you're proud of, delivered gently."
      />
      <div className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {DENTISTS.map((d, i) => (
          <Reveal key={d.name} delay={i * 0.07} className="w-[270px] shrink-0 snap-start sm:w-[300px]">
            <Tilt max={6}>
              <Link to="/dentists" className="clay group block overflow-hidden">
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={d.photo} alt={d.name} loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-display text-lg font-extrabold text-white">{d.name}</p>
                    <p className="text-xs font-semibold text-white/70">{d.role}</p>
                  </div>
                  <span className="glass absolute right-4 top-4 rounded-full px-3 py-1 text-[10px] font-extrabold text-ink">
                    {d.exp} yrs exp
                  </span>
                </div>
                <div className="flex gap-1.5 p-4">
                  {d.tags.slice(0, 2).map((t) => (
                    <span key={t} className="rounded-full bg-mist px-3 py-1 text-[10px] font-bold text-brand-deep">{t}</span>
                  ))}
                </div>
              </Link>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- Testimonials: Swiper carousel ---------- */
function Testimonials() {
  return (
    <section className="overflow-hidden bg-gradient-to-b from-white to-mist/50 py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="Patient stories"
          title={<>Loved by <span className="text-gradient">nervous patients</span> especially</>}
          sub="Verified reviews from people who used to avoid the dentist — and now book their next visit on the way out."
        />
        <Reveal delay={0.15} className="mt-14">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            autoplay={{ delay: 4200, pauseOnMouseEnter: true }}
            pagination={{ clickable: true }}
            loop
            spaceBetween={24}
            breakpoints={{
              0: { slidesPerView: 1 },
              720: { slidesPerView: 2 },
              1120: { slidesPerView: 3 },
            }}
            className="pb-14!"
          >
            {REVIEWS.map((r) => (
              <SwiperSlide key={r.name + r.date} className="h-auto">
                <Tilt max={4} className="h-full">
                  <figure className="clay flex h-full flex-col p-7">
                    <Quote className="h-7 w-7 text-brand/30" />
                    <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink/70">“{r.text}”</blockquote>
                    <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/8 pt-5">
                      <img src={r.avatar} alt={r.name} loading="lazy" className="h-11 w-11 rounded-full object-cover" />
                      <div className="flex-1">
                        <p className="flex items-center gap-1.5 text-sm font-extrabold text-ink">
                          {r.name} <BadgeCheck className="h-4 w-4 text-brand" aria-label="Verified patient" />
                        </p>
                        <p className="text-[11px] font-semibold text-ink/45">{r.treatment} · {r.date}</p>
                      </div>
                      <Stars value={r.rating} className="h-3.5 w-3.5" />
                    </figcaption>
                  </figure>
                </Tilt>
              </SwiperSlide>
            ))}
          </Swiper>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- FAQ + sticky contact side card ---------- */
function FaqSection() {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-5 py-24 lg:grid-cols-[1.4fr_1fr]">
      <div>
        <SectionHeading
          center={false}
          eyebrow="Good to know"
          title={<>Answers, <span className="text-gradient">before you ask</span></>}
          sub="The questions every new patient asks — answered honestly."
        />
        <div className="mt-10"><Faq items={FAQS.slice(0, 6)} /></div>
      </div>
      <Reveal delay={0.15}>
        <div className="clay-teal sticky top-28 p-8 text-white">
          <PhoneCall className="h-8 w-8" />
          <h3 className="mt-4 font-display text-2xl font-extrabold">In pain right now?</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/75">
            We hold same-day emergency slots every day. Call the priority line and a real human answers — 24/7.
          </p>
          <div className="mt-6 space-y-3">
            <Btn href={CLINIC.emergencyHref} variant="glass" className="w-full justify-start">{CLINIC.emergency} — Emergency</Btn>
            <Btn href={CLINIC.whatsapp} target="_blank" rel="noreferrer" variant="glass" className="w-full justify-start">Message on WhatsApp</Btn>
          </div>
          <p className="mt-6 flex items-start gap-2 text-[11px] leading-relaxed text-white/55">
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            Severe facial swelling, fever or breathing difficulty? Call local emergency services first.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- Stats CTA band ---------- */
function StatsBand() {
  return (
    <section className="px-5 pb-24">
      <div className="clay-teal relative mx-auto max-w-7xl overflow-hidden px-8 py-14 sm:px-14">
        <div className="dot-grid absolute inset-0 opacity-15" />
        <div className="relative grid gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <p className="font-display text-5xl font-extrabold text-white">
                <Counter value={s.value} suffix={s.suffix} decimals={s.decimals || 0} />
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-white/60">{s.label}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="relative mx-auto mt-10 max-w-xl text-center text-sm text-white/70">
            Numbers a studio earns one gentle appointment at a time.{" "}
            <Link to="/reviews" className="font-bold text-white underline underline-offset-4 transition hover:text-mist">
              Read the reviews →
            </Link>
          </p>
        </Reveal>
      </div>
      {/* Medical responsibility banner */}
      <Reveal delay={0.1}>
        <p className="mx-auto mt-8 flex max-w-3xl items-start justify-center gap-2 text-center text-[11px] leading-relaxed text-ink/45">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
          This is a demonstration website. Educational content here never replaces a clinical assessment —
          always consult a licensed dental professional about your individual care.
        </p>
      </Reveal>
    </section>
  );
}

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <Marquee />
      <Features />
      <Popular />
      <TeamTeaser />
      <Testimonials />
      <FaqSection />
      <StatsBand />
    </PageShell>
  );
}
