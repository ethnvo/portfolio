import { timelineData } from "./data/timelineData";
import { motion } from "framer-motion";

const borderColors = [
  "border-orange-200",
  "border-[#CA906C]",
  "border-amber-600",
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
        "
        >
          Timeline
        </h2>
      </motion.div>

      <div className="relative">
        {/* Central line: spans entire stack on mobile, extends below on sm+ */}
        <div
          className="
            absolute
            left-1/2
            top-0
            bottom-0
            sm:bottom-[-50px]
            w-1
            bg-gradient-to-b
            from-orange-200
            via-rose-400
            to-pink-500
            transform
            -translate-x-1/2
          "
        />

        {/**
          Card container:
          • mobile: auto height, vertical stack with space-y-8  
          • sm+: fixed height of 800px, justify-between  
        */}
        <div
          className="
            relative
            flex
            flex-col
            h-auto
            space-y-8
            sm:h-[800px]
            sm:justify-between
            sm:space-y-0
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
                  transition: { delay: i * 0.2 },
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
                  h-12
                  w-12
                  sm:h-14
                  sm:w-14
                  rounded-md
                  border
                  ${borderColors[i % borderColors.length]}

                  /* By default (mobile & small tablet), keep icon centered */
                  left-1/2
                  -translate-x-1/2

                  /* At md (≥768px), undo translation and push icon out to edge */
                  md:left-auto
                  md:translate-x-0
                  ${i % 2 === 0 ? "md:-left-[25px]" : "md:-right-7"}
                `}
              />

              <a href="#projects">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <h2
                    className="
                      truncate
                      text-lg
                      sm:text-xl
                      font-bold
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
                    {entry.extra && (
                      <span
                        className="
                          px-3
                          py-1
                          border
                          border-yellow-400
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

                  <p className="mt-3 text-sm sm:text-base text-white">
                    {entry.description}
                  </p>
                </motion.div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
