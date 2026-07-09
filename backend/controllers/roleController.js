import JobRole from "../models/JobRole.js";

// Saare roles fetch karo
export const getRoles = async (req, res) => {
  try {
    const roles = await JobRole.find({});
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Roles seed karo database mein
export const seedRoles = async (req, res) => {
  const rolesData = [
    {
      title: "Full Stack Developer",
      icon: "💻",
      companies: ["Google", "Microsoft", "Amazon"],
      requiredSkills: [
        "JavaScript",
        "React",
        "Node.js",
        "Python",
        "SQL",
        "MongoDB",
        "AWS",
        "Docker",
        "Git",
      ],
    },
    {
      title: "Frontend Developer",
      icon: "🎨",
      companies: ["Google", "Meta", "Netflix"],
      requiredSkills: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "TypeScript",
        "Tailwind",
        "Git",
      ],
    },
    {
      title: "Backend Developer",
      icon: "⚙️",
      companies: ["Amazon", "Microsoft", "Uber"],
      requiredSkills: [
        "Node.js",
        "Python",
        "SQL",
        "MongoDB",
        "REST API",
        "Docker",
        "AWS",
      ],
    },
    {
      title: "DevOps Engineer",
      icon: "🔧",
      companies: ["IBM", "Oracle", "Salesforce"],
      requiredSkills: [
        "Linux",
        "Docker",
        "Kubernetes",
        "AWS",
        "CI/CD",
        "Terraform",
        "Ansible",
      ],
    },
    {
      title: "Data Scientist",
      icon: "📊",
      companies: ["Meta", "Netflix", "Spotify"],
      requiredSkills: [
        "Python",
        "Machine Learning",
        "TensorFlow",
        "Pandas",
        "SQL",
        "Statistics",
      ],
    },
    {
      title: "Cyber Security Analyst",
      icon: "🛡️",
      companies: ["IBM", "Cisco", "Microsoft"],
      requiredSkills: [
        "Networking",
        "Linux",
        "Python",
        "Ethical Hacking",
        "Firewalls",
      ],
    },
    {
      title: "Cloud Architect",
      icon: "☁️",
      companies: ["AWS", "Google Cloud", "Azure"],
      requiredSkills: [
        "AWS",
        "Azure",
        "Docker",
        "Kubernetes",
        "Terraform",
        "Networking",
      ],
    },
    {
      title: "Mobile App Developer",
      icon: "📱",
      companies: ["Apple", "Google", "Samsung"],
      requiredSkills: [
        "React Native",
        "Flutter",
        "Swift",
        "Kotlin",
        "Firebase",
      ],
    },
    {
      title: "AI/ML Engineer",
      icon: "🤖",
      companies: ["OpenAI", "Google", "Meta"],
      requiredSkills: [
        "Python",
        "TensorFlow",
        "PyTorch",
        "Deep Learning",
        "NLP",
        "Mathematics",
      ],
    },
    {
      title: "Software Tester (QA)",
      icon: "🐞",
      companies: ["TCS", "Infosys", "Wipro"],
      requiredSkills: ["Manual Testing", "Selenium", "Postman", "JIRA", "SQL"],
    },
  ];

  try {
    await JobRole.deleteMany({});
    await JobRole.insertMany(rolesData);
    res.json({ message: "Roles seeded successfully! ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
