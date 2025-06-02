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
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-[400px]"
      id="timeline"
    >
      {/*  Heading with reduced margins */}
      <h2 className="text-transparent bg-gradient-to-b bg-clip-text from-rose-500 via-pink-300 to-amber-200  text-wrap text-4xl text-center mt-10 mb-[192px]">
        Timeline
      </h2>

      {/*  “line + cards” wrapper with fixed height */}
      <div className="relative h-[800px]">
        {/* central line now starts 56px above and ends 56px below */}
        <div
          className="
            absolute left-1/2
            top-[0px]    
            bottom-[-50px]  
            w-1
            bg-gradient-to-b from-[#eab308] via-rose-400 to-pink-500
            transform -translate-x-1/2
          "
        />

        {/* ③ Flex container to evenly space cards */}
        <div className="relative flex flex-col justify-between h-full">
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
                relative w-full sm:w-4/5 md:w-1/2 p-6 sm:p-8 bg-black/20
                rounded-2xl shadow-lg
                ${i % 2 === 0 ? "ml-auto text-left" : "mr-auto text-right"}
                overflow-visible flex flex-col
              `}
            >
              {/* connector logo (icon) */}
              <img
                src={entry.logo}
                alt=""
                className={`
                  absolute -top-12 h-12 w-12 sm:h-14 sm:w-14 rounded-md
                  border ${borderColors[i % borderColors.length]}
                  ${i % 2 === 0 ? "-left-6 sm:-left-7" : "-right-6 sm:-right-7"}
                `}
              />

              <a href="#projects">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring" }}
                >
                  <h2
                    className="
                      truncate text-lg sm:text-xl font-bold
                      text-transparent bg-clip-text
                      bg-gradient-to-b to-pink-300 via-pink-400 from-rose-500
                    "
                  >
                    {entry.title}
                  </h2>
                  {/* badges */}
                  <div
                    className={`
                      mt-2 w-full flex flex-wrap gap-2 items-center
                      ${i % 2 !== 0 ? "justify-end" : "justify-start"}
                    `}
                  >
                    {entry.extra && (
                      <span
                        className="
                        px-3 py-1 border border-yellow-400
                        rounded-full text-xs sm:text-sm text-white
                      "
                      >
                        {entry.extra}
                      </span>
                    )}
                    <span
                      className="
                      px-3 py-1 bg-gray-400/20
                      rounded-full text-xs sm:text-sm text-white
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
