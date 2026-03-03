export interface TimelineEntry {
  type: "work" | "education";
  title: string;
  organization: string;
  period: string;
  description: string;
  highlight?: string;
}

export const timeline: TimelineEntry[] = [
  {
    type: "work",
    title: "Full-Stack Developer Intern",
    organization: "Optimum7",
    period: "2024",
    description:
      "Worked on full-stack development at a digital marketing and e-commerce agency. Integrated BigCommerce & Shopify APIs into dynamic platforms.",
  },
  {
    type: "work",
    title: "Software Engineering Intern",
    organization: "CsTech",
    period: "2023",
    description:
      "Built a C++ tool that optimized language translations at a software company in the Defense Industry.",
  },
  {
    type: "education",
    title: "B.A. Computer Science",
    organization: "Skidmore College",
    period: "2021 – 2025",
    description: "Computer Science graduate with a focus on AI and software engineering.",
    highlight: "Davis-UWC Scholar",
  },
  {
    type: "education",
    title: "International Baccalaureate",
    organization: "UWC ISAK Japan",
    period: "2019 – 2021",
    description:
      "Studied at a United World College in Karuizawa, Japan. Immersed in a culture of innovation and global perspectives.",
  },
];
