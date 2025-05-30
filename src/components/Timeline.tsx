import React from "react";
import { timelineData } from "./data/timelineData";
import { motion } from "framer-motion";

const borderColors = [
  "border-yellow-400",
  "border-amber-500",
  "border-amber-600",
  "border-rose-400",
  "border-pink-500",
];

const Timeline = () => {
  return (
    <div
      className="relative max-w-6xl mx-auto my-16 px-4 sm:px-6 lg:px-8"
      id="timeline"
    >
      {/* central line */}
      <div className="absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-[#eab308] via-rose-400 to-pink-500 transform -translate-x-1/2" />

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
          className={`relative w-full sm:w-4/5 md:w-1/2 p-6 sm:p-8 bg-black/20 rounded-2xl shadow-lg
  ${i % 2 === 0 ? "ml-auto text-left" : "mr-auto text-right"}
  overflow-visible flex flex-col
`}
        >
          {/* connector logo */}
          <img
            src={entry.logo}
            alt=""
            className={`
              absolute -top-12 h-12 w-12 sm:h-14 sm:w-14 rounded-md
              border ${borderColors[i % borderColors.length]}
              ${i % 2 === 0 ? "-left-6 sm:-left-7" : "-right-6 sm:-right-7"}
            `}
          />

          {/* content */}
          <h2 className="truncate text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-yellow-100">
            {entry.title}
          </h2>

          {/* badges */}
          <div
            className={`
    mt-2 w-full flex flex-wrap gap-2 items-center
    ${i % 2 != 0 ? "justify-end" : "justify-start"}
  `}
          >
            {entry.extra && (
              <span className="px-3 py-1 border border-yellow-400 rounded-full text-xs sm:text-sm text-white">
                {entry.extra}
              </span>
            )}
            <span className="px-3 py-1 bg-gray-400/20 rounded-full text-xs sm:text-sm text-white">
              {entry.date}
            </span>
          </div>

          <p className="mt-3 text-sm sm:text-base text-white">
            {entry.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;
