/* ============================================================
   PRIVACY POLICY — patient data guidelines with sticky TOC,
   demo-mode transparency notes and plain-English summaries
   ============================================================ */
import { ShieldCheck, Database, Lock, Share2, Clock, UserCheck, Cookie, MailCheck, FileWarning } from "lucide-react";
import { PageShell, Reveal, SectionHeading } from "../components/ui.jsx";
import { CLINIC } from "../data/content.js";

/* Policy document sections */
const SECTIONS = [
  {
    id: "overview", icon: ShieldCheck, title: "1. Overview & scope",
    lead: "This policy explains how Lumis Dental Studio (\"we\", \"the studio\") collects, uses and protects personal and health information across our website and booking systems.",
    body: [
      "It applies to the website, online booking wizard, WhatsApp channel, email, phone and in-clinic records.",
      "Clinical records are governed by applicable health-records legislation in addition to this document.",
      "Plain-English summaries are provided for convenience; the full text of each section is authoritative.",
    ],
    note: "This is a demonstration policy for a portfolio website — no real data is collected.",
  },
  {
    id: "collect", icon: Database, title: "2. Information we collect",
    lead: "We collect the minimum information needed to book, treat and follow up with you safely.",
    body: [
      "Identity & contact: name, phone, email, date of birth, preferred contact method.",
      "Health information: medical history, medications, allergies and treatment records you share with us.",
      "Technical data: anonymised analytics (pages visited, device type) to improve the site.",
      "Media: photographs or scans only with separate, explicit written consent.",
    ],
  },
  {
    id: "use", icon: Lock, title: "3. How we use it",
    lead: "Your information exists to serve your care — never to be sold, rented or profiled for advertising.",
    body: [
      "Scheduling, reminders and recall notices for checkups and hygiene visits.",
      "Clinical diagnosis, treatment planning and continuity of care between clinicians.",
      "Insurance claims processing at your direction.",
      "Service improvement using aggregated, de-identified data only.",
    ],
  },
  {
    id: "share", icon: Share2, title: "4. Sharing & disclosures",
    lead: "We share data only when clinically or legally necessary, and always on a need-to-know basis.",
    body: [
      "Referrals to specialists you approve (e.g. oral surgeons, orthodontists).",
      "Dental laboratories fabricating your restorations — de-identified where possible.",
      "Regulators, insurers or courts where legally compelled.",
      "We never sell personal data to marketers or data brokers. Ever.",
    ],
  },
  {
    id: "retention", icon: Clock, title: "5. Retention & security",
    lead: "Clinical records are kept only as long as regulation requires, then securely destroyed.",
    body: [
      "Adult records: minimum of 10 years from last visit (or as required by law).",
      "Minor records: until age of majority plus the statutory period.",
      "Encryption in transit and at rest; access is role-based and audit-logged.",
      "Physical records are stored in access-controlled rooms and cross-shredded on disposal.",
    ],
  },
  {
    id: "rights", icon: UserCheck, title: "6. Your rights",
    lead: "You can access, correct, export or request deletion of your information at any time.",
    body: [
      "Access: request a copy of your records — typically provided within 30 days.",
      "Correction: tell us if anything is inaccurate and we will amend it.",
      "Portability: ask us to transfer imaging and charts to another provider.",
      "Consent withdrawal for photos/testimonials takes effect within one working day.",
    ],
  },
  {
    id: "cookies", icon: Cookie, title: "7. Cookies on this website",
    lead: "This demo uses no tracking cookies; a production version would use strictly-necessary storage only.",
    body: [
      "Preference storage (e.g. booking wizard progress) may be held locally in your browser.",
      "No advertising pixels, no cross-site trackers, no fingerprinting.",
      "Embedded maps operate under the map provider's own privacy policy.",
    ],
  },
  {
    id: "contact-privacy", icon: MailCheck, title: "8. Questions & complaints",
    lead: "Talk to us first — we respond to privacy requests within 5 working days.",
    body: [
      `Privacy officer contact: ${CLINIC.email} or ${CLINIC.phone}.`,
      "Postal: Privacy Officer, " + CLINIC.address + ", " + CLINIC.city + ".",
      "If unresolved, you may lodge a complaint with your regional data-protection authority.",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden pb-14 pt-36 sm:pt-44">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_circle_at_50%_0%,rgba(0,168,150,.14),transparent_55%)]" />
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading
            eyebrow="Privacy & patient data"
            title={<>Your records, <span className="text-gradient">locked properly</span></>}
            sub="Last updated March 2026 · Version 3.1 — written to be read by humans, not just lawyers."
          />
          <Reveal delay={0.2}>
            <div className="mx-auto mt-8 flex max-w-2xl items-start gap-3 rounded-2xl border-2 border-dashed border-coral/40 bg-coral/5 p-5 text-left">
              <FileWarning className="mt-0.5 h-5 w-5 shrink-0 text-coral" />
              <p className="text-xs leading-relaxed text-ink/60">
                <b className="text-ink">Demo notice:</b> this site is a portfolio demonstration. The booking
                system is simulated and any information you enter is processed locally in your browser —
                nothing is transmitted or stored anywhere.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Document body with sticky TOC */}
      <section className="mx-auto max-w-7xl gap-10 px-5 pb-24 lg:grid lg:grid-cols-[260px_1fr]">
        {/* Sticky table of contents */}
        <aside className="mb-10 hidden lg:mb-0 lg:block">
          <nav className="clay sticky top-28 p-5" aria-label="Policy contents">
            <p className="px-3 text-[10px] font-extrabold uppercase tracking-[0.2em] text-ink/40">Contents</p>
            <ul className="mt-3 space-y-1">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block rounded-xl px-3 py-2 text-xs font-bold text-ink/55 transition hover:bg-mist hover:text-brand-deep"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Sections */}
        <div className="space-y-6">
          {SECTIONS.map((s, i) => (
            <Reveal key={s.id} delay={0.04}>
              <article id={s.id} className="clay scroll-mt-32 p-7 sm:p-9">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-mist">
                    <s.icon className="h-5 w-5 text-brand-deep" />
                  </span>
                  <h2 className="font-display text-xl font-extrabold text-ink sm:text-2xl">{s.title}</h2>
                </div>
                <p className="mt-4 border-l-2 border-brand/30 pl-4 text-sm font-semibold italic leading-relaxed text-ink/60">
                  {s.lead}
                </p>
                <ul className="mt-5 space-y-3">
                  {s.body.map((b, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm leading-relaxed text-ink/65">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      {b}
                    </li>
                  ))}
                </ul>
                {s.note && (
                  <p className="mt-5 rounded-xl bg-coral/8 px-4 py-3 text-xs font-bold text-coral">{s.note}</p>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
