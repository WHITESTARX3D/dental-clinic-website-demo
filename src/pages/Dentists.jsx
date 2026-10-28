/* ============================================================
   DENTISTS — team & specialist profiles with qualifications,
   experience and per-clinician booking
   ============================================================ */
import { GraduationCap, BadgeCheck, CalendarCheck2, Award } from "lucide-react";
import { PageShell, Reveal, SectionHeading, Btn, Tilt, Stars } from "../components/ui.jsx";
import { useBooking } from "../components/BookingModal.jsx";
import { DENTISTS } from "../data/content.js";

export default function Dentists() {
  const booking = useBooking();
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden pb-10 pt-36 sm:pt-44">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_circle_at_85%_10%,rgba(0,168,150,.14),transparent_55%)]" />
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading
            eyebrow="Our specialists"
            title={<>Hands you can <span className="text-gradient">trust your smile</span> to</>}
            sub="Every clinician publishes their credentials, their case counts and their reviews. That's the deal here."
          />
        </div>
      </section>

      {/* Profiles */}
      <section className="mx-auto max-w-7xl space-y-10 px-5 pb-24 pt-8">
        {DENTISTS.map((d, i) => (
          <Reveal key={d.name} delay={0.05}>
            <Tilt max={3}>
              <article
                className={`clay grid overflow-hidden lg:grid-cols-[380px_1fr] ${
                  i % 2 === 1 ? "lg:[direction:rtl]" : ""
                }`}
              >
                {/* Photo panel */}
                <div className="relative h-80 overflow-hidden lg:h-full lg:[direction:ltr]">
                  <img
                    src={d.photo} alt={`${d.name}, ${d.role}`} loading="lazy"
                    className="h-full w-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-ink/10" />
                  <div className="glass absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl px-4 py-3">
                    <span className="flex items-center gap-2 text-xs font-extrabold text-ink">
                      <Award className="h-4 w-4 text-brand-deep" /> {d.exp}+ years
                    </span>
                    <Stars value={5} className="h-3.5 w-3.5" />
                  </div>
                </div>

                {/* Bio panel */}
                <div className="flex flex-col justify-center p-8 sm:p-10 lg:[direction:ltr]">
                  <div className="flex flex-wrap items-center gap-2">
                    {d.tags.map((t) => (
                      <span key={t} className="rounded-full bg-mist px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-brand-deep">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-extrabold text-ink sm:text-3xl">{d.name}</h2>
                  <p className="mt-1 text-sm font-extrabold text-brand-deep">{d.role}</p>
                  <p className="mt-1.5 flex items-center gap-2 text-xs font-semibold text-ink/45">
                    <GraduationCap className="h-4 w-4 text-brand/60" /> {d.quals}
                  </p>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/65 sm:text-base">{d.bio}</p>
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <Btn onClick={() => booking.open()} className="px-6! py-3! text-xs">
                      <CalendarCheck2 className="h-4 w-4" /> Book with {d.name.split(" ")[1]}
                    </Btn>
                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-ink/45">
                      <BadgeCheck className="h-4 w-4 text-brand" /> Registered & insured — verified
                    </span>
                  </div>
                </div>
              </article>
            </Tilt>
          </Reveal>
        ))}
      </section>

      {/* Join strip */}
      <section className="px-5 pb-24">
        <Reveal>
          <div className="clay mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 p-8 text-center sm:p-10 md:flex-row md:text-left">
            <div>
              <h2 className="font-display text-xl font-extrabold text-ink sm:text-2xl">Not sure who to see?</h2>
              <p className="mt-1 max-w-lg text-sm text-ink/60">
                Book a general checkup and we'll match you with the right specialist after your diagnostics.
              </p>
            </div>
            <Btn onClick={() => booking.open()} arrow>Book a checkup first</Btn>
          </div>
        </Reveal>
      </section>
    </PageShell>
  );
}
