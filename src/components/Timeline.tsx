import { timelineData } from "./data/timelineData";
import { motion } from "framer-motion";

const borderColors = [
  "border-orange-200",
  "border-[#FEDBD3]",
  "border-[#FD9998]",
  "border-[#FB8791]",
  "border-rose-400",
  "border-pink-500",
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
        mb-40
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
          text-transparent
          bg-gradient-to-b
          bg-clip-text
          from-rose-500
          via-pink-300
          to-orange-200
          text-5xl
          text-center
          mt-10
          mb-20
          sm:mb-[100px]
          sm:font-medium
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
    before:w-1
    before:h-full
    before:bg-gradient-to-b
    before:from-orange-200
    before:via-rose-400
    before:to-pink-500
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

                /* Blurred, translucent background */
                bg-black/20
                backdrop-blur-sm

                rounded-2xl
                shadow-lg
                overflow-visible
                flex
                flex-col
                border border-transparent    
              shadow-pink-200/20
              hover:shadow-rose-400/50
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

            <a href="#projects">
              <div className="">
                <h2
                  className="
                      truncate
                      text-lg
                      sm:text-xl
                      font-medium
                      text-transparent
                      bg-clip-text
                      bg-gradient-to-b
                      from-rose-400
                      via-pink-300
                      to-orange-300

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
                  {entry.in_dev && (
                    <span
                      className="
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        sm:text-sm
                        border border-pink-300
                        text-white
                        bg-pink-500/10
                        shadow-sm
                        backdrop-blur-sm
                        font-medium
                        tracking-wide
                      "
                    >
                      In Development
                    </span>
                  )}

                  {entry.extra && (
                    <span
                      className="
                          px-3
                          py-1
                          border
                          border-yellow-400
                          bg-yellow-400/10
                          rounded-full
                          text-xs
                          sm:text-sm
                          text-white
                        "
                    >
                      {entry.extra}
                    </span>
                  )}
                  <span
                    className="
                        px-3
                        py-1
                        bg-gray-400/20
                        rounded-full
                        text-xs
                        sm:text-sm
                        text-white
                      "
                  >
                    {entry.date}
                  </span>
                </div>

                <p
                  className="mt-3 text-xs sm:text-base  text-white"
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
