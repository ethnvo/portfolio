import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { projects } from "./data/projectData";

const Projects = () => {
  // Ref on the container that wraps all cards
  const containerRef = useRef(null);

  // isVisible becomes true once containerRef scrolls into view (only once)
  const isVisible = useInView(containerRef, { once: true });

  return (
    <div
      id="hackathons"
      className="w-full py-16 bg-transparent text-white mt-8 sm:mt-16"
    >
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <h2
          className="font-display leading-tight text-4xl sm:text-5xl font-semibold tracking-tight text-center
             text-ink
             mb-12 sm:mb-16"
        >
          Hackathons
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
              p-6 rounded-2xl shadow-xl shadow-black/40
              flex flex-col items-center
              border border-white/[0.08]
              bg-surface

              hover:shadow-brand/10 hover:border-brand/40 transition-all duration-300 ease-out
            `;

            // Subtle fade-up when the grid scrolls into view
            const animationClasses = isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8";

            return (
              <a
                key={idx}
                href={project.link || undefined}
                target={project.link ? "_blank" : undefined}
                rel={project.link ? "noopener noreferrer" : undefined}
                style={{ transitionDelay: `${idx * 110}ms` }}
                className={`
                  ${baseClasses}
                  ${project.link ? "cursor-pointer" : "cursor-default"}
                  ${animationClasses}
                  transition-all duration-500 ease-out
                `}
              >
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-ink mb-2 text-center">
                  {project.title}
                </h3>

                <div className="flex flex-wrap gap-2 items-center justify-center mb-4">
                  {project.award && (
                    <span className="px-3 py-1 rounded-full text-xs sm:text-sm border border-gold/40 bg-gold/10 text-gold">
                      {project.award}
                    </span>
                  )}
                  {project.event && (
                    <span className="px-3 py-1 rounded-full text-xs sm:text-sm border border-white/10 bg-white/[0.04] text-ink-soft">
                      {project.event}
                    </span>
                  )}
                </div>

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
                        {IconComponent && (
                          <IconComponent
                            size={16}
                            style={{ color: badgeColor }}
                          />
                        )}
                        <span>{label}</span>
                      </span>
                    );
                  })}
                </div>

                <p className="text-ink-soft text-sm font-light text-center leading-relaxed flex-grow">
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
