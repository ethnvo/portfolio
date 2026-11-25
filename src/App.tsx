import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Timeline from "./components/Timeline";
import Projects from "./components/Projects";
import Banner from "./components/Banner";

// Tiny hash router: only #banner is special (hidden tool); every other
// hash (#about, #timeline, #projects) renders the portfolio and lets the
// browser scroll to the anchor as usual.
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
const column = "mx-auto max-w-[1268px]";

function App() {
  const hash = useHash();
  if (hash === "#banner") return <Banner />;

  return (
    <div className="min-h-screen bg-calm text-on-calm">
      {/* The frame: one flat colour behind the nav and the opening line. */}
      <header className={`bg-frame pt-5 text-on-frame md:pt-[26px] ${gutter}`}>
        <div className={column}>
          <Navbar />
        </div>
      </header>

      <main>
        <section
          id="about"
          className={`bg-frame pb-[68px] pt-11 text-on-frame md:pb-[104px] md:pt-[84px] ${gutter}`}
        >
          <div className={column}>
            <About />
          </div>
        </section>

        {/* The calm middle. */}
        <div
          className={`pb-[84px] pt-[76px] md:pb-[136px] md:pt-[124px] ${gutter}`}
        >
          <div className={`${column} space-y-[84px] md:space-y-32`}>
            <Timeline />
            <Projects />
          </div>
        </div>
      </main>

      <footer
        className={`border-t border-white/10 bg-ink py-[22px] text-sm font-medium text-mute md:py-[26px] ${gutter}`}
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

export default App;
