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

export type Project = {
  title: string;
  logo: string;
  link: string;
  description: string;
  technologies?: string[]; // optional for now
  colors: (string | null)[];
  techlogos?: (IconType | null)[]; // optional too
};

export const projects: Project[] = [
  {
    title: "auther.",
    logo: "/logos/auther500.png",
    link: "https://devpost.com/software/auther",
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
      "Putting women-led research front and center, auther. aims to provide users access to verified female authors through an intuitive platform that amplifies voices that are often overlooked.",
  },
  {
    title: "AWSpeak",
    logo: "/logos/awspeak.jpeg",
    link: "https://devpost.com/software/awspeak",
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
      "AWSpeak is a web application that delivers hyper-realistic mock interviews using advanced AI models, tailored to reflect Amazon’s leadership principles. Users experience voice-driven, dynamic interviews where they respond to behavioral questions based on a specific job description. After the session, they receive detailed, AI-generated feedback that highlights strengths, weaknesses, and actionable tips - complete with a downloadable transcript.",
  },
  {
    title: "Plus1",
    logo: "/logos/plus1.svg",
    link: "https://devpost.com/software/plus1-ypledt",
    colors: [FLUTTERCOLOR, DARTCOLOR, FIREBASECOLOR],
    technologies: ["Flutter", "Dart", "Google Firebase"],
    techlogos: [BiLogoFlutter, DartIcon, BiLogoFirebase],
    description:
      "Plus1 lets students casually find or create real-time meetups like study sessions or lunch hangouts. Designed for low-commitment, instant connection with minimal UI friction. We focused on speed, simplicity, and real-time updates - making social planning feel natural, not overwhelming.",
  },
];
