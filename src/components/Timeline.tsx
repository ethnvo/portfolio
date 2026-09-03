import { timelineData } from "./data/timelineData";
import { motion } from "framer-motion";

const borderColors = [
  "border-brand/60",
  "border-white/20",
  "border-wave/50",
  "border-brand/40",
  "border-live/40",
  "border-white/15",
];

const Timeline = () => {
  return (
    <div
      className="
        max-w-6xl
        mx-auto
        px-4
        sm:py-10
        sm:px-6
        lg:px-8
        mb-20
      "
      id="timeline"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {/* Responsive heading spacing */}
        <h2
          className="
          font-display
          text-ink
          text-5xl
          text-center
          mt-10
          mb-20
          sm:mb-[100px]
          font-semibold
          tracking-tight
        "
        >
          Timeline
        </h2>
      </motion.div>

      <div
        className="
    relative
    flex flex-col
    space-y-8
    sm:space-y-0

    before:content-['']
    before:absolute
    before:left-1/2
    before:top-0
    before:w-px
    before:h-full
    before:bg-gradient-to-b
    before:from-white/[0.06]
    before:via-brand/30
    before:to-white/[0.06]
    before:-translate-x-1/2
  "
      >
        {timelineData.map((entry, i) => (
          <motion.div
            key={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: i * 0.1 },
              },
            }}
            className={`
                relative
                w-full
                md:w-1/2           /* Half-width only at ≥768px */
                p-4
                sm:p-6

                /* Matte surface — onda house style (no blur) */
                bg-surface

                rounded-2xl
                shadow-lg
                overflow-visible
                flex
                flex-col
                border border-white/[0.08]
              shadow-black/40
              hover:border-brand/40
              hover:shadow-brand/10
                transition-all
                /* Center on mobile */
                mx-auto
                text-center
                sm:mx-0

                /* At ≥640px, revert to auto margins (but don't yet force 50% until 768px).
                   At ≥768px, alternate left/right. */
                ${
                  i % 2 === 0
                    ? "sm:ml-0 md:ml-auto md:text-left"
                    : "sm:mr-0 md:mr-auto md:text-right"
                }
              `}
          >
            {/**
                Connector icon:
                • mobile (<640px): center over card  
                • sm (≥640px but <768px): we’re still full-width, so keep centering  
                • md (≥768px): card is now 50%, so remove centering and push left/right
              */}
            <img
              src={entry.logo}
              alt=""
              className={`
    absolute
    -top-12
    h-12 w-12 sm:h-14 sm:w-14
    rounded-md
    border ${borderColors[i % borderColors.length]}

    /* Mobile & small tablet: center */
    left-1/2
    -translate-x-1/2

    /* At ≥768px: cancel the translate, then offset left or right */
    md:translate-x-0
    ${i % 2 === 0 ? "md:-left-[25px]" : "md:left-auto md:-right-7"}
  `}
            />
            <a
              href={entry.is_exp ? entry.is_exp : "#projects"}
              target={entry.is_exp ? "_blank" : "_self"}
              rel={entry.is_exp ? "noopener noreferrer" : undefined}
            >
              <div className="">
                <h2
                  className="
                      truncate
                      font-display
                      text-lg
                      sm:text-xl
                      font-semibold
                      text-ink
                    "
                >
                  {entry.title}
                </h2>

                {/**
                    Badges:
                    • mobile (<640px): always centered  
                    • sm (≥640px but <768px): still full-width cards, so center  
                    • md (≥768px): if card is on the right half (even index → md:w-1/2), badges justify-start; 
                                 if card is on the left half (odd index), badges justify-end 
                  */}
                <div
                  className={`
                      mt-2
                      w-full
                      flex
                      flex-wrap
                      gap-2
                      items-center

                      /* Always center badges until ≥768px */
                      justify-center
                      ${
                        /* At ≥768px, push badges left for right-side cards, right for left-side cards */
                        i % 2 === 0 ? "md:justify-start" : "md:justify-end"
                      }
                    `}
                >
                  {entry.active && (
                    <span
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        sm:text-sm
                        border border-live/40
                        bg-live/10
                        text-live
                        font-medium
                        tracking-wide
                      "
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-live" />
                      active
                    </span>
                  )}

                  {entry.extra && (
                    <span
                      className="
                          px-3
                          py-1
                          border
                          border-gold/40
                          bg-gold/10
                          rounded-full
                          text-xs
                          sm:text-sm
                          text-gold
                        "
                    >
                      {entry.extra}
                    </span>
                  )}
                  {entry.location && (
                    <span
                      className="
                          px-3
                          py-1
                          border
                          border-wave/40
                          bg-wave/10
                          rounded-full
                          text-xs
                          sm:text-sm
                          text-wave
                        "
                    >
                      📍 {entry.location}
                    </span>
                  )}
                  <span
                    className="
                        px-3
                        py-1
                        border border-white/10
                        bg-white/[0.04]
                        rounded-full
                        text-xs
                        sm:text-sm
                        text-ink-soft
                      "
                  >
                    {entry.date}
                  </span>
                </div>
                <p
                  className={`mt-3 text-xs sm:text-base text-ink-soft leading-relaxed ${
                    i % 2 === 0 ? "sm:ml-3 sm:mr-0" : "sm:mr-3 sm:ml-0"
                  }`}
                  style={{ fontWeight: "350" }}
                >
                  {entry.description}
                </p>
              </div>
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
