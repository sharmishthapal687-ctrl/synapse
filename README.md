# ⚡ SYNAPSE // Campus Builder & Tech Network

> **Find your people. Build your ideas. Discover your next campus opportunity.**

Synapse is an intelligent campus networking and collaboration platform built for student developers, designers, researchers, and campus tech communities. It bridges the gap between individual student builders and university organizations with AI-powered semantic matching, automated event briefs, direct club communication, and an interactive campus copilot.

---

## ✨ Key Features

- **🎯 AI Semantic Talent Search**: Search for collaborators using natural language (e.g., *"Looking for a Python dev with computer vision experience for a health hackathon"*). Synapse parses tech roles, domain topics, and match reasoning in real time.
- **🤝 Find My Team (Matchmaker)**: Algorithm-driven collaborator search with role vacancy filtering, skill coverage analysis, and compatibility scoring.
- **📅 Events with Automated AI Briefs**: Interactive campus hackathon and workshop calendar. Every event features an auto-summarized brief (Executive TL;DR, Target Demographic, Prerequisites) and an interactive **Community Q&A / Team-Up Board**.
- **🏛️ Verified Communities & Direct Chat**: Central registry for college developer clubs, robotics collectives, and design guilds with direct student-to-lead chat inquiries.
- **📊 Community Organizer Hub**: Dedicated dashboard for club leads to manage public branding, review student inquiries, and publish events with automated AI summaries.
- **🤖 Byte — AI Campus Copilot**: An intelligent, roaming background assistant providing instant guidance on teammate discovery, event requirements, club rosters, and builder profile optimization.
- **🎨 Acid Lime Brutalist Design System**: High-contrast cyberpunk aesthetic featuring custom architectural blueprint grids, ambient radial neon illumination, and tactile film grain texture.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Tooling**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom CSS Keyframes & Blueprint Grids
- **Icons**: [Lucide React](https://lucide.dev/)
- **Search Engine**: Client-side semantic search & NLP intent extraction (`src/services/semanticSearch.ts`)

---

## 🚀 Quick Start Guide

### Prerequisites
Make sure you have **Node.js 18+** installed on your machine.

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   cd <your-repo-name>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📁 Project Architecture

```
src/
├── components/
│   ├── AIResultsScreen.tsx       # Semantic search results & intent breakdown
│   ├── ChatRoomModal.tsx         # Direct student-to-club chat rooms
│   ├── CommunitiesScreen.tsx     # Verified campus club directory & registry
│   ├── CommunityDashboard.tsx    # Club organizer hub & event creator
│   ├── CuteCompanion.tsx         # Byte - Roaming AI Campus Copilot
│   ├── EditProfileModal.tsx      # Comprehensive student profile editor
│   ├── EventCommentsSection.tsx  # Event Q&A, team-up & discussion threads
│   ├── EventsScreen.tsx          # Campus calendar & AI event summaries
│   ├── FindMyTeamScreen.tsx      # Collaborator matching & skill coverage
│   ├── HomeScreen.tsx            # Hero, quick search & spotlight initiatives
│   ├── Navbar.tsx                # Glass navigation & role switcher
│   ├── OnboardingScreen.tsx      # Student interest & skill onboarding
│   └── RoleSelectScreen.tsx      # Initial role gate (Individual vs Community)
├── data/
│   └── mockData.ts               # Seed data for users, clubs, events & comments
├── services/
│   └── semanticSearch.ts         # Natural language intent & role extraction
├── types/
│   └── index.ts                  # TypeScript interfaces & domain models
├── App.tsx                       # Root orchestrator & screen router
└── index.css                     # Brutalist theme, blueprint grids & animations
```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
