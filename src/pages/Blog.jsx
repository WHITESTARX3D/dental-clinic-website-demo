/* ============================================================
   BLOG — searchable dental health article index with
   category filters and a featured story
   ============================================================ */
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock3, CalendarDays, ArrowRight, BookOpenText, AlertCircle } from "lucide-react";
import { PageShell, Reveal, SectionHeading, EASE } from "../components/ui.jsx";
import { POSTS } from "../data/content.js";

const CATS = ["All", ...new Set(POSTS.map((p) => p.cat))];

/* Reusable article card */
export function PostCard({ p, i = 0, tall = false }) {
  return (
    <Reveal delay={i * 0.06} className="h-full">
      <Link to={`/blog/${p.slug}`} className="clay group flex h-full flex-col overflow-hidden">
        <div className={`relative overflow-hidden ${tall ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
          <img
            src={p.photo} alt={p.title} loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
          <span className="glass absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-ink">
            {p.cat}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-3 text-[11px] font-bold text-ink/45">
            <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5 text-brand" />{p.date}</span>
            <span className="flex items-center gap-1"><Clock3 className="h-3.5 w-3.5 text-brand" />{p.read}</span>
          </div>
          <h3 className="mt-3 font-display text-lg font-extrabold leading-snug text-ink transition-colors group-hover:text-brand-deep">
            {p.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/55">{p.excerpt}</p>
          <span className="mt-4 flex items-center gap-2 text-xs font-extrabold text-brand-deep">
            Read article <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export default function Blog() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const list = POSTS.filter(
    (p) =>
      (cat === "All" || p.cat === cat) &&
      (q === "" || (p.title + p.excerpt).toLowerCase().includes(q.toLowerCase()))
  );
  const [featured, ...rest] = list;

  return (
    <PageShell>
      {/* Hero + search */}
      <section className="relative overflow-hidden pb-14 pt-36 sm:pt-44">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_circle_at_15%_0%,rgba(0,168,150,.15),transparent_55%)]" />
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading
            eyebrow="Dental health journal"
            title={<>Smarter mouths, <span className="text-gradient">honest guides</span></>}
            sub="Written by our clinicians, reviewed quarterly, free forever. Expert answers without the doomscrolling."
          />
          <Reveal delay={0.2}>
            <div className="glass mx-auto mt-10 flex max-w-xl items-center gap-3 rounded-full px-6 py-4">
              <Search className="h-5 w-5 shrink-0 text-brand-deep" />
              <input
                value={q} onChange={(e) => setQ(e.target.value)}
                placeholder="Search guides — try “flossing” or “implants”…"
                className="w-full bg-transparent text-sm font-semibold text-ink outline-none placeholder:text-ink/40"
                aria-label="Search articles"
              />
            </div>
          </Reveal>
          <Reveal delay={0.26}>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {CATS.map((c) => (
                <button
                  key={c} onClick={() => setCat(c)}
                  className={`relative rounded-full px-4 py-2 text-xs font-extrabold transition-colors ${
                    cat === c ? "text-white" : "bg-white text-ink/55 shadow-sm hover:text-ink"
                  }`}
                >
                  {cat === c && (
                    <motion.span layoutId="blog-cat" className="clay-teal absolute inset-0 rounded-full shadow-none" transition={{ duration: 0.4, ease: EASE }} />
                  )}
                  <span className="relative z-10">{c}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Articles */}
      <section className="mx-auto max-w-7xl px-5 pb-24">
        {list.length > 0 ? (
          <motion.div layout>
            <AnimatePresence mode="popLayout">
              <motion.div layout key="grid" className="grid gap-6 lg:grid-cols-3">
                {/* Featured first result spans two columns */}
                <motion.div layout className="lg:col-span-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <PostCard p={featured} tall />
                </motion.div>
                {rest.map((p, i) => (
                  <motion.div layout key={p.slug} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4, ease: EASE }}>
                    <PostCard p={p} i={i} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ) : (
          <p className="py-24 text-center text-sm font-bold text-ink/45">
            Nothing found for “{q}” — try “whitening”, “kids” or “sugar”.
          </p>
        )}

        {/* Educational disclaimer banner */}
        <Reveal delay={0.1}>
          <div className="mt-16 flex items-start gap-3 rounded-3xl border-2 border-dashed border-brand/30 bg-mist/50 p-6">
            <BookOpenText className="h-5 w-5 shrink-0 text-brand-deep" />
            <p className="text-xs leading-relaxed text-ink/60">
              <b className="text-ink">Educational content disclaimer:</b> Articles are general guidance reviewed
              by our clinical team — they cannot account for your individual history. For diagnosis or treatment
              decisions, always book a professional assessment. If you experience pain, swelling or fever, seek
              urgent care rather than reading another guide.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-6 flex items-center justify-center gap-2 text-center text-[11px] text-ink/40">
            <AlertCircle className="h-3.5 w-3.5 text-brand" /> Demonstration content — simulated publication dates.
          </p>
        </Reveal>
      </section>
    </PageShell>
  );
}
