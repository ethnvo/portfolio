import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import indexHtml from "../index.html?raw";
import App from "./App";
import { resolveTheme } from "./theme";

// Pretend the device is set to dark or light.
const device = (dark: boolean) =>
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: dark && query.includes("dark"),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));

describe("resolveTheme", () => {
  it("follows the device until a choice is saved", () => {
    expect(resolveTheme(null, false)).toBe("light");
    expect(resolveTheme(null, true)).toBe("dark");
  });

  it("lets a saved choice win over the device", () => {
    expect(resolveTheme("light", true)).toBe("light");
    expect(resolveTheme("dark", false)).toBe("dark");
  });

  it("ignores a saved value it does not know", () => {
    expect(resolveTheme("purple", true)).toBe("dark");
    expect(resolveTheme("", false)).toBe("light");
  });
});

describe("the theme switch", () => {
  it("opens dark on a dark device", () => {
    device(true);
    render(<App />);
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(
      screen.getByRole("button", { name: "switch to light mode" })
    ).toBeTruthy();
  });

  it("opens light on a light device", () => {
    device(false);
    render(<App />);
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(
      screen.getByRole("button", { name: "switch to dark mode" })
    ).toBeTruthy();
  });

  it("switches to dark and remembers the choice", () => {
    device(false);
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "switch to dark mode" }));
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(
      screen.getByRole("button", { name: "switch to light mode" })
    ).toBeTruthy();
  });

  it("keeps a saved light choice on a dark device", () => {
    localStorage.setItem("theme", "light");
    device(true);
    render(<App />);
    expect(document.documentElement.dataset.theme).toBe("light");
  });
});

// index.html sets the theme before the app loads, so the first paint is
// already the right one. Run that same inline script here.
describe("the boot script in index.html", () => {
  const boot = () => {
    const code = /<script>([\s\S]*?)<\/script>/.exec(indexHtml)?.[1];
    if (!code) throw new Error("index.html has no inline boot script");
    new Function(code)();
  };

  it("picks dark on a dark device", () => {
    device(true);
    boot();
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("picks light on a light device", () => {
    device(false);
    boot();
    expect(document.documentElement.dataset.theme).toBe("light");
  });

  it("uses the saved choice", () => {
    localStorage.setItem("theme", "light");
    device(true);
    boot();
    expect(document.documentElement.dataset.theme).toBe("light");
  });
});
