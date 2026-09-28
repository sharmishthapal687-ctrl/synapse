import type { 
  User, 
  CommunityProject, 
  CommunityEvent, 
  Community, 
  ChatMessage,
  EventComment
} from '../types';

export const mockUsers: User[] = [
  {
    id: 'user-aarav',
    name: 'Aarav Sharma',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    role: 'ML & Backend Developer',
    college: 'GCET • 3rd Year ECE',
    year: '3rd Year',
    bio: 'Building deep learning models for biomedical diagnostics and predictive analytics.',
    about: 'Passionate about applied machine learning and building fast inference pipelines in Python and FastAPI. Looking to team up with frontend and design peers to ship tangible healthcare and civic prototypes.',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'FastAPI', 'PyTorch'],
    interests: ['AI', 'Healthcare', 'Robotics', 'Data Science'],
    lookingFor: ['AI projects', 'Hackathons', 'Collaborators'],
    projects: [
      {
        id: 'p1',
        title: 'Retinal Scan Diagnostic AI',
        description: 'Deep convolutional network detecting early-stage diabetic retinopathy with 94% validation accuracy.',
        tags: ['Python', 'PyTorch', 'Computer Vision'],
        role: 'Lead ML Engineer'
      },
      {
        id: 'p2',
        title: 'MedQuery Assistant',
        description: 'Retrieval-augmented QA pipeline for clinical trial documents using LangChain and ChromaDB.',
        tags: ['FastAPI', 'LangChain', 'NLP'],
        role: 'Backend Architect'
      }
    ]
  },
  {
    id: 'user-riya',
    name: 'Riya Sen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    role: 'Fullstack Web Engineer',
    college: 'GCET • 3rd Year CSE',
    year: '3rd Year',
    bio: 'React, TypeScript, and Node.js enthusiast who loves sleek interactions and clean APIs.',
    about: 'I specialize in building performant modern web apps. I frequently participate in hackathons and lead frontend sprints in our college coding club.',
    skills: ['React', 'TypeScript', 'Node.js', 'Tailwind', 'Next.js'],
    interests: ['Web Development', 'UI/UX', 'Open Source', 'AI'],
    lookingFor: ['Projects', 'Teammates', 'Hackathons'],
    projects: [
      {
        id: 'p3',
        title: 'DevSync Campus Workspace',
        description: 'Real-time collaborative markdown editor and task board for student project groups.',
        tags: ['React', 'Node.js', 'WebSockets'],
        role: 'Frontend Lead'
      },
      {
        id: 'p4',
        title: 'ClubSphere Portal',
        description: 'Event registration and ticketing platform used by 8 university clubs.',
        tags: ['TypeScript', 'Next.js', 'Tailwind'],
        role: 'Fullstack Developer'
      }
    ]
  },
  {
    id: 'user-sharmishtha',
    name: 'Sharmishtha Pal',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    role: 'Product & UI/UX Designer',
    college: 'GCET • 2nd Year Design & Computing',
    year: '2nd Year',
    bio: 'Crafting intuitive digital experiences, design systems, and rapid interactive prototypes.',
    about: 'Bridging the gap between human needs and technical capabilities. I design accessible, clean interfaces in Figma and love working alongside developers who bring them to life.',
    skills: ['UI/UX', 'Figma', 'Graphic Design', 'HTML', 'Design Systems', 'User Research'],
    interests: ['AI', 'Web Development', 'Design Systems', 'Healthcare'],
    lookingFor: ['AI projects', 'Design projects', 'Hackathons'],
    projects: [
      {
        id: 'p5',
        title: 'CarePulse Health Companion',
        description: 'Comprehensive mobile and web UI kit for patient symptom tracking and doctor appointments.',
        tags: ['Figma', 'UI/UX', 'Prototyping'],
        role: 'Lead UI/UX Designer'
      },
      {
        id: 'p6',
        title: 'UniVibe Identity & Portal',
        description: 'Visual identity branding and interface guidelines for campus cultural fest.',
        tags: ['Graphic Design', 'Figma', 'Branding'],
        role: 'Visual Designer'
      }
    ]
  },
  {
    id: 'user-rohan',
    name: 'Rohan Gupta',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    role: 'Data Scientist & NLP Developer',
    college: 'GCET • 4th Year CSE',
    year: '4th Year',
    bio: 'Specializing in LLM fine-tuning, knowledge graphs, and data pipeline architecture.',
    about: 'Experienced in developing domain-specific language models and deploying them using Docker and cloud endpoints.',
    skills: ['Python', 'Machine Learning', 'NLP', 'Data Science', 'Docker', 'SQL'],
    interests: ['AI', 'Healthcare', 'Data Science', 'Entrepreneurship'],
    lookingFor: ['AI projects', 'Collaborators'],
    projects: [
      {
        id: 'p7',
        title: 'ClinicalDoc Summarizer',
        description: 'Transformer-based model trained on discharge summaries for automated triage.',
        tags: ['Python', 'NLP', 'HuggingFace'],
        role: 'Lead Researcher'
      }
    ]
  },
  {
    id: 'user-ananya',
    name: 'Ananya Joshi',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    role: 'Robotics & Hardware Hacker',
    college: 'GCET • 3rd Year Mechatronics',
    year: '3rd Year',
    bio: 'Hardware tinkerer, firmware builder, and robotics enthusiast.',
    about: 'Obsessed with microcontrollers, ROS2, and computer vision integration on embedded devices.',
    skills: ['C++', 'Python', 'Robotics', 'IoT', 'Arduino', 'ROS'],
    interests: ['Robotics', 'IoT', 'AI', 'Hardware'],
    lookingFor: ['Hackathons', 'Teammates', 'Projects'],
    projects: [
      {
        id: 'p8',
        title: 'AgriBot Field Rover',
        description: 'Autonomous crop-monitoring rover with onboard multispectral camera.',
        tags: ['C++', 'ROS2', 'IoT'],
        role: 'Firmware Lead'
      }
    ]
  }
];

export const mockProjects: CommunityProject[] = [
  {
    id: 'proj-health-ai',
    title: 'AI Healthcare Assistant',
    description: 'An intelligent clinical companion that parses diagnostic reports and recommends triage steps for underserved rural clinics.',
    tags: ['AI', 'Healthcare', 'Python', 'React'],
    lookingForRoles: ['ML Engineer', 'Frontend Developer', 'UI/UX Designer'],
    requiredSkills: ['Python', 'Machine Learning', 'React', 'Figma'],
    teamSizeNeeded: 3,
    currentMembers: 1,
    ownerName: 'Aarav Sharma',
    ownerAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    status: 'Forming Team'
  },
  {
    id: 'proj-campus-eco',
    title: 'EcoCampus Carbon & Energy Tracker',
    description: 'IoT-enabled dashboard tracking energy consumption across campus hostels and labs with automated optimization alerts.',
    tags: ['IoT', 'Web', 'React', 'Node.js'],
    lookingForRoles: ['Frontend Developer', 'IoT Specialist'],
    requiredSkills: ['React', 'IoT', 'C++'],
    teamSizeNeeded: 2,
    currentMembers: 2,
    ownerName: 'Ananya Joshi',
    ownerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    status: 'Open for Contributors'
  },
  {
    id: 'proj-peer-mentor',
    title: 'PeerCode Skill Matcher',
    description: 'A micro-mentorship matching network pairing senior developers with juniors for code reviews and interview prep.',
    tags: ['Web', 'UI/UX', 'Figma', 'TypeScript'],
    lookingForRoles: ['UI/UX Designer', 'Backend Engineer'],
    requiredSkills: ['UI/UX', 'Figma', 'Node.js'],
    teamSizeNeeded: 2,
    currentMembers: 1,
    ownerName: 'Riya Sen',
    ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    status: 'Forming Team'
  }
];

export const mockEvents: CommunityEvent[] = [
  {
    id: 'evt-buildathon',
    title: 'AI Buildathon 2026',
    date: '20 September 2026',
    time: '09:00 AM - 06:00 PM IST',
    location: 'Campus Auditorium & Virtual Hub',
    isOnline: false,
    category: 'Hackathons',
    tags: ['AI', 'Python', 'Beginner Friendly', 'Prototyping'],
    shortDescription: 'Build an AI-powered prototype addressing real-world campus or healthcare challenges.',
    fullDescription: 'Join 200+ students and developers for an intensive 24-hour sprint. Form teams of 2-4, tackle challenges in healthcare, education, or climate tech, and receive hands-on mentoring from industry leaders. Beginners are encouraged with dedicated starter tracks.',
    organizer: 'GCET Developer Club & AI Society',
    communityId: 'comm-ai-society',
    aiSummary: {
      tldr: [
        'Build a functional AI prototype addressing healthcare, climate, or campus needs.',
        'Team format: 2 to 4 members with cross-functional roles (ML, Web, Design).',
        'Beginner-friendly tracks with mentors on-site throughout the day.'
      ],
      bestSuitedFor: ['AI & Python Developers', 'Frontend Developers', 'UI/UX Designers', 'First-time Hackers'],
      keyRequirements: [
        'Working GitHub repository with README and demo video.',
        'Demonstrated use of an AI model, API, or inference pipeline.',
        'Working user interface (web, mobile, or CLI).'
      ]
    }
  },
  {
    id: 'evt-uiux-workshop',
    title: 'Design Systems & UX Research Masterclass',
    date: '24 September 2026',
    time: '02:00 PM - 05:30 PM IST',
    location: 'Design Studio Lab 302',
    isOnline: false,
    category: 'Design',
    tags: ['UI/UX', 'Figma', 'Design Systems', 'Hands-on'],
    shortDescription: 'Learn how to build scalable component systems in Figma and run high-impact student usability tests.',
    fullDescription: 'Step-by-step interactive workshop covering variables, token systems, and auto-layout in Figma. Learn how to convert complex user workflows into intuitive, clean interfaces that developers love to implement.',
    organizer: 'Design Collective',
    communityId: 'comm-design-guild',
    aiSummary: {
      tldr: [
        'Master scalable Figma component libraries and accessible token structures.',
        'Hands-on session building a complete design system for a mobile app.',
        'Includes live feedback on existing student portfolio projects.'
      ],
      bestSuitedFor: ['UI/UX Designers', 'Graphic Designers', 'Frontend Developers who care about design'],
      keyRequirements: [
        'Laptop with Figma installed (or browser ready).',
        'Basic familiarity with design tools is helpful but not required.'
      ]
    }
  },
  {
    id: 'evt-healthai-hackathon',
    title: 'National MedTech & HealthAI Sprint',
    date: '12 October 2026',
    time: '10:00 AM - 08:00 PM IST',
    location: 'Regional Innovation Center (Online tracks available)',
    isOnline: true,
    category: 'Hackathons',
    tags: ['AI', 'Healthcare', 'Machine Learning', 'Python'],
    shortDescription: 'Tackle pressing medical imaging, patient triaging, and clinical data challenges with cutting-edge AI.',
    fullDescription: 'A multi-institutional hackathon connecting clinicians with software engineers. Access anonymized clinical datasets and build predictive or diagnostic solutions.',
    organizer: 'GCET Developer Club & AI Society',
    communityId: 'comm-ai-society',
    aiSummary: {
      tldr: [
        'Develop AI models targeting diagnostic triage and remote patient monitoring.',
        'Direct access to anonymized healthcare datasets and clinical advisors.',
        'Cash prizes, GPU compute credits, and incubation opportunities for top 3 teams.'
      ],
      bestSuitedFor: ['Python & ML Engineers', 'Data Scientists', 'Fullstack Engineers', 'Health Tech Enthusiasts'],
      keyRequirements: [
        'HIPAA-compliant synthetic data handling standards.',
        'End-to-end prototype demonstration with explainable model outputs.'
      ]
    }
  },
  {
    id: 'evt-fullstack-ai',
    title: 'Fullstack Next.js + AI Workshop',
    date: '28 September 2026',
    time: '04:00 PM - 07:00 PM IST',
    location: 'Virtual via Discord Stage',
    isOnline: true,
    category: 'Web',
    tags: ['Web', 'React', 'Next.js', 'AI', 'TypeScript'],
    shortDescription: 'From prompt to production: Integrating streaming LLM responses into modern React apps.',
    fullDescription: 'Hands-on session walking through the Vercel AI SDK, streaming text generators, and caching strategies for AI web applications.',
    organizer: 'GCET Developer Club & AI Society',
    communityId: 'comm-ai-society',
    aiSummary: {
      tldr: [
        'Build and deploy a fullstack AI web app using Next.js and TypeScript.',
        'Learn real-time streaming UI patterns and state synchronization.',
        'Deploy directly to production during the workshop.'
      ],
      bestSuitedFor: ['Web Developers', 'React Developers', 'Software Engineers'],
      keyRequirements: [
        'Basic understanding of JavaScript / TypeScript and React hooks.',
        'Node.js 18+ installed on your development machine.'
      ]
    }
  },
  {
    id: 'evt-robotics-bootcamp',
    title: 'Autonomous Robotics & ROS2 Hands-on Bootcamp',
    date: '05 October 2026',
    time: '11:00 AM - 04:00 PM IST',
    location: 'Mechatronics Lab 104',
    isOnline: false,
    category: 'Robotics',
    tags: ['Robotics', 'C++', 'IoT', 'Hardware'],
    shortDescription: 'Build obstacle-avoidance algorithms and robot control nodes using ROS2 and LiDAR simulations.',
    fullDescription: 'Get your hands dirty with real-world sensor streams, motor controllers, and simulation environments using ROS2 and Raspberry Pi.',
    organizer: 'Robotics & Embedded Systems Club',
    communityId: 'comm-robotics',
    aiSummary: {
      tldr: [
        'Hands-on robot operating system (ROS2) nodes and navigation stack.',
        'Simulate autonomous obstacle avoidance with LiDAR point clouds.',
        'Hardware demonstration on physical rovers.'
      ],
      bestSuitedFor: ['Robotics Enthusiasts', 'Embedded Engineers', 'C++ / Python Programmers'],
      keyRequirements: [
        'Basic knowledge of Linux / terminal commands and C++ or Python.'
      ]
    }
  }
];

export const mockCommunities: Community[] = [
  {
    id: 'comm-ai-society',
    name: 'GCET Developer Club & AI Society',
    tagline: 'Campus hub for machine learning, AI buildathons, and software engineering.',
    description: 'We bring together over 450 student developers, researchers, and hobbyists building practical AI systems. We host weekly build sessions, open-source sprints, and industry tech talks.',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    domains: ['AI & ML', 'Python', 'Web Development', 'Open Source'],
    memberCount: 460,
    leads: ['Aarav Sharma (3rd Yr)', 'Rohan Gupta (4th Yr)'],
    contactEmail: 'devclub@gcet.edu',
    activeEventsCount: 3,
    openProjectsCount: 2,
    verified: true
  },
  {
    id: 'comm-design-guild',
    name: 'Design Collective & UI Guild',
    tagline: 'Empowering student designers to craft world-class interfaces and accessible design systems.',
    description: 'A creative student collective passionate about user research, visual systems, Figma workflows, and collaborating with developer teams to bring concepts to life.',
    logo: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=150&auto=format&fit=crop&q=80',
    domains: ['UI/UX Design', 'Figma', 'Design Systems', 'Product Design'],
    memberCount: 320,
    leads: ['Sharmishtha Pal (2nd Yr)'],
    contactEmail: 'designguild@gcet.edu',
    activeEventsCount: 1,
    openProjectsCount: 1,
    verified: true
  },
  {
    id: 'comm-robotics',
    name: 'Robotics & Embedded Systems Club',
    tagline: 'Hardware hacking, autonomous rovers, ROS2, and physical computing prototypes.',
    description: 'Home of the campus rover team. We work on microcontroller programming, autonomous navigation, IoT sensor networks, and mechanical hardware fabrication.',
    logo: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=150&auto=format&fit=crop&q=80',
    domains: ['Robotics', 'IoT', 'C++', 'Embedded Systems'],
    memberCount: 215,
    leads: ['Ananya Joshi (3rd Yr)'],
    contactEmail: 'robotics@gcet.edu',
    activeEventsCount: 1,
    openProjectsCount: 1,
    verified: true
  }
];

export const initialChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    communityId: 'comm-ai-society',
    senderId: 'comm-ai-lead',
    senderName: 'Aarav Sharma (Club Lead)',
    senderRole: 'community',
    text: 'Hey there! Welcome to the GCET Developer Club & AI Society chat room. How can we help you today? Feel free to ask about our upcoming AI Buildathon or project teams.',
    timestamp: '10:30 AM',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'msg-2',
    communityId: 'comm-ai-society',
    senderId: 'user-sharmishtha',
    senderName: 'Sharmishtha Pal',
    senderRole: 'individual',
    text: 'Hi Aarav! I have UI/UX experience and would love to collaborate on the upcoming AI Buildathon project teams.',
    timestamp: '10:32 AM',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'msg-3',
    communityId: 'comm-ai-society',
    senderId: 'comm-ai-lead',
    senderName: 'Aarav Sharma (Club Lead)',
    senderRole: 'community',
    text: 'That would be awesome! We have two ML teams currently looking for a UI/UX designer for the healthcare track. We will pair you up during the team matching sprint!',
    timestamp: '10:33 AM',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'msg-4',
    communityId: 'comm-design-guild',
    senderId: 'comm-design-lead',
    senderName: 'Design Collective Organizer',
    senderRole: 'community',
    text: 'Welcome to Design Collective! Drop your portfolio links or ask about our upcoming Figma Design Systems masterclass.',
    timestamp: 'Yesterday',
    avatar: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'msg-5',
    communityId: 'comm-robotics',
    senderId: 'comm-robotics-lead',
    senderName: 'Ananya Joshi (Club Lead)',
    senderRole: 'community',
    text: 'Hi makers! Our lab is open for ROS2 simulations and hardware testing on Tuesdays and Thursdays. Let us know if you need parts or mentorship.',
    timestamp: '2 days ago',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80'
  }
];

export const mockEventComments: Record<string, EventComment[]> = {
  'evt-buildathon': [
    {
      id: 'cmt-101',
      eventId: 'evt-buildathon',
      authorId: 'user-kabir',
      authorName: 'Kabir Mehta',
      authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      authorRole: '3rd Year • Backend & AI',
      type: 'team-up',
      content: 'Looking for 1 frontend dev (React/Next.js) and 1 UI/UX designer for our team! We are building an AI patient triage dashboard with PyTorch + FastAPI. Reach out if interested!',
      timestamp: '3 hours ago',
      likes: 6,
      likedByMe: false,
      replies: [
        {
          id: 'rep-101-1',
          authorId: 'user-riya',
          authorName: 'Riya Sen',
          authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
          authorRole: '3rd Year CSE • Fullstack',
          content: 'Hey Kabir! I would love to jump in as frontend engineer. Check out my projects on Synapse or ping me on Discord!',
          timestamp: '2 hours ago',
          likes: 3,
          likedByMe: true
        }
      ]
    },
    {
      id: 'cmt-102',
      eventId: 'evt-buildathon',
      authorId: 'user-aarav-patel',
      authorName: 'Aarav Patel',
      authorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
      authorRole: '2nd Year ECE',
      type: 'question',
      content: 'Can we participate as solo hackers, or do we strictly need a team of 2 to 4?',
      timestamp: '5 hours ago',
      likes: 4,
      likedByMe: false,
      replies: [
        {
          id: 'rep-102-1',
          authorId: 'comm-ai-society-lead',
          authorName: 'GCET AI Society Organizer',
          authorAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
          authorRole: 'Event Organizer',
          isOrganizer: true,
          content: 'Solo hackers are 100% welcome to register! We will also host a 30-minute team matching mixer right before kick-off if you want to find teammates on the spot.',
          timestamp: '4 hours ago',
          likes: 8,
          likedByMe: true
        }
      ]
    },
    {
      id: 'cmt-103',
      eventId: 'evt-buildathon',
      authorId: 'user-divya',
      authorName: 'Divya Nair',
      authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
      authorRole: '4th Year • Data Science',
      type: 'general',
      content: 'Super excited for the compute credits! Are we permitted to run local models with Ollama / vLLM as well for offline evaluation?',
      timestamp: '1 day ago',
      likes: 5,
      likedByMe: false,
      replies: []
    }
  ],
  'evt-uiux-workshop': [
    {
      id: 'cmt-201',
      eventId: 'evt-uiux-workshop',
      authorId: 'user-ananya',
      authorName: 'Ananya Joshi',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      authorRole: '2nd Year Design',
      type: 'question',
      content: 'Do we need a Figma paid plan or is the free student education license sufficient for the token library exercises?',
      timestamp: '4 hours ago',
      likes: 7,
      likedByMe: false,
      replies: [
        {
          id: 'rep-201-1',
          authorId: 'comm-design-guild-lead',
          authorName: 'Design Collective Team',
          authorAvatar: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=120&auto=format&fit=crop&q=80',
          authorRole: 'Workshop Lead',
          isOrganizer: true,
          content: 'The free student plan is 100% sufficient! We will provide a downloadable starter kit with pre-mapped component tokens.',
          timestamp: '3 hours ago',
          likes: 5,
          likedByMe: true
        }
      ]
    },
    {
      id: 'cmt-202',
      eventId: 'evt-uiux-workshop',
      authorId: 'user-sharmishtha',
      authorName: 'Sharmishtha Pal',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      authorRole: 'Lead UI/UX Designer',
      type: 'team-up',
      content: 'Looking for fellow student designers who want to do collaborative portfolio reviews after the session. Ping me here or on campus!',
      timestamp: '6 hours ago',
      likes: 9,
      likedByMe: true,
      replies: []
    }
  ],
  'evt-healthai-hackathon': [
    {
      id: 'cmt-301',
      eventId: 'evt-healthai-hackathon',
      authorId: 'user-rohan',
      authorName: 'Rohan Gupta',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      authorRole: '4th Year • Systems & Cloud',
      type: 'question',
      content: 'Will cloud GPU credits (AWS / GCP / Lambda) be distributed to accepted teams for training heavy vision transformers?',
      timestamp: '2 hours ago',
      likes: 11,
      likedByMe: false,
      replies: [
        {
          id: 'rep-301-1',
          authorId: 'comm-ai-society-lead',
          authorName: 'MedTech Sprint Committee',
          authorAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
          authorRole: 'Event Host',
          isOrganizer: true,
          content: 'Yes! Every shortlisted team will receive $150 in compute vouchers and access to anonymized validation test sets.',
          timestamp: '1 hour ago',
          likes: 8,
          likedByMe: true
        }
      ]
    },
    {
      id: 'cmt-302',
      eventId: 'evt-healthai-hackathon',
      authorId: 'user-tanvi',
      authorName: 'Tanvi Rao',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      authorRole: 'ML Researcher',
      type: 'team-up',
      content: 'We are a team of 2 ML researchers working on chest X-ray heatmaps. Seeking a Flutter or React Native developer to help build the mobile clinic interface!',
      timestamp: '5 hours ago',
      likes: 4,
      likedByMe: false,
      replies: []
    }
  ],
  'evt-fullstack-ai': [
    {
      id: 'cmt-401',
      eventId: 'evt-fullstack-ai',
      authorId: 'user-vikram',
      authorName: 'Vikram Singh',
      authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
      authorRole: '3rd Year CSE',
      type: 'question',
      content: 'Will the Discord Stage session be recorded in case we have lecture clashes during the first 45 minutes?',
      timestamp: '1 day ago',
      likes: 8,
      likedByMe: false,
      replies: [
        {
          id: 'rep-401-1',
          authorId: 'comm-ai-society-lead',
          authorName: 'DevSync Workshop Crew',
          authorAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
          authorRole: 'Organizer',
          isOrganizer: true,
          content: 'Yes, the full recording, slide deck, and GitHub starter repository will be pinned in the event channel right after the session!',
          timestamp: '18 hours ago',
          likes: 6,
          likedByMe: true
        }
      ]
    }
  ],
  'evt-robotics-bootcamp': [
    {
      id: 'cmt-501',
      eventId: 'evt-robotics-bootcamp',
      authorId: 'user-siddharth',
      authorName: 'Siddharth Rao',
      authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      authorRole: 'Mechanical & Robotics',
      type: 'question',
      content: 'Do we need to bring our own microcontrollers/Raspberry Pi or will equipment be provided in Lab 104?',
      timestamp: '2 days ago',
      likes: 6,
      likedByMe: false,
      replies: [
        {
          id: 'rep-501-1',
          authorId: 'comm-robotics-lead',
          authorName: 'Ananya Joshi (Club Lead)',
          authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
          authorRole: 'Organizer',
          isOrganizer: true,
          content: 'Hardware kits with RPi 4 and LiDAR modules are supplied at each bench! Just bring a laptop with Ubuntu or WSL2 configured.',
          timestamp: '1 day ago',
          likes: 7,
          likedByMe: true
        }
      ]
    }
  ]
};
