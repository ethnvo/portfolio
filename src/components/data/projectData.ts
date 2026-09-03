import {
  BiLogoReact,
  BiLogoTypescript,
  BiLogoDjango,
  BiLogoFlask,
  BiLogoAws,
  BiLogoPython,
  BiLogoTailwindCss,
  BiLogoFlutter,
  BiLogoFirebase,
  BiLogoCPlusPlus,
} from "react-icons/bi";
import { IconType } from "react-icons";

import NextJsIcon from "../icons/NextjsIcon"; // adjust path as needed
import DartIcon from "../icons/DartIcon";

const REACTCOLOR = "#0081A3";
const TYPESCRIPTCOLOR = "#3178c6";
const DJANGOCOLOR = "#092E20";
const PYTHONCOLOR = "#ffde57";
const TAILWINDCOLOR = "#35bef8";
const AWSCOLOR = "#FF9900";
const FLUTTERCOLOR = "#5FC8F8";
const DARTCOLOR = "#2CB7F6";
const FIREBASECOLOR = "#FF9100";
const CPPCOLOR = "#00599C";
const ESPCOLOR = "#E7352C";

export type Project = {
  title: string;
  logo: string;
  link: string;
  description: string;
  event?: string; // hackathon + year
  award?: string; // placement, if any
  technologies?: string[]; // optional for now
  colors: (string | null)[];
  techlogos?: (IconType | null)[]; // optional too
};

export const projects: Project[] = [
  {
    title: "auther.",
    logo: "/logos/auther500.png",
    link: "https://devpost.com/software/auther",
    event: "VenusHacks 2025",
    award: "🏆 1st · Best Female Empowerment",
    colors: [
      REACTCOLOR,
      null,
      TYPESCRIPTCOLOR,
      DJANGOCOLOR,
      PYTHONCOLOR,
      TAILWINDCOLOR,
    ],
    technologies: [
      "React",
      "Next.js",
      "Typescript",
      "Django",
      "Python",
      "TailwindCSS",
    ],
    techlogos: [
      BiLogoReact,
      NextJsIcon,
      BiLogoTypescript,
      BiLogoDjango,
      BiLogoPython,
      BiLogoTailwindCss,
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
    colors: [
      REACTCOLOR,
      null,
      TYPESCRIPTCOLOR,
      null,
      AWSCOLOR,
      PYTHONCOLOR,
      TAILWINDCOLOR,
    ],
    technologies: [
      "React",
      "Next.js",
      "Typescript",
      "Flask",
      "Amazon Web Services",
      "Python",
      "TailwindCSS",
    ],
    techlogos: [
      BiLogoReact,
      NextJsIcon,
      BiLogoTypescript,
      BiLogoFlask,
      BiLogoAws,
      BiLogoPython,
      BiLogoTailwindCss,
    ],
    description:
      "AI-powered mock interviews modeled on Amazon's leadership principles. Voice-driven sessions tailored to a job description, with detailed feedback and downloadable transcripts.",
  },
  {
    title: "Plus1 (Flutter MVP)",
    logo: "/logos/plus1.svg",
    link: "https://devpost.com/software/plus1-ypledt",
    event: "LAHacks 2025",
    colors: [FLUTTERCOLOR, DARTCOLOR, FIREBASECOLOR],
    technologies: ["Flutter", "Dart", "Google Firebase"],
    techlogos: [BiLogoFlutter, DartIcon, BiLogoFirebase],
    description:
      "The original LAHacks MVP: students find or create real-time meetups like study sessions or lunch hangouts. Low-commitment, low-friction, instant connection.",
  },
  {
    title: "AutoFeeder",
    logo: "/logos/bithacks.png",
    link: "",
    event: "BitHacks 2025",
    colors: [ESPCOLOR, CPPCOLOR],
    technologies: ["ESP-32", "C/C++"],
    techlogos: [null, BiLogoCPlusPlus],
    description:
      "An automatic pet feeder prototyped on ESP-32 (C/C++) with real-time hardware control and a simple timed-feeding UI, built under tight hackathon constraints.",
  },
];
