/* ============================================================
   REVIEWS — rating breakdown, simulated Google-style reviews,
   video feedback placeholders and consent-marked smile gallery
   ============================================================ */
import { motion } from "framer-motion";
import {
  BadgeCheck, Quote, Play, ShieldAlert, Camera, ThumbsUp, MessageSquareText, Star,
} from "lucide-react";
import { PageShell, Reveal, SectionHeading, Btn, Stars, Counter, EASE } from "../components/ui.jsx";
import { useBooking } from "../components/BookingModal.jsx";
import { REVIEWS, RATING_BREAKDOWN, CLINIC } from "../data/content.js";

/* ---------- Aggregate rating hero ---------- */
function RatingHero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 sm:pt-44">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_circle_at_50%_0%,rgba(0,168,150,.15),transparent_55%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2">
        <div>
          <SectionHeading
            center={false}
            eyebrow="Patient trust"
            title={<>Proof, not <span className="text-gradient-coral">promises</span></>}
            sub="Every score below mirrors our live patient feedback log. In this demo the data is simulated — the transparency standard is not."
          />
          <Reveal delay={0.2}>
            <div className="mt-8 flex items-center gap-5">
              <span className="font-display text-7xl font-extrabold text-ink sm:text-8xl">
                <Counter value={CLINIC.rating} decimals={1} />
              </span>
              <div>
                <Stars value={5} className="h-5 w-5" />
                <p className="mt-2 text-sm font-bold text-ink/60">
                  {CLINIC.reviewCount.toLocaleString()} verified reviews
                </p>
                <p className="text-xs font-semibold text-ink/40">Simulated Google reviews feed</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Animated breakdown bars */}
        <div className="clay p-7 sm:p-9">
          <h3 className="flex items-center gap-2 font-display text-lg font-extrabold text-ink">
            <MessageSquareText className="h-5 w-5 text-brand" /> Rating breakdown
          </h3>
          <div className="mt-6 space-y-4">
            {RATING_BREAKDOWN.map((r, i) => (
              <div key={r.stars} className="flex items-center gap-4">
                <span className="flex w-10 items-center gap-1 text-sm font-extrabold text-ink/60">
                  {r.stars} <Star className="h-3.5 w-3.5 fill-amber text-amber" />
                </span>
                <div className="h-3 flex-1 overflow-hidden rounded-full bg-ink/8">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-brand to-brand-deep"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${r.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.15 + i * 0.08, ease: EASE }}
                  />
                </div>
                <span className="w-10 text-right text-xs font-bold text-ink/45">{r.pct}%</span>
              </div>
            ))}
          </div>
          <p className="mt-6 border-t border-ink/8 pt-4 text-[11px] leading-relaxed text-ink/45">
            100% of reviewers say they'd recommend Lumis to a friend. Negative reviews are published
            unedited with our public response — always.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Submitted review cards ---------- */
function ReviewGrid() {
  return (
    <section className="bg-mist/60 py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            center={false}
            eyebrow="Written feedback"
            title={<>In their own <span className="text-gradient">words</span></>}
          />
          <Reveal delay={0.1}>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-extrabold text-ink shadow-sm">
              <ThumbsUp className="h-4 w-4 text-brand" /> 97% say "less scary than expected"
            </span>
          </Reveal>
        </div>
        <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name + i} delay={(i % 3) * 0.07}>
              <figure className="clay break-inside-avoid p-7">
                <div className="flex items-center justify-between">
                  <Stars value={r.rating} className="h-4 w-4" />
                  <span className="text-[10px] font-bold text-ink/35">{r.date}</span>
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-ink/70">
                  <Quote className="mb-2 h-5 w-5 text-brand/25" />
                  {r.text}
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <img src={r.avatar} alt={r.name} loading="lazy" className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <p className="flex items-center gap-1.5 text-sm font-extrabold text-ink">
                      {r.name} <BadgeCheck className="h-3.5 w-3.5 text-brand" />
                    </p>
                    <p className="text-[11px] font-semibold text-ink/45">{r.treatment}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Video feedback placeholders ---------- */
function VideoFeedback() {
  const vids = REVIEWS.slice(0, 3);
  return (
    <section className="mx-auto max-w-7xl px-5 py-24">
      <SectionHeading
        eyebrow="Video stories"
        title={<>Hear it <span className="text-gradient">chairside</span></>}
        sub="Short patient-recorded testimonials. Consent is collected in writing before any clip is recorded — and withdrawn means deleted, the same day."
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {vids.map((v, i) => (
          <Reveal key={v.name} delay={i * 0.08}>
            <div className="clay group relative aspect-[16/11] cursor-pointer overflow-hidden">
              <img src={v.avatar} alt={`Video testimonial from ${v.name}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
              {/* Play button */}
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-xl transition-transform duration-300 group-hover:scale-110">
                  <span className="absolute inset-0 animate-pulse-ring rounded-full bg-white/60" />
                  <Play className="relative ml-1 h-6 w-6 fill-brand-deep text-brand-deep" />
                </span>
              </span>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-display text-sm font-extrabold text-white">{v.name}</p>
                <p className="text-[11px] font-semibold text-white/70">{v.treatment} · 0:{45 + i * 8} video</p>
              </div>
              <span className="glass absolute right-4 top-4 rounded-full px-3 py-1 text-[9px] font-extrabold uppercase tracking-wider text-ink">
                Placeholder
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- Before/after gallery (consent-marked placeholders) ---------- */
function SmileGallery() {
  const cases = [
    { label: "Whitening · 6 shades", tint: "from-brand/70 to-brand-deep/80" },
    { label: "Aligners · 8 months", tint: "from-navy/70 to-brand-deep/80" },
    { label: "Veneers · 4 units", tint: "from-brand-deep/70 to-navy/80" },
  ];
  return (
    <section className="bg-mist/60 py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            center={false}
            eyebrow="Smile gallery"
            title={<>Before & <span className="text-gradient">after</span></>}
          />
          <Reveal delay={0.1}>
            <span className="flex items-center gap-2 rounded-full bg-coral/10 px-4 py-2 text-[11px] font-extrabold text-coral">
              <ShieldAlert className="h-4 w-4" /> Published with written medical consent
            </span>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {cases.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.08}>
              <div className={`clay relative flex aspect-[4/5] flex-col items-center justify-center overflow-hidden bg-gradient-to-br p-8 text-center ${c.tint}`}>
                <Camera className="h-10 w-10 text-white/60" />
                <p className="mt-4 font-display text-lg font-extrabold text-white">{c.label}</p>
                <p className="mt-2 max-w-[220px] text-xs leading-relaxed text-white/70">
                  Placeholder area — genuine comparison photography appears here once a patient grants
                  explicit, revocable written consent.
                </p>
                <span className="mt-5 rounded-full bg-white/15 px-3.5 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.16em] text-white">
                  Awaiting consent
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Reviews() {
  const booking = useBooking();
  return (
    <PageShell>
      <RatingHero />
      <ReviewGrid />
      <VideoFeedback />
      <SmileGallery />
      <section className="px-5 py-24">
        <Reveal>
          <div className="clay-coral relative mx-auto flex max-w-5xl flex-col items-center gap-5 overflow-hidden px-8 py-12 text-center">
            <h2 className="max-w-xl font-display text-2xl font-extrabold text-white sm:text-3xl">
              Become the next five-star story.
            </h2>
            <Btn variant="glass" onClick={() => booking.open()} arrow>Book your first visit</Btn>
          </div>
        </Reveal>
      </section>
    </PageShell>
  );
}
