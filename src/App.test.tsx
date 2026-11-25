import { afterEach, describe, expect, it } from "vitest";
import { act, render, screen, within } from "@testing-library/react";
import App from "./App";

// What the site has to keep saying, written out here on purpose: these tests
// fail when a role, a project or a link goes missing from the data files.
const roles = [
  {
    when: "now",
    title: "sde intern @ amazon music",
    meta: "Sept 2026 – Dec 2026 · Culver City, CA",
    link: "https://www.amazon.jobs/",
    says: "Building platform services for Amazon Music (Podcasts), the systems behind podcast playback and discovery at scale.",
  },
  {
    when: "now",
    title: "founder @ onda",
    meta: "March 2026 – Current · Irvine, CA",
    link: null,
    says: "Leading a 9-person team building onda (the rebuild of Plus1): a React Native + Expo app for real-time, map-based discovery and coordination of spontaneous meetups.",
  },
  {
    when: "2026",
    title: "swe intern @ equus compute solutions",
    meta: "June 2026 – Sept 2026 · Industry, CA",
    link: null,
    says: "Built a crash-safe concurrent Go pipeline (worker-pool / single-writer) normalizing hardware logs to JSON Lines across 3 formats at 5000+ machine scale. Shipped 6 benchmarks with Prometheus thermal monitoring into a RabbitMQ pass/fail pipeline.",
  },
  {
    when: "2025",
    title: "swe intern @ koderAI",
    meta: "June 2025 – Sept 2025 · Irvine, CA",
    link: "https://koder.com/",
    says: "Built a C#/.NET LLM logging API on Azure Cosmos DB and a Dockerized Android build pipeline on Azure queues. Added Azure Functions + Semantic Kernel for prompt workflows and metadata extraction.",
  },
];

const work = [
  {
    title: "auther.",
    event: "VenusHacks 2025",
    award: "🏆 1st · Best Female Empowerment",
    stack: "React, Next.js, Typescript, Django, Python, TailwindCSS",
    link: "https://devpost.com/software/auther",
    picture: "/logos/auther500.png",
    says: "Puts women-led research front and center with an intuitive platform surfacing verified female authors and amplifying often-overlooked voices.",
  },
  {
    title: "AWSpeak",
    event: "AWS CloudHacks 2025",
    award: "Top 5 Finalist",
    stack: "React, Next.js, Typescript, Flask, Amazon Web Services, Python, TailwindCSS",
    link: "https://devpost.com/software/awspeak",
    picture: "/logos/awspeak.jpeg",
    says: "AI-powered mock interviews modeled on Amazon's leadership principles. Voice-driven sessions tailored to a job description, with detailed feedback and downloadable transcripts.",
  },
  {
    title: "Plus1 (Flutter MVP)",
    event: "LAHacks 2025",
    award: null,
    stack: "Flutter, Dart, Google Firebase",
    link: "https://devpost.com/software/plus1-ypledt",
    picture: "/logos/plus1.svg",
    says: "The original LAHacks MVP: students find or create real-time meetups like study sessions or lunch hangouts. Low-commitment, low-friction, instant connection.",
  },
  {
    title: "AutoFeeder",
    event: "BitHacks 2025",
    award: null,
    stack: "ESP-32, C/C++",
    link: null,
    picture: "/logos/bithacks.png",
    says: "An automatic pet feeder prototyped on ESP-32 (C/C++) with real-time hardware control and a simple timed-feeding UI, built under tight hackathon constraints.",
  },
];

const text = (el: Element | null) =>
  (el?.textContent ?? "").replace(/\s+/g, " ").trim();

describe("the page", () => {
  it("opens on the teaser line", () => {
    render(<App />);
    expect(text(screen.getByRole("heading", { level: 1 }))).toBe("i'm ethan");
  });

  it("says who ethan is, with his photo", () => {
    render(<App />);
    const about = document.getElementById("about");
    expect(text(about)).toContain("fullstack & mobile engineer");
    expect(text(about)).toContain(
      "Hi! I'm Ethan Vo, a fourth-year Software Engineering major at UC Irvine."
    );
    expect(text(about)).toContain(
      "I thrive under pressure, whether I'm leading teams, competing in hackathons, or building startups. Always trying to reach the next level as an engineer, a leader, and a founder who turns ideas into impact."
    );
    expect(screen.getByRole("img", { name: "Ethan Vo" }).getAttribute("src")).toBe(
      "/headshot.png"
    );
  });

  it("links the nav to sections that exist", () => {
    render(<App />);
    const nav = screen.getByRole("navigation", { name: "sections" });
    const links = within(nav)
      .getAllByRole("link")
      .map((a): [string, string] => [
        a.textContent ?? "",
        a.getAttribute("href") ?? "",
      ]);
    expect(links).toEqual([
      ["ethanvo.dev", "#about"],
      ["about", "#about"],
      ["timeline", "#timeline"],
      ["projects", "#projects"],
    ]);
    for (const [, href] of links) {
      expect(document.getElementById(href.slice(1)), href).not.toBeNull();
    }
  });

  it("calls the work section projects, not hackathons", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 2, name: "projects" })
    ).toBeTruthy();
    expect(screen.queryByRole("heading", { name: /hackathons/i })).toBeNull();
    expect(screen.queryByRole("link", { name: /hackathons/i })).toBeNull();
    expect(document.getElementById("hackathons")).toBeNull();
  });

  it("names every way to reach ethan, each opening in a new tab", () => {
    render(<App />);
    const ways = {
      "explore my cv": "/Ethan Vo Resume F.pdf",
      "contact me": "https://mail.google.com/mail/?view=cm&fs=1&to=ekvo@uci.edu",
      github: "https://github.com/ethnvo/",
      linkedin: "https://www.linkedin.com/in/ethnvo/",
    };
    for (const [name, href] of Object.entries(ways)) {
      const link = screen.getByRole("link", { name });
      expect(link.getAttribute("href"), name).toBe(href);
      expect(link.getAttribute("target"), name).toBe("_blank");
      expect(link.getAttribute("rel"), name).toBe("noopener noreferrer");
    }
  });

  it("lists every role with when, where and what", () => {
    render(<App />);
    const rows = within(
      screen.getByRole("list", { name: "timeline" })
    ).getAllByRole("listitem");
    expect(
      rows.map((row) => text(within(row).getByRole("heading", { level: 3 })))
    ).toEqual(roles.map((role) => role.title));

    roles.forEach((role, i) => {
      const row = within(rows[i]);
      expect(row.getByText(role.when), role.title).toBeTruthy();
      expect(text(rows[i]), role.title).toContain(role.meta);
      expect(text(rows[i]), role.title).toContain(role.says);
      const link = row.queryByRole("link");
      expect(link?.getAttribute("href") ?? null, role.title).toBe(role.link);
      if (link) {
        expect(link.getAttribute("target")).toBe("_blank");
        expect(link.getAttribute("rel")).toBe("noopener noreferrer");
      }
    });
  });

  it("shows every project with its picture, event, award, stack and write-up", () => {
    render(<App />);
    const tiles = within(
      screen.getByRole("list", { name: "projects" })
    ).getAllByRole("listitem");
    expect(
      tiles.map((tile) => text(within(tile).getByRole("heading", { level: 3 })))
    ).toEqual(work.map((project) => project.title));

    work.forEach((project, i) => {
      const tile = text(tiles[i]);
      expect(tile, project.title).toContain(project.event);
      expect(tile, project.title).toContain(project.says);
      expect(tile, project.title).toContain(project.stack);
      if (project.award) expect(tile).toContain(project.award);
      else expect(tiles[i].querySelector(".award")).toBeNull();
      expect(tiles[i].querySelector("img")?.getAttribute("src")).toBe(
        project.picture
      );
      const link = within(tiles[i]).queryByRole("link");
      expect(link?.getAttribute("href") ?? null, project.title).toBe(
        project.link
      );
      if (link) {
        expect(link.getAttribute("target")).toBe("_blank");
        expect(link.getAttribute("rel")).toBe("noopener noreferrer");
      }
    });
  });

  it("ends after projects: a footer, and no sign-off or message box", () => {
    render(<App />);
    const main = screen.getByRole("main");
    expect(
      within(main)
        .getAllByRole("heading", { level: 2 })
        .map((heading) => heading.textContent)
    ).toEqual(["timeline", "projects"]);
    const footer = screen.getByRole("contentinfo");
    expect(main.nextElementSibling).toBe(footer);
    expect(text(footer)).toContain("© 2026 ethan vo");
    expect(document.querySelector("form, input, textarea")).toBeNull();
    expect(screen.queryByRole("textbox")).toBeNull();
    expect(document.body.textContent).not.toMatch(/i'm down/i);
  });
});

describe("the hidden banner tool", () => {
  it("opens at #banner, and the site everywhere else", () => {
    window.location.hash = "#banner";
    render(<App />);
    expect(screen.getByRole("button", { name: "download as png" })).toBeTruthy();
    expect(document.getElementById("banner")).not.toBeNull();
    expect(screen.queryByRole("heading", { level: 1 })).toBeNull();

    act(() => {
      window.location.hash = "#about";
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });
    expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();
    expect(screen.queryByRole("button", { name: "download as png" })).toBeNull();
  });
});

// The page is drawn after it loads, so the browser has nothing to scroll to
// when a link names a section. The app finishes the job.
describe("a link straight to a section", () => {
  const landings = () => {
    const seen: string[] = [];
    Element.prototype.scrollIntoView = function (this: Element) {
      seen.push(this.id);
    };
    return seen;
  };
  afterEach(() => {
    // jsdom has no scrollIntoView of its own
    delete (Element.prototype as { scrollIntoView?: unknown }).scrollIntoView;
  });

  it("lands on that section", () => {
    const seen = landings();
    window.location.hash = "#projects";
    render(<App />);
    expect(seen).toEqual(["projects"]);
  });

  it("stays put on a plain visit", () => {
    const seen = landings();
    render(<App />);
    expect(seen).toEqual([]);
  });

  it("leaves the banner tool and unknown names alone", () => {
    const seen = landings();
    window.location.hash = "#banner";
    render(<App />).unmount();
    window.location.hash = "#nowhere";
    render(<App />);
    expect(seen).toEqual([]);
  });
});
