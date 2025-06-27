import Navbar from "./components/Navbar";
import About from "./components/About";
import Timeline from "./components/Timeline";
import Projects from "./components/Projects";

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="fixed inset-0 -z-20 bg-black" />

      <div
        className="
    fixed
    inset-0
    -z-10
    overflow-hidden
    pointer-events-none
  "
      >
        <div
          className="
    absolute
    inset-0
    blur-[120px]
    bg-[radial-gradient(ellipse_80%_80%_at_50%_100%,#ffc371_0%,#ff5f6d_25%,#6a85f1_55%,transparent_100%)]
  "
        />
      </div>
      <div className="fixed inset-0 z-0 bg-[url('/clean-gray-paper.png')] bg-repeat opacity-[0.12] pointer-events-none" />
      <Navbar />
      <About />
      <Timeline />
      <Projects />
      <footer className="text-center text-sm text-white py-10">
        © 2025 Ethan Vo. Built with React & TailwindCSS.
      </footer>
    </div>
  );
}

export default App;
