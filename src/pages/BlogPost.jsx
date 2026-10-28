/* ============================================================
   BLOG ARTICLE — rich reading layout with author card,
   read time, content sections and related posts
   ============================================================ */
import { useParams, Link, Navigate } from "react-router-dom";
import {
  ChevronRight, Clock3, CalendarDays, User, CheckCheck, Share2,
  Bookmark, AlertCircle,
} from "lucide-react";
import { PageShell, Reveal, Btn, EASE } from "../components/ui.jsx";
import { PostCard } from "./Blog.jsx";
import { useBooking } from "../components/BookingModal.jsx";
import { POSTS } from "../data/content.js";

export default function BlogPost() {
  const { slug } = useParams();
  const booking = useBooking();
  const p = POSTS.find((x) => x.slug === slug);
  if (!p) return <Navigate to="/blog" replace />;

  const related = POSTS.filter((x) => x.slug !== slug).slice(0, 3);

  return (
    <PageShell>
      {/* ---------- Article header ---------- */}
      <header className="relative overflow-hidden pb-10 pt-36 sm:pt-44">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_circle_at_50%_0%,rgba(0,168,150,.14),transparent_55%)]" />
        <div className="mx-auto max-w-3xl px-5 text-center">
          <Reveal>
            <nav className="flex items-center justify-center gap-1.5 text-xs font-bold text-ink/45" aria-label="Breadcrumb">
              <Link to="/" className="transition hover:text-brand-deep">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link to="/blog" className="transition hover:text-brand-deep">Blog</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-brand-deep">{p.cat}</span>
            </nav>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="text-gradient mt-6 font-display text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.9rem]">
              {p.title}
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-bold text-ink/50">
              <span className="flex items-center gap-1.5"><User className="h-4 w-4 text-brand" />{p.author}</span>
              <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4 text-brand" />{p.date}</span>
              <span className="flex items-center gap-1.5"><Clock3 className="h-4 w-4 text-brand" />{p.read}</span>
            </div>
          </Reveal>
        </div>
      </header>

      {/* ---------- Cover ---------- */}
      <div className="mx-auto max-w-4xl px-5">
        <Reveal delay={0.1}>
          <div className="clay overflow-hidden p-3">
            <img src={p.photo} alt={p.title} className="aspect-[16/8] w-full rounded-2xl object-cover" />
          </div>
        </Reveal>
      </div>

      {/* ---------- Body ---------- */}
      <article className="mx-auto max-w-3xl px-5 py-14">
        {p.content.map((sec, i) => (
          <Reveal key={i} delay={0.04}>
            <section className="mb-10">
              <h2 className="font-display text-xl font-extrabold text-ink sm:text-2xl">
                <span className="mr-2 text-brand">0{i + 1}.</span> {sec.h}
              </h2>
              {sec.p && <p className="mt-4 leading-[1.85] text-ink/70">{sec.p}</p>}
              {sec.list && (
                <ul className="mt-4 space-y-3">
                  {sec.list.map((li, j) => (
                    <li key={j} className="flex items-start gap-3 rounded-2xl bg-mist/60 p-4 text-sm font-semibold leading-relaxed text-ink/75">
                      <CheckCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      {li}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </Reveal>
        ))}

        {/* Inline CTA */}
        <Reveal>
          <div className="clay-teal mt-6 flex flex-col items-center justify-between gap-5 p-8 text-center sm:flex-row sm:text-left">
            <div>
              <p className="font-display text-lg font-extrabold text-white">Reading is free. So is the first checkup.</p>
              <p className="mt-1 text-sm text-white/70">Put theory into practice — meet a clinician this week.</p>
            </div>
            <Btn variant="glass" onClick={() => booking.open()} arrow>Book now</Btn>
          </div>
        </Reveal>

        {/* Author + actions */}
        <Reveal delay={0.06}>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-8">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand to-navy font-display text-lg font-extrabold text-white">
                {p.author.split(" ").map((n) => n[0]).slice(1, 3).join("")}
              </span>
              <div>
                <p className="text-sm font-extrabold text-ink">{p.author}</p>
                <p className="text-[11px] font-semibold text-ink/45">Clinical reviewer · Lumis Dental Studio</p>
              </div>
            </div>
            <div className="flex gap-2">
              {[Share2, Bookmark].map((Icon, i) => (
                <button key={i} aria-label={i === 0 ? "Share article" : "Bookmark article"}
                  className="clay flex h-11 w-11 items-center justify-center rounded-full text-ink/60 transition hover:text-brand-deep">
                  <Icon className="h-4.5 w-4.5" />
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Medical disclaimer */}
        <Reveal delay={0.08}>
          <p className="mt-8 flex items-start gap-2 rounded-2xl bg-mist/60 p-5 text-[11px] leading-relaxed text-ink/55">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-deep" />
            This article provides general information only and is not a substitute for professional diagnosis or
            treatment. Seek a licensed clinician for advice about your own oral health.
          </p>
        </Reveal>
      </article>

      {/* ---------- Related ---------- */}
      <section className="mx-auto max-w-7xl px-5 pb-24">
        <Reveal>
          <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
            Keep <span className="text-gradient">reading</span>
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r, i) => <PostCard key={r.slug} p={r} i={i} />)}
        </div>
      </section>
    </PageShell>
  );
}
