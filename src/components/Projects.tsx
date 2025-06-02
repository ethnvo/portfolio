import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useInView,
} from "framer-motion";
import { useRef, useState } from "react";
import { projects } from "./data/projectData";

const DESKTOP_SPEED = 150;
const MOBILE_SPEED = 75;

const CARD_WIDTH = 500;
const GAP = 32;
const ITEM_WIDTH = CARD_WIDTH + GAP;
const VISIBLE_CARDS = projects.length;
const TOTAL_WIDTH = ITEM_WIDTH * VISIBLE_CARDS;

const Projects = () => {
  const x = useMotionValue(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hoverPaused, setHoverPaused] = useState(false);

  // Observe the wrapper, not the moving inner div
  const isInView = useInView(wrapperRef, { once: false });

  const looped = [...projects, ...projects, ...projects];

  useAnimationFrame((_, delta) => {
    // If user is hovering or wrapper is offscreen, do not advance
    if (hoverPaused || !isInView) {
      return;
    }

    let frameSpeed = DESKTOP_SPEED;
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      frameSpeed = MOBILE_SPEED;
    }

    const currentX = x.get();
    const nextX = currentX - (frameSpeed * delta) / 1000;

    if (nextX <= -TOTAL_WIDTH * 2) {
      x.set(-TOTAL_WIDTH);
    } else {
      x.set(nextX);
    }
  });

  return (
    <div
      id="projects"
      className="w-full overflow-x-hidden overflow-y-hidden py-8 mt-16"
    >
      <div className="max-w-[1000px] mx-auto w-full px-4 sm:px-0">
        <div className="flex justify-center sm:justify-start">
          <div className="text-3xl mb-10 px-2 py-1 text-transparent bg-clip-text bg-gradient-to-b from-rose-500 via-pink-300 to-orange-300">
            Featured Projects
          </div>
        </div>

        {/* The wrapper we observe for in‐view status */}
        <div
          ref={wrapperRef}
          className="relative overflow-x-hidden overflow-y-hidden"
          onMouseEnter={() => setHoverPaused(true)}
          onMouseLeave={() => setHoverPaused(false)}
        >
          <motion.div className="flex gap-6" style={{ x }}>
            {looped.map((project, i) => (
              <motion.a
                key={i}
                href={looped[i].link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, zIndex: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 35 }}
              >
                <div
                  className={`
                    flex-shrink-0
                    min-w-[80vw]
                    sm:min-w-[500px]
                    md:w-[700px]
                    h-auto
                    md:h-[600px]
                    bg-black/20
                    backdrop-blur-sm
                    p-6
                    rounded-2xl
                    shadow-md
                    flex
                    flex-col
                    items-center
                  `}
                >
                  <h3 className="text-xl font-light text-white mb-4">
                    {project.title}
                  </h3>
                  <div className="inline-flex items-center justify-center bg-white/5 rounded-2xl p-1 mb-4">
                    <img
                      src={project.logo}
                      alt={project.title}
                      className="max-w-full h-[250px] object-contain rounded-3xl"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2.5 items-center justify-center mb-4">
                    {project.technologies?.map((label, index) => {
                      const Icon = project.techlogos?.[index] ?? null;
                      const badgeColor =
                        project.colors?.[index % project.colors.length] ??
                        "#ffffff50";
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
                  </div>

                  <p className="text-white text-sm font-light">
                    {project.description}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
