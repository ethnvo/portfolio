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

export const timelineData: timeline[] = [
  {
    title: "Software Development Engineer Intern @ Amazon",
    active: true,
    extra: null,
    location: "Culver City, CA",
    date: "Sept 2026 - Dec 2026",
    description:
      "Building platform services for Amazon Music (Podcasts), working across the systems that power podcast playback and discovery at scale.",
    logo: "/logos/amazon.jpeg",
    is_exp: "https://www.amazon.jobs/",
  },
  {
    title: "Founder @ onda",
    active: true,
    extra: null,
    location: "Irvine, CA",
    date: "March 2026 - Current",
    description:
      "Leading a 9-person engineering team building onda (the ground-up rebuild of Plus1) - a cross-platform social event logistics app in React Native and Expo. Real-time, map-based discovery, coordination, and management of hosted events, designed for low-friction, spontaneous meetups.",
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
      "Built a concurrent Go pipeline normalizing hardware-inventory logs into JSON Lines across 3 formats with a worker-pool / single-writer, crash-safe design at 5000+ machine scale. Shipped 6 hardware benchmarks with Prometheus thermal monitoring into a RabbitMQ extractor/analyzer pipeline for automated pass/fail validation.",
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
      "Built a C#/.NET LLM logging API with Azure Cosmos DB and an Android APK pipeline using Docker, OpenJDK, and Azure storage/queues. Implemented Azure Functions and Semantic Kernel for prompt workflows, parsing, and metadata extraction.",
    logo: "/logos/koderAI.png",
    is_exp: "https://koder.com/",
  },
  {
    title: "Fullstack Developer & System Architect @ auther.",
    extra: "🏆 Best Female Empowerment",
    active: false,
    is_exp: null,
    location: "VenusHacks",
    date: "May 2025",
    description:
      "Earned 1st Place for building a socially impactful platform promoting women-led academia. Recognized by UCI’s Department of Computer Science for addressing gender bias through verified research metadata.",
    logo: "/logos/auther500.png",
  },
  {
    active: false,
    is_exp: null,
    title: "Backend Developer & System Architect @ AWSpeak",
    extra: "Top 5 Finalist",
    location: "AWS Cloudhacks",
    date: "May 2025",
    description:
      "Built an AI-powered voice interview platform in 36 hours using AWS Bedrock, Transcribe, and Flask. Delivered full backend + audio pipeline and presented to Amazon engineers. ",
    logo: "/logos/awspeak.jpeg",
  },
  {
    title: "Fullstack Engineer @ Plus1 (Flutter)",
    extra: null,
    active: false,
    is_exp: null,
    location: "LAHacks",
    date: "April 2025",
    description:
      "Created a spontaneous event planning app for students using Flutter and Firebase. Designed cross-platform mobile UI, integrated Firebase Auth, and led project vision.",
    logo: "/logos/plus1.svg",
  },
  {
    title: "Embedded Software Engineer @ AutoFeeder",
    extra: null,
    location: "BitHacks",
    date: "April 2025",
    active: false,
    is_exp: null,
    description:
      "Prototyped an automatic pet feeder using ESP-32 with C/C++, integrating real-time hardware control and a simple UI for timed feeding under tight constraints.",
    logo: "/logos/bithacks.png",
  },
];
