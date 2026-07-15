const marqueeA = [
  "#SejaAUTÊNTICO",
  "#SejaESTRATÉGICO",
  "#SejaCRIATIVO",
  "#SejaMARCANTE",
];
const marqueeB = [
  "#SejaDIGITAL",
  "#SejaOUSADO",
  "#SejaCONSISTENTE",
  "#SejaVERDADEIRO",
];

export function Marquee() {
  return (
    <section className="bg-[var(--brand-ink)] text-[color:var(--sand-soft)] py-14 overflow-hidden select-none">
      <div className="overflow-hidden">
        <div className="marquee-track font-display text-5xl md:text-7xl">
          {[...marqueeA, ...marqueeA, ...marqueeA].map((t, i) => (
            <span key={i} className="italic">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="overflow-hidden mt-4">
        <div className="marquee-track-slow font-display text-5xl md:text-7xl text-[color:var(--sand-soft)]/40">
          {[...marqueeB, ...marqueeB, ...marqueeB].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
