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
    <div className="w-[600px] overflow-hidden mx-auto py-8">
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
          <div
            key={i}
            className="w-[500px] h-[600px] bg-black/20 p-6 rounded-2xl shadow-md flex flex-col items-center"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              {project.title}
            </h3>
            <div className="w-[500px] h-[200px] flex justify-center items-center bg-white/5 rounded-xl mb-4">
              <img
                src={project.logo}
                alt={project.title}
                className="max-w-full max-h-full  object-contain"
              />
            </div>
            <p className="text-white text-sm">{project.description}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Projects;
