import { describe, expect, it } from "vitest";
import css from "./index.css?raw";
import tailwind from "../tailwind.config.js?raw";

// jsdom lays nothing out and reads no stylesheet, so these tests read the
// source instead. They hold the decisions about the look that no other test
// here can see. A change to one of them is a change to the design: make it on
// purpose, and change the test with it.
const components = import.meta.glob<string>("./**/*.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
});

const rules = css.replace(/\/\*[\s\S]*?\*\//g, ""); // the stylesheet without its comments

// The colour roles of one theme, by name.
const roles = (selector: string): Record<string, string> => {
  const from = rules.indexOf(`${selector} {`);
  const block = rules.slice(from, rules.indexOf("}", from));
  return Object.fromEntries(
    Array.from(block.matchAll(/--([\w-]+):\s*([^;]+);/g), ([, name, value]) => [
      name,
      value,
    ])
  );
};
const light = roles(":root");
const dark = roles(':root[data-theme="dark"]');

const SKY = "#8ee0f0";
const INK = "#080b09";

// Full size on a desktop screen read as zoomed in; three quarters is what
// looked natural. One number on the root sets it, and it only reaches lengths
// written in rem, em or vw.
describe("the size of the page", () => {
  it("is three quarters from tablet width up, and full size on phones", () => {
    expect(rules).toMatch(/html\s*{\s*font-size:\s*100%;/);
    expect(rules).toMatch(
      /@media \(min-width: 768px\)\s*{\s*html\s*{\s*font-size:\s*75%;/
    );
  });

  // The banner artwork is the exception: it is a picture of a fixed size.
  it("reaches every length in the components", () => {
    const fixed = Object.entries(components)
      .filter(([file]) => !/Banner\.tsx$|\.test\.tsx$/.test(file))
      .flatMap(([file, source]) =>
        (source.match(/\[[^\]\s]*\dpx[^\]\s]*\]/g) ?? []).map(
          (size) => `${file} ${size}`
        )
      );
    expect(Object.keys(components)).toContain("./components/About.tsx");
    expect(fixed).toEqual([]);
  });

  // What is left in pixels: the width where the layout changes, the focus
  // ring, the least an underline may be, the hairline on the "now" pill, and
  // the radius that means "fully round".
  it("reaches every length in the stylesheet, bar the lines that must stay sharp", () => {
    const fixed = new Set(rules.match(/[\d.]+px/g));
    expect([...fixed].sort()).toEqual([
      "1.5px",
      "2px",
      "3px",
      "768px",
      "9999px",
    ]);
  });
});

describe("the colours", () => {
  // A step from the opening into the page under it read as a glitch.
  it.each([
    ["light", light],
    ["dark", dark],
  ])("%s mode is one flat colour from the top of the page to the footer", (_mode, theme) => {
    expect(theme.frame).toBeTruthy();
    expect(theme.calm).toBe(theme.frame);
  });

  it("light mode is the teaser's sky, and dark mode is ink, not a darker sky", () => {
    expect(light.frame).toBe(SKY);
    expect(dark.frame).toBe(INK);
  });

  // The artwork is sky. Laid on a sky page its edges cannot be seen.
  it("the banner tool lays the artwork on a ground of another colour", () => {
    expect(components["./components/Banner.tsx"]).toContain("bg-bench");
    expect(tailwind).toContain('bench: "var(--bench)"');
    for (const theme of [light, dark]) {
      expect(theme.bench).toBeTruthy();
      expect(theme.bench).not.toBe(SKY);
    }
  });
});
