export type Project = {
  title: string;
  logo: string;
  link: string; // write-up to open; leave empty when there is none
  description: string;
  event?: string; // where it was built + year
  award?: string; // placement, if any
  technologies: string[];
};

export const projects: Project[] = [
  {
    title: "auther.",
    logo: "/logos/auther500.png",
    link: "https://devpost.com/software/auther",
    event: "VenusHacks 2025",
    award: "🏆 1st · Best Female Empowerment",
    technologies: [
      "React",
      "Next.js",
      "Typescript",
      "Django",
      "Python",
      "TailwindCSS",
    ],
    description:
      "Puts women-led research front and center with an intuitive platform surfacing verified female authors and amplifying often-overlooked voices.",
  },
  {
    title: "AWSpeak",
    logo: "/logos/awspeak.jpeg",
    link: "https://devpost.com/software/awspeak",
    event: "AWS CloudHacks 2025",
    award: "Top 5 Finalist",
    technologies: [
      "React",
      "Next.js",
      "Typescript",
      "Flask",
      "Amazon Web Services",
      "Python",
      "TailwindCSS",
    ],
    description:
      "AI-powered mock interviews modeled on Amazon's leadership principles. Voice-driven sessions tailored to a job description, with detailed feedback and downloadable transcripts.",
  },
  {
    title: "Plus1 (Flutter MVP)",
    logo: "/logos/plus1.svg",
    link: "https://devpost.com/software/plus1-ypledt",
    event: "LAHacks 2025",
    technologies: ["Flutter", "Dart", "Google Firebase"],
    description:
      "The original LAHacks MVP: students find or create real-time meetups like study sessions or lunch hangouts. Low-commitment, low-friction, instant connection.",
  },
  {
    title: "AutoFeeder",
    logo: "/logos/bithacks.png",
    link: "",
    event: "BitHacks 2025",
    technologies: ["ESP-32", "C/C++"],
    description:
      "An automatic pet feeder prototyped on ESP-32 (C/C++) with real-time hardware control and a simple timed-feeding UI, built under tight hackathon constraints.",
  },
];
