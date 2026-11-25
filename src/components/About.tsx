const newTab = { target: "_blank", rel: "noopener noreferrer" };

// The opening frame: the teaser's line, who I am, and how to reach me.
const About = () => (
  <div className="grid items-center gap-11 md:grid-cols-[minmax(0,1fr)_auto] md:gap-16">
    <div>
      <h1 className="headline text-[31.5vw] md:text-[min(21vw,19rem)]">
        <span className="headline-word">
          <span className="headline-im">i&apos;m</span> ethan
        </span>
      </h1>

      <p className="mt-[1.125rem] text-[1.375rem] font-bold leading-[1.15] tracking-[-0.02em] md:mt-[1.625rem] md:text-[1.6875rem]">
        fullstack &amp; mobile engineer
      </p>

      {/* Body text, here and in the timeline and projects: on desktop the
          line height is a ratio (28px lines on 18px text), not a length, so
          text a reader has enlarged keeps its line spacing. */}
      <div className="mt-3.5 max-w-[36em] space-y-3.5 text-pretty text-[1.03125rem] font-medium leading-normal md:text-lg md:leading-[1.5556]">
        <p>
          Hi! I&apos;m Ethan Vo, a fourth-year Software Engineering major at UC
          Irvine.
        </p>
        <p>
          I thrive under pressure, whether I&apos;m leading teams, competing in
          hackathons, or building startups. Always trying to reach the next
          level as an engineer, a leader, and a founder who turns ideas into
          impact.
        </p>
      </div>

      <div className="mt-[1.625rem] flex flex-wrap items-center gap-x-[1.375rem] gap-y-4 md:mt-8">
        <a href="/Ethan Vo Resume F.pdf" className="btn btn-solid" {...newTab}>
          explore my cv
        </a>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=ekvo@uci.edu"
          className="btn btn-line"
          {...newTab}
        >
          contact me
        </a>
        <a href="https://github.com/ethnvo/" className="link" {...newTab}>
          github
        </a>
        <a
          href="https://www.linkedin.com/in/ethnvo/"
          className="link"
          {...newTab}
        >
          linkedin
        </a>
      </div>
    </div>

    <img
      src="/headshot.png"
      alt="Ethan Vo"
      className="me order-first ml-[0.6875rem] h-[9.375rem] w-[9.375rem] object-cover md:order-none md:mb-[1.375rem] md:ml-0 md:mr-[1.375rem] md:h-[min(29vw,25rem)] md:w-[min(29vw,25rem)]"
    />
  </div>
);

export default About;
