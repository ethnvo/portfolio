import Navbar from "./components/Navbar"
import About from "./components/About"
//import Projects from "./components/Projects"
import Timeline from "./components/Timeline";
//import Contact from "./components/Contact";

function App() {
  return (
    <div className="min-h-screen">
      <div className="fixed top-0 -z-10 min-h-screen w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,105,180,0.3),rgba(255,255,255,0))]">
      </div>
      <Navbar />
      <About />
      <Timeline />

      {/* 
      <Projects />
      <Contact /> */}
    </div>
  );
}

export default App;
