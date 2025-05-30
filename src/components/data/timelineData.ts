export type timeline = {
  title: string;
  extra: string | null;
  location: string;
  date: string;
  description: string;
  logo: string;
};

export const timelineData: timeline[] = [
  {
    title: "Fullstack Developer & System Architect @ auther.",
    extra: "1st Place 🏆 - Best Female Empowerment",
    location: "VenusHacks",
    date: "May 2025",
    description:
      "Earned 1st Place for building a socially impactful platform promoting women-led academia. Recognized by UCI’s Department of Computer Science for addressing gender bias through verified research metadata.",
    logo: "/logos/auther500.png",
  },
  {
    title: "Backend Developer & System Architect @ AWSpeak",
    extra: "Top 5 Finalist",
    location: "AWS Cloudhacks",
    date: "May 2025",
    description:
      "Built an AI-powered voice interview platform in 36 hours using AWS Bedrock, Transcribe, and Flask. Delivered full backend + audio pipeline and presented to Amazon engineers. ",
    logo: "/logos/awspeak.jpeg",
  },
  {
    title: "Fullstack Engineer @ Plus1",
    extra: "",
    location: "LAHacks",
    date: "April 2025",
    description:
      "Created a spontaneous event planning app for students using Flutter and Firebase. Designed cross-platform mobile UI, integrated Firebase Auth, and led project vision.",
    logo: "/logos/plus1.png",
  },
  {
    title: "Embedded Software Engineer",
    extra: "",
    location: "BitHacks",
    date: "April 2025",
    description:
      "Developed a real-time embedded systems app using ESP-32, C, and C++. Focused on hardware integration and UI visualization under tight time constraints.",
    logo: "/logos/bithacks.png",
  },
  {
    title: "Software Engineering Fellow",
    extra: "",
    location: "Headstarter AI - Remote",
    date: "June 2024 – September 2024",
    description:
      "Developed full-stack AI applications (React, Next.js, OpenAI APIs), shipped weekly features in agile teams, and gained expertise in scalable AI system design.",
    logo: "/logos/headstarter.jpeg",
  },
];
