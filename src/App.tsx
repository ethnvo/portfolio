import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Timeline from "./components/Timeline";
import Projects from "./components/Projects";
import Banner from "./components/Banner";
import { useTheme, type Theme } from "./theme";

// Tiny hash router: only #banner is special (hidden tool); every other
// hash (#about, #timeline, #projects) renders the portfolio.
function useHash() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return hash;
}

// Every band of the page shares the same side gutters and content column.
const gutter = "px-5 md:px-[6vw]";
const column = "mx-auto max-w-[79.25rem]";

type SiteProps = { theme: Theme; onToggleTheme: () => void };

// The portfolio itself.
function Site({ theme, onToggleTheme }: SiteProps) {
  // A link straight to a section (ethanvo.dev/#projects) arrives before the
  // page is drawn, so the browser finds nothing to scroll to. Finish the job
  // when the page appears. Later clicks on the nav scroll on their own.
  useEffect(() => {
    document
      .getElementById(window.location.hash.slice(1))
      ?.scrollIntoView({ behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen bg-calm text-on-calm">
      {/* The frame: one flat colour behind the nav and the opening line. */}
      <header
        className={`bg-frame pt-5 text-on-frame md:pt-[1.625rem] ${gutter}`}
      >
        <div className={column}>
          <Navbar theme={theme} onToggleTheme={onToggleTheme} />
        </div>
      </header>

      <main>
        {/* The nav sits right above this section and scrolls with the page,
            so "about" has to land at the very top to keep it in view. The
            scroll margin is far taller than the nav, which stops the scroll
            at the top of the page. */}
        <section
          id="about"
          className={`scroll-mt-[50vh] bg-frame pb-[4.25rem] pt-11 text-on-frame md:pb-[6.5rem] md:pt-[5.25rem] ${gutter}`}
        >
          <div className={column}>
            <About />
          </div>
        </section>

        {/* The page under the opening. */}
        <div
          className={`pb-[5.25rem] pt-[4.75rem] md:pb-[8.5rem] md:pt-[7.75rem] ${gutter}`}
        >
          <div className={`${column} space-y-[5.25rem] md:space-y-32`}>
            <Timeline />
            <Projects />
          </div>
        </div>
      </main>

      <footer
        className={`border-t border-white/10 bg-ink py-[1.375rem] text-sm font-medium text-mute md:py-[1.625rem] md:text-[1rem] ${gutter}`}
      >
        <div
          className={`${column} flex flex-wrap justify-between gap-x-4 gap-y-2`}
        >
          <span>© 2026 ethan vo</span>
          <span>built with react &amp; tailwind</span>
        </div>
      </footer>
    </div>
  );
}

function App() {
  const hash = useHash();
  const [theme, toggleTheme] = useTheme();

  if (hash === "#banner") return <Banner />;
  return <Site theme={theme} onToggleTheme={toggleTheme} />;
}

export default App;
