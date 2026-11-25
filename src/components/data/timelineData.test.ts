import { describe, expect, it } from "vitest";
import { whenLabel } from "./timelineData";

describe("whenLabel", () => {
  it("says now for a role that is still going", () => {
    expect(whenLabel({ active: true, date: "March 2026 - Current" })).toBe(
      "now"
    );
  });

  it("gives a finished role the year it started", () => {
    expect(whenLabel({ active: false, date: "June 2025 - Sept 2025" })).toBe(
      "2025"
    );
    expect(whenLabel({ active: false, date: "Dec 2024 - Feb 2025" })).toBe(
      "2024"
    );
  });
});
