import Navbar from "./components/Navbar";
import About from "./components/About";
import Timeline from "./components/Timeline";
import Projects from "./components/Projects";

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div
        className="
        fixed
        top-[-20%]    /* push the element up by 20% of viewport height */
        left-0
        right-0
        bottom-0
        -z-10
        h-[120vh]     /* make sure it’s tall enough so bottom still covers entire screen */
        w-full
        bg-neutral-950
        bg-[radial-gradient(ellipse_100%_80%_at_50%_20%,rgba(255,105,180,0.25),transparent)]
      "
      />

      <Navbar />
      <About />
      <Timeline />
      <Projects />
      <footer className="text-center text-sm text-gray-500 py-10">
        © 2025 Ethan Vo. Built with React & TailwindCSS.
      </footer>
    </div>
  );
}

export default App;
