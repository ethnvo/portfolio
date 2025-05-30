import { BiLogoReact, BiLogoTypescript, BiLogoDjango } from "react-icons/bi";
import { IconType } from "react-icons";

export type Project = {
  title: string;
  logo: string;
  description: string;
  technologies?: string[]; // optional for now
  techlogos?: (IconType | null)[]; // optional too
};

export const projects = [
  {
    title: "auther.",
    logo: "/logos/auther500.png",

    technologies: ["React", "Next.js", "Typescript"],
    techlogos: [BiLogoReact, null, BiLogoTypescript],
    description: "test1",
  },
  {
    title: "AWSpeak.",
    logo: "/logos/awspeak.jpeg",

    technologies: ["React", "Next.js", "Typescript"],
    techlogos: [BiLogoReact, null, BiLogoTypescript],
    description: "test1",
  },
];
