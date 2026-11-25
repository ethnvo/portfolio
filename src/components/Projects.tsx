import { projects, type Project } from "./data/projectData";

const Tile = ({ project }: { project: Project }) => (
  <>
    <div className="relative">
      <img
        src={project.logo}
        alt=""
        className="shot block aspect-[16/10] w-full rounded-[1.625rem] object-cover"
      />
      {project.award && <span className="award">{project.award}</span>}
    </div>

    <h3 className="mt-7 text-[1.8125rem] font-bold leading-[1.05] tracking-[-0.03em] md:mt-[2.125rem] md:text-[2.125rem]">
      {project.title}
    </h3>
    {project.event && (
      <p className="mt-[0.5625rem] font-bold lowercase leading-[1.3] text-soft">
        {project.event}
      </p>
    )}
    <p className="mt-3 max-w-[60ch] text-pretty text-[1.03125rem] font-medium leading-normal md:text-lg md:leading-7">
      {project.description}
    </p>
    <p className="mt-3 text-[0.9375rem] font-bold lowercase leading-[1.4] text-soft md:text-[1rem]">
      {project.technologies.join(", ")}
    </p>
  </>
);

// Projects as picture tiles. A tile with a write-up opens it in a new tab.
const Projects = () => (
  <section>
    <h2 id="projects" className="big scroll-mt-16">
      projects
    </h2>

    <ul
      role="list"
      aria-labelledby="projects"
      className="mt-10 grid gap-14 md:mt-14 md:grid-cols-2 md:gap-x-14 md:gap-y-[4.5rem]"
    >
      {projects.map((project) => (
        <li key={project.title}>
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="tile block"
            >
              <Tile project={project} />
            </a>
          ) : (
            <Tile project={project} />
          )}
        </li>
      ))}
    </ul>
  </section>
);

export default Projects;
