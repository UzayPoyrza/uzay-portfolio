export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["Python", "Swift", "C", "C++", "Java", "JavaScript", "TypeScript", "SQL", "HTML", "CSS"],
  },
  {
    title: "Frameworks",
    skills: ["React", "Next.js", "Flask", "Node.js", "Tailwind CSS", "Firebase"],
  },
  {
    title: "Tools",
    skills: ["Git", "Jira", "Linux", "Arduino", "Figma", "Vercel", "Cursor"],
  },
];
