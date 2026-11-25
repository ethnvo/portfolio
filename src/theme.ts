import { useEffect, useRef, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const DEVICE_DARK = "(prefers-color-scheme: dark)";

// The colour behind the top of the page, for the phone's browser bar.
const FRAME: Record<Theme, string> = { light: "#8EE0F0", dark: "#080B09" };

const isTheme = (value: string | null): value is Theme =>
  value === "light" || value === "dark";

/** A saved choice wins. Otherwise follow the device. */
export function resolveTheme(
  saved: string | null,
  deviceIsDark: boolean
): Theme {
  if (isTheme(saved)) return saved;
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
  // Whether the visitor has used the switch during this visit. Kept apart
  // from storage, so the choice still holds where storage is blocked.
  const chosen = useRef(false);

  useEffect(() => {
    apply(theme);
  }, [theme]);

  // Until the visitor picks a side, keep following the device.
  useEffect(() => {
    const device = window.matchMedia?.(DEVICE_DARK);
    // Browsers too old to report the change keep the theme they opened with.
    if (typeof device?.addEventListener !== "function") return;
    const follow = (event: MediaQueryListEvent) => {
      if (chosen.current || isTheme(readSaved())) return;
      setTheme(event.matches ? "dark" : "light");
    };
    device.addEventListener("change", follow);
    return () => device.removeEventListener("change", follow);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    chosen.current = true;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage is blocked: the choice lasts for this visit only
    }
    setTheme(next);
  };

  return [theme, toggle];
}
