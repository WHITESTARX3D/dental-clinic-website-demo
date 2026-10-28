/* ============================================================
   TOOTH FALLBACK — lightweight 2D visual, zero three.js deps.
   Shown while the WebGL chunk streams in, on WebGL failure,
   and when the user prefers reduced motion.
   ============================================================ */
export function FallbackTooth() {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center"
      role="img"
      aria-label="Stylised glossy two-rooted tooth illustration"
    >
      {/* Soft mint aura + slow dotted orbit echo the 3D scene */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(0,168,150,.2),transparent_60%)]" />
      <div className="absolute h-[68%] w-[68%] animate-spin-slow rounded-full border border-dashed border-brand/25" />
      <svg
        viewBox="0 0 32 32"
        className="relative h-[52%] w-[52%] animate-float-slow drop-shadow-[0_30px_35px_rgba(2,128,144,.3)]"
      >
        <defs>
          <linearGradient id="ftg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#eefaf8" />
            <stop offset="100%" stopColor="#b8ece4" />
          </linearGradient>
        </defs>
        {/* Two-rooted molar silhouette matching the 3D model */}
        <path
          fill="url(#ftg)"
          d="M8 3C4.8 3 2.7 5.8 3.2 9.2c.4 2.6 1.8 4.8 2.3 7.6.4 2.5.6 5.3 1.6 9.4.3 1.4 2 1.7 2.7.6 1.3-2.2 1.7-5.2 3.2-7.6.5-.7 1.5-.7 2 0 1.5 2.4 1.9 5.4 3.2 7.6.7 1.1 2.4.8 2.7-.6 1-4.1 1.2-6.9 1.6-9.4.5-2.8 1.9-5 2.3-7.6C29.3 5.8 27.2 3 24 3c-2.3 0-4.2 1.1-8 1.1S10.3 3 8 3z"
        />
        <path fill="#fff" opacity=".8" d="M7.2 6.6c.9-1 2.2-1.7 3.4-1.9.7-.1 1.2.4 1.3 1 .1.7-.4 1.2-1 1.3-.9.2-1.8.7-2.4 1.3-.5.5-1.3.5-1.7 0-.5-.5-.3-1.3.4-1.7z" />
      </svg>
      {/* Accent orb echoing the coral bubble in the 3D orbit */}
      <span className="absolute right-[22%] top-[30%] h-3 w-3 animate-float rounded-full bg-coral shadow-[0_6px_14px_rgba(255,107,53,.5)]" />
    </div>
  );
}

export default FallbackTooth;
