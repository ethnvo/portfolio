export type timeline = {
  title: string;
  extra: string | null;
  location: string;
  date: string;
  description: string;
  logo: string;
  active: boolean;
  is_exp: string | null;
};

// Experience only — hackathons live in their own section (see projectData.ts).
// Active (ongoing) roles come first so the "Now" cluster groups them at the top.
export const timelineData: timeline[] = [
  {
    title: "SDE Intern @ Amazon Music",
    active: true,
    extra: null,
    location: "Culver City, CA",
    date: "Sept 2026 - Dec 2026",
    description:
      "Building platform services for Amazon Music (Podcasts), the systems behind podcast playback and discovery at scale.",
    logo: "/logos/amazon-music.png",
    is_exp: "https://www.amazon.jobs/",
  },
  {
    title: "Founder @ onda",
    active: true,
    extra: null,
    location: "Irvine, CA",
    date: "March 2026 - Current",
    description:
      "Leading a 9-person team building onda (the rebuild of Plus1): a React Native + Expo app for real-time, map-based discovery and coordination of spontaneous meetups.",
    logo: "/logos/onda-icon.svg",
    is_exp: null,
  },
  {
    title: "Software Engineer Intern @ Equus Compute Solutions",
    active: false,
    extra: null,
    location: "Industry, CA",
    date: "June 2026 - Sept 2026",
    description:
      "Built a crash-safe concurrent Go pipeline (worker-pool / single-writer) normalizing hardware logs to JSON Lines across 3 formats at 5000+ machine scale. Shipped 6 benchmarks with Prometheus thermal monitoring into a RabbitMQ pass/fail pipeline.",
    logo: "/logos/equus.jpeg",
    is_exp: null,
  },
  {
    title: "Software Engineer Intern @ koderAI",
    active: false,
    extra: null,
    location: "Irvine, CA",
    date: "June 2025 - Sept 2025",
    description:
      "Built a C#/.NET LLM logging API on Azure Cosmos DB and a Dockerized Android build pipeline on Azure queues. Added Azure Functions + Semantic Kernel for prompt workflows and metadata extraction.",
    logo: "/logos/koderAI.png",
    is_exp: "https://koder.com/",
  },
];
