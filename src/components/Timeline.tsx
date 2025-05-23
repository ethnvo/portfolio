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
            className="flex flex-col-reverse items-center justify-center md:flex md:flex-row gap-8 md:gap-16 lg:gap-24"
          >
            <div>
              {/* entire container*/}
              <div
                className={`flex items-center gap-4 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div
                  className={`flex-1 flex flex-col gap-1 ${
                    index % 2 === 0 ? "text-right" : "text-left"
                  }`}
                >
                  {/*all of the text*/}
                  <div
                    className={`flex ${
                      index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                    }`}
                    key={entry.title}
                  >
                    <div className="text-pretty hover:scale-105 transition-all transition-smooth">
                      <h2 className="font-bold"> {entry.title}</h2>
                      <p className="italic"> {entry.date}</p>
                      <p className="text-sm"> {entry.description}</p>
                    </div>
                  </div>
                </div>
                <div>
                  {/* logos */}
                  <img
                    className="w-[50px] h-[50px] rounded-md object-contain hover:scale-125 transition-all transiiton-smooth bg-clip-text"
                    src={entry.logo}
                  ></img>
                </div>
                <div className="flex-1"> </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
