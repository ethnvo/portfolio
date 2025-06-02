import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";
import { projects } from "./data/projectData";

const CARD_WIDTH = 500;
const GAP = 32;
const ITEM_WIDTH = CARD_WIDTH + GAP;
const VISIBLE_CARDS = projects.length;
const TOTAL_WIDTH = ITEM_WIDTH * VISIBLE_CARDS;
const SPEED = 150; // pixels per second (adjust to taste)

const Projects = () => {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  // Duplicate so that after scrolling TOTAL_WIDTH we land exactly at the start again
  const looped = [...projects, ...projects];

  // On each frame, move the x position unless paused
  useAnimationFrame((_, delta) => {
    if (!paused) {
      const currentX = x.get();
      const nextX = currentX - (SPEED * delta) / 1000;
      // wrap around when we've scrolled past -TOTAL_WIDTH
      x.set(nextX <= -TOTAL_WIDTH ? 0 : nextX);
    }
  });

  return (
    <div
      className="w-[1000px] overflow-hidden mx-auto py-8 mt-[64px]"
      id="projects"
    >
      <div className="text-white  text-2xl mb-10"> Featured Projects</div>

      <motion.div
        className="flex gap-6"
        style={{ x }}
        ref={containerRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {looped.map((project, i) => (
          <motion.a
            href={looped[i].link}
            target="_blank"
            rel="noopener noreferer"
            whileHover={{ scale: 1.05, zIndex: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div
              key={i}
              className="w-[700px] h-[600px] bg-black/20 p-6 rounded-2xl shadow-md flex flex-col items-center"
            >
              <h3 className="text-xl font-bold text-white mb-4 ">
                {project.title}
              </h3>
              <div className="inline-flex items-center justify-center bg-white/5 rounded-2xl p-1 mb-4">
                <img
                  src={project.logo}
                  alt={project.title}
                  className="max-w-full h-[250px] object-contain rounded-3xl"
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
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};

export default Projects;
