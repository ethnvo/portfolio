import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "#about", label: "about" },
  { href: "#timeline", label: "timeline" },
  { href: "#projects", label: "projects" },
];

// One plain row at the top of the frame. It scrolls away with the page.
const Navbar = () => (
  <nav
    aria-label="sections"
    className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 text-sm font-bold leading-none md:text-base"
  >
    <a
      href="#about"
      className="nav-link text-[17px] tracking-[-0.02em] md:text-[21px]"
    >
      ethanvo.dev
    </a>

    <div className="flex items-center gap-3.5 md:gap-[30px]">
      {links.map(({ href, label }) => (
        <a key={href} href={href} className="nav-link">
          {label}
        </a>
      ))}
      <ThemeToggle />
    </div>
  </nav>
);

export default Navbar;
