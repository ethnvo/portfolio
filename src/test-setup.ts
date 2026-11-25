import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// Every test starts from a clean page: nothing rendered, no saved theme.
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  localStorage.clear();
  delete document.documentElement.dataset.theme;
  window.location.hash = "";
});
