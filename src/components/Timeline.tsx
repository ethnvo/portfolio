import React from "react";
import { timelineData } from "./data/timelineData";
import { motion } from "framer-motion";

const Timeline = () => {
  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="flex-auto mx-auto text-slate-400" id="timeline">
        {timelineData.map((entry, index) => (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: -70 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full"
          >
            <div
              className={`flex border border-gray-500 rounded-lg items-center gap-4 group transition-all ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              {/* text section */}
              <div
                className={`flex-1 flex flex-col gap-1 group-hover:scale-[1.025] transition-transform duration-300 ease-in-out ${
                  index % 2 === 0 ? "text-right" : "text-left"
                }`}
              >
                <div key={entry.title}>
                  <h2 className="font-bold">{entry.title}</h2>
                  <h3 className="font-medium">{entry.location}</h3>
                  <p className="italic">{entry.date}</p>
                  <p className="text-sm">{entry.description}</p>
                </div>
              </div>

              {/* logo */}
              <div className="transition-transform duration-300 ease-in-out group-hover:scale-[1.2]">
                <img
                  src={entry.logo}
                  alt=""
                  className="w-[50px] h-[50px] rounded-md object-contain"
                />
              </div>

              <div className="flex-1"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
