export type timeline = {
  title: string;
  extra: string | null;
  location: string;
  date: string;
  description: string;
  logo: string;
  in_dev: boolean;
};

export const timelineData: timeline[] = [
  {
    title: "Co-Founder & Fullstack Lead @ Plus1 (React Native)",
    in_dev: true,
    extra: "",
    location: "Irvine, CA",
    date: "June 2025",
    description:
      "Actively leading the rebuild of Plus1 - a spontaneous event planning app for students - using React Native. Managing development, product vision, and a refreshed team structure to bring it to launch.",

    logo: "/logos/neoplus1.svg",
  },
  {
    title: "Fullstack Developer & System Architect @ auther.",
    extra: "1st Place 🏆 - Best Female Empowerment",
    in_dev: false,

    location: "VenusHacks",
    date: "May 2025",
    description:
      "Earned 1st Place for building a socially impactful platform promoting women-led academia. Recognized by UCI’s Department of Computer Science for addressing gender bias through verified research metadata.",
    logo: "/logos/auther500.png",
  },
  {
    in_dev: false,

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
    extra: "",
    in_dev: false,

    location: "LAHacks",
    date: "April 2025",
    description:
      "Created a spontaneous event planning app for students using Flutter and Firebase. Designed cross-platform mobile UI, integrated Firebase Auth, and led project vision.",
    logo: "/logos/plus1.svg",
  },
  {
    title: "Embedded Software Engineer @ BitHacks",
    extra: "",
    location: "BitHacks",
    date: "April 2025",
    in_dev: false,

    description:
      "Developed a real-time embedded systems app using ESP-32, C, and C++. Focused on hardware integration and UI visualization under tight time constraints.",
    logo: "/logos/bithacks.png",
  },
  {
    title: "Software Engineering Fellow @ Headstarter",
    extra: "",
    in_dev: false,

    location: "Headstarter AI - Remote",
    date: "June 2024 – September 2024",
    description:
      "Developed full-stack AI applications (React, Next.js, OpenAI APIs), shipped weekly features in agile teams, and gained expertise in scalable AI system design.",
    logo: "/logos/headstarter.jpeg",
  },
];
