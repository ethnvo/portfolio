import { describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import indexHtml from "../index.html?raw";
import App from "./App";
import { resolveTheme } from "./theme";

type Listener = (event: { matches: boolean }) => void;

// A pretend device set to dark or light, that can change its mind while the page is open.
function device(dark: boolean) {
  const listeners = new Set<Listener>();
  const state = { dark };
  vi.stubGlobal("matchMedia", (query: string) => ({
    get matches() {
      return state.dark && query.includes("dark");
    },
    media: query,
    addEventListener: (_: string, listener: Listener) => listeners.add(listener),
    removeEventListener: (_: string, listener: Listener) =>
      listeners.delete(listener),
  }));
  return {
    turn(nowDark: boolean) {
      state.dark = nowDark;
      act(() => listeners.forEach((listener) => listener({ matches: nowDark })));
    },
  };
}

// A browser that refuses storage (private modes, blocked site data).
function blockStorage() {
  const refuse = () => {
    throw new DOMException("blocked", "SecurityError");
  };
  vi.spyOn(Storage.prototype, "getItem").mockImplementation(refuse);
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(refuse);
}

// The tag that colours the phone's browser bar, as index.html ships it.
function browserBar() {
  const meta = document.createElement("meta");
  meta.name = "theme-color";
  meta.content = "#8EE0F0";
  document.head.append(meta);
  return meta;
}

const theme = () => document.documentElement.dataset.theme;
const flip = (to: "dark" | "light") =>
  fireEvent.click(screen.getByRole("button", { name: `switch to ${to} mode` }));

// saved choice, device is dark, the theme that should show
const cases: [string | null, boolean, "light" | "dark"][] = [
  [null, false, "light"],
  [null, true, "dark"],
  ["light", true, "light"],
  ["dark", false, "dark"],
  ["light", false, "light"],
  ["dark", true, "dark"],
  ["purple", true, "dark"],
  ["", false, "light"],
];

describe("resolveTheme", () => {
  it.each(cases)("saved %j on a device with dark=%j shows %s", (saved, dark, shows) => {
    expect(resolveTheme(saved, dark)).toBe(shows);
  });
});

describe("the theme switch", () => {
  it("opens dark on a dark device", () => {
    device(true);
    render(<App />);
    expect(theme()).toBe("dark");
    expect(
      screen.getByRole("button", { name: "switch to light mode" })
    ).toBeTruthy();
  });

  it("opens light on a light device", () => {
    device(false);
    render(<App />);
    expect(theme()).toBe("light");
    expect(
      screen.getByRole("button", { name: "switch to dark mode" })
    ).toBeTruthy();
  });

  it("switches to dark and remembers the choice", () => {
    device(false);
    render(<App />);
    flip("dark");
    expect(theme()).toBe("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(
      screen.getByRole("button", { name: "switch to light mode" })
    ).toBeTruthy();
  });

  it("colours the phone's browser bar to match", () => {
    const bar = browserBar();
    device(false);
    render(<App />);
    expect(bar.content).toBe("#8EE0F0");
    flip("dark");
    expect(bar.content).toBe("#080B09");
    flip("light");
    expect(bar.content).toBe("#8EE0F0");
  });

  it("keeps a saved light choice on a dark device", () => {
    localStorage.setItem("theme", "light");
    device(true);
    render(<App />);
    expect(theme()).toBe("light");
  });

  it("follows the device while nothing is chosen", () => {
    const phone = device(false);
    render(<App />);
    phone.turn(true);
    expect(theme()).toBe("dark");
    phone.turn(false);
    expect(theme()).toBe("light");
  });

  it("stops following the device once the visitor has chosen", () => {
    const phone = device(false);
    render(<App />);
    flip("dark");
    phone.turn(true);
    phone.turn(false);
    expect(theme()).toBe("dark");
  });

  it("keeps a saved choice when the device changes", () => {
    localStorage.setItem("theme", "light");
    const phone = device(false);
    render(<App />);
    phone.turn(true);
    expect(theme()).toBe("light");
  });

  it("treats a saved value it does not know as no choice", () => {
    localStorage.setItem("theme", "purple");
    const phone = device(false);
    render(<App />);
    expect(theme()).toBe("light");
    phone.turn(true);
    expect(theme()).toBe("dark");
  });

  it("holds a choice for the visit where storage is blocked", () => {
    blockStorage();
    const phone = device(false);
    render(<App />);
    expect(theme()).toBe("light");
    flip("dark");
    expect(theme()).toBe("dark");
    phone.turn(true);
    phone.turn(false);
    expect(theme()).toBe("dark");
  });

  it("still opens in a browser too old to report device changes", () => {
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: query.includes("dark"),
      media: query,
    }));
    render(<App />);
    expect(theme()).toBe("dark");
  });

  it("opens light where the device cannot be asked at all", () => {
    vi.stubGlobal("matchMedia", undefined);
    render(<App />);
    expect(theme()).toBe("light");
  });

  it("applies to the banner tool too", () => {
    window.location.hash = "#banner";
    const phone = device(true);
    render(<App />);
    expect(theme()).toBe("dark");
    phone.turn(false);
    expect(theme()).toBe("light");
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

  it.each(cases)(
    "saved %j on a device with dark=%j paints %s, as the app will",
    (saved, dark, shows) => {
      if (saved !== null) localStorage.setItem("theme", saved);
      device(dark);
      const bar = browserBar();
      boot();
      expect(theme()).toBe(shows);
      expect(bar.content).toBe(shows === "dark" ? "#080B09" : "#8EE0F0");
      // and the app agrees once it is running, so nothing flips after load
      render(<App />);
      expect(theme()).toBe(shows);
    }
  );

  it("follows the device where storage is blocked", () => {
    blockStorage();
    device(true);
    boot();
    expect(theme()).toBe("dark");
  });

  it("paints light where the device cannot be asked", () => {
    vi.stubGlobal("matchMedia", undefined);
    boot();
    expect(theme()).toBe("light");
  });
});
