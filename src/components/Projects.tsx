import { motion } from "framer-motion";
import { projects } from "./data/projectData";

const CARD_WIDTH = 500; // width of one card
const GAP = 32; // gap between cards
const ITEM_WIDTH = CARD_WIDTH + GAP;
const VISIBLE_CARDS = projects.length;
const TOTAL_WIDTH = ITEM_WIDTH * VISIBLE_CARDS;

const Projects = () => {
  // duplicate so after scrolling TOTAL_WIDTH we land exactly at the start again
  const looped = [...projects, ...projects];

  return (
    <div className="w-[1000px] overflow-hidden mx-auto py-8">
      <motion.div
        className="flex gap-6"
        // animate x from 0 to -TOTAL_WIDTH, then snap back to 0
        animate={{ x: [0, -TOTAL_WIDTH] }}
        transition={{
          x: {
            repeat: Infinity, // loop forever
            repeatType: "loop", // jump back to 0 instantly
            duration: 30, // total time for one full pass (adjust to taste)
            ease: "linear", // constant speed
          },
        }}
      >
        {looped.map((project, i) => (
          <a>
            <div
              key={i}
              className="w-[700px] h-[600px] bg-black/20 p-6 rounded-2xl shadow-md flex flex-col items-center"
            >
              <h3 className="text-xl font-bold text-white mb-4 ">
                {project.title}
              </h3>
              <div className="inline-flex items-center justify-center bg-white/5 rounded-xl p-4 mb-4">
                <img
                  src={project.logo}
                  alt={project.title}
                  className="max-w-full h-[250px] object-contain"
                />
              </div>
              <div className="h-[75px]">
                <span className="flex flex-wrap gap-2.5  items-center">
                  {project.technologies?.map((label, index) => {
                    const Icon = project.techlogos?.[index] ?? null;
                    return (
                      <span
                        key={index}
                        className="flex items-center gap-2 text-white bg-white/20 px-3 py-1 rounded-full text-sm"
                      >
                        {Icon && <Icon size={18} />}
                        <span>{label}</span>
                      </span>
                    );
                  })}
                </span>
              </div>

              <p className="text-white mt-8 text-sm">{project.description}</p>
            </div>
          </a>
        ))}
      </motion.div>
    </div>
  );
};

export default Projects;
