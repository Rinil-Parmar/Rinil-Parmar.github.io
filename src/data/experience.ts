export type Experience = {
  company: string;
  title: string;
  location: string;
  period: string;
  url?: string;
  summary: string;
  stack: string[];
  highlights: string[];
};

// Locked order: TCS -> Onelyk -> Promact. Never reorder.
export const experience: Experience[] = [
  {
    company: "Tata Consultancy Services",
    title: "Assistant System Engineer",
    location: "India",
    period: "Jan 2025 – Jul 2025",
    url: "https://www.tcs.com/",
    summary:
      "Built and shipped production Java Spring Boot microservices for a Fortune 500 enterprise, backed by event-driven pipelines and container-based deployment.",
    stack: [
      "Java",
      "Spring Boot",
      "Apache Kafka",
      "PostgreSQL",
      "MySQL",
      "Docker",
      "Kubernetes",
      "Jenkins",
      "GitHub Actions",
    ],
    highlights: [
      "Designed and delivered production Spring Boot microservices exposing 15+ REST endpoints over datasets of 100K+ records.",
      "Built Apache Kafka event-driven pipelines to decouple services and process state changes asynchronously.",
      "Shipped to production on Docker and Kubernetes, with PostgreSQL and MySQL as the backing stores.",
      "Automated CI/CD with Jenkins and GitHub Actions, cutting deployment effort by roughly 40%.",
    ],
  },
  {
    company: "Onelyk",
    title: "Software Developer, Remote",
    location: "United States",
    period: "May 2024 – Dec 2024",
    url: "https://www.onelyk.com/",
    summary:
      "Developed backend and full-stack features for a US hospitality SaaS platform on AWS, serving a growing base of hotel partners and guest messaging.",
    stack: [
      "Node.js",
      "Express.js",
      "AWS",
      "React",
      "TypeScript",
      "WebSockets",
      "Twilio",
      "Redux Toolkit",
    ],
    highlights: [
      "Architected Node.js/Express backend services on AWS supporting 100+ hotel partners.",
      "Developed real-time guest messaging with WebSockets across 500K+ guest interactions at a 95% response rate.",
      "Integrated Twilio SMS notification pipelines for automated guest and partner communication.",
      "Delivered 10+ analytics dashboards with a React/TypeScript frontend and Redux Toolkit state.",
    ],
  },
  {
    company: "Promact Infotech",
    title: "Software Engineer Intern",
    location: "India",
    period: "Jan 2024 – Apr 2024",
    url: "https://promactinfo.com/",
    summary:
      "Built full-stack features on a React and ASP.NET (C#) stack with OAuth2 role-based access control and Python automation.",
    stack: ["React", "ASP.NET (C#)", "PostgreSQL", "Auth0", "Python"],
    highlights: [
      "Implemented a React and ASP.NET (C#) application over PostgreSQL managing 10K+ customer records.",
      "Established OAuth2 role-based access control with Auth0 and Microsoft Identity.",
      "Automated manual workflows with Python, reducing repetitive effort by roughly 60%.",
    ],
  },
];
