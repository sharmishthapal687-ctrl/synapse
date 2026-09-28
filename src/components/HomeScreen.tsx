import { useState, type FormEvent } from 'react';
import { Sparkles, ArrowRight, User as UserIcon, Calendar, FolderGit2, ArrowUpRight } from 'lucide-react';
import type { User, CommunityEvent, CommunityProject } from '../types';

interface HomeScreenProps {
  onSearch: (query: string) => void;
  onSelectPerson: (user: User) => void;
  onSelectEvent: (event: CommunityEvent) => void;
  onSelectProject: (project: CommunityProject) => void;
  recommendedPerson: User;
  recommendedEvent: CommunityEvent;
  recommendedProject: CommunityProject;
}

const SAMPLE_QUERIES = [
  "I want to build an AI healthcare project and need a Python developer",
  "Looking for a Figma UI/UX designer for a campus hackathon",
  "Upcoming robotics and IoT workshops this month"
];

export const HomeScreen = ({
  onSearch,
  onSelectPerson,
  onSelectEvent,
  onSelectProject,
  recommendedPerson,
  recommendedEvent,
  recommendedProject
}: HomeScreenProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleUseSample = (sample: string) => {
    setQuery(sample);
    onSearch(sample);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 relative">
      {/* Ambient Neon Flare */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[600px] h-[240px] bg-[#D4FF00]/12 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* Hero Section */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 relative">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-300 text-xs font-mono tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D4FF00]" />
            <span>// 001. SEMANTIC COMMUNITY INTELLIGENCE</span>
          </div>
        </div>
        
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none uppercase font-mono">
          FIND YOUR PEOPLE. <br />
          <span className="text-[#D4FF00]">DISCOVER OPPORTUNITIES.</span>
        </h1>
        
        <p className="mt-4 text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
          Tell us what you're looking for in natural language. We match you with student builders, collaborative projects, and live events.
        </p>
      </div>

      {/* Large AI Search Box */}
      <div className="max-w-3xl mx-auto mb-14 sm:mb-18">
        <form 
          onSubmit={handleSubmit}
          className="relative bg-[#141417]/90 backdrop-blur-md rounded-2xl border-2 border-zinc-800 shadow-[0_0_40px_rgba(0,0,0,0.6)] hover:border-zinc-700 focus-within:border-[#D4FF00] focus-within:ring-4 focus-within:ring-[#D4FF00]/15 transition-all p-2 sm:p-2.5"
        >
          <div className="flex items-start sm:items-center gap-3 px-2">
            <div className="pt-2 sm:pt-0 pl-1 text-[#D4FF00]">
              <Sparkles className="w-5 h-5 text-[#D4FF00]" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try: I need a Python developer for an AI healthcare project"
              className="w-full py-2.5 text-xs sm:text-base text-white placeholder-zinc-500 bg-transparent focus:outline-none font-sans"
            />
            <button
              type="submit"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#D4FF00] hover:bg-[#BEF200] text-black text-xs sm:text-sm font-black tracking-wide uppercase rounded-xl shadow-[0_0_15px_rgba(212,255,0,0.25)] transition-all cursor-pointer shrink-0"
            >
              <span>Find matches</span>
              <ArrowRight className="w-4 h-4 text-black stroke-[2.5]" />
            </button>
          </div>

          <div className="sm:hidden mt-2 pt-2 border-t border-zinc-800 flex justify-end">
            <button
              type="submit"
              className="w-full py-2.5 bg-[#D4FF00] hover:bg-[#BEF200] text-black text-xs font-black tracking-wide uppercase rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <span>Find matches</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Suggested Queries */}
        <div className="mt-3.5 flex flex-wrap items-center gap-2 px-1">
          <span className="text-[11px] text-zinc-500 font-mono tracking-wider">// TRY ASKING:</span>
          {SAMPLE_QUERIES.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleUseSample(sample)}
              className="text-xs text-zinc-300 hover:text-[#D4FF00] bg-zinc-900/90 border border-zinc-800 hover:border-[#D4FF00]/50 px-2.5 py-1 rounded-lg transition-all cursor-pointer text-left truncate max-w-xs sm:max-w-none shadow-2xs font-mono"
            >
              "{sample}"
            </button>
          ))}
        </div>
      </div>

      {/* Recommended For You Section */}
      <section className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-zinc-800/80">
          <h2 className="text-sm sm:text-base font-bold text-white tracking-wider uppercase font-mono flex items-center gap-2">
            <span>RECOMMENDED FOR YOU</span>
          </h2>
          <span className="text-[11px] font-mono font-medium text-[#D4FF00] bg-[#D4FF00]/10 border border-[#D4FF00]/30 px-2.5 py-0.5 rounded-full">
            // PROFILE MATCH
          </span>
        </div>

        {/* 3 Simple Cards: Person, Event, Project */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {/* 1. Person Card */}
          <div className="relative group bg-[#141417]/85 backdrop-blur-md rounded-2xl border border-zinc-800/90 p-5 flex flex-col justify-between hover:border-[#D4FF00]/50 hover:shadow-[0_0_30px_rgba(212,255,0,0.12)] transition-all overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-zinc-700/60 to-transparent group-hover:via-[#D4FF00] transition-colors" />
            <div className="absolute top-3 right-3 text-[9px] font-mono text-zinc-600 select-none opacity-50 group-hover:opacity-100 group-hover:text-[#D4FF00] transition-all">
              +01
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider mb-3">
                <UserIcon className="w-3.5 h-3.5 text-[#D4FF00]" />
                <span>COLLABORATOR</span>
              </div>
              
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={recommendedPerson.avatar}
                  alt={recommendedPerson.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-zinc-800 shrink-0"
                />
                <div>
                  <h3 className="text-sm font-bold text-white leading-snug">
                    {recommendedPerson.name}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    {recommendedPerson.role}
                  </p>
                </div>
              </div>

              <p className="text-xs text-zinc-400 line-clamp-2 mb-3.5 leading-relaxed">
                {recommendedPerson.bio}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {recommendedPerson.skills.slice(0, 3).map(skill => (
                  <span
                    key={skill}
                    className="text-[11px] font-mono font-medium bg-zinc-900/90 border border-zinc-800 text-zinc-300 px-2 py-0.5 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectPerson(recommendedPerson)}
              className="w-full py-2 px-3 rounded-xl border border-zinc-700 hover:border-[#D4FF00] hover:text-[#D4FF00] text-xs font-bold text-zinc-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer bg-zinc-900/60 font-mono"
            >
              <span>View profile</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
            </button>
          </div>

          {/* 2. Event Card */}
          <div className="relative group bg-[#141417]/85 backdrop-blur-md rounded-2xl border border-zinc-800/90 p-5 flex flex-col justify-between hover:border-[#D4FF00]/50 hover:shadow-[0_0_30px_rgba(212,255,0,0.12)] transition-all overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-zinc-700/60 to-transparent group-hover:via-[#D4FF00] transition-colors" />
            <div className="absolute top-3 right-3 text-[9px] font-mono text-zinc-600 select-none opacity-50 group-hover:opacity-100 group-hover:text-[#D4FF00] transition-all">
              +02
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider mb-3">
                <Calendar className="w-3.5 h-3.5 text-[#D4FF00]" />
                <span>UPCOMING EVENT</span>
              </div>

              <div className="mb-3">
                <span className="text-[11px] font-mono font-bold text-[#D4FF00] bg-[#D4FF00]/10 border border-[#D4FF00]/30 px-2 py-0.5 rounded-md inline-block mb-1.5">
                  {recommendedEvent.date}
                </span>
                <h3 className="text-sm font-bold text-white leading-snug">
                  {recommendedEvent.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {recommendedEvent.location}
                </p>
              </div>

              <p className="text-xs text-zinc-400 line-clamp-2 mb-3.5 leading-relaxed">
                {recommendedEvent.shortDescription}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {recommendedEvent.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono font-medium bg-zinc-900/90 border border-zinc-800 text-zinc-300 px-2 py-0.5 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectEvent(recommendedEvent)}
              className="w-full py-2 px-3 rounded-xl border border-zinc-700 hover:border-[#D4FF00] hover:text-[#D4FF00] text-xs font-bold text-zinc-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer bg-zinc-900/60 font-mono"
            >
              <span>View event & summary</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
            </button>
          </div>

          {/* 3. Project Card */}
          <div className="relative group bg-[#141417]/85 backdrop-blur-md rounded-2xl border border-zinc-800/90 p-5 flex flex-col justify-between hover:border-[#D4FF00]/50 hover:shadow-[0_0_30px_rgba(212,255,0,0.12)] transition-all overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-zinc-700/60 to-transparent group-hover:via-[#D4FF00] transition-colors" />
            <div className="absolute top-3 right-3 text-[9px] font-mono text-zinc-600 select-none opacity-50 group-hover:opacity-100 group-hover:text-[#D4FF00] transition-all">
              +03
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider mb-3">
                <FolderGit2 className="w-3.5 h-3.5 text-[#D4FF00]" />
                <span>OPEN PROJECT</span>
              </div>

              <div className="mb-3">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                    {recommendedProject.status}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white leading-snug">
                  {recommendedProject.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  By {recommendedProject.ownerName}
                </p>
              </div>

              <p className="text-xs text-zinc-400 line-clamp-2 mb-3.5 leading-relaxed">
                {recommendedProject.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {recommendedProject.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono font-medium bg-zinc-900/90 border border-zinc-800 text-zinc-300 px-2 py-0.5 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectProject(recommendedProject)}
              className="w-full py-2 px-3 rounded-xl border border-zinc-700 hover:border-[#D4FF00] hover:text-[#D4FF00] text-xs font-bold text-zinc-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer bg-zinc-900/50"
            >
              <span>Explore project</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
