/* ============================================================
   BOOKING WIZARD — multi-step simulated appointment system
   Step 1 treatment → Step 2 slot → Step 3 details → confirm
   Includes validation, loading state, error + success screens,
   WhatsApp / click-to-call quick actions and demo-mode badge.
   ============================================================ */
import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  CalendarDays,
  Clock,
  User,
  Phone,
  Mail,
  StickyNote,
  CheckCircle2,
  ShieldCheck,
  MessageCircle,
  Loader2,
  RotateCcw,
  PartyPopper,
} from "lucide-react";
import { EASE, DemoTag, ToothLogo } from "./ui.jsx";
import { TREATMENTS, CLINIC } from "../data/content.js";

/* ---------- Booking context (open wizard from anywhere) ---------- */
const BookingCtx = createContext({ open: () => {} });
export const useBooking = () => useContext(BookingCtx);

/* Generate the next 7 bookable days (skip Sundays) */
function weekDays() {
  const out = [];
  const d = new Date();
  while (out.length < 7) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0) continue; // clinic closed on Sundays
    out.push({
      label: d.toLocaleDateString("en-US", { weekday: "short" }),
      day: d.getDate(),
      month: d.toLocaleDateString("en-US", { month: "short" }),
      iso: d.toISOString().slice(0, 10),
    });
  }
  return out;
}
const SLOTS = ["8:00 AM", "9:30 AM", "11:00 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM", "6:30 PM"];

const STEPS = ["Treatment", "Date & Time", "Your Details", "Confirm"];

/* ---------- The wizard modal ---------- */
function Wizard({ prefill, onClose }) {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState("form"); // form | loading | success | error
  const [errors, setErrors] = useState({});
  const [refCode] = useState(() => "LMS-" + Math.random().toString(36).slice(2, 8).toUpperCase());
  const [form, setForm] = useState({
    treatment: prefill?.treatment || "",
    date: "",
    slot: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
  });
  const days = useMemo(weekDays, []);
  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  /* Lock page scroll while the wizard is open */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, []);

  /* Per-step validation with inline error surfacing */
  const validate = () => {
    const e = {};
    if (step === 0 && !form.treatment) e.treatment = "Please choose a treatment.";
    if (step === 1) {
      if (!form.date) e.date = "Pick a day.";
      if (!form.slot) e.slot = "Pick a time slot.";
    }
    if (step === 2) {
      if (!form.name.trim()) e.name = "Full name is required.";
      if (!/^[+\d][\d\s\-()]{6,}$/.test(form.phone.trim())) e.phone = "Enter a valid phone number.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Enter a valid email address.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate()) return;
    step < 2 ? setStep(step + 1) : submit();
  };

  /* Simulated network send with loading → success / error handling */
  const submit = async () => {
    setStatus("loading");
    try {
      await new Promise((r) => setTimeout(r, 1600));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Book an appointment"
        className="clay relative flex max-h-[94vh] w-full max-w-2xl flex-col overflow-hidden rounded-b-none sm:rounded-3xl"
        initial={{ y: 80, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-brand/10 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-mist">
              <ToothLogo className="h-5 w-5" color="#028090" />
            </span>
            <div>
              <p className="font-display text-base font-bold leading-tight text-ink">Book a visit</p>
              <p className="text-xs text-ink/50">{CLINIC.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:block"><DemoTag /></span>
            <button
              onClick={onClose}
              aria-label="Close booking dialog"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/5 text-ink/60 transition hover:bg-ink/10 hover:text-ink"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Progress rail */}
        {status === "form" && (
          <div className="flex items-center gap-1.5 px-5 pt-5 sm:px-8">
            {STEPS.map((s, i) => (
              <React.Fragment key={s}>
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-extrabold transition-all duration-400 ${
                      i < step
                        ? "bg-brand text-white"
                        : i === step
                          ? "clay-coral rounded-full text-white shadow-none"
                          : "bg-ink/8 text-ink/40"
                    }`}
                  >
                    {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                  </span>
                  <span
                    className={`hidden text-[11px] font-bold uppercase tracking-wider md:block ${
                      i === step ? "text-ink" : "text-ink/40"
                    }`}
                  >
                    {s}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`h-[2px] flex-1 rounded-full ${i < step ? "bg-brand" : "bg-ink/10"}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-8 sm:py-6">
          <AnimatePresence mode="wait">
            {/* ------ LOADING ------ */}
            {status === "loading" && (
              <motion.div
                key="loading"
                className="flex flex-col items-center gap-4 py-16 text-center"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              >
                <Loader2 className="h-10 w-10 animate-spin text-brand" />
                <p className="font-display text-lg font-bold text-ink">Holding your slot…</p>
                <p className="max-w-xs text-sm text-ink/50">
                  Simulating a secure request to the clinic diary. Nothing is being sent anywhere.
                </p>
              </motion.div>
            )}

            {/* ------ SUCCESS ------ */}
            {status === "success" && (
              <motion.div
                key="success"
                className="flex flex-col items-center py-6 text-center"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: EASE }}
              >
                <motion.span
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 220, damping: 13, delay: 0.1 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-brand/10"
                >
                  <PartyPopper className="h-9 w-9 text-brand" />
                </motion.span>
                <h3 className="mt-5 font-display text-2xl font-bold text-ink">Request received!</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink/60">
                  This is a simulated booking — no real appointment was made. In production, our team would
                  confirm within 15 minutes during opening hours.
                </p>
                <div className="clay mt-6 w-full max-w-sm rounded-2xl p-5 text-left">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ink/50">Reference</span>
                    <span className="font-mono font-bold text-brand-deep">{refCode}</span>
                  </div>
                  <hr className="my-3 border-ink/8" />
                  <div className="space-y-2 text-sm">
                    <p className="flex justify-between"><span className="text-ink/50">Treatment</span><b className="text-ink">{form.treatment}</b></p>
                    <p className="flex justify-between"><span className="text-ink/50">When</span><b className="text-ink">{form.date} · {form.slot}</b></p>
                    <p className="flex justify-between"><span className="text-ink/50">Patient</span><b className="text-ink">{form.name}</b></p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Btn href={CLINIC.whatsapp} target="_blank" rel="noreferrer" small ghost>
                    <MessageCircle className="h-4 w-4" /> Confirm on WhatsApp
                  </Btn>
                  <Btn href={CLINIC.phoneHref} small teal>
                    <Phone className="h-4 w-4" /> Call the clinic
                  </Btn>
                </div>
                <DemoTag />
              </motion.div>
            )}

            {/* ------ ERROR ------ */}
            {status === "error" && (
              <motion.div key="error" className="flex flex-col items-center gap-4 py-16 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-coral/10">
                  <X className="h-8 w-8 text-coral" />
                </span>
                <p className="font-display text-lg font-bold text-ink">Something went wrong</p>
                <p className="max-w-xs text-sm text-ink/50">The simulated request could not be completed. Please try again.</p>
                <button onClick={() => setStatus("form")} className="clay-teal flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white">
                  <RotateCcw className="h-4 w-4" /> Try again
                </button>
              </motion.div>
            )}

            {/* ------ FORM STEPS ------ */}
            {status === "form" && (
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 26 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -26 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                {/* STEP 1 — treatment */}
                {step === 0 && (
                  <div>
                    <p className="mb-3 flex items-center gap-2 text-sm font-bold text-ink">
                      <ShieldCheck className="h-4 w-4 text-brand" /> What do you need help with?
                    </p>
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                      {TREATMENTS.map((t) => (
                        <button
                          key={t.slug}
                          onClick={() => set("treatment", t.title)}
                          className={`rounded-2xl border-2 p-3.5 text-left transition-all duration-300 ${
                            form.treatment === t.title
                              ? "border-brand bg-brand/8 shadow-[0_12px_28px_-14px_rgba(0,168,150,.5)]"
                              : "border-ink/8 bg-white hover:border-brand/40"
                          }`}
                        >
                          <t.icon className={`h-5 w-5 ${form.treatment === t.title ? "text-brand" : "text-ink/40"}`} />
                          <p className="mt-2 text-[13px] font-bold leading-tight text-ink">{t.title}</p>
                          <p className="mt-0.5 text-[11px] text-ink/45">{t.price}</p>
                        </button>
                      ))}
                    </div>
                    {errors.treatment && <p className="mt-3 text-xs font-bold text-coral">{errors.treatment}</p>}
                  </div>
                )}

                {/* STEP 2 — date & slot */}
                {step === 1 && (
                  <div className="space-y-5">
                    <div>
                      <p className="mb-3 flex items-center gap-2 text-sm font-bold text-ink">
                        <CalendarDays className="h-4 w-4 text-brand" /> Preferred day
                      </p>
                      <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                        {days.map((d) => (
                          <button
                            key={d.iso}
                            onClick={() => set("date", `${d.label} ${d.day} ${d.month}`)}
                            className={`rounded-2xl border-2 px-1 py-3 text-center transition-all duration-300 ${
                              form.date === `${d.label} ${d.day} ${d.month}`
                                ? "border-brand bg-brand/8"
                                : "border-ink/8 bg-white hover:border-brand/40"
                            }`}
                          >
                            <p className="text-[10px] font-bold uppercase tracking-wide text-ink/45">{d.label}</p>
                            <p className="font-display text-lg font-bold text-ink">{d.day}</p>
                            <p className="text-[10px] text-ink/45">{d.month}</p>
                          </button>
                        ))}
                      </div>
                      {errors.date && <p className="mt-2 text-xs font-bold text-coral">{errors.date}</p>}
                    </div>
                    <div>
                      <p className="mb-3 flex items-center gap-2 text-sm font-bold text-ink">
                        <Clock className="h-4 w-4 text-brand" /> Preferred time
                      </p>
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                        {SLOTS.map((s) => (
                          <button
                            key={s}
                            onClick={() => set("slot", s)}
                            className={`rounded-xl border-2 py-2.5 text-sm font-bold transition-all duration-300 ${
                              form.slot === s ? "border-brand bg-brand/8 text-brand-deep" : "border-ink/8 bg-white text-ink/60 hover:border-brand/40"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                      {errors.slot && <p className="mt-2 text-xs font-bold text-coral">{errors.slot}</p>}
                    </div>
                  </div>
                )}

                {/* STEP 3 — details */}
                {step === 2 && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field icon={User} label="Full name" error={errors.name}>
                      <input
                        value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Jane Doe"
                        className="w-full bg-transparent text-sm font-semibold text-ink outline-none placeholder:text-ink/30"
                      />
                    </Field>
                    <Field icon={Phone} label="Phone" error={errors.phone}>
                      <input
                        inputMode="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+1 555 000 1234"
                        className="w-full bg-transparent text-sm font-semibold text-ink outline-none placeholder:text-ink/30"
                      />
                    </Field>
                    <Field icon={Mail} label="Email" error={errors.email} span>
                      <input
                        inputMode="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="jane@email.com"
                        className="w-full bg-transparent text-sm font-semibold text-ink outline-none placeholder:text-ink/30"
                      />
                    </Field>
                    <Field icon={StickyNote} label="Notes (optional)" span>
                      <textarea
                        rows={3} value={form.notes} onChange={(e) => set("notes", e.target.value)}
                        placeholder="Anything we should know? Anxiety, medication, previous work…"
                        className="w-full resize-none bg-transparent text-sm font-semibold text-ink outline-none placeholder:text-ink/30"
                      />
                    </Field>
                    <p className="text-xs leading-relaxed text-ink/45 sm:col-span-2">
                      By submitting you agree to our <a href="/privacy-policy" className="font-bold text-brand-deep underline">Privacy Policy</a>.
                      Demo data is processed locally in your browser only.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer nav */}
        {status === "form" && (
          <div className="flex items-center justify-between gap-3 border-t border-brand/10 px-5 py-4 sm:px-8">
            {step > 0 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-bold text-ink/60 transition hover:bg-ink/5 hover:text-ink"
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </button>
            ) : (
              <a href={CLINIC.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-bold text-brand-deep transition hover:bg-mist">
                <MessageCircle className="h-4 w-4" /> WhatsApp instead
              </a>
            )}
            <button
              onClick={next}
              className="clay-coral cursor-pointer rounded-full px-8 py-3 text-sm font-bold text-white transition-all duration-300 hover:brightness-110 active:scale-95"
            >
              {step < 2 ? "Continue" : "Confirm booking"}
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* Small labelled input shell used in step 3 */
function Field({ icon: Icon, label, error, children, span }) {
  return (
    <label className={`block ${span ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 flex items-center justify-between text-xs font-bold uppercase tracking-wide text-ink/50">
        <span className="flex items-center gap-1.5"><Icon className="h-3.5 w-3.5 text-brand" />{label}</span>
        {error && <span className="normal-case text-coral">{error}</span>}
      </span>
      <span
        className={`flex rounded-2xl border-2 bg-white px-4 py-3 transition-colors focus-within:border-brand ${
          error ? "border-coral/60" : "border-ink/10"
        }`}
      >
        {children}
      </span>
    </label>
  );
}

/* Mini internal button (avoids circular import gymnastics) */
function Btn({ children, href, ghost, teal, small, ...rest }) {
  return (
    <a
      href={href}
      {...rest}
      className={`inline-flex items-center gap-2 rounded-full px-5 ${small ? "py-2.5" : "py-3"} text-sm font-bold transition-all duration-300 active:scale-95 ${
        ghost ? "clay text-ink hover:text-brand-deep" : teal ? "clay-teal text-white" : "clay-coral text-white"
      }`}
    >
      {children}
    </a>
  );
}

/* ---------- Provider: wraps Layout, exposes useBooking().open ---------- */
export function BookingProvider({ children }) {
  const [state, setState] = useState(null); // { treatment } | null
  const open = (opts = {}) => setState(opts);
  const close = () => setState(null);
  return (
    <BookingCtx.Provider value={{ open }}>
      {children}
      <AnimatePresence>{state && <Wizard prefill={state} onClose={close} />}</AnimatePresence>
    </BookingCtx.Provider>
  );
}
