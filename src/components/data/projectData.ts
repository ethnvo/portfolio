import {
  BiLogoReact,
  BiLogoTypescript,
  BiLogoDjango,
  BiLogoJavascript,
  BiLogoFlask,
  BiLogoAws,
  BiLogoPython,
  BiLogoTailwindCss,
} from "react-icons/bi";
import { IconType } from "react-icons";

export type Project = {
  title: string;
  logo: string;
  description: string;
  technologies?: string[]; // optional for now
  techlogos?: (IconType | null)[]; // optional too
};

export const projects: Project[] = [
  {
    title: "auther.",
    logo: "/logos/auther500.png",

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
      null,
      BiLogoTypescript,
      BiLogoDjango,
      BiLogoPython,
      BiLogoTailwindCss,
    ],
    description: "test1",
  },
  {
    title: "AWSpeak.",
    logo: "/logos/awspeak.jpeg",

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
      null,
      BiLogoTypescript,
      BiLogoFlask,
      BiLogoAws,
      BiLogoPython,
      BiLogoTailwindCss,
    ],
    description: "test1",
  },
];
