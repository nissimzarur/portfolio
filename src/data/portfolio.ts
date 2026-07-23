import type { PortfolioData } from '@/types/portfolio';

export const portfolioData: PortfolioData = {
  // ---------------------------------------------------------------------------
  // Personal Info
  // ---------------------------------------------------------------------------
  personal: {
    name: 'Nissim Zarur',
    title: 'Senior Full Stack Engineer | Cloud Architect | Agentic AI Engineer',
    tagline:
      'Building scalable systems and intelligent agents that solve real problems.',
    email: 'Nissimzarur@gmail.com',
    phone: '052-3232388',
    location: 'Northern District, Israel',
    education: {
      degree: 'B.Sc. Software Engineering',
      institution: 'Kinneret Academic College',
    },
    certifications: [
      'AWS Certified Cloud Practitioner',
      'AI Engineer Agentic \u2013 Ligency',
    ],
    strengths: [
      'Technical Leadership',
      'Problem Solving',
      'System Design',
      'Mentoring',
      'Fast Learner',
      'Team Collaboration',
    ],
  },

  // ---------------------------------------------------------------------------
  // Career Milestones
  // ---------------------------------------------------------------------------
  career: [
    {
      id: 'kinneret',
      company: 'Kinneret Academic College',
      role: 'Software Developer',
      period: { start: 'Jan 2018', end: 'Feb 2019' },
      summary: 'GPS-based web and mobile applications.',
      achievements: [
        {
          label: 'GPS Web/Mobile Apps',
          description:
            'Built GPS-based web and mobile applications during undergraduate studies.',
        },
      ],
      techStack: ['JavaScript', 'React', 'Node.js'],
      environment: 'campus',
      chapterIndex: 0,
    },
    {
      id: 'bafi',
      company: 'Bafi',
      role: 'Full Stack Developer',
      period: { start: 'Feb 2019', end: 'Dec 2021' },
      summary:
        'Enterprise insurance applications with payment automation serving thousands of daily users.',
      achievements: [
        {
          label: 'Process Automation',
          metric: '~30%',
          description:
            'Automated approximately 30% of manual processes in the insurance workflow.',
        },
        {
          label: 'Enterprise Scale',
          description:
            'Built and maintained applications serving thousands of daily users.',
        },
        {
          label: 'Payment Automation',
          description:
            'Implemented automated payment processing for enterprise insurance operations.',
        },
      ],
      techStack: [
        'TypeScript',
        'React',
        'Node.js',
        'Vue',
        'Redux',
        'REST',
        'GraphQL',
      ],
      environment: 'office',
      chapterIndex: 1,
    },
    {
      id: 'letstok',
      company: 'LetsTok.AI',
      role: 'Hands-on Tech Lead',
      period: { start: 'Dec 2021', end: 'Mar 2025' },
      summary:
        'AI-powered applications with GPT/Vertex AI chatbots and RAG pipelines.',
      achievements: [
        {
          label: 'RAG Accuracy',
          metric: '+25%',
          description:
            'Improved retrieval-augmented generation accuracy by 25% through pipeline optimization.',
        },
        {
          label: 'User Retention',
          metric: '+15%',
          description:
            'Increased user retention by 15% with AI-driven engagement features.',
        },
        {
          label: 'Deploy Time',
          metric: '-20%',
          description:
            'Reduced deployment time by 20% through CI/CD pipeline improvements.',
        },
        {
          label: 'Team Leadership',
          description:
            'Led a team of 3 engineers, driving technical decisions and mentoring.',
        },
      ],
      techStack: [
        'TypeScript',
        'React',
        'React Native',
        'Node.js',
        'NestJS',
        'GPT',
        'Vertex AI',
        'RAG',
        'Docker',
        'GCP',
        'Firebase',
      ],
      environment: 'lab',
      chapterIndex: 2,
    },
    {
      id: 'igentify',
      company: 'Igentify (Healthcare)',
      role: 'Cloud & Full Stack Engineer',
      period: { start: 'Mar 2025', end: 'Present' },
      summary:
        'Cloud-native healthcare platform with LangGraph multi-agent orchestration.',
      achievements: [
        {
          label: 'Multi-Agent Orchestration',
          description:
            'Architected LangGraph-based multi-agent orchestration for healthcare workflows.',
        },
        {
          label: 'Multi-Tenant Architecture',
          description:
            'Designed event-driven microservices supporting multi-tenant isolation.',
        },
        {
          label: 'AWS CDK Infrastructure',
          description:
            'Built cloud-native infrastructure as code with AWS CDK.',
        },
      ],
      techStack: [
        'TypeScript',
        'Python',
        'AWS',
        'AWS CDK',
        'LangGraph',
        'Docker',
        'Kubernetes',
        'Microservices',
        'Event-Driven Architecture',
      ],
      environment: 'cloud',
      chapterIndex: 3,
    },
  ],

  // ---------------------------------------------------------------------------
  // Skills by Category
  // ---------------------------------------------------------------------------
  skills: [
    {
      name: 'Frontend',
      icon: 'Monitor',
      description: 'Building responsive, accessible user interfaces across web and mobile',
      skills: [
        {
          name: 'React',
          proficiency: 'expert',
          context: 'Primary UI framework across Bafi, LetsTok, and Igentify.',
        },
        {
          name: 'React Native',
          proficiency: 'advanced',
          context: 'Cross-platform mobile apps at LetsTok.AI.',
        },
        {
          name: 'Vue',
          proficiency: 'advanced',
          context: 'Enterprise insurance interfaces at Bafi.',
        },
        {
          name: 'Redux',
          proficiency: 'advanced',
          context: 'State management for complex enterprise apps at Bafi.',
        },
        {
          name: 'MobX',
          proficiency: 'proficient',
          context: 'Reactive state management in frontend applications.',
        },
        {
          name: 'React Query',
          proficiency: 'advanced',
          context:
            'Server state management and caching in React applications.',
        },
        {
          name: 'Apollo Client',
          proficiency: 'advanced',
          context: 'GraphQL client for data fetching at Bafi and LetsTok.',
        },
        {
          name: 'Tailwind CSS',
          proficiency: 'expert',
          context: 'Utility-first styling across recent projects.',
        },
        {
          name: 'Material UI',
          proficiency: 'advanced',
          context: 'Component library for enterprise UI at Bafi.',
        },
      ],
    },
    {
      name: 'Backend',
      icon: 'Server',
      description: 'Designing scalable APIs, services, and data layers',
      skills: [
        {
          name: 'Node.js',
          proficiency: 'expert',
          context:
            'Core runtime across all roles, from Kinneret to Igentify.',
        },
        {
          name: 'NestJS',
          proficiency: 'expert',
          context: 'Enterprise-grade backend framework at LetsTok.AI.',
        },
        {
          name: 'Express',
          proficiency: 'expert',
          context: 'Lightweight APIs at Kinneret and Bafi.',
        },
        {
          name: 'REST',
          proficiency: 'expert',
          context: 'RESTful API design across all roles.',
        },
        {
          name: 'GraphQL',
          proficiency: 'advanced',
          context: 'Flexible data layer at Bafi and LetsTok.',
        },
        {
          name: 'WebSockets',
          proficiency: 'advanced',
          context: 'Real-time communication in AI chatbot applications.',
        },
        {
          name: 'Redis',
          proficiency: 'advanced',
          context: 'Caching and session management at LetsTok and Igentify.',
        },
        {
          name: 'TypeORM',
          proficiency: 'advanced',
          context: 'Database ORM for TypeScript backends at Bafi and LetsTok.',
        },
        {
          name: 'Microservices',
          proficiency: 'advanced',
          context:
            'Event-driven microservices architecture at Igentify.',
        },
      ],
    },
    {
      name: 'Cloud & DevOps',
      icon: 'Cloud',
      description: 'Deploying and orchestrating cloud-native infrastructure at scale',
      skills: [
        {
          name: 'AWS',
          proficiency: 'expert',
          context:
            'Primary cloud provider at Igentify; AWS Certified Cloud Practitioner.',
        },
        {
          name: 'AWS CDK',
          proficiency: 'advanced',
          context: 'Infrastructure as code for healthcare platform at Igentify.',
        },
        {
          name: 'Docker',
          proficiency: 'expert',
          context: 'Containerization across LetsTok and Igentify.',
        },
        {
          name: 'Kubernetes (EKS)',
          proficiency: 'advanced',
          context: 'Container orchestration on AWS EKS at Igentify.',
        },
        {
          name: 'CI/CD',
          proficiency: 'advanced',
          context:
            'Pipeline automation achieving -20% deploy time at LetsTok.',
        },
        {
          name: 'GitHub Actions',
          proficiency: 'advanced',
          context: 'Automated build and deploy workflows.',
        },
        {
          name: 'GCP',
          proficiency: 'advanced',
          context: 'Google Cloud services and Vertex AI at LetsTok.',
        },
        {
          name: 'Firebase',
          proficiency: 'advanced',
          context: 'Real-time database and auth at LetsTok.AI.',
        },
      ],
    },
    {
      name: 'AI & ML',
      icon: 'Brain',
      description: 'Developing intelligent systems, agents, and AI-powered features',
      skills: [
        {
          name: 'Agentic AI',
          proficiency: 'expert',
          context:
            'LangGraph multi-agent orchestration at Igentify; Ligency certified.',
        },
        {
          name: 'LangGraph',
          proficiency: 'expert',
          context:
            'Multi-agent workflow orchestration for healthcare at Igentify.',
        },
        {
          name: 'RAG',
          proficiency: 'expert',
          context:
            'Retrieval-augmented generation with +25% accuracy at LetsTok.',
        },
        {
          name: 'OpenAI SDK',
          proficiency: 'advanced',
          context: 'GPT integration for chatbots and AI features at LetsTok.',
        },
        {
          name: 'Claude Code',
          proficiency: 'advanced',
          context: 'AI-assisted development workflows.',
        },
        {
          name: 'CrewAI',
          proficiency: 'proficient',
          context: 'Multi-agent framework exploration and prototyping.',
        },
        {
          name: 'Prompt Engineering',
          proficiency: 'expert',
          context:
            'Prompt design for GPT/Vertex AI chatbots at LetsTok.',
        },
        {
          name: 'Vector Databases',
          proficiency: 'advanced',
          context: 'Embedding storage for RAG pipelines at LetsTok.',
        },
        {
          name: 'GPT',
          proficiency: 'expert',
          context: 'GPT-powered chatbot development at LetsTok.AI.',
        },
        {
          name: 'Vertex AI',
          proficiency: 'advanced',
          context: 'Google Vertex AI integration at LetsTok.',
        },
      ],
    },
    {
      name: 'Architecture',
      icon: 'Layers',
      description: 'Designing robust, maintainable system architectures',
      skills: [
        {
          name: 'System Design',
          proficiency: 'expert',
          context:
            'End-to-end system design for distributed healthcare platform at Igentify.',
        },
        {
          name: 'Distributed Systems',
          proficiency: 'advanced',
          context:
            'Multi-tenant event-driven microservices at Igentify.',
        },
        {
          name: 'Event-Driven Architecture',
          proficiency: 'advanced',
          context: 'Event-driven microservices design at Igentify.',
        },
        {
          name: 'DDD',
          proficiency: 'advanced',
          context:
            'Domain-driven design for complex business logic at Bafi and Igentify.',
        },
        {
          name: 'SOLID',
          proficiency: 'expert',
          context: 'Applied across all production codebases.',
        },
        {
          name: 'Design Patterns',
          proficiency: 'expert',
          context:
            'GoF and enterprise patterns in TypeScript/Node.js projects.',
        },
        {
          name: 'Clean Architecture',
          proficiency: 'advanced',
          context:
            'Layered architecture with clear boundaries at LetsTok and Igentify.',
        },
      ],
    },
    {
      name: 'Testing & Tools',
      icon: 'TestTube2',
      description: 'Ensuring quality through comprehensive testing and modern tooling',
      skills: [
        {
          name: 'Jest',
          proficiency: 'expert',
          context: 'Unit and integration testing across all Node.js projects.',
        },
        {
          name: 'Playwright',
          proficiency: 'advanced',
          context: 'End-to-end browser testing for web applications.',
        },
        {
          name: 'Cypress',
          proficiency: 'advanced',
          context: 'E2E testing for React applications at Bafi and LetsTok.',
        },
        {
          name: 'Storybook',
          proficiency: 'advanced',
          context: 'Component development and visual testing.',
        },
        {
          name: 'Jira',
          proficiency: 'advanced',
          context: 'Project management and sprint planning across all roles.',
        },
        {
          name: 'Figma',
          proficiency: 'proficient',
          context: 'Design-to-code collaboration with design teams.',
        },
      ],
    },
  ],
};
