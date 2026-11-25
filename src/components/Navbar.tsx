import ThemeToggle from "./ThemeToggle";
import type { Theme } from "../theme";

const links = [
  { href: "#about", label: "about" },
  { href: "#timeline", label: "timeline" },
  { href: "#projects", label: "projects" },
];

type Props = { theme: Theme; onToggleTheme: () => void };

// One plain row at the top of the frame. It scrolls away with the page.
// Sized to stay on one row down to 360px-wide phones; narrower than that, or
// with very large text, the links wrap under the name.
const Navbar = ({ theme, onToggleTheme }: Props) => (
  <nav
    aria-label="sections"
    className="flex flex-wrap items-center justify-between gap-x-3 gap-y-3 text-[0.8125rem] font-bold leading-none md:gap-x-4 md:text-base md:leading-6"
  >
    <a
      href="#about"
      className="nav-link text-[1.0625rem] tracking-[-0.02em] md:text-[1.3125rem]"
    >
      ethanvo.dev
    </a>

    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-3 md:gap-x-[1.875rem]">
      {links.map(({ href, label }) => (
        <a key={href} href={href} className="nav-link">
          {label}
        </a>
      ))}
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </div>
  </nav>
);

export default Navbar;
