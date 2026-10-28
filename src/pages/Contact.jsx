/* ============================================================
   CONTACT — booking wizard trigger, contact channels, opening
   hours table and an interactive map preview
   ============================================================ */
import {
  MapPin, Phone, Mail, MessageCircle, Siren, Clock, ExternalLink,
  CalendarCheck2, ShieldCheck,
} from "lucide-react";
import { PageShell, Reveal, SectionHeading, Btn, Tilt, DemoTag } from "../components/ui.jsx";
import { useBooking } from "../components/BookingModal.jsx";
import { CLINIC, HOURS } from "../data/content.js";

/* Contact channel cards */
function Channels() {
  const items = [
    {
      icon: Phone, title: "Call the studio", value: CLINIC.phone,
      sub: "Reception · during opening hours", href: CLINIC.phoneHref, label: "Call now",
    },
    {
      icon: Siren, title: "24/7 Emergency line", value: CLINIC.emergency,
      sub: "Severe pain, trauma, swelling", href: CLINIC.emergencyHref, label: "Priority call", warn: true,
    },
    {
      icon: MessageCircle, title: "WhatsApp", value: "Chat-first booking",
      sub: "Fastest response · ~4 min avg", href: CLINIC.whatsapp, label: "Open chat", ext: true,
    },
    {
      icon: Mail, title: "Email", value: CLINIC.email,
      sub: "Records, referrals, paperwork", href: `mailto:${CLINIC.email}`, label: "Write to us",
    },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((c, i) => (
        <Reveal key={c.title} delay={i * 0.07}>
          <Tilt max={5} className="h-full">
            <div className={`clay flex h-full flex-col p-6 ${c.warn ? "ring-2 ring-coral/40" : ""}`}>
              <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${c.warn ? "bg-coral/10" : "bg-mist"}`}>
                <c.icon className={`h-5 w-5 ${c.warn ? "text-coral" : "text-brand-deep"}`} />
              </span>
              <h3 className="mt-4 font-display text-base font-extrabold text-ink">{c.title}</h3>
              <p className="mt-1 flex-1 text-sm font-bold text-ink/70">{c.value}</p>
              <p className="text-[11px] font-semibold text-ink/45">{c.sub}</p>
              <a
                href={c.href}
                {...(c.ext ? { target: "_blank", rel: "noreferrer" } : {})}
                className={`mt-4 flex items-center justify-center gap-2 rounded-full py-2.5 text-xs font-extrabold text-white transition hover:brightness-110 active:scale-95 ${
                  c.warn ? "clay-coral" : "clay-teal"
                }`}
              >
                {c.label} <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </Tilt>
        </Reveal>
      ))}
    </div>
  );
}

/* Opening hours table with today highlighted */
function HoursTable() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  return (
    <Reveal delay={0.15}>
      <div className="clay p-7">
        <h3 className="flex items-center gap-2 font-display text-lg font-extrabold text-ink">
          <Clock className="h-5 w-5 text-brand" /> Opening hours
        </h3>
        <ul className="mt-5 space-y-1">
          {HOURS.map((h) => {
            const isToday = h.day === today;
            return (
              <li
                key={h.day}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm ${
                  isToday ? "bg-brand/8 font-extrabold text-brand-deep" : "text-ink/65"
                }`}
              >
                <span className="flex items-center gap-2">
                  {h.day}
                  {isToday && <span className="rounded-full bg-brand px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white">Today</span>}
                </span>
                <span className={h.closed ? "font-bold text-coral" : "font-bold"}>{h.time}</span>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 flex items-start gap-2 border-t border-ink/8 pt-4 text-[11px] leading-relaxed text-ink/45">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
          Same-day emergency slots are reserved daily at 8:00 AM and 1:00 PM — call the priority line.
        </p>
      </div>
    </Reveal>
  );
}

export default function Contact() {
  const booking = useBooking();
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden pb-14 pt-36 sm:pt-44">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_circle_at_80%_0%,rgba(0,168,150,.15),transparent_55%)]" />
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading
            eyebrow="Contact & booking"
            title={<>Three ways in. <span className="text-gradient">Zero hold music.</span></>}
            sub="WhatsApp us, call a human, or use the 60-second wizard below. Every route ends with a named human on the other side."
          />
        </div>
      </section>

      {/* Booking banner */}
      <section className="mx-auto max-w-7xl px-5 pb-16">
        <Reveal>
          <div className="clay-coral relative flex flex-col items-center justify-between gap-6 overflow-hidden px-8 py-10 md:flex-row md:px-12">
            <div className="dot-grid absolute inset-0 opacity-15" />
            <div className="relative text-center md:text-left">
              <DemoTag dark />
              <h2 className="mt-3 font-display text-2xl font-extrabold text-white sm:text-3xl">
                Book in under a minute
              </h2>
              <p className="mt-1 max-w-md text-sm text-white/80">
                Pick a treatment, a day and a slot — we'll confirm by text. No account, no card.
              </p>
            </div>
            <Btn variant="glass" onClick={() => booking.open()} arrow className="relative">
              <CalendarCheck2 className="h-4 w-4" /> Start the booking wizard
            </Btn>
          </div>
        </Reveal>
      </section>

      {/* Channels + hours */}
      <section className="mx-auto grid max-w-7xl items-start gap-8 px-5 pb-8 lg:grid-cols-[1.4fr_1fr]">
        <Channels />
        <HoursTable />
      </section>

      {/* Map preview + address card */}
      <section className="mx-auto max-w-7xl px-5 pb-24">
        <Reveal>
          <div className="clay grid overflow-hidden lg:grid-cols-2">
            {/* Embedded map preview (graceful placeholder styling behind iframe) */}
            <div className="relative min-h-[320px] bg-mist">
              <div className="dot-grid absolute inset-0 flex items-center justify-center text-sm font-bold text-ink/30">
                Map preview
              </div>
              <iframe
                title={`Map — ${CLINIC.name}, ${CLINIC.address}, ${CLINIC.city}`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(CLINIC.mapsQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(CLINIC.address + ", " + CLINIC.city)}`}
                target="_blank" rel="noreferrer"
                className="glass absolute bottom-4 left-4 flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-extrabold text-ink transition hover:bg-white"
              >
                Open in Google Maps <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
            {/* Address panel */}
            <div className="clay-teal flex flex-col justify-center p-8 text-white sm:p-12">
              <MapPin className="h-9 w-9 text-white/70" />
              <h3 className="mt-4 font-display text-2xl font-extrabold">{CLINIC.address}</h3>
              <p className="mt-1 text-white/70">{CLINIC.city}</p>
              <ul className="mt-6 space-y-3 text-sm text-white/80">
                <li>Street parking on Harbor Lane · 2 bays reserved for patients</li>
                <li>Blue line — Harbor Station (4 min walk)</li>
                <li>Step-free access, elevator to Suite 204</li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Btn variant="glass" href={CLINIC.phoneHref} className="py-3!">{CLINIC.phone}</Btn>
                <Btn variant="glass" href={CLINIC.whatsapp} target="_blank" rel="noreferrer" className="py-3!">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </Btn>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </PageShell>
  );
}
