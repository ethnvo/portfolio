import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import App from "./App";
import { timelineData } from "./components/data/timelineData";
import { projects } from "./components/data/projectData";

describe("the page", () => {
  it("opens on the teaser line", () => {
    render(<App />);
    const line = screen.getByRole("heading", { level: 1 }).textContent ?? "";
    expect(line.replace(/\s+/g, " ").trim()).toBe("i'm ethan");
  });

  it("calls the work section projects, not hackathons", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 2, name: "projects" })
    ).toBeTruthy();
    expect(
      screen.getByRole("link", { name: "projects" }).getAttribute("href")
    ).toBe("#projects");
    expect(document.getElementById("projects")).toBeTruthy();
    expect(screen.queryByRole("heading", { name: /hackathons/i })).toBeNull();
    expect(screen.queryByRole("link", { name: /hackathons/i })).toBeNull();
  });

  it("names every way to reach ethan", () => {
    render(<App />);
    const href = (name: string) =>
      screen.getByRole("link", { name }).getAttribute("href");
    expect(href("explore my cv")).toBe("/Ethan Vo Resume F.pdf");
    expect(href("contact me")).toBe(
      "https://mail.google.com/mail/?view=cm&fs=1&to=ekvo@uci.edu"
    );
    expect(href("github")).toBe("https://github.com/ethnvo/");
    expect(href("linkedin")).toBe("https://www.linkedin.com/in/ethnvo/");
  });

  it("lists every role with when, where and what", () => {
    render(<App />);
    const rows = within(
      screen.getByRole("list", { name: "timeline" })
    ).getAllByRole("listitem");
    expect(rows).toHaveLength(timelineData.length);

    const when = ["now", "now", "2026", "2025"];
    timelineData.forEach((entry, i) => {
      const row = within(rows[i]);
      expect(
        row.getByRole("heading", { level: 3, name: entry.title })
      ).toBeTruthy();
      expect(row.getByText(when[i])).toBeTruthy();
      expect(rows[i].textContent).toContain(entry.location);
      expect(rows[i].textContent).toContain(entry.description);
      if (entry.is_exp) {
        expect(
          row.getByRole("link", { name: entry.title }).getAttribute("href")
        ).toBe(entry.is_exp);
      }
    });
  });

  it("shows every project with its event, award, stack and link", () => {
    render(<App />);
    const tiles = within(
      screen.getByRole("list", { name: "projects" })
    ).getAllByRole("listitem");
    expect(tiles).toHaveLength(projects.length);

    projects.forEach((project, i) => {
      const text = tiles[i].textContent ?? "";
      expect(
        within(tiles[i]).getByRole("heading", { level: 3, name: project.title })
      ).toBeTruthy();
      expect(text).toContain(project.event);
      expect(text).toContain(project.description);
      if (project.award) expect(text).toContain(project.award);
      project.technologies?.forEach((tech) => expect(text).toContain(tech));
      expect(tiles[i].querySelector("a")?.getAttribute("href") ?? "").toBe(
        project.link
      );
    });
  });
});
