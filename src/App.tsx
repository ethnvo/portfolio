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

function App() {
  const hash = useHash();
  if (hash === "#banner") return <Banner />;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ground text-ink">
      {/* Subtle dot grid — matte, no glow */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:24px_24px]" />
      {/* Vignette for depth toward the edges */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />

      <Navbar />
      <main className="relative z-10">
        <About />
        <Timeline />
        <Projects />
      </main>
      <footer className="relative z-10 text-center text-sm text-ink-muted py-10">
        © 2026 Ethan Vo · built with react &amp; tailwind
      </footer>
    </div>
  );
}

export default App;
