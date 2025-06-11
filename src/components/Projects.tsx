import React, { useRef } from "react";
import { useInView } from "framer-motion"; // Make sure to install: npm install framer-motion
import { projects } from "./data/projectData";

// Placeholder for icon components (e.g., from react-icons or lucide-react)
// Replace with your actual icon components

const Projects = () => {
  // Ref on the container that wraps all cards
  const containerRef = useRef(null);

  // isVisible becomes true once containerRef scrolls into view (only once)
  const isVisible = useInView(containerRef, { once: true });

  return (
    <div
      id="projects"
      className="w-full py-16 bg-transparent text-white mt-[80px] sm:mt-[200px]"
    >
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <h2
          className="leading-tight text-4xl sm:text-5xl font-medium text-center
             text-transparent bg-clip-text 
             bg-gradient-to-b from-rose-500 via-pink-300 to-orange-200
             mb-12 sm:mb-16 pb-1"
        >
          Featured Projects
        </h2>

        {/* Container for the cards. The ref is used to detect when this container is in view */}
        <div
          ref={containerRef}
          className="flex flex-col md:flex-row md:flex-wrap justify-center items-stretch gap-8 md:gap-10"
        >
          {projects.map((project, idx) => {
            // Base styling for each card but no background classes
            const baseClasses = `
              flex-shrink-0 
              w-full sm:w-[calc(50%-1.25rem)] md:w-[calc(33.333%-1.25rem)] lg:w-[calc(33.333%-1.25rem)] xl:w-[350px]
              p-6 rounded-2xl shadow-xl 
              flex flex-col items-center 
              border border-pink-500
              bg-black/20 
              
              hover:shadow-yellow-400/30 hover:border-orange-300 transition-all duration-300 ease-out
            `;

            // Initial (not visible): translate to right and opacity 0
            // When visible: translate-x-0 and opacity 100
            const animationClasses = isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-full";

            // Stagger delay using Tailwind's delay utilities
            const delayClass = `delay-${idx * 150}`;

            return (
              <a
                key={idx}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  ${baseClasses}
                  ${animationClasses}
                  transition-all duration-700 ease-out
                  ${delayClass}
                `}
              >
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 text-center">
                  {project.title}
                </h3>

                <div className="w-full aspect-[16/10] inline-flex items-center justify-center rounded-xl p-1 mb-4 overflow-hidden group">
                  <img
                    src={project.logo}
                    alt={`${project.title} logo`}
                    className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
                    onError={(e) => {
                      // Fallback for broken image links
                      e.currentTarget.src =
                        "https://placehold.co/400x250/333/ccc?text=Image+Not+Found";
                      e.currentTarget.alt = "Image loading error";
                    }}
                  />
                </div>

                <div className="flex flex-wrap gap-2 items-center justify-center mb-4">
                  {project.technologies?.map((label, i2) => {
                    const IconComponent = project.techlogos?.[i2];
                    if (!IconComponent) return null;
                    const badgeColor =
                      project.colors?.[i2 % project.colors.length] ?? "#718096";
                    return (
                      <span
                        key={i2}
                        className="flex items-center gap-1.5 border px-2.5 py-1 rounded-full text-xs sm:text-sm font-medium text-slate-200"
                        style={{
                          borderColor: badgeColor,
                          boxShadow: `0 0 5px -1px ${badgeColor}60`,
                        }}
                      >
                        <IconComponent
                          size={16}
                          style={{ color: badgeColor }}
                        />
                        <span>{label}</span>
                      </span>
                    );
                  })}
                </div>

                <p className="text-white text-sm font-light text-center leading-relaxed flex-grow">
                  {project.description}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Projects;
