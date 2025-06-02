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
  const looped = [...projects, ...projects, ...projects]; // 3x

  // On each frame, move the x position unless paused
  useAnimationFrame((_, delta) => {
    if (!paused) {
      const currentX = x.get();
      const nextX = currentX - (SPEED * delta) / 1000;

      if (nextX <= -TOTAL_WIDTH * 2) {
        // Reset to middle copy (seamless illusion)
        x.set(-TOTAL_WIDTH);
      } else {
        x.set(nextX);
      }
    }
  });

  return (
    <div
      className="w-[1000px] overflow-hidden mx-auto py-8 mt-[64px]"
      id="projects"
    >
      <div className="inline-block bg-clip-text text-transparent  bg-gradient-to-b to-pink-600 via-pink-400 from-rose-400 px-2 py-1 text-2xl mb-10">
        Featured Projects
      </div>

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
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
          >
            <div
              key={i}
              className="w-[700px] h-[600px] bg-black/20 p-6 rounded-2xl shadow-md flex flex-col items-center"
            >
              <h3 className="text-xl font-light text-white mb-4 ">
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
                    const badgeColor =
                      project.colors?.[index % project.colors.length] ??
                      "#ffffff50"; // fallback
                    return (
                      <span
                        key={index}
                        className="flex items-center gap-2 border text-white px-3 py-1 rounded-full text-sm font-extralight"
                        style={{ borderColor: badgeColor }}
                      >
                        {Icon && (
                          <Icon size={18} style={{ color: badgeColor }} />
                        )}
                        <span>{label}</span>
                      </span>
                    );
                  })}
                </span>
              </div>

              <p className="text-white mt-8 text-sm font-light">
                {project.description}
              </p>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};

export default Projects;
