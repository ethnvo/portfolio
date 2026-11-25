import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const DEVICE_DARK = "(prefers-color-scheme: dark)";

// The colour behind the top of the page, for the phone's browser bar.
const FRAME: Record<Theme, string> = { light: "#8EE0F0", dark: "#080B09" };

/** A saved choice wins. Otherwise follow the device. */
export function resolveTheme(
  saved: string | null,
  deviceIsDark: boolean
): Theme {
  if (saved === "light" || saved === "dark") return saved;
  return deviceIsDark ? "dark" : "light";
}

function readSaved(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null; // storage is blocked: just follow the device
  }
}

function deviceIsDark(): boolean {
  return window.matchMedia?.(DEVICE_DARK).matches ?? false;
}

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", FRAME[theme]);
}

/** The current theme and a function that flips it and remembers the choice. */
export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() =>
    resolveTheme(readSaved(), deviceIsDark())
  );

  useEffect(() => {
    apply(theme);
  }, [theme]);

  // Until the visitor picks a side, keep following the device.
  useEffect(() => {
    const device = window.matchMedia?.(DEVICE_DARK);
    if (!device) return;
    const follow = (event: MediaQueryListEvent) => {
      if (readSaved() === null) setTheme(event.matches ? "dark" : "light");
    };
    device.addEventListener("change", follow);
    return () => device.removeEventListener("change", follow);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage is blocked: the choice lasts for this visit only
    }
    setTheme(next);
  };

  return [theme, toggle];
}
