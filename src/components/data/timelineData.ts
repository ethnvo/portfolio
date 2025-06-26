export type timeline = {
  title: string;
  extra: string | null;
  location: string;
  date: string;
  description: string;
  logo: string;
  in_dev: boolean;
  is_exp: string | null;
};

export const timelineData: timeline[] = [
  {
    title: "Software Engineer Intern @ koderAI",
    in_dev: true,
    extra: null,
    location: "Irvine, CA",
    date: "June 2025 - Sept 2025",
    description: "TBD",
    logo: "/logos/koderAI.png",
    is_exp: "https://koder.com/",
  },

  {
    title: "Co-Founder & Fullstack Lead @ Plus1 (React Native)",
    in_dev: true,
    extra: null,
    location: "Irvine, CA",
    date: "June 2025",
    description:
      "Actively leading the rebuild of Plus1 - a spontaneous event planning app for students - using React Native. Managing development, product vision, and a refreshed team structure to bring it to launch.",
    is_exp: null,
    logo: "/logos/neoplus1.svg",
  },
  {
    title: "Fullstack Developer & System Architect @ auther.",
    extra: "🏆 Best Female Empowerment",
    in_dev: false,
    is_exp: null,
    location: "VenusHacks",
    date: "May 2025",
    description:
      "Earned 1st Place for building a socially impactful platform promoting women-led academia. Recognized by UCI’s Department of Computer Science for addressing gender bias through verified research metadata.",
    logo: "/logos/auther500.png",
  },
  {
    in_dev: false,
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
    in_dev: false,
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
    in_dev: false,
    is_exp: null,
    description:
      "Prototyped an automatic pet feeder using ESP-32 with C/C++, integrating real-time hardware control and a simple UI for timed feeding under tight constraints.",
    logo: "/logos/bithacks.png",
  },
];
