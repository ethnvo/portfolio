import React from "react";
import { timelineData } from "./data/timelineData";
import { motion } from "framer-motion";

const Timeline = () => {
  return (
    <div className="relative max-w-4xl mx-auto my-16">
      {/* central line */}
      <div className="absolute left-1/2 top-0 h-full w-1 bg-gray-300 transform -translate-x-1/2" />
      {timelineData.map((entry, i) => (
        <motion.div
          key={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { delay: i * 0.2 } },
          }}
          className={`
        relative w-full md:w-1/2 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg
        ${i % 2 === 0 ? "ml-auto text-left" : "mr-auto text-right"}
      `}
        >
          {/* connector dot */}
          <img
            src={entry.logo}
            className={`
    absolute -top-12 h-14 w-14 rounded-md
    ${i % 2 === 0 ? "-left-7" : "-right-6"}
  `}
            alt=""
          />

          {/* content */}
          <h2 className="text-xl font-bold text-rose-600">{entry.title}</h2>
          <span className="inline-block px-3 py-1 bg-gray-200 rounded-full text-sm">
            {entry.date}
          </span>
          <p className="mt-2 text-sm text-white">{entry.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;
