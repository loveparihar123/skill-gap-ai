import mongoose from "mongoose";
import dotenv from "dotenv";
import JobRole from "../models/JobRole.js";

dotenv.config();

const rolesData = [
  {
    title: "Full Stack Developer",
    icon: "💻",
    requiredSkills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "SQL",
      "REST APIs",
      "Git",
      "Problem Solving",
    ],
    niceToHaveSkills: ["TypeScript", "Redis", "Docker", "AWS"],
    description:
      "Develops both client-side and server-side of web applications",
    experienceLevel: "Junior",
  },
  {
    title: "Frontend Developer",
    icon: "🎨",
    requiredSkills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React.js",
      "Redux",
      "Tailwind CSS",
      "Git",
      "Responsive Design",
      "REST API Integration",
    ],
    niceToHaveSkills: ["TypeScript", "Next.js", "Figma", "Testing"],
    description: "Builds user interfaces and web experiences",
    experienceLevel: "Fresher",
  },
  {
    title: "Software Engineer",
    icon: "👨‍💻",
    requiredSkills: [
      "Data Structures",
      "Algorithms",
      "Object Oriented Programming",
      "Java",
      "Python",
      "C++",
      "REST APIs",
      "SQL",
      "Git",
      "Operating Systems",
      "Computer Networks",
      "DBMS",
      "Problem Solving",
      "Logical Thinking",
      "Debugging",
      "Software Development",
      "Testing",
    ],
    niceToHaveSkills: [
      "System Design",
      "Distributed Systems",
      "Scalability",
      "Linux",
      "Unix",
      "Cloud Basics",
      "Docker Basics",
      "Machine Learning",
      "Agile Methodology",
    ],
    description:
      "Designs, develops, tests and maintains scalable software systems",
    experienceLevel: "Fresher",
  },
  {
    title: "Backend Developer",
    icon: "⚙️",
    requiredSkills: [
      "Node.js",
      "Express.js",
      "Python",
      "MongoDB",
      "PostgreSQL",
      "REST APIs",
      "Authentication",
      "Git",
      "Linux basics",
    ],
    niceToHaveSkills: ["Docker", "AWS", "Redis", "GraphQL"],
    description: "Builds server side logic, APIs and databases",
    experienceLevel: "Junior",
  },
  {
    title: "DevOps Engineer",
    icon: "🔧",
    requiredSkills: [
      "Linux",
      "Docker",
      "Kubernetes",
      "AWS",
      "CI/CD",
      "Git",
      "Bash Scripting",
      "Networking basics",
      "Terraform",
    ],
    niceToHaveSkills: ["Ansible", "Prometheus", "Grafana"],
    description: "Manages infrastructure, deployments and CI/CD pipelines",
    experienceLevel: "Junior",
  },
  {
    title: "Data Scientist",
    icon: "📊",
    requiredSkills: [
      "Python",
      "Pandas",
      "NumPy",
      "Machine Learning",
      "Statistics",
      "Data Visualization",
      "SQL",
      "Scikit-learn",
      "Jupyter Notebook",
    ],
    niceToHaveSkills: ["TensorFlow", "Deep Learning", "Spark", "Tableau"],
    description: "Analyzes data to help businesses make better decisions",
    experienceLevel: "Junior",
  },
  {
    title: "Cyber Security Analyst",
    icon: "🛡️",
    requiredSkills: [
      "Networking",
      "Linux",
      "Python",
      "Ethical Hacking",
      "Firewalls",
      "OWASP",
      "Penetration Testing",
      "Security Auditing",
    ],
    niceToHaveSkills: ["CEH Certification", "CISSP", "Kali Linux"],
    description: "Protects systems and networks from cyber threats",
    experienceLevel: "Junior",
  },
  {
    title: "AI/ML Engineer",
    icon: "🤖",
    requiredSkills: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "Deep Learning",
      "NLP",
      "Mathematics",
      "Statistics",
      "Data Preprocessing",
      "Model Deployment",
    ],
    niceToHaveSkills: ["Hugging Face", "LangChain", "MLOps", "OpenCV"],
    description: "Builds and deploys AI and machine learning models",
    experienceLevel: "Junior",
  },
];

const seedRoles = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");

    await JobRole.deleteMany({});
    console.log("Old roles deleted ✅");

    const inserted = await JobRole.insertMany(rolesData);
    console.log(`${inserted.length} roles inserted ✅`);

    inserted.forEach((role) => {
      console.log(`${role.icon} ${role.title} — ID: ${role._id}`);
    });

    console.log("\nRoles seeded successfully! 🎉");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding roles ❌:", err.message);
    process.exit(1);
  }
};

seedRoles();
