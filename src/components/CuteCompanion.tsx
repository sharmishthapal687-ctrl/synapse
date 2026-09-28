import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Sparkles, X, Send, ArrowRight, Play, Pause, ThumbsUp } from 'lucide-react';

interface CuteCompanionProps {
  onNavigate?: (screen: string) => void;
}

interface DialogMessage {
  id: string;
  sender: 'byte' | 'user';
  text: string;
  action?: {
    label: string;
    screen: string;
  };
  mood?: 'happy' | 'excited' | 'love' | 'waving' | 'thinking';
}

const PROFESSIONAL_TIPS = [
  "Tip: Adding concrete stack keywords (e.g., PyTorch, FastAPI, Next.js) to your profile increases collaborator match accuracy by over 60%.",
  "Insight: Cross-functional hackathon teams comprising 1 ML engineer, 1 frontend developer, and 1 UI designer have the highest rate of project completion.",
  "Architecture: Synapse processes natural-language search queries through semantic intent extraction, parsing technical roles and project goals in real time.",
  "Community: Active participation in student developer collectives provides direct access to peer reviews, shared GPU resources, and project mentorship.",
  "Best Practice: Specifying explicit collaboration goals (e.g., 'Hackathon Teammates' or 'Startup Co-founder') enables precise peer matching."
];

const ROAM_BUBBLES = [
  "Need collaborator matching? Click to consult.",
  "Discover campus hackathons & workshops.",
  "Explore verified tech communities.",
  "Synapse AI Copilot is online and ready.",
  "Looking for teammates? Inquire here.",
  "Optimize your builder dossier today."
];

// Preset safe roaming waypoints in viewport %
const WAYPOINTS = [
  { x: 82, y: 72 }, // Bottom right
  { x: 78, y: 22 }, // Top right
  { x: 12, y: 35 }, // Upper left
  { x: 20, y: 74 }, // Bottom left
  { x: 85, y: 48 }, // Middle right
  { x: 10, y: 55 }, // Middle left
];

export const CuteCompanion = ({ onNavigate }: CuteCompanionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mood, setMood] = useState<'happy' | 'excited' | 'love' | 'waving' | 'thinking'>('happy');
  const [helpfulCount, setHelpfulCount] = useState(24);
  const [showFeedbackPop, setShowFeedbackPop] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  
  // Background roaming state
  const [isRoaming, setIsRoaming] = useState(true);
  const [position, setPosition] = useState({ x: 82, y: 72 });
  const [facingLeft, setFacingLeft] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [roamTextIndex, setRoamTextIndex] = useState(0);
  
  const [messages, setMessages] = useState<DialogMessage[]>([
    {
      id: 'welcome-1',
      sender: 'byte',
      text: "Hello! I am Byte, your Synapse Campus Intelligence Assistant. I assist student builders and campus organizations with collaborator matchmaking, event discovery, community engagement, and profile optimization. How can I assist your project today?",
      mood: 'waving'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Background Roaming Timer: Move Byte to new waypoints across the screen
  useEffect(() => {
    if (!isRoaming || isOpen || isHovered) return;

    const moveInterval = setInterval(() => {
      setPosition((prev) => {
        // Pick a waypoint different from current
        const nextWaypoint = WAYPOINTS[Math.floor(Math.random() * WAYPOINTS.length)];
        // Determine facing direction
        setFacingLeft(nextWaypoint.x < prev.x);
        return nextWaypoint;
      });

      // Cycle idle speech bubble text
      setRoamTextIndex(prev => (prev + 1) % ROAM_BUBBLES.length);
    }, 7500);

    return () => clearInterval(moveInterval);
  }, [isRoaming, isOpen, isHovered]);

  const handleAppreciation = () => {
    setMood('excited');
    setHelpfulCount(prev => prev + 1);
    setShowFeedbackPop(true);
    setTimeout(() => setShowFeedbackPop(false), 1200);
    setTimeout(() => setMood('happy'), 2500);

    const professionalReplies = [
      "Thank you for the positive assessment. Systems are operating at peak efficiency to support your campus projects.",
      "Acknowledged with thanks! My priority is ensuring you find top-tier collaborators and campus opportunities.",
      "Appreciated. Feel free to query me regarding upcoming hackathon deadlines, team requirements, or club rosters."
    ];
    const reply = professionalReplies[Math.floor(Math.random() * professionalReplies.length)];
    
    setMessages(prev => [
      ...prev,
      {
        id: `feedback-${Date.now()}`,
        sender: 'byte',
        text: reply,
        mood: 'excited'
      }
    ]);
  };

  const handleTopicClick = (topic: string) => {
    let userText = '';
    let byteReply: DialogMessage = {
      id: `reply-${Date.now()}`,
      sender: 'byte',
      text: '',
      mood: 'happy'
    };

    switch (topic) {
      case 'overview':
        userText = "What is Synapse and what can it do for me?";
        byteReply = {
          id: `reply-${Date.now()}`,
          sender: 'byte',
          text: "Synapse is an intelligent campus builder network designed for university engineers, designers, and student organizations.\n\nCore capabilities include:\n• Semantic Talent Search: Query student builders using natural-language project descriptions.\n• Find My Team: Algorithm-driven teammate discovery with role coverage and compatibility scoring.\n• Curated Campus Events: Hackathons and workshops featuring auto-generated AI briefs and community Q&A.\n• Verified Communities: Direct access to student tech chapters, organizer tools, and event management.",
          mood: 'happy',
          action: {
            label: "Explore Home Directory ⚡",
            screen: 'home'
          }
        };
        break;

      case 'team':
        userText = "How does collaborator matchmaking work?";
        byteReply = {
          id: `reply-${Date.now()}`,
          sender: 'byte',
          text: "Our collaborator engine connects project leads with candidates based on complementary skill coverage and role alignment:\n\n1. Specify the vacancy roles your project requires (e.g., Frontend, Machine Learning, UI/UX).\n2. Synapse analyzes registered student dossiers and computes compatibility match ratings.\n3. Review candidate portfolios, past GitHub builds, and send direct invitations.",
          mood: 'excited',
          action: {
            label: "Launch Find My Team 🤝",
            screen: 'team'
          }
        };
        break;

      case 'communities':
        userText = "How can I discover or register campus communities?";
        byteReply = {
          id: `reply-${Date.now()}`,
          sender: 'byte',
          text: "The Communities Directory is the central registry for verified campus engineering chapters, design guilds, and robotics clubs.\n\n• For Students: Join open chat rooms, explore project initiatives, and connect directly with club leads.\n• For Organizers: Use the Community Hub to manage your public showcase, publish events, and respond to incoming member inquiries.",
          mood: 'happy',
          action: {
            label: "Browse Communities Directory 🏛️",
            screen: 'communities'
          }
        };
        break;

      case 'events':
        userText = "How do event AI summaries and Q&A work?";
        byteReply = {
          id: `reply-${Date.now()}`,
          sender: 'byte',
          text: "Every event published on Synapse includes an automated AI intelligence brief:\n\n• Executive TL;DR: Key objectives and deliverables at a glance.\n• Target Demographic: Recommended skill levels and participant tracks.\n• Prerequisites: Clear technical requirements and necessary toolkits.\n• Community Q&A: Dedicated discussion threads to query organizers or recruit teammates.",
          mood: 'excited',
          action: {
            label: "Explore Campus Events 📅",
            screen: 'events'
          }
        };
        break;

      case 'profile':
        userText = "How should I optimize my builder profile?";
        const randomTip = PROFESSIONAL_TIPS[Math.floor(Math.random() * PROFESSIONAL_TIPS.length)];
        byteReply = {
          id: `reply-${Date.now()}`,
          sender: 'byte',
          text: `To maximize visibility to peer collaborators and club leads, follow these recommendations:\n\n1. Technical Matrix: Specify verified language and framework tags in your skills dossier.\n2. Portfolio Projects: Highlight functional builds with concise architecture descriptions and repository links.\n3. Intent Clarification: State explicit collaboration preferences.\n\n💡 Professional Insight: "${randomTip}"`,
          mood: 'happy',
          action: {
            label: "Edit Builder Profile 👤",
            screen: 'profile'
          }
        };
        break;

      default:
        break;
    }

    if (userText) {
      setMessages(prev => [
        ...prev,
        { id: `user-${Date.now()}`, sender: 'user', text: userText },
        byteReply
      ]);
      setMood(byteReply.mood || 'happy');
    }
  };

  const handleUserSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage.trim();
    setInputMessage('');

    // Append user message
    const userMsg: DialogMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText
    };

    setMessages(prev => [...prev, userMsg]);
    setMood('thinking');

    // Generate intelligent, professional contextual response
    setTimeout(() => {
      const lower = userText.toLowerCase();
      let responseText = "I have processed your query. Synapse is structured around four primary pillars: Collaborator Matchmaking, Campus Event Intelligence, Verified Tech Communities, and Builder Dossiers. Please select an option below or specify your objective.";
      let nextMood: 'happy' | 'excited' | 'love' | 'waving' | 'thinking' = 'happy';
      let action: { label: string; screen: string } | undefined = undefined;

      if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('greetings')) {
        responseText = "Greetings. I am Byte, your Synapse AI Copilot. How can I assist your project research, collaborator recruitment, or community engagement today?";
        nextMood = 'waving';
      } else if (lower.includes('club') || lower.includes('community') || lower.includes('communities') || lower.includes('society') || lower.includes('chapter')) {
        responseText = "Synapse provides access to verified student organizations, including Developer Clubs, Design Guilds, and Robotics Societies. You can explore active initiatives, initiate direct inquiries with club leadership, or register a new club via the Organizer Hub.";
        nextMood = 'excited';
        action = { label: "View All Communities 🏛️", screen: 'communities' };
      } else if (lower.includes('ai') || lower.includes('python') || lower.includes('machine learning') || lower.includes('ml') || lower.includes('deep learning')) {
        responseText = "Artificial intelligence is a primary domain across our student network. The Home screen features a semantic search engine that parses natural-language project concepts and identifies engineers with matching model training, PyTorch, or backend experience.";
        nextMood = 'excited';
        action = { label: "Try AI Semantic Search ⚡", screen: 'search' };
      } else if (lower.includes('event') || lower.includes('hackathon') || lower.includes('workshop') || lower.includes('bootcamp')) {
        responseText = "We index campus hackathons, engineering workshops, and design bootcamps. Each event listing includes an automated AI brief covering prerequisites, key objectives, and a dedicated team-formation Q&A discussion board.";
        nextMood = 'happy';
        action = { label: "Browse Campus Events 📅", screen: 'events' };
      } else if (lower.includes('team') || lower.includes('collaborator') || lower.includes('partner') || lower.includes('match') || lower.includes('group')) {
        responseText = "To assemble a hackathon or project team, navigate to 'Find a Team'. You can filter candidate builders by domain expertise, semester year, and complementary skill coverage scores.";
        nextMood = 'waving';
        action = { label: "Find Collaborators 🤝", screen: 'team' };
      } else if (lower.includes('profile') || lower.includes('edit') || lower.includes('resume') || lower.includes('portfolio') || lower.includes('skill')) {
        responseText = "Maintaining an up-to-date builder profile ensures higher visibility across search results. You can update your skills matrix, project repository links, and collaboration goals directly in your dossier.";
        nextMood = 'happy';
        action = { label: "Open Profile Editor 👤", screen: 'profile' };
      } else if (lower.includes('search') || lower.includes('find') || lower.includes('query')) {
        responseText = "Our semantic search engine accepts natural-language prompts such as 'Looking for a Rust systems developer' or 'Need a Figma designer for a healthcare hackathon'. It automatically extracts required roles and ranks candidates by relevance.";
        nextMood = 'excited';
        action = { label: "Execute AI Search ⚡", screen: 'search' };
      } else if (lower.includes('tech') || lower.includes('stack') || lower.includes('react') || lower.includes('next') || lower.includes('fastapi')) {
        responseText = "Technical skills are indexed dynamically in Synapse. Specifying concrete technologies in your profile or team requirements helps our semantic engine match complementary builder profiles accurately.";
        nextMood = 'happy';
      }

      setMood(nextMood);
      setMessages(prev => [
        ...prev,
        {
          id: `byte-${Date.now()}`,
          sender: 'byte',
          text: responseText,
          mood: nextMood,
          action
        }
      ]);
    }, 500);
  };

  return (
    <>
      {/* Roaming Animated Character in the Background/Viewport */}
      <div 
        style={{
          left: isOpen ? 'auto' : `${position.x}vw`,
          top: isOpen ? 'auto' : `${position.y}vh`,
          right: isOpen ? '24px' : 'auto',
          bottom: isOpen ? '68px' : 'auto',
          transform: 'translate(-50%, -50%)',
          transition: isHovered 
            ? 'none' 
            : 'left 5.5s cubic-bezier(0.25, 1, 0.5, 1), top 5.5s cubic-bezier(0.25, 1, 0.5, 1)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed z-40 flex flex-col items-center pointer-events-auto select-none"
      >
        {/* Floating Speech Pill (Always 100% upright and never mirrored) */}
        {!isOpen && (
          <div 
            onClick={() => setIsOpen(true)}
            className="mb-1.5 bg-[#141417]/95 border border-[#D4FF00]/60 text-white text-[10px] sm:text-[11px] font-mono font-bold px-3 py-1 rounded-2xl shadow-[0_0_20px_rgba(212,255,0,0.25)] flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-all group backdrop-blur-md whitespace-nowrap animate-bounce"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4FF00] group-hover:rotate-12 transition-transform" />
            <span className="text-zinc-200 group-hover:text-[#D4FF00] transition-colors">
              {isHovered ? "Consult Byte AI Assistant ⚡" : ROAM_BUBBLES[roamTextIndex]}
            </span>
          </div>
        )}

        {/* Helpful Feedback Pop Animation */}
        {showFeedbackPop && (
          <div 
            className="absolute -top-8 text-[#D4FF00] text-xs font-mono font-bold animate-bounce pointer-events-none flex items-center gap-1.5 bg-black/95 px-2.5 py-1 rounded-full border border-[#D4FF00]/40 shadow-sm"
          >
            <ThumbsUp className="w-3.5 h-3.5 fill-[#D4FF00] text-[#D4FF00] animate-ping" />
            <span>+1 Helpful</span>
          </div>
        )}

        {/* Byte SVG Character Avatar with floating motion */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Talk with Byte the roaming campus buddy"
          className="group relative cursor-pointer focus:outline-none"
          title="Click to catch and talk with Byte!"
        >
          {/* Ambient Glow Aura */}
          <div className="absolute inset-0 bg-[#D4FF00]/25 blur-xl rounded-full scale-90 group-hover:scale-125 transition-transform" />

          {/* Orientation Wrapper: Flips ONLY Byte's sprite when moving left, NEVER the text above */}
          <div
            style={{
              transform: facingLeft ? 'scaleX(-1)' : 'scaleX(1)',
              transition: 'transform 0.35s ease'
            }}
          >
            {/* Animated Body Container */}
            <div className="relative animate-cute-float">
              <svg 
                width="68" 
                height="68" 
                viewBox="0 0 100 100" 
                className="drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] group-hover:scale-110 transition-transform duration-200"
              >
              {/* Antenna with Pulsing Glow Star */}
              <line x1="50" y1="26" x2="50" y2="12" stroke="#D4FF00" strokeWidth="3.5" strokeLinecap="round" />
              <circle 
                cx="50" 
                cy="10" 
                r="6" 
                fill="#D4FF00" 
                className="animate-cute-antenna"
              />

              {/* Little Robotic Ears */}
              <rect x="18" y="44" width="7" height="14" rx="3.5" fill="#27272A" stroke="#D4FF00" strokeWidth="1.5" />
              <rect x="75" y="44" width="7" height="14" rx="3.5" fill="#27272A" stroke="#D4FF00" strokeWidth="1.5" />

              {/* Main Rounded Head & Body (Cute Chibi Capsule) */}
              <rect 
                x="22" 
                y="24" 
                width="56" 
                height="54" 
                rx="22" 
                fill="#18181B" 
                stroke="#3F3F46" 
                strokeWidth="2.5" 
              />

              {/* Glass Face Screen / Visor */}
              <rect 
                x="28" 
                y="34" 
                width="44" 
                height="34" 
                rx="14" 
                fill="#09090B" 
                stroke="#D4FF00" 
                strokeWidth="1.5" 
              />

              {/* Face Expressions */}
              {mood === 'love' ? (
                <>
                  {/* Heart Eyes */}
                  <path d="M 38 48 C 38 44 44 44 44 48 C 44 52 38 56 38 56 C 38 56 32 52 32 48 C 32 44 38 44 38 48 Z" fill="#FF4D6D" />
                  <path d="M 62 48 C 62 44 68 44 68 48 C 68 52 62 56 62 56 C 62 56 56 52 56 48 C 56 44 62 44 62 48 Z" fill="#FF4D6D" />
                  {/* Happy Open Smile */}
                  <path d="M 45 56 Q 50 61 55 56" stroke="#D4FF00" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </>
              ) : mood === 'excited' ? (
                <>
                  {/* Star Eyes (★ ★) */}
                  <polygon points="38,44 40,49 45,49 41,52 43,57 38,54 33,57 35,52 31,49 36,49" fill="#D4FF00" />
                  <polygon points="62,44 64,49 69,49 65,52 67,57 62,54 57,57 59,52 55,49 60,49" fill="#D4FF00" />
                  {/* Big Smile */}
                  <path d="M 44 54 Q 50 62 56 54 Z" fill="#D4FF00" />
                </>
              ) : mood === 'waving' ? (
                <>
                  {/* Winking Left Eye & Big Right Eye */}
                  <path d="M 34 50 Q 39 46 44 50" stroke="#D4FF00" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <ellipse cx="62" cy="49" rx="4.5" ry="5.5" fill="#D4FF00" />
                  <circle cx="63.5" cy="47.5" r="1.5" fill="#FFFFFF" />
                  {/* Smile */}
                  <path d="M 46 56 Q 50 59 54 56" stroke="#D4FF00" strokeWidth="2" fill="none" strokeLinecap="round" />
                </>
              ) : mood === 'thinking' ? (
                <>
                  {/* Pondering Eyes */}
                  <ellipse cx="38" cy="46" rx="4" ry="5" fill="#D4FF00" />
                  <circle cx="39" cy="44.5" r="1.5" fill="#FFFFFF" />
                  <ellipse cx="62" cy="46" rx="4" ry="5" fill="#D4FF00" />
                  <circle cx="63" cy="44.5" r="1.5" fill="#FFFFFF" />
                  {/* Small Cute 'o' Mouth */}
                  <circle cx="50" cy="56" r="2.5" fill="#D4FF00" />
                </>
              ) : (
                <>
                  {/* Standard Happy Sparkle Eyes */}
                  <ellipse cx="38" cy="49" rx="4.5" ry="5.5" fill="#D4FF00" />
                  <circle cx="39.5" cy="47.5" r="1.5" fill="#FFFFFF" />
                  <ellipse cx="62" cy="49" rx="4.5" ry="5.5" fill="#D4FF00" />
                  <circle cx="63.5" cy="47.5" r="1.5" fill="#FFFFFF" />
                  {/* Cute Smile */}
                  <path d="M 45 56 Q 50 60 55 56" stroke="#D4FF00" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </>
              )}

              {/* Blush Cheeks */}
              <ellipse cx="32" cy="56" rx="3.5" ry="2" fill="#FF5E7E" opacity="0.8" />
              <ellipse cx="68" cy="56" rx="3.5" ry="2" fill="#FF5E7E" opacity="0.8" />

              {/* Cute Waving Right Arm / Paw */}
              <g className="animate-cute-wiggle" style={{ transformOrigin: '76px 62px' }}>
                <rect x="76" y="58" width="10" height="7" rx="3.5" fill="#D4FF00" />
              </g>

              {/* Left Little Paw */}
              <rect x="14" y="60" width="10" height="7" rx="3.5" fill="#27272A" stroke="#D4FF00" strokeWidth="1" />

              {/* Floating Mini Propulsion Jets */}
              <ellipse cx="40" cy="80" rx="4" ry="2.5" fill="#D4FF00" opacity="0.7" className="animate-pulse" />
              <ellipse cx="60" cy="80" rx="4" ry="2.5" fill="#D4FF00" opacity="0.7" className="animate-pulse" />
            </svg>
            </div>
          </div>
        </button>
      </div>

      {/* Interactive Dialogue Popover Card */}
      {isOpen && (
        <div 
          className="fixed bottom-36 sm:bottom-40 right-4 sm:right-6 z-50 w-[92vw] sm:w-[390px] max-h-[520px] bg-[#141417]/95 border-2 border-[#D4FF00]/50 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 text-white font-sans"
        >
          {/* Modal Header */}
          <div className="px-4 py-3 bg-[#09090B] border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#D4FF00] flex items-center justify-center text-black font-black text-xs font-mono">
                B
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-xs text-white">Byte</span>
                  <span className="text-[10px] font-mono text-[#D4FF00] bg-[#D4FF00]/10 border border-[#D4FF00]/30 px-1.5 py-0.2 rounded">
                    CAMPUS AI COPILOT
                  </span>
                </div>
                <p className="text-[10px] text-zinc-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online • Synapse Intelligence
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Roam Mode Toggle */}
              <button
                type="button"
                onClick={() => setIsRoaming(!isRoaming)}
                className={`px-2 py-1 border rounded-lg text-[10px] font-mono font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                  isRoaming
                    ? 'bg-[#D4FF00]/10 border-[#D4FF00]/40 text-[#D4FF00]'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                }`}
                title={isRoaming ? "Roam mode: ON (Click to park Byte)" : "Roam mode: OFF (Click to let Byte roam)"}
              >
                {isRoaming ? <Play className="w-3 h-3 fill-[#D4FF00]" /> : <Pause className="w-3 h-3" />}
                <span>{isRoaming ? "Roam" : "Park"}</span>
              </button>

              <button
                type="button"
                onClick={handleAppreciation}
                className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-[#D4FF00] border border-zinc-800 rounded-lg text-[10px] font-mono font-semibold transition-all flex items-center gap-1 cursor-pointer"
                title="Mark assistant response as helpful"
              >
                <ThumbsUp className="w-3 h-3 text-[#D4FF00]" />
                <span>Helpful ({helpfulCount})</span>
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Scrollable Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#09090B]/60 text-xs">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'byte' && (
                  <div className="w-6 h-6 rounded-full bg-[#D4FF00] text-black font-bold text-[10px] font-mono flex items-center justify-center shrink-0 mt-0.5">
                    🤖
                  </div>
                )}

                <div className="space-y-1.5 max-w-[82%]">
                  <div
                    className={`p-3 rounded-2xl leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-[#D4FF00] text-black font-semibold rounded-tr-xs shadow-sm'
                        : 'bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-tl-xs shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Optional Action Button */}
                  {msg.action && (
                    <button
                      type="button"
                      onClick={() => {
                        if (onNavigate && msg.action) {
                          onNavigate(msg.action.screen);
                          setIsOpen(false);
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-[#D4FF00] hover:text-black text-[#D4FF00] border border-[#D4FF00]/40 text-[11px] font-mono font-bold transition-all cursor-pointer shadow-xs"
                    >
                      <span>{msg.action.label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Topic Chips */}
          <div className="px-3 py-2 bg-[#141417] border-t border-zinc-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider shrink-0 mr-0.5">
              Topics:
            </span>
            <button
              type="button"
              onClick={() => handleTopicClick('overview')}
              className="text-[10px] text-zinc-300 bg-zinc-900 hover:bg-[#D4FF00] hover:text-black border border-zinc-800 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer font-mono"
            >
              📊 Overview
            </button>
            <button
              type="button"
              onClick={() => handleTopicClick('team')}
              className="text-[10px] text-zinc-300 bg-zinc-900 hover:bg-[#D4FF00] hover:text-black border border-zinc-800 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer font-mono"
            >
              🤝 Matchmaking
            </button>
            <button
              type="button"
              onClick={() => handleTopicClick('communities')}
              className="text-[10px] text-zinc-300 bg-zinc-900 hover:bg-[#D4FF00] hover:text-black border border-zinc-800 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer font-mono"
            >
              🏛️ Communities
            </button>
            <button
              type="button"
              onClick={() => handleTopicClick('events')}
              className="text-[10px] text-zinc-300 bg-zinc-900 hover:bg-[#D4FF00] hover:text-black border border-zinc-800 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer font-mono"
            >
              📅 Event Briefs
            </button>
            <button
              type="button"
              onClick={() => handleTopicClick('profile')}
              className="text-[10px] text-zinc-300 bg-zinc-900 hover:bg-[#D4FF00] hover:text-black border border-zinc-800 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer font-mono"
            >
              👤 Profile Tips
            </button>
          </div>

          {/* Interactive Chat Input Form */}
          <form onSubmit={handleUserSubmit} className="p-2.5 bg-[#09090B] border-t border-zinc-800 flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Inquire about teams, communities, events, or tech stacks..."
              className="flex-1 px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-[#D4FF00] text-white placeholder:text-zinc-500 font-sans"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2 bg-[#D4FF00] hover:bg-[#BEF200] disabled:opacity-30 text-black rounded-xl transition-all cursor-pointer shrink-0"
              title="Send to Byte"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
