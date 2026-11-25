import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// jsdom draws nothing, so its elements cannot scroll. Stand in with one that
// does nothing; the tests that care where the page scrolls spy on it.
Element.prototype.scrollIntoView = () => {};

// Every test starts from a clean page: nothing rendered, no saved theme,
// no stand-ins left over from the test before.
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.clearAllMocks();
  vi.unstubAllGlobals();
  localStorage.clear();
  delete document.documentElement.dataset.theme;
  document.head
    .querySelectorAll('meta[name="theme-color"]')
    .forEach((meta) => meta.remove());
  window.location.hash = "";
});
