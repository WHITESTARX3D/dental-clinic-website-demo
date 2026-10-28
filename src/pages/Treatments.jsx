/* ============================================================
   TREATMENTS — filterable catalogue grid (12 services)
   Exports <TreatmentCard/> reused by the Home page.
   ============================================================ */
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ChevronRight, CalendarCheck2, Search, LayoutGrid } from "lucide-react";
import { PageShell, Reveal, SectionHeading, Tilt, EASE } from "../components/ui.jsx";
import { useBooking } from "../components/BookingModal.jsx";
import { TREATMENTS, CATEGORIES } from "../data/content.js";

/* ---------- Shared treatment card ---------- */
export function TreatmentCard({ t, i = 0 }) {
  const booking = useBooking();
  return (
    <Reveal delay={i * 0.06} className="h-full">
      <Tilt className="h-full" max={6}>
        <article className="clay group flex h-full flex-col p-7 transition-shadow duration-500 hover:shadow-[0_36px_64px_-28px_rgba(7,59,76,.35)]">
          <div className="flex items-start justify-between">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-deep shadow-[0_12px_26px_-10px_rgba(0,168,150,.55)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
              <t.icon className="h-6 w-6 text-white" />
            </span>
            <span className="rounded-full bg-mist px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-brand-deep">
              {t.cat}
            </span>
          </div>
          <h3 className="mt-5 font-display text-xl font-extrabold text-ink transition-colors group-hover:text-brand-deep">
            {t.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/60">{t.line}</p>
          <div className="mt-5 flex items-center gap-4 border-t border-ink/8 pt-4 text-xs font-bold text-ink/50">
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-brand" />{t.time}</span>
            <span className="ml-auto font-display text-base font-extrabold text-ink">{t.price}</span>
          </div>
          <div className="mt-4 flex gap-2">
            <Link
              to={`/treatments/${t.slug}`}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-ink/5 py-2.5 text-xs font-extrabold text-ink transition-all duration-300 hover:bg-ink hover:text-white"
            >
              Learn more <ChevronRight className="h-3.5 w-3.5" />
            </Link>
            <button
              onClick={() => booking.open({ treatment: t.title })}
              className="clay-coral flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full py-2.5 text-xs font-extrabold text-white transition hover:brightness-110 active:scale-95"
            >
              <CalendarCheck2 className="h-3.5 w-3.5" /> Book
            </button>
          </div>
        </article>
      </Tilt>
    </Reveal>
  );
}

/* ---------- Catalogue page ---------- */
export default function Treatments() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const list = TREATMENTS.filter(
    (t) =>
      (cat === "All" || t.cat === cat) &&
      (q === "" || t.title.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <PageShell>
      {/* Page hero */}
      <section className="relative overflow-hidden pb-12 pt-36 sm:pt-40">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_circle_at_20%_0%,rgba(0,168,150,.16),transparent_55%)]" />
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading
            eyebrow="Treatments catalogue"
            title={<>Every smile service, <span className="text-gradient">one studio</span></>}
            sub="Twelve core treatments with flat, published pricing. Filter by category or search — then dive into a step-by-step breakdown."
          />
        </div>
      </section>

      {/* Filters: category pills + search */}
      <section className="mx-auto max-w-7xl px-5 pb-24">
        <Reveal>
          <div className="glass flex flex-col gap-4 rounded-3xl p-4 lg:flex-row lg:items-center">
            <div className="flex flex-1 flex-wrap items-center gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`relative rounded-full px-4 py-2 text-xs font-extrabold transition-colors duration-300 ${
                    cat === c ? "text-white" : "text-ink/55 hover:text-ink"
                  }`}
                >
                  {cat === c && (
                    <motion.span
                      layoutId="cat-pill"
                      className="clay-teal absolute inset-0 rounded-full shadow-none"
                      transition={{ duration: 0.45, ease: EASE }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {c === "All" && <LayoutGrid className="h-3.5 w-3.5" />}
                    {c}
                  </span>
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2.5 rounded-full bg-white/80 px-4 py-2.5 lg:w-64">
              <Search className="h-4 w-4 text-ink/40" />
              <input
                value={q} onChange={(e) => setQ(e.target.value)}
                placeholder="Search treatments…"
                className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-ink/35"
              />
            </label>
          </div>
        </Reveal>

        {/* Animated grid */}
        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((t, i) => (
              <motion.div
                key={t.slug}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <TreatmentCard t={t} i={i % 3} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {list.length === 0 && (
          <p className="py-20 text-center text-sm font-bold text-ink/45">
            No treatments match “{q}”. Try “whitening” or “implants”.
          </p>
        )}
      </section>
    </PageShell>
  );
}
