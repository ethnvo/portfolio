import type { Theme } from "../theme";

// The icon shows where the switch takes you: a moon in light mode, a sun in dark.
const Moon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-[1.125rem] w-[1.125rem]"
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M20.6 14.3A8.7 8.7 0 0 1 9.7 3.4a8.7 8.7 0 1 0 10.9 10.9Z"
    />
  </svg>
);

const Sun = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-[1.125rem] w-[1.125rem]"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4.6" fill="currentColor" />
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      d="M12 1.3v2.5M12 20.2v2.5M1.3 12h2.5M20.2 12h2.5M4.43 4.43l1.77 1.77M17.8 17.8l1.77 1.77M4.43 19.57l1.77-1.77M17.8 6.2l1.77-1.77"
    />
  </svg>
);

type Props = { theme: Theme; onToggle: () => void };

// The `after:` box widens the area that takes a tap without growing the button.
const ThemeToggle = ({ theme, onToggle }: Props) => {
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`switch to ${next} mode`}
      title={`switch to ${next} mode`}
      className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full shadow-[inset_0_0_0_0.15625rem_currentColor] transition-transform duration-150 after:absolute after:-inset-2 after:content-[''] hover:rotate-12 active:scale-90 motion-reduce:transition-none md:h-9 md:w-9"
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
};

export default ThemeToggle;
