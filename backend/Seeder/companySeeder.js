import mongoose from "mongoose";
import dotenv from "dotenv";
import CompanyProfile from "../models/CompanyProfile.js";
import JobRole from "../models/JobRole.js";

dotenv.config();

const seedCompanies = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");

    // Pehle saare roles fetch karo
    const fullStackRole = await JobRole.findOne({
      title: "Full Stack Developer",
    });
    const softwareEngineerRole = await JobRole.findOne({
      title: "Software Engineer",
    });
    const devOpsEngineerRole = await JobRole.findOne({
      title: "DevOps Engineer",
    });
    const cyberSecurityRole = await JobRole.findOne({
      title: "Cyber Security Analyst",
    });
    const dataScientistRole = await JobRole.findOne({
      title: "Data Scientist",
    });

    const backendRole = await JobRole.findOne({ title: "Backend Developer" });
    const frontendRole = await JobRole.findOne({ title: "Frontend Developer" });
    const aiMlRole = await JobRole.findOne({ title: "AI/ML Engineer" });

    // Check karo saare roles mile ya nahi
    if (!devOpsEngineerRole) {
      console.log("❌ Devops Engineer role not found!");
      process.exit(1);
    }

    if (!fullStackRole) {
      console.log("❌ Full Stack Developer role not found!");
      process.exit(1);
    }
    if (!softwareEngineerRole) {
      console.log("❌ Software Engineer role not found!");
      process.exit(1);
    }
    if (!backendRole) {
      console.log("❌ Backend Developer role not found!");
      process.exit(1);
    }
    if (!frontendRole) {
      console.log("❌ Frontend Developer role not found!");
      process.exit(1);
    }
    if (!aiMlRole) {
      console.log("❌ AI/ML Engineer role not found!");
      process.exit(1);
    }

    const companiesData = [
      // ════════════════════════════
      // FULL STACK DEVELOPER
      // ════════════════════════════
      {
        companyName: "Flipkart",
        roleId: fullStackRole._id,
        hiringLevel: "experienced",
        requiredSkills: [
          "JavaScript",
          "React.js",
          "Node.js",
          "REST APIs",
          "SQL",
          "MongoDB",
          "Git",
          "Data Structures",
          "Algorithms",
          "Object Oriented Programming",
          "Problem Solving",
          "Debugging",
          "Software Testing",
          "Agile",
          "Team Collaboration",
        ],
        preferredSkills: [
          "Angular",
          "Spring",
          ".NET",
          "Django",
          "CI/CD",
          "Performance Testing",
          "Docker",
          "Cloud Basics",
        ],
        educationCriteria: {
          allowedDegrees: ["BTech", "BE", "MTech", "MCA"],
          minimumCgpa: 7,
        },
        weightage: {
          skills: 60,
          education: 10,
          projects: 15,
          certifications: 5,
        },
      },
      {
        companyName: "Datagaps",
        roleId: devOpsEngineerRole._id,
        hiringLevel: "fresher",

        requiredSkills: [
          "Linux",
          "Linux Fundamentals",

          "CI/CD",
          "Jenkins",
          "GitHub Actions",
          "GitLab CI",

          "Docker",
          "Dockerfile",

          "Kubernetes",
          "Pods",
          "Deployments",
          "Services",

          "AWS",
          "Azure",

          "Cloud Computing",
          "Cloud Infrastructure",

          "EC2",
          "Virtual Machines",
          "Storage",
          "VPC",
          "Networking Fundamentals",

          "Git",
          "Version Control",
          "Branching",
          "Merge Strategies",

          "Bash",
          "Shell Scripting",

          "Application Deployment",
          "Production Support",

          "Troubleshooting",
          "Deployment Troubleshooting",

          "Container Management",

          "Automation",
          "Scalability",
          "Reliability",

          "Documentation",
          "Runbooks",
          "SOP Documentation",

          "Cross Functional Collaboration",
          "Team Collaboration",

          "Problem Solving",
          "Analytical Thinking",
        ],

        preferredSkills: [
          "Python",

          "Minikube",
          "Amazon EKS",
          "Azure Kubernetes Service",

          "Terraform",
          "Infrastructure as Code",
          "ARM Templates",

          "Maven",
          "Apache Tomcat",

          "Prometheus",
          "Grafana",
          "Amazon CloudWatch",

          "AWS Cloud Practitioner",
          "AWS Solutions Architect Associate",
          "Azure Fundamentals",
          "CKA",
          "CKAD",
        ],

        educationCriteria: {
          allowedDegrees: [
            "BTech",
            "BE",
            "BCA",
            "MCA",
            "BSc",
            "MSc",
            "Any Graduate",
          ],
          minimumCgpa: 0,
        },

        weightage: {
          skills: 60,
          education: 10,
          projects: 20,
          certifications: 10,
        },
      },
      {
        companyName: "Webmobril Technologies",
        roleId: devOpsEngineerRole._id,
        hiringLevel: "experienced",

        requiredSkills: [
          "DevOps",
          "Git",
          "GitLab",
          "CI/CD",

          "IBM WebSphere",
          "WebSphere Administration",

          "System Administration",
          "Site Reliability",

          "Environment Support",
          "Server Administration",

          "Code Deployment",
          "Configuration Management",

          "Log Analysis",
          "Troubleshooting",

          "Infrastructure Monitoring",
          "Application Monitoring",

          "AWS",
          "Cloud Environment",

          "Problem Solving",
          "Communication Skills",
          "Team Collaboration",
        ],

        preferredSkills: [
          "Site Reliability Engineering",
          "Production Support",
          "Deployment Automation",
          "Monitoring Tools",
          "Infrastructure Stability",
          "Server Management",
          "Performance Monitoring",
        ],

        educationCriteria: {
          allowedDegrees: ["BTech", "BE", "BCA", "MCA", "BSc", "MSc"],
          minimumCgpa: 0,
        },

        weightage: {
          skills: 60,
          education: 10,
          projects: 20,
          certifications: 10,
        },
      },
      {
        companyName: "Attentive.ai",
        roleId: devOpsEngineerRole._id,
        hiringLevel: "experienced",

        requiredSkills: [
          "DevOps",
          "Cloud Engineering",
          "Platform Engineering",

          "AWS",
          "GCP",
          "VPC",
          "Load Balancing",
          "DNS",
          "IAM",
          "Cloud Security",
          "Multi Region Architecture",

          "CI/CD",
          "Jenkins",
          "GitHub Actions",
          "ArgoCD",
          "Deployment Strategy",
          "Rollback Strategy",

          "Docker",
          "Kubernetes",
          "GKE",
          "EKS",
          "Helm",
          "Kustomize",
          "Service Mesh",
          "Istio",
          "Linkerd",
          "Container Orchestration",

          "Terraform",
          "Infrastructure as Code",
          "Ansible",
          "Configuration Management",

          "Python",
          "Groovy",
          "Bash",
          "Automation",
          "Scripting",

          "Linux",
          "Networking Fundamentals",
          "Distributed Systems",

          "Prometheus",
          "Grafana",
          "ELK",
          "OpenSearch",
          "New Relic",
          "Monitoring",
          "Alerting",
          "Logging",
          "Tracing",
          "Observability",

          "DevSecOps",
          "Vulnerability Management",
          "Shift Left Security",

          "GitHub",
          "GitLab",
          "Jira",
          "Confluence",
          "Artifact Registry",
          "Secret Management",
          "Vault",
          "GCP Secret Manager",

          "Scalability",
          "High Availability",
          "Infrastructure Architecture",
          "Cloud Native Architecture",

          "Problem Solving",
          "Technical Documentation",
          "Cross Functional Collaboration",
          "Team Collaboration",
        ],

        preferredSkills: [
          "Cloud Functions",
          "Cloud Run",
          "Serverless Architecture",

          "MLOps",
          "Vertex AI",
          "Kubeflow",
          "MLflow",
          "Model Monitoring",

          "GitOps",
          "Flux",

          "OpenAI",
          "Claude",
          "Gemini",

          "Multi Cloud Architecture",
          "Hybrid Cloud",

          "AWS Certified Solutions Architect",
          "GCP Professional Cloud Architect",
          "CKA",
          "CKAD",
          "Terraform Associate",
        ],

        educationCriteria: {
          allowedDegrees: ["BTech", "BE", "MTech", "MCA", "BCA", "BSc", "MSc"],
          minimumCgpa: 0,
        },

        weightage: {
          skills: 65,
          education: 10,
          projects: 20,
          certifications: 10,
        },
      },
      {
        companyName: "AppSquadz Software Pvt. Ltd.",
        roleId: devOpsEngineerRole._id,
        hiringLevel: "experienced",

        requiredSkills: [
          "AWS",
          "EC2",
          "S3",
          "RDS",
          "AWS Lambda",
          "CloudWatch",
          "Serverless",

          "CI/CD",
          "Deployment Process",

          "Git",

          "Docker",
          "Linux",
          "Linux Administration",

          "IAM",
          "Cloud Infrastructure",
          "Infrastructure Monitoring",

          "Security Best Practices",

          "Problem Solving",
          "Documentation",
          "Team Collaboration",
        ],

        preferredSkills: [
          "Kubernetes",
          "Cloud Cost Optimization",
          "DevOps Fundamentals",
          "Infrastructure Support",
          "AWS Monitoring",
          "Cloud Operations",
        ],

        educationCriteria: {
          allowedDegrees: ["BTech", "BE", "BCA", "MCA", "BSc", "MSc"],
          minimumCgpa: 0,
        },

        weightage: {
          skills: 60,
          education: 10,
          projects: 20,
          certifications: 10,
        },
      },
      {
        companyName: "Forbes Advisor",
        roleId: fullStackRole._id,
        hiringLevel: "experienced",
        requiredSkills: [
          "JavaScript",
          "ES6",
          "Asynchronous Programming",
          "Closures",
          "Prototypal Inheritance",
          "React.js",
          "Vue.js",
          "HTML5",
          "CSS3",
          "SASS",
          "LESS",
          "Responsive Design",
          "Adaptive Design",
          "Webpack",
          "Babel",
          "npm",
          "yarn",
          "Node.js",
          "Express.js",
          "Koa",
          "NestJS",
          "REST APIs",
          "GraphQL",
          "MongoDB",
          "Redis",
          "MySQL",
          "PostgreSQL",
          "Database Schema Design",
          "Database Optimization",
          "Serverless",
          "AWS Lambda",
          "Cloud Functions",
          "Docker",
          "Kubernetes",
          "CI/CD",
          "Jenkins",
          "GitHub Actions",
          "GitLab CI",
          "AWS",
          "Azure",
          "Google Cloud Platform",
          "Jest",
          "Vitest",
          "Cypress",
          "Storybook",
          "Test Driven Development",
          "Git",
          "GitHub",
          "GitLab",
          "Bitbucket",
          "Chrome DevTools",
          "Node.js Debugger",
          "Debugging",
          "OWASP",
          "OAuth",
          "JWT",
          "Authentication",
          "Authorization",
          "System Security",
          "Scalability",
          "Performance Optimization",
          "System Architecture",
          "Problem Solving",
          "Code Review",
          "Agile",
          "Scrum",
          "Kanban",
          "Cross Functional Collaboration",
          "Technical Communication",
          "Leadership",
          "Mentorship",
          "Team Collaboration",
        ],
        preferredSkills: [
          "ElasticSearch",
          "Caching",
          "Microservices",
          "Continuous Integration",
          "Continuous Deployment",
          "Marketing Collaboration",
          "Product Collaboration",
          "User Experience Collaboration",
          "Technical Documentation",
          "Feature Development",
          "System Design",
          "Cloud Deployment",
          "Software Architecture",
          "Performance Tuning",
        ],
        educationCriteria: {
          allowedDegrees: ["BTech", "BE", "MTech", "MCA", "BCA", "MSc"],
          minimumCgpa: 0,
        },
        weightage: {
          skills: 65,
          education: 10,
          projects: 20,
          certifications: 10,
        },
      },
      {
        companyName: "Ample Softech",
        roleId: fullStackRole._id,
        hiringLevel: "experienced",
        requiredSkills: [
          "Python",
          "JavaScript",
          "TypeScript",
          "SQL",
          "React.js",
          "Responsive Design",
          "Node.js",
          "FastAPI",
          "REST APIs",
          "Microservices",
          "RDBMS",
          "NoSQL",
          "Data Structures",
          "Algorithms",
          "Secure Coding",
          "Debugging",
          "Problem Solving",
          "Team Collaboration",
        ],
        preferredSkills: [
          "AWS",
          "Azure",
          "GCP",
          "Jest",
          "Mocha",
          "PyTest",
          "Agile Methodology",
          "Cloud Deployment",
          "DevOps Basics",
          "Communication Skills",
        ],
        educationCriteria: {
          allowedDegrees: ["BTech", "BE", "MTech", "MCA"],
          minimumCgpa: 0,
        },
        weightage: {
          skills: 60,
          education: 10,
          projects: 20,
          certifications: 10,
        },
      },

      // ════════════════════════════
      // SOFTWARE ENGINEER
      // ════════════════════════════
      {
        companyName: "Google",
        roleId: softwareEngineerRole._id,
        hiringLevel: "fresher",
        requiredSkills: [
          "Java",
          "Python",
          "C++",
          "Data Structures",
          "Algorithms",
          "Object Oriented Programming",
          "Linux",
          "Unix",
          "Operating Systems",
          "Computer Networks",
          "DBMS",
          "Distributed Systems",
          "REST APIs",
          "Software Development",
          "Testing",
          "Problem Solving",
          "Logical Thinking",
          "Debugging",
        ],
        preferredSkills: [
          "System Design",
          "Scalability",
          "Machine Learning",
          "Artificial Intelligence",
          "Natural Language Processing",
          "Android Development",
          "Cloud Basics",
          "Security",
          "Large Scale Systems",
          "Communication Skills",
          "Agile Methodology",
        ],
        educationCriteria: {
          allowedDegrees: [
            "BTech",
            "BE",
            "MTech",
            "MCA",
            "Computer Science",
            "Computer Engineering",
            "Information Technology",
          ],
          minimumCgpa: 7,
        },
        weightage: {
          skills: 60,
          education: 10,
          projects: 20,
          certifications: 10,
        },
      },

      // ════════════════════════════
      // BACKEND DEVELOPER
      // ════════════════════════════
      {
        companyName: "MakeMyTrip",
        roleId: backendRole._id,
        hiringLevel: "Junior",
        requiredSkills: [
          "Java",
          "Python",
          "Node.js",
          "Spring Boot",
          "REST APIs",
          "Microservices",
          "System Design Basics",
          "MySQL",
          "PostgreSQL",
          "MongoDB",
          "Data Structures",
          "Algorithms",
          "Scalability Concepts",
          "Git",
          "Code Reviews",
          "Debugging",
          "Troubleshooting",
          "Backend Optimization",
        ],
        preferredSkills: [
          "Distributed Systems",
          "Low Latency Systems",
          "Redis",
          "Kafka Basics",
          "Cloud Basics",
          "CI/CD Pipelines",
          "Agile Development",
        ],
        educationCriteria: {
          allowedDegrees: ["BTech", "BE", "MTech", "MCA"],
          minimumCgpa: 0,
        },
        weightage: {
          skills: 70,
          education: 10,
          projects: 15,
          certifications: 5,
        },
      },
      {
        companyName: "Paytm",
        roleId: backendRole._id,
        hiringLevel: "Junior",
        requiredSkills: [
          "Java",
          "Python",
          "Ruby",
          "Software Development",
          "System Design Basics",
          "REST APIs",
          "Backend Architecture",
          "Data Structures",
          "Algorithms",
          "Debugging",
          "Problem Solving",
          "Git",
          "Code Reviews",
          "Testing",
        ],
        preferredSkills: [
          "Scalable Systems",
          "Distributed Systems Basics",
          "Microservices",
          "Cloud Platforms",
          "CI/CD Basics",
          "Performance Optimization",
          "Agile Development",
        ],
        educationCriteria: {
          allowedDegrees: ["BTech", "BE", "MTech", "MCA"],
          minimumCgpa: 0,
        },
        weightage: {
          skills: 70,
          education: 10,
          projects: 15,
          certifications: 5,
        },
      },
      {
        companyName: "Deloitte",
        roleId: backendRole._id,
        hiringLevel: "fresher",
        requiredSkills: [
          "Java",
          "Spring Boot",
          "Spring Framework",
          "REST APIs",
          "Microservices",
          "PostgreSQL",
          "ORM",
          "JBoss",
          "Tomcat",
          "Kafka",
          "Distributed Systems",
          "Redis",
          "Data Management",
          "Debugging",
          "Testing",
        ],
        preferredSkills: [
          "Apache Kafka",
          "Middleware",
          "Performance Optimization",
          "System Design",
          "Unit Testing",
          "Integration Testing",
          "Cloud Basics",
          "Agile Methodology",
        ],
        educationCriteria: {
          allowedDegrees: [
            "BTech",
            "BE",
            "MCA",
            "Computer Science",
            "Information Technology",
          ],
          minimumCgpa: 0,
        },
        weightage: {
          skills: 65,
          education: 10,
          projects: 20,
          certifications: 5,
        },
      },

      // ════════════════════════════
      // FRONTEND DEVELOPER
      // ════════════════════════════
      {
        companyName: "Probo",
        roleId: frontendRole._id,
        hiringLevel: "experienced",
        requiredSkills: [
          "React.js",
          "JavaScript",
          "TypeScript",
          "Redux",
          "Context API",
          "HTML5",
          "CSS3",
          "Responsive Design",
          "REST APIs",
          "AJAX",
          "Git",
          "Frontend Architecture",
          "Performance Optimization",
          "Problem Solving",
          "Debugging",
          "Team Collaboration",
        ],
        preferredSkills: [
          "Web Accessibility",
          "Scalable Systems",
          "Real Time Systems",
          "Build Tools",
          "Communication Skills",
          "Agile Methodology",
        ],
        educationCriteria: {
          allowedDegrees: ["BTech", "BE", "MTech", "MCA"],
          minimumCgpa: 0,
        },
        weightage: {
          skills: 65,
          education: 10,
          projects: 20,
          certifications: 5,
        },
      },

      // ════════════════════════════
      // AI/ML ENGINEER
      // ════════════════════════════
      {
        companyName: "Accenture",
        roleId: aiMlRole._id,
        hiringLevel: "experienced",

        requiredSkills: [
          "Artificial Intelligence",
          "Machine Learning",
          "Natural Language Processing",
          "Generative AI",

          "Deep Learning",
          "Neural Networks",

          "Chatbots",
          "Image Processing",

          "Cloud AI Services",
          "Cloud Computing",

          "AI Application Development",
          "Production Grade AI Systems",
          "Application Pipelines",

          "Model Deployment",
          "AI Testing",
          "AI System Optimization",

          "Scalable Systems",

          "Technical Architecture",
          "Solution Design",

          "Cross Functional Collaboration",
          "Stakeholder Management",

          "Problem Solving",
          "Technical Communication",

          "Mentorship",
          "Team Leadership",

          "Requirements Gathering",
          "Technical Specifications",

          "Workflow Optimization",
          "Continuous Improvement",
        ],

        preferredSkills: [
          "On Premise AI Infrastructure",

          "Production Monitoring",

          "Cloud Native AI",

          "Research Oriented Thinking",

          "Innovation Mindset",
        ],

        educationCriteria: {
          allowedDegrees: [
            "PhD",
            "Computer Science",
            "Electrical Engineering",
            "Electronics",
            "Electronics and Communication",
            "Data Science",
            "Artificial Intelligence",
            "Mathematics",
            "Statistics",
          ],
          minimumCgpa: 0,
        },

        weightage: {
          skills: 55,
          education: 20,
          projects: 20,
          certifications: 0,
        },
      },
      {
        companyName: "Optum",
        roleId: aiMlRole._id,
        hiringLevel: "experienced",

        requiredSkills: [
          "Artificial Intelligence",
          "Machine Learning",
          "Data Science",
          "Deep Learning",

          "Python",
          "FastAPI",
          "Flask",

          "AngularJS",

          "Exploratory Data Analysis",
          "Model Development",
          "Model Tuning",
          "Model Drift Analysis",

          "NLP",
          "MLOps",
          "LLMOps",

          "LangChain",
          "LangGraph",
          "Google ADK",
          "OpenAI SDK",

          "AI Agents",
          "Workflow Automation",

          "Kafka",
          "Redis",
          "Event Driven Architecture",
          "Real Time Data Processing",

          "Azure",
          "GCP",
          "Cloud Native Architecture",

          "Docker",
          "Kubernetes",
          "Serverless Architecture",

          "Terraform",
          "GitHub Actions",
          "CI/CD",
          "Infrastructure as Code",

          "GitHub",

          "Microservices Architecture",

          "Unit Testing",
          "Integration Testing",
          "Performance Testing",
          "Automated Testing",

          "System Design",
          "Architecture Design",
          "Technical Documentation",

          "Security",
          "Observability",
          "Scalability",
          "Performance Optimization",

          "Production Support",
          "Incident Response",
          "Root Cause Analysis",
          "Debugging",

          "Problem Solving",
          "Agile",
          "Team Collaboration",
          "Cross Functional Collaboration",
          "Technical Communication",
          "Mentorship",
        ],

        preferredSkills: [
          "OpenAI",
          "Generative AI",

          "Product Collaboration",
          "Scrum",

          "Cloud Modernization",
          "System Modernization",

          "Code Review",
          "Engineering Best Practices",

          "AI Architecture",
          "Solution Architecture",
        ],

        educationCriteria: {
          allowedDegrees: [
            "BTech",
            "BE",
            "MTech",
            "MCA",
            "BCA",
            "BSc",
            "MSc",
            "Computer Science",
            "Data Science",
            "Statistics",
          ],
          minimumCgpa: 0,
        },

        weightage: {
          skills: 65,
          education: 10,
          projects: 20,
          certifications: 5,
        },
      },
      {
        companyName: "AIA",
        roleId: aiMlRole._id,
        hiringLevel: "experienced",

        requiredSkills: [
          "Machine Learning",
          "Deep Learning",
          "Artificial Intelligence",

          "Python",
          "R",
          "SQL",

          "TensorFlow",
          "PyTorch",

          "Data Preprocessing",
          "Feature Engineering",
          "Model Optimization",
          "Model Tuning",
          "Model Validation",

          "NLP",
          "Text Classification",
          "Named Entity Recognition",
          "Relationship Extraction",
          "Text Summarization",
          "Topic Modeling",
          "Semantic Search",
          "Knowledge Graphs",
          "SpaCy",

          "Computer Vision",
          "Image Recognition",
          "Video Analysis",
          "OpenCV",

          "Speech Processing",

          "REST APIs",
          "Model Deployment",

          "Cloud Data Pipelines",
          "Cloud Computing",

          "CI/CD",
          "ML Model Deployment",

          "Git",
          "GitHub",

          "Statistics",
          "Mathematics",

          "Data Visualization",
          "Power BI",
          "Tableau",

          "Microservices Architecture",
          "API Gateway",
          "Big Data",

          "GPU Computing",
          "CUDA Programming",

          "Scalability",
          "Business Impact Analysis",

          "Problem Solving",
          "Technical Communication",
          "Cross Functional Collaboration",
        ],

        preferredSkills: [
          "PySpark",
          "Hadoop",

          "Reinforcement Learning",
          "Genetic Algorithms",
          "Optimization Algorithms",

          "Stream Data Processing",
          "RPA",
          "Edge Computing",
          "AR/VR",

          "Azure ML",
          "IBM Watson",
          "AWS SageMaker",
          "Google Cloud AI",

          "DataRobot",
          "H2O.ai",
          "CognitiveScale",

          "Kaggle",
          "Open Source Contribution",

          "Digital Ethics",
          "Data Privacy",
        ],

        educationCriteria: {
          allowedDegrees: ["BTech", "BE", "MTech", "MCA", "BCA", "BSc", "MSc"],
          minimumCgpa: 0,
        },

        weightage: {
          skills: 65,
          education: 10,
          projects: 20,
          certifications: 5,
        },
      },
      {
        companyName: "Genpact",
        roleId: aiMlRole._id,
        hiringLevel: "experienced",

        requiredSkills: [
          "Artificial Intelligence",
          "Machine Learning",
          "Deep Learning",

          "Python",
          "Software Development",

          "Machine Learning Infrastructure",
          "Machine Learning Testing",
          "Model Validation",
          "Machine Learning Model Management",

          "Data Pipelines",
          "Data Validation",
          "Data Provisioning",

          "Amazon SageMaker",
          "Cloud Computing",

          "CI/CD",
          "Continuous Integration",
          "Continuous Delivery",
          "Continuous Testing",

          "Computer Vision",
          "AutoML",

          "Analytics",
          "Advanced Analytics",

          "Proof of Concept Development",
          "Prototype Development",

          "Model Deployment",
          "ML Production Systems",
          "Scalable Systems",

          "Architecture Design",
          "System Design",

          "Agile",
          "Agile Methodology",

          "Problem Solving",
          "Cross Functional Collaboration",
          "Client Collaboration",
          "Technical Communication",

          "Testing",
          "Engineering Collaboration",
        ],

        preferredSkills: [
          "Business Analytics",
          "Statistics",
          "Data Science",

          "Embedded Systems",
          "IoT",

          "Design Thinking",

          "Asset Management",

          "Adaptive Technology",

          "Context Awareness",

          "Executive Presence",

          "Research to Production",

          "Cloud Native ML",

          "ML Platform Engineering",
        ],

        educationCriteria: {
          allowedDegrees: [
            "BTech",
            "BE",
            "MTech",
            "MCA",
            "BCA",
            "BSc",
            "MSc",
            "Masters in Data Science",
            "Business Analytics",
            "Statistics",
            "Computer Science",
          ],
          minimumCgpa: 0,
        },

        weightage: {
          skills: 65,
          education: 10,
          projects: 20,
          certifications: 5,
        },
      },
      {
        companyName: "Blubridge",
        roleId: aiMlRole._id,
        hiringLevel: "Junior",
        requiredSkills: [
          "C",
          "C++",
          "Java",
          "Python",
          "Pointers",
          "Memory Management",
          "Low Level Programming",
          "Performance Optimization",
          "Linear Algebra",
          "Probability",
          "Statistics",
          "Calculus",
          "PyTorch",
          "TensorFlow",
          "Deep Learning",
          "Model Training",
          "Inference Optimization",
          "Data Structures",
          "Algorithms",
          "Debugging",
          "Problem Solving",
        ],
        preferredSkills: [
          "Distributed Training Systems",
          "Transformer Models",
          "Model Quantization",
          "Model Sparsity",
          "Compiler Optimization",
          "Graph Optimization",
          "Tokenization Pipelines",
          "Large Scale Data Pipelines",
          "Research Mindset",
          "High Performance Computing",
        ],
        educationCriteria: {
          allowedDegrees: ["BTech", "BE", "MTech", "MSc", "PhD"],
          minimumCgpa: 0,
        },
        weightage: {
          skills: 75,
          education: 10,
          projects: 10,
          certifications: 5,
        },
      },
      {
        companyName: "United Airlines",
        roleId: dataScientistRole._id,
        hiringLevel: "experienced",

        requiredSkills: [
          "Python",
          "SQL",

          "Machine Learning",
          "Deep Learning",
          "Statistical Modeling",
          "Predictive Modeling",

          "Natural Language Processing",
          "Text Classification",
          "Sentiment Analysis",
          "Topic Modeling",

          "Recommendation Systems",
          "Customer Analytics",

          "Data Analysis",
          "Data Mining",
          "Advanced Analytics",

          "Pandas",
          "NumPy",
          "Scikit-learn",
          "TensorFlow",
          "PyTorch",

          "MLflow",

          "Spark",
          "PySpark",
          "Databricks",

          "AWS",
          "Amazon SageMaker",
          "Amazon Redshift",
          "Amazon Athena",
          "Amazon S3",
          "AWS Lambda",

          "Enterprise Data Lake",

          "CI/CD",
          "MLOps",
          "Model Deployment",
          "Model Monitoring",

          "Production Grade ML",
          "Production Code",

          "Automation",

          "Project Management",
          "Documentation",

          "Business Acumen",
          "Problem Solving",
          "Analytical Thinking",

          "Cross Functional Collaboration",
          "Stakeholder Communication",
          "Presentation Skills",

          "Code Reusability",
        ],

        preferredSkills: [
          "Generative AI",
          "Large Language Models",
          "Retrieval Augmented Generation",
          "Vector Databases",
          "AI Agents",

          "Hugging Face",
          "LangChain",
          "LlamaIndex",
          "OpenAI APIs",

          "Enterprise AI Integration",
          "Customer Facing AI Applications",

          "Emerging AI Techniques",
        ],

        educationCriteria: {
          allowedDegrees: [
            "BTech",
            "BE",
            "MTech",
            "MCA",
            "BCA",
            "BSc",
            "MSc",
            "Computer Science",
            "Engineering",
            "Data Science",
            "Statistics",
            "Applied Mathematics",
            "Economics",
          ],
          minimumCgpa: 0,
        },

        weightage: {
          skills: 65,
          education: 10,
          projects: 20,
          certifications: 5,
        },
      },
      {
        companyName: "StatusNeo",
        roleId: dataScientistRole._id,
        hiringLevel: "experienced",

        requiredSkills: [
          "Python",
          "Machine Learning",
          "Natural Language Processing",
          "Graph Databases",

          "Statistical Analysis",
          "Predictive Modeling",

          "Data Visualization",
          "Data Management",

          "Python Modeling",

          "Data Analysis",
          "Problem Solving",

          "Collaboration",
          "Time Management",

          "Analytical Thinking",
        ],

        preferredSkills: [
          "D3.js",

          "Data Storytelling",

          "Visualization Techniques",

          "Innovative Thinking",

          "Research Mindset",

          "Communication Skills",

          "Adaptability",
        ],

        educationCriteria: {
          allowedDegrees: [
            "BTech",
            "BE",
            "MTech",
            "MCA",
            "BCA",
            "BSc",
            "MSc",
            "Computer Science",
            "Data Science",
            "Statistics",
          ],
          minimumCgpa: 0,
        },

        weightage: {
          skills: 60,
          education: 10,
          projects: 20,
          certifications: 5,
        },
      },
      {
        companyName: "UPS",
        roleId: dataScientistRole._id,
        hiringLevel: "experienced",

        requiredSkills: [
          "Python",
          "R",
          "SQL",

          "Data Science",
          "Machine Learning",
          "Artificial Intelligence",

          "Supervised Learning",
          "Unsupervised Learning",

          "Exploratory Data Analysis",
          "Advanced Analytics",
          "Predictive Analytics",
          "Prescriptive Analytics",

          "Statistical Modeling",
          "Operations Research",

          "Data Engineering",
          "Data Management",
          "Data Cleansing",
          "Data Transformation",
          "Data Enrichment",

          "Data Pipelines",

          "PyTorch",
          "TensorFlow",
          "Keras",

          "Vertex AI",
          "Databricks",
          "Amazon SageMaker",

          "Cloud AI Technologies",
          "Cloud Computing",

          "Distributed Systems",

          "Model Validation",
          "Model Testing",
          "Model Retraining",

          "Production Grade Analytics",
          "Performance Tuning",

          "Linux",
          "UNIX",
          "Windows",

          "Data Visualization",
          "Data Storytelling",

          "Problem Solving",
          "Analytical Thinking",

          "Stakeholder Communication",
          "Business Communication",
          "Presentation Skills",

          "Documentation",
          "Code Quality",
        ],

        preferredSkills: [
          "Java",
          "C++",

          "Open Source Technologies",

          "Enterprise Data Science Platforms",

          "Cloud Services",

          "Executive Stakeholder Management",
        ],

        educationCriteria: {
          allowedDegrees: [
            "BTech",
            "BE",
            "MTech",
            "MCA",
            "BCA",
            "BSc",
            "MSc",
            "Mathematics",
            "Computer Science",
            "Physics",
            "Economics",
            "Engineering",
            "Statistics",
            "Operations Research",
            "Quantitative Social Science",
          ],
          minimumCgpa: 0,
        },

        weightage: {
          skills: 60,
          education: 10,
          projects: 20,
          certifications: 5,
        },
      },
      {
        companyName: "Growexx",
        roleId: dataScientistRole._id,
        hiringLevel: "fresher",

        requiredSkills: [
          "Python",
          "SQL",

          "Scikit-learn",
          "Jupyter Notebook",

          "Machine Learning",
          "Supervised Learning",
          "Unsupervised Learning",

          "Large Language Models",
          "Retrieval Augmented Generation",
          "AI Agents",

          "Predictive Modeling",
          "Text Summarization",

          "Data Mining",
          "Data Analysis",
          "Statistical Analysis",

          "API Integration",

          "A/B Testing",

          "Model Deployment",
          "Model Monitoring",
          "Model Maintenance",

          "Data Taxonomy",

          "Problem Solving",
          "Logical Reasoning",
          "Analytical Thinking",

          "Communication Skills",
          "Attention to Detail",
          "Ownership",
          "Accountability",
        ],

        preferredSkills: [
          "AWS",
          "Azure",
          "GCP",

          "Cloud Computing",

          "Customer Support Automation",

          "Production ML Systems",
        ],

        educationCriteria: {
          allowedDegrees: [
            "BTech",
            "BE",
            "Computer Science",
            "Information Technology",
          ],
          minimumCgpa: 0,
        },

        weightage: {
          skills: 60,
          education: 10,
          projects: 20,
          certifications: 5,
        },
      },
    ];

    // Purana data delete karo
    await CompanyProfile.deleteMany({});
    console.log("Old companies deleted ✅");

    // Naya data insert karo
    const inserted = await CompanyProfile.insertMany(companiesData);
    console.log(`${inserted.length} companies inserted ✅`);

    inserted.forEach((company) => {
      console.log(`✅ ${company.companyName}`);
    });

    console.log("\nCompanies seeded successfully! 🎉");
    process.exit(0);
  } catch (err) {
    console.error("Error ❌:", err.message);
    process.exit(1);
  }
};

seedCompanies();
