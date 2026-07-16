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
    <section className="bg-green-200/60 text-[#004D4C] py-14 overflow-hidden select-none">
      <div className="overflow-hidden">
        <div className="marquee-track to-right font-display text-5xl md:text-7xl">
          {[...marqueeA, ...marqueeA, ...marqueeA].map((t, i) => (
            <span key={i} className="italic">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="overflow-hidden mt-4">
        <div className="marquee-track to-left font-display text-5xl md:text-7xl text-[#004D4C]">
          {[...marqueeB, ...marqueeB, ...marqueeB].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
