/* ============================================================
   TREATMENT DETAIL — procedure steps timeline, duration,
   recovery, price indication and booking trigger for /:slug
   ============================================================ */
import { useParams, Link, Navigate } from "react-router-dom";
import {
  ChevronRight, Clock, Activity, CircleDollarSign, CalendarCheck2,
  CheckCircle2, MessageCircle, AlertCircle, Sparkles,
} from "lucide-react";
import { PageShell, Reveal, Btn, Tilt, DemoTag } from "../components/ui.jsx";
import { TreatmentCard } from "./Treatments.jsx";
import { useBooking } from "../components/BookingModal.jsx";
import { TREATMENTS, CLINIC } from "../data/content.js";

export default function TreatmentDetail() {
  const { slug } = useParams();
  const booking = useBooking();
  const t = TREATMENTS.find((x) => x.slug === slug);

  /* Unknown slug → back to the catalogue */
  if (!t) return <Navigate to="/treatments" replace />;

  const related = TREATMENTS.filter((x) => x.slug !== slug && x.cat === t.cat)
    .concat(TREATMENTS.filter((x) => x.slug !== slug && x.cat !== t.cat))
    .slice(0, 3);

  return (
    <PageShell>
      {/* ---------- Hero band ---------- */}
      <section className="relative overflow-hidden pb-14 pt-36 sm:pt-40">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_circle_at_80%_0%,rgba(0,168,150,.16),transparent_55%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-[1.5fr_1fr]">
          <div>
            {/* Breadcrumb */}
            <Reveal>
              <nav className="flex items-center gap-1.5 text-xs font-bold text-ink/45" aria-label="Breadcrumb">
                <Link to="/" className="transition hover:text-brand-deep">Home</Link>
                <ChevronRight className="h-3 w-3" />
                <Link to="/treatments" className="transition hover:text-brand-deep">Treatments</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-brand-deep">{t.title}</span>
              </nav>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-6 flex items-center gap-4">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-brand to-navy shadow-[0_18px_38px_-14px_rgba(0,168,150,.6)]">
                  <t.icon className="h-8 w-8 text-white" />
                </span>
                <span className="rounded-full bg-mist px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-brand-deep">
                  {t.cat}
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <h1 className="text-gradient mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
                {t.title}
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg">{t.desc}</p>
            </Reveal>
            <Reveal delay={0.26}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Btn onClick={() => booking.open({ treatment: t.title })} arrow>
                  <CalendarCheck2 className="h-4 w-4" /> Book consultation
                </Btn>
                <Btn variant="ghost" href={CLINIC.whatsapp} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
                </Btn>
              </div>
            </Reveal>
          </div>

          {/* Price / logistics clay panel */}
          <Reveal delay={0.2}>
            <Tilt max={5}>
              <div className="clay p-7">
                <DemoTag />
                <h2 className="mt-4 font-display text-lg font-extrabold text-ink">At a glance</h2>
                <div className="mt-5 space-y-4">
                  {[
                    { icon: CircleDollarSign, k: "Indicative price", v: t.price },
                    { icon: Clock, k: "Appointment time", v: t.time },
                    { icon: Activity, k: "Recovery", v: t.recovery },
                  ].map((r) => (
                    <div key={r.k} className="flex items-center gap-4 rounded-2xl bg-mist/70 p-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                        <r.icon className="h-5 w-5 text-brand-deep" />
                      </span>
                      <div>
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-ink/45">{r.k}</p>
                        <p className="font-display text-base font-extrabold text-ink">{r.v}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-[11px] leading-relaxed text-ink/45">
                  Prices are indicative demo figures. Final quotes always follow a clinical examination and are
                  confirmed in writing before treatment.
                </p>
              </div>
            </Tilt>
          </Reveal>
        </div>
      </section>

      {/* ---------- Procedure steps timeline ---------- */}
      <section className="bg-mist/60 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal>
            <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
              Your visit, <span className="text-gradient">step by step</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {t.steps.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.08}>
                <div className="clay relative h-full p-7">
                  <span className="font-display text-5xl font-extrabold text-brand/15">
                    0{i + 1}
                  </span>
                  <div className="absolute right-6 top-6 hidden h-px w-8 bg-brand/25 md:block" />
                  <h3 className="mt-3 font-display text-lg font-extrabold text-ink">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Perks */}
          <div className="mt-12 flex flex-wrap gap-2.5">
            {t.perks.map((p, i) => (
              <Reveal key={p} delay={i * 0.06}>
                <span className="glass flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold text-ink">
                  <CheckCircle2 className="h-4 w-4 text-brand" /> {p}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Related treatments ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
              Pairs well <span className="text-gradient">with…</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/treatments" className="text-sm font-extrabold text-brand-deep transition hover:text-ink">
              Browse full catalogue →
            </Link>
          </Reveal>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r, i) => <TreatmentCard key={r.slug} t={r} i={i} />)}
        </div>
      </section>

      {/* ---------- CTA band ---------- */}
      <section className="px-5 pb-24">
        <Reveal>
          <div className="clay-coral relative mx-auto max-w-7xl overflow-hidden px-8 py-12 sm:px-14">
            <Sparkles className="absolute -right-6 -top-6 h-40 w-40 text-white/10" />
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-xl">
                <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
                  Ready to talk about {t.title.toLowerCase()}?
                </h2>
                <p className="mt-2 text-sm text-white/80">
                  Consultations are obligation-free. We'll examine, explain and quote — you decide in your own time.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Btn variant="glass" onClick={() => booking.open({ treatment: t.title })} arrow>
                  Book {t.title}
                </Btn>
                <Btn variant="teal" href={CLINIC.phoneHref}>{CLINIC.phone}</Btn>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 flex max-w-2xl items-start justify-center gap-2 text-center text-[11px] text-ink/45">
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
            Treatment suitability varies by patient. A clinical assessment with a licensed dentist is always
            required before any procedure begins.
          </p>
        </Reveal>
      </section>
    </PageShell>
  );
}
