import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/src/lib/utils.ts";

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

export type DossierStatus = "TERDAKWA" | "TERPIDANA" | "TERSANGKA";

export interface Dossier {
  id: string;
  name: string;
  alias: string;
  position: string;
  status: DossierStatus;
  sector: string;
  year: number | string;
  caseSummary: string;
  estimatedLoss: string;
  photo: string;
  originalData?: unknown;
}

interface CircularDossiersProps {
  dossiers: Dossier[];
  /** Default false. Berhenti permanen setelah pengguna menekan panah. */
  autoplay?: boolean;
  onOpenDossier?: (dossier: Dossier) => void;
  className?: string;
}

/* -------------------------------------------------------------------------- */
/* Style tokens (Cyber KPK Theme)                                             */
/* -------------------------------------------------------------------------- */

const statusStyles: Record<DossierStatus, string> = {
  TERDAKWA: "border-[#00F0FF]/50 bg-[#00F0FF]/15 text-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.3)]",
  TERPIDANA: "border-[#FF1A40]/50 bg-[#FF1A40]/15 text-[#FF1A40] shadow-[0_0_10px_rgba(255,26,64,0.3)]",
  TERSANGKA: "border-amber-500/50 bg-amber-500/15 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.25)]",
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]";

const dossierButton = cn(
  "inline-flex h-9 shrink-0 items-center gap-2 rounded-xl border border-[#00F0FF]/40 bg-[#00F0FF]/15 px-4 font-mono text-xs font-bold uppercase tracking-wider text-[#00F0FF] transition-all duration-200 hover:bg-[#00F0FF] hover:text-[#050811] shadow-[0_0_12px_rgba(0,240,255,0.25)] cursor-pointer",
  focusRing
);

const arrowButton = cn(
  "flex h-11 w-11 items-center justify-center rounded-full border border-[#00F0FF]/40 bg-[#00F0FF]/10 text-[#00F0FF] transition-all duration-200 hover:bg-[#00F0FF] hover:text-[#050811] shadow-[0_0_12px_rgba(0,240,255,0.2)] hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] cursor-pointer",
  focusRing
);

const Corner = ({ className }: { className?: string }) => (
  <span
    aria-hidden
    className={cn("pointer-events-none absolute h-4 w-4 border-[#00F0FF]", className)}
  />
);

/* -------------------------------------------------------------------------- */
/* Gap 3D calculation                                                         */
/* -------------------------------------------------------------------------- */

function calculateGap(width: number) {
  if (width < 480) return 36;
  if (width < 640) return 48;
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export const CircularDossiers: React.FC<CircularDossiersProps> = ({
  dossiers,
  autoplay = false,
  onOpenDossier,
  className,
}) => {
  const reduceMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [containerWidth, setContainerWidth] = React.useState(1200);

  const imageContainerRef = React.useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const total = dossiers.length;
  const hasItems = total > 0;
  const safeIndex = hasItems ? Math.min(activeIndex, total - 1) : 0;
  const active = dossiers[safeIndex];

  // Reset index saat data / filter berubah
  const idsKey = React.useMemo(() => dossiers.map((d) => d.id).join("|"), [dossiers]);
  React.useEffect(() => {
    setActiveIndex(0);
  }, [idsKey]);

  // Pantau lebar kontainer foto untuk kalkulasi gap 3D
  React.useEffect(() => {
    if (!hasItems) return;
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [hasItems]);

  // Autoplay handler
  React.useEffect(() => {
    if (!autoplay || total < 2 || reduceMotion) return;
    autoplayIntervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 5000);
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, total, reduceMotion]);

  const stopAutoplay = React.useCallback(() => {
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, []);

  const handleNext = React.useCallback(() => {
    if (!total) return;
    setActiveIndex((prev) => (prev + 1) % total);
    stopAutoplay();
  }, [total, stopAutoplay]);

  const handlePrev = React.useCallback(() => {
    if (!total) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
    stopAutoplay();
  }, [total, stopAutoplay]);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      const el = e.target as HTMLElement | null;
      if (
        el?.closest(
          "input, textarea, select, [contenteditable='true'], [role='listbox'], [role='menu'], [role='combobox']"
        )
      )
        return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handlePrev, handleNext]);

  // Kalkulasi 3D style untuk tiap kartu foto
  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const transition = reduceMotion ? "none" : "all 0.8s cubic-bezier(.4,2,.3,1)";
    const isActive = index === safeIndex;
    const isLeft = total > 1 && (safeIndex - 1 + total) % total === index;
    const isRight = total > 2 && (safeIndex + 1) % total === index;

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
        transition,
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 0.9,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition,
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 0.9,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition,
      };
    }
    return { zIndex: 1, opacity: 0, pointerEvents: "none", transition };
  }

  const quoteVariants = reduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -16 },
      };

  if (!active) return null;

  return (
    <div
      className={cn(
        "relative w-full rounded-2xl border border-[#00F0FF]/30 bg-[#090D16]/90 p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-md",
        className
      )}
    >
      <Corner className="-left-1.5 -top-1.5 border-l-2 border-t-2" />
      <Corner className="-bottom-1.5 -right-1.5 border-b-2 border-r-2" />

      <div className="grid gap-10 md:gap-16 lg:gap-20 md:grid-cols-2 items-center">
        {/* Kolom Kiri: Tumpukan Foto 3D */}
        <div
          ref={imageContainerRef}
          className="relative h-80 sm:h-96 w-full self-center [perspective:1000px] flex items-center justify-center"
        >
          {dossiers.map((dossier, index) => {
            const isActive = index === safeIndex;
            const isLeft = total > 1 && (safeIndex - 1 + total) % total === index;
            const isRight = total > 2 && (safeIndex + 1) % total === index;

            return (
              <div
                key={dossier.id}
                data-index={index}
                aria-hidden={!isActive}
                className="absolute inset-0 max-w-[240px] sm:max-w-[290px] md:max-w-[320px] mx-auto cursor-pointer"
                style={getImageStyle(index)}
                onClick={() => {
                  if (isLeft) handlePrev();
                  else if (isRight) handleNext();
                  else if (isActive && onOpenDossier) onOpenDossier(dossier);
                }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-3xl border-2 border-[#00F0FF]/40 bg-[#050811] shadow-[0_15px_35px_rgba(0,0,0,0.7)] group">
                  <img
                    src={dossier.photo}
                    alt={dossier.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover select-none"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80';
                    }}
                  />
                  {/* Gradient Overlay & Cyber ID Badge */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050811]/90 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-[#00F0FF] bg-[#050811]/80 px-2.5 py-1.5 rounded-lg border border-[#00F0FF]/30 backdrop-blur-sm pointer-events-none">
                    <span className="font-bold tracking-wider">{dossier.id}</span>
                    <span className="text-slate-400">DOSSIER ENCRYPTED</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Kolom Kanan: Detail Berkas Pelaku */}
        <div className="flex flex-col justify-between h-full">
          <div aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                variants={quoteVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeInOut" }}
              >
                {/* Nama Pelaku & Status Badge */}
                <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-[#00F0FF] tracking-widest block mb-1 uppercase font-bold">
                      // TARGET INTELLIGENCE DOSSIER
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-black leading-tight text-white">
                      {active.name}
                    </h3>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 whitespace-nowrap rounded-lg border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider",
                      statusStyles[active.status]
                    )}
                  >
                    [STATUS: {active.status}]
                  </span>
                </div>

                {/* Alias & Jabatan */}
                <p className="font-mono text-xs text-slate-400">
                  Alias: <span className="text-slate-200 font-semibold">{active.alias}</span>
                </p>
                <p className="mb-5 mt-1 font-mono text-xs sm:text-sm font-bold text-[#00F0FF]">
                  {active.position}
                </p>

                {/* Box Sektor / TA / Ringkasan Kasus */}
                <div className="rounded-xl border border-[#00F0FF]/25 bg-[#050811]/90 p-4 sm:p-5 shadow-inner">
                  <div className="mb-3 flex items-center justify-between font-mono text-[11px] font-bold border-b border-slate-800/80 pb-2.5">
                    <span className="text-[#00F0FF]">SEKTOR: {active.sector}</span>
                    <span className="text-slate-400">TA: {active.year}</span>
                  </div>
                  <div className="font-sans text-xs sm:text-sm leading-relaxed text-slate-200">
                    <strong className="font-bold text-white font-mono mr-1">Kasus:</strong>
                    {reduceMotion
                      ? active.caseSummary
                      : active.caseSummary.split(" ").map((word, i) => (
                          <motion.span
                            key={i}
                            initial={{ filter: "blur(8px)", opacity: 0, y: 4 }}
                            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.2,
                              ease: "easeInOut",
                              delay: 0.02 * i,
                            }}
                            style={{ display: "inline-block" }}
                          >
                            {word}&nbsp;
                          </motion.span>
                        ))}
                  </div>
                </div>

                {/* Footer: Nilai Estimasi Kerugian & Tombol Dossier */}
                <div className="mt-6 flex items-end justify-between gap-4 border-t border-[#00F0FF]/20 pt-4">
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Total Estimasi Kerugian
                    </p>
                    <p className="font-mono text-xl sm:text-2xl font-black text-[#FF1A40] glow-crimson">
                      {active.estimatedLoss}
                    </p>
                  </div>
                  <button
                    type="button"
                    className={dossierButton}
                    onClick={() => onOpenDossier?.(active)}
                    aria-label={`Buka dossier ${active.name}`}
                  >
                    <span>DOSSIER</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigasi Panah Bulat & Indikator Target */}
          <div className="flex items-center justify-between pt-8 mt-2 border-t border-slate-800/60">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className={arrowButton}
                onClick={handlePrev}
                aria-label="Dossier sebelumnya"
                title="Dossier Sebelumnya (←)"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                className={arrowButton}
                onClick={handleNext}
                aria-label="Dossier berikutnya"
                title="Dossier Berikutnya (→)"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Indikator Index Target */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-slate-500 hidden sm:inline">TARGET INDEX:</span>
              <span className="px-3 py-1 rounded-lg bg-[#050811] border border-[#00F0FF]/30 text-[#00F0FF] font-bold shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                {String(safeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularDossiers;
