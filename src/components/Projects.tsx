import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { projects } from "./data/projectData";

const CARD_WIDTH = 500; // adjust as needed
const GAP = 32; // Tailwind gap-6 = 1.5rem = 24px
const ITEM_SIZE = CARD_WIDTH + GAP;

const Projects = () => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  // Duplicate the projects list to create a seamless loop
  const loopedProjects = [...projects, ...projects];

  useEffect(() => {
    let x = 0;

    const scroll = async () => {
      while (true) {
        await controls.start({
          x: -x,
          transition: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }, // custom cubic-bezier
        });

        x += ITEM_SIZE;
        if (x >= ITEM_SIZE * projects.length) x = 0;
      }
    };

    scroll();
  }, [controls]);

  return (
    <div className="w-full flex justify-center py-8 overflow-hidden">
      <motion.div
        ref={containerRef}
        animate={controls}
        className="flex gap-6"
        style={{ x: 0 }}
      >
        {loopedProjects.map((project, i) => (
          <div
            key={i}
            className="min-w-[600px] min-h-[600px] bg-black/20 p-6 rounded-2xl shadow-md"
          >
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
            <img src={project.logo} className="min"></img>
            <p className="text-white text-sm mt-2">{project.description}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Projects;
