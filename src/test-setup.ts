import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// Every test starts from a clean page: nothing rendered, no saved theme,
// no stand-ins left over from the test before.
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.clearAllMocks();
  vi.unstubAllGlobals();
  localStorage.clear();
  delete document.documentElement.dataset.theme;
  delete (document as { fonts?: unknown }).fonts;
  document.head
    .querySelectorAll('meta[name="theme-color"]')
    .forEach((meta) => meta.remove());
  window.location.hash = "";
});
