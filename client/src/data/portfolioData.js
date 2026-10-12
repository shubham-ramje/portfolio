export const personalInfo = {
  name: 'Shubham Ramje',
  role: 'MERN Full Stack Developer',
  tagline: 'Building modern, responsive and scalable web applications with the MERN stack.',
  shortBio:
    'Dedicated MERN Full Stack Developer and BCA student based in Indore, Madhya Pradesh. Passionate about crafting high-performance user interfaces, robust RESTful APIs, and scalable database architectures.',
  location: 'Indore, Madhya Pradesh, India',
  email: 'ramjeshubham@gmail.com',
  phone: '7566186719',
  phoneDisplay: '+91 7566186719',
  social: {
    github: 'https://github.com/shubham-ramje',
    linkedin: 'https://www.linkedin.com/in/shubham-ramje',
    email: 'mailto:ramjeshubham@gmail.com',
    phone: 'tel:+917566186719',
  },
  stats: [
    { label: 'Academic Standing', value: '82.00%' },
    { label: 'Core Projects Built', value: '2+ Full-Stack' },
    { label: 'Industry Internship', value: 'Active Intern' },
    { label: 'Current Degree', value: 'BCA (3nd Year)' },
  ],
};

export const aboutData = {
  summary:
    'I am a passionate BCA student and MERN Full Stack Developer with practical experience in designing and developing responsive, production-ready web applications. My development philosophy centers on writing clean, maintainable code, implementing secure authentication, and optimizing database interactions.',
  highlights: [
    'Hands-on expertise in React.js, Express.js, Node.js, and MongoDB.',
    'Strong grasp of state management, component architecture, and responsive design.',
    'Experience creating secure REST APIs with JWT authentication and role-based access.',
    'Committed to continuous learning, software engineering best practices, and agile problem solving.',
  ],
  focusAreas: [
    'MERN Full Stack Development',
    'React.js Component Architecture',
    'Node.js & Express.js REST APIs',
    'MongoDB Database & Mongoose Schemas',
    'Authentication & Route Protection (JWT)',
    'Responsive & Mobile-First UI/UX',
    'Full-Stack Integration & Error Handling',
  ],
};

export const educationData = [
  {
    id: 'bca-davv',
    degree: 'BCA – Bachelor of Computer Applications',
    institute: 'ISBA Institute of Professional Studies',
    university: 'Devi Ahilya Vishwavidyalaya (DAVV University)',
    location: 'Indore, Madhya Pradesh',
    currentYear: '3nd Year',
    expectedGraduation: '2027',
    percentage: '82.00%',
    status: 'In Progress',
    highlights: [
      'Comprehensive study of Data Structures, Object-Oriented Programming, and Database Systems.',
      'Active participant in technical workshops and hands-on programming projects.',
      'Maintained a top academic record with 82.00% aggregate score.',
    ],
  },
  {
    id: 'future-edu',
    degree: 'Continuous Learning & Advanced MERN Specialization',
    institute: 'Self-Paced / Industry Certification Tracks',
    university: 'Professional Development',
    location: 'Online',
    currentYear: 'Ongoing',
    expectedGraduation: 'Continuous',
    percentage: 'Excellence',
    status: 'Active',
    highlights: [
      'Ongoing deep dives into Cloud Deployment, Microservices architecture, and Advanced React performance optimization.',
      'Open to certifications in Cloud Architecture and Advanced DevOps pipelines.',
    ],
  },
];

export const experienceData = [
  {
    id: 'ypsilon-intern',
    role: 'MERN Stack Developer Intern',
    company: 'Ypsilon IT Solutions Pvt. Ltd.',
    location: 'Indore, Madhya Pradesh',
    duration: 'March 2026 – Present',
    type: 'Internship',
    technologies: [
      'React.js',
      'JavaScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'REST API',
      'JWT',
    ],
    responsibilities: [
      'Developing MERN stack applications with modern component-driven architectures and clean code standards.',
      'Building responsive React interfaces with seamless cross-device compatibility and optimized loading speed.',
      'Designing and developing scalable RESTful APIs with Node.js and Express.js.',
      'Working with MongoDB database models and executing efficient CRUD operations using Mongoose.',
      'Implementing secure authentication and role-based authorization using JSON Web Tokens (JWT).',
      'Developing responsive interfaces and debugging real-world software workflows to enhance overall application reliability.',
    ],
  },
];

export const skillsData = {
  categories: [
    { id: 'all', label: 'All Skills' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'database', label: 'Database' },
    { id: 'programming', label: 'Programming' },
    { id: 'tools', label: 'Tools' },
  ],
  skills: [
    // Frontend
    { name: 'React.js', category: 'frontend', level: 'Advanced', icon: 'Atom' },
    { name: 'JavaScript (ES6+)', category: 'frontend', level: 'Advanced', icon: 'Code' },
    { name: 'React Router', category: 'frontend', level: 'Proficient', icon: 'Route' },
    { name: 'HTML5', category: 'frontend', level: 'Expert', icon: 'FileCode' },
    { name: 'CSS3 / Responsive Design', category: 'frontend', level: 'Advanced', icon: 'Layout' },
    
    // Backend
    { name: 'Node.js', category: 'backend', level: 'Advanced', icon: 'Server' },
    { name: 'Express.js', category: 'backend', level: 'Advanced', icon: 'Cpu' },
    { name: 'REST API Development', category: 'backend', level: 'Advanced', icon: 'Network' },
    { name: 'JWT Authentication', category: 'backend', level: 'Proficient', icon: 'ShieldCheck' },
    { name: 'Nodemailer', category: 'backend', level: 'Proficient', icon: 'Mail' },
    { name: 'Axios', category: 'backend', level: 'Advanced', icon: 'ArrowLeftRight' },

    // Database
    { name: 'MongoDB', category: 'database', level: 'Advanced', icon: 'Database' },
    { name: 'Mongoose ODM', category: 'database', level: 'Advanced', icon: 'Workflow' },

    // Programming
    { name: 'C', category: 'programming', level: 'Proficient', icon: 'Binary' },
    { name: 'C++', category: 'programming', level: 'Proficient', icon: 'Terminal' },

    // Tools
    { name: 'Git', category: 'tools', level: 'Advanced', icon: 'GitBranch' },
    { name: 'GitHub', category: 'tools', level: 'Advanced', icon: 'Github' },
    { name: 'MS Word', category: 'tools', level: 'Proficient', icon: 'FileText' },
    { name: 'MS Excel', category: 'tools', level: 'Proficient', icon: 'Table' },
  ],
};

export const projectsData = [
  {
    id: 'storagewars',
    title: 'StorageWars',
    subtitle: 'Online Storage Auction & Management Platform',
    category: 'fullstack',
    shortDescription:
      'A full-featured MERN stack web application for managing storage units, live auction bids, and valuable treasure discoveries.',
    fullDescription:
      'StorageWars is an end-to-end auction management platform that empowers storage facility operators to catalog vacant lockers and enables bidders to discover hidden treasures. Built on the MERN stack with role-based admin and customer workflows, automated email alerts, and bot protection.',
    featured: true,
    technologies: [
      'React.js',
      'JavaScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'REST API',
      'JWT',
      'React Router',
      'HTML5',
      'CSS3',
    ],
    features: [
      'Secure User registration & email verification',
      'Multi-tier Role-based Admin and Bidder access control',
      'Storage Units cataloging with dynamic image galleries',
      'Real-time Auction listings, bidding intervals & timer alerts',
      'Treasure Discoveries showcase module',
      'Comprehensive Profile management & secure password changing',
      'RESTful APIs with full CRUD operations for all entities',
      'JWT authentication with httpOnly cookie / bearer header options',
      'Google reCAPTCHA verification to prevent automated spam bids',
      'Nodemailer integration for bid receipts and unit won notices',
    ],
    githubUrl: null, // Placeholder: marked disabled/placeholder cleanly
    liveUrl: null, // Placeholder: marked disabled/placeholder cleanly
    status: 'Working',
  },
  {
    id: 'bizmanager',
    title: 'BizManager',
    subtitle: 'Small Business Management System',
    category: 'fullstack',
    shortDescription:
      'A full-stack business ERP for streamlining product inventory, customer ledgers, supplier logistics, sales, purchases, and profit-loss analytics.',
    fullDescription:
      'BizManager solves the operational overhead faced by small-to-medium retail and wholesale enterprises. It centralizes product catalogues, automated stock deductions on checkout, supplier procurement orders, and provides interactive executive dashboards for financial auditing.',
    featured: true,
    technologies: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'JWT',
      'REST API',
    ],
    features: [
      'End-to-end Product & Category management',
      'Real-time Inventory tracking with automated low-stock notifications',
      'Customer Directory & purchase history tracking',
      'Supplier relationship management & procurement logs',
      'Sales invoicing and automated stock reduction',
      'Expense categorisation & ledger tracking',
      'Executive Dashboard with real-time sales & expense charts',
      'Automated Profit & Loss calculation and monthly reports',
      'Printable and downloadable PDF invoice generation',
      'Server-side Search, multi-criteria filtering, and pagination',
      'Comprehensive schema validation & robust error handling',
      'Responsive, mobile-friendly interface across all devices',
    ],
    githubUrl: null, // Placeholder: marked disabled/placeholder cleanly
    liveUrl: null, // Placeholder: marked disabled/placeholder cleanly
    status: 'Completed',
  },
];

export const certificationsData = [
  {
    id: 'adca',
    title: 'Advanced Diploma in Computer Application (ADCA)',
    issuer: 'SkillCourse / LMP Education Council',
    credentialId: 'SC_AU01022082839LMP@skillcourse.in',
    issueDate: 'Verified',
    type: 'Professional Diploma',
    description:
      'Comprehensive curriculum encompassing computer fundamentals, programming basics, database handling, and software productivity tools.',
    skillsLearned: ['Computer Fundamentals', 'Database Basics', 'Software Applications', 'IT Productivity'],
  },
  {
    id: 'ms-excel',
    title: 'MS Excel Certification',
    issuer: 'SkillCourse / LMP Education Council',
    credentialId: 'SC_01038332LMP@skillcourse.in',
    issueDate: 'Verified',
    type: 'Specialized Skill Certificate',
    description:
      'Professional mastery in financial calculations, pivot tables, data analysis, visual charting, and spreadsheet automation.',
    skillsLearned: ['Data Analysis', 'Pivot Tables', 'Formulas & Functions', 'Visual Dashboards'],
  },
  {
    id: 'skill-india',
    title: 'Application Developer Certificate',
    issuer: 'Skill India / NASSCOM',
    credentialId: 'AEMPA0021QG-05-IT-00512-V1.1-NASSCOM-111755',
    issueDate: 'Certified',
    type: 'National Skill Qualification Framework',
    description:
      'National certification in application software development adhering to NASSCOM IT-ITeS industry standards, validating core programming, debugging, and system design capability.',
    skillsLearned: ['Application Development', 'Software Lifecycle', 'Code Quality & Testing', 'Industry Standards'],
  },
];

export const servicesData = [
  {
    id: 'frontend-dev',
    title: 'Frontend Development',
    description: 'Modern, performant, and responsive web interfaces developed with React.js, clean component architecture, and modern CSS.',
    features: [
      'Single Page Applications (SPAs) with React Router',
      'Component-driven architecture and reusable UI elements',
      'Mobile-first, responsive layouts across all screen resolutions',
      'State management and fluid animations',
    ],
    icon: 'Monitor',
  },
  {
    id: 'mern-stack',
    title: 'MERN Full Stack Development',
    description: 'Complete web applications built end-to-end using MongoDB, Express.js, React.js, and Node.js with secure authentication.',
    features: [
      'Complete end-to-end architecture (Client & Server)',
      'Secure user authentication with JWT and bcrypt',
      'Role-based access control (Admin & User)',
      'Integration of third-party APIs and email services',
    ],
    icon: 'Layers',
  },
  {
    id: 'rest-api',
    title: 'REST API Development',
    description: 'Scalable, secure, and well-structured RESTful APIs using Node.js and Express.js with proper validation and error handling.',
    features: [
      'RESTful endpoints with CRUD operations',
      'Input validation and data sanitization',
      'Rate limiting and security headers (Helmet, CORS)',
      'Clear HTTP status codes and error middleware',
    ],
    icon: 'Server',
  },
  {
    id: 'responsive-web',
    title: 'Responsive Web Development',
    description: 'Mobile, tablet, and desktop responsive web applications built with modern CSS flexbox, grid, and adaptive typography.',
    features: [
      'Pixel-perfect responsive design across all viewports',
      'Touch-friendly mobile navigation and hamburger drawers',
      'Fast loading speeds and optimized visual assets',
      'Cross-browser and multi-platform compatibility',
    ],
    icon: 'Smartphone',
  },
  {
    id: 'database-integration',
    title: 'Database Integration',
    description: 'Robust MongoDB database schemas, data modeling, indexes, and queries crafted with Mongoose for maximum performance.',
    features: [
      'Mongoose schema definitions with validation rules',
      'Data relationships, indexing, and aggregation pipelines',
      'MongoDB Atlas cloud database provisioning',
      'Secure connection handling and connection pooling',
    ],
    icon: 'Database',
  },
];

export const navigationLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Services', href: '#services' },
  { name: 'Contact', href: '#contact' },
];
