import { useState, type FormEvent } from 'react';
import { ArrowLeft, Sparkles, User as UserIcon, Calendar, FolderGit2, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import type { SearchResults, User, CommunityEvent, CommunityProject } from '../types';

interface AIResultsScreenProps {
  results: SearchResults;
  onBack: () => void;
  onNewSearch: (query: string) => void;
  onSelectPerson: (user: User) => void;
  onSelectEvent: (event: CommunityEvent) => void;
  onSelectProject: (project: CommunityProject) => void;
}

export const AIResultsScreen = ({
  results,
  onBack,
  onNewSearch,
  onSelectPerson,
  onSelectEvent,
  onSelectProject,
}: AIResultsScreenProps) => {
  const [searchInput, setSearchInput] = useState(results.interpretation.query);

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onNewSearch(searchInput.trim());
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Header with Back and Editable Search */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-zinc-300 hover:text-[#D4FF00] bg-[#141417] border border-zinc-800 hover:border-[#D4FF00]/50 px-3.5 py-2 rounded-xl transition-colors cursor-pointer w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK</span>
        </button>

        <form onSubmit={handleSearchSubmit} className="flex-1 relative">
          <div className="relative flex items-center">
            <Sparkles className="w-4 h-4 text-[#D4FF00] absolute left-3.5" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-24 py-2 text-xs sm:text-sm bg-[#141417] border border-zinc-800 rounded-xl focus:outline-none focus:border-[#D4FF00] text-white"
            />
            <button
              type="submit"
              className="absolute right-1.5 px-3 py-1 bg-[#D4FF00] hover:bg-[#BEF200] text-black text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer uppercase"
            >
              Update
            </button>
          </div>
        </form>
      </div>

      {/* AI Interpretation Box */}
      <div className="bg-[#141417] border border-[#D4FF00]/40 rounded-2xl p-5 mb-8 shadow-md">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-[#D4FF00]" />
          <h2 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider font-mono">
            // HERE'S WHAT WE UNDERSTOOD
          </h2>
          <span className="text-[10px] font-mono font-bold text-[#D4FF00] bg-[#D4FF00]/10 border border-[#D4FF00]/30 px-2.5 py-0.5 rounded-full ml-auto">
            SEMANTIC PARSER
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {results.interpretation.topics.map(topic => (
            <span
              key={topic}
              className="inline-flex items-center gap-1.5 text-xs font-medium bg-zinc-900 text-zinc-100 border border-zinc-800 px-3 py-1 rounded-lg"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D4FF00]" />
              {topic}
            </span>
          ))}

          {results.interpretation.roles.map(role => (
            <span
              key={role}
              className="inline-flex items-center gap-1.5 text-xs font-medium bg-zinc-900 text-zinc-100 border border-zinc-800 px-3 py-1 rounded-lg"
            >
              <UserIcon className="w-3.5 h-3.5 text-[#D4FF00]" />
              {role}
            </span>
          ))}

          <span className="inline-flex items-center gap-1 text-xs font-mono font-bold bg-[#D4FF00]/10 text-[#D4FF00] border border-[#D4FF00]/30 px-3 py-1 rounded-lg">
            GOAL: {results.interpretation.collaborationIntent}
          </span>
        </div>
      </div>

      {/* SECTION 1: PEOPLE */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <UserIcon className="w-4 h-4 text-[#D4FF00]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              PEOPLE ({results.people.length})
            </h3>
          </div>
          <span className="text-xs text-zinc-500 font-mono">// SKILL & INTENT RANKED</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {results.people.map(person => (
            <div
              key={person.id}
              className="bg-[#141417]/85 backdrop-blur-md rounded-2xl border border-zinc-800 p-5 flex flex-col justify-between hover:border-[#D4FF00]/50 transition-all shadow-xs"
            >
              <div>
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-zinc-800 shrink-0"
                  />
                  <div className="overflow-hidden">
                    <h4 className="text-sm font-bold text-white truncate">
                      {person.name}
                    </h4>
                    <p className="text-xs text-zinc-400 truncate">
                      {person.role}
                    </p>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                      {person.college}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3.5">
                  {person.skills.map(s => (
                    <span
                      key={s}
                      className="text-[11px] font-mono font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-0.5 rounded-md"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Explicit Explainable Reason with Lime accent */}
                <div className="bg-zinc-900/90 border-l-2 border-[#D4FF00] p-2.5 rounded-r-lg mb-4">
                  <p className="text-[11px] text-zinc-300 leading-relaxed">
                    <strong className="text-[#D4FF00] font-mono font-bold">MATCH REASON: </strong>
                    {person.matchReason}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectPerson(person)}
                className="w-full py-2 px-3 rounded-xl border border-zinc-700 hover:border-[#D4FF00] hover:text-[#D4FF00] text-xs font-bold text-zinc-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer bg-zinc-900"
              >
                <span>View profile</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: EVENTS */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#D4FF00]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              EVENTS ({results.events.length})
            </h3>
          </div>
          <span className="text-xs text-zinc-500 font-mono">// UPCOMING SESSIONS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.events.map(event => (
            <div
              key={event.id}
              className="bg-[#141417]/85 backdrop-blur-md rounded-2xl border border-zinc-800 p-5 flex flex-col justify-between hover:border-[#D4FF00]/50 transition-all shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono font-bold text-[#D4FF00] bg-[#D4FF00]/10 border border-[#D4FF00]/30 px-2.5 py-0.5 rounded-md">
                    {event.date}
                  </span>
                  <span className="text-[11px] text-zinc-400">
                    {event.location}
                  </span>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-white mb-1.5">
                  {event.title}
                </h4>

                <p className="text-xs text-zinc-400 line-clamp-2 mb-3 leading-relaxed">
                  {event.shortDescription}
                </p>

                <div className="bg-zinc-900/90 border-l-2 border-[#D4FF00] p-2.5 rounded-r-lg mb-4">
                  <p className="text-[11px] text-zinc-300 leading-relaxed">
                    <strong className="text-[#D4FF00] font-mono font-bold">MATCH REASON: </strong>
                    {event.matchReason}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectEvent(event)}
                className="w-full py-2 px-3 rounded-xl border border-zinc-700 hover:border-[#D4FF00] hover:text-[#D4FF00] text-xs font-bold text-zinc-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer bg-zinc-900 font-mono"
              >
                <span>View event & AI summary</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: PROJECTS */}
      <section>
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-[#D4FF00]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              PROJECTS SEEKING COLLABORATORS ({results.projects.length})
            </h3>
          </div>
          <span className="text-xs text-zinc-500 font-mono">// OPEN INITIATIVES</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.projects.map(project => (
            <div
              key={project.id}
              className="bg-[#141417]/85 backdrop-blur-md rounded-2xl border border-zinc-800 p-5 flex flex-col justify-between hover:border-[#D4FF00]/50 transition-all shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                    {project.status}
                  </span>
                  <span className="text-[11px] text-zinc-400">
                    Lead: {project.ownerName}
                  </span>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-white mb-1.5">
                  {project.title}
                </h4>

                <p className="text-xs text-zinc-400 line-clamp-2 mb-3 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.requiredSkills.map(skill => (
                    <span
                      key={skill}
                      className="text-[11px] font-mono font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-0.5 rounded-md"
                    >
                      Need: {skill}
                    </span>
                  ))}
                </div>

                <div className="bg-zinc-900/90 border-l-2 border-[#D4FF00] p-2.5 rounded-r-lg mb-4">
                  <p className="text-[11px] text-zinc-300 leading-relaxed">
                    <strong className="text-[#D4FF00] font-mono font-bold">MATCH REASON: </strong>
                    {project.matchReason}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectProject(project)}
                className="w-full py-2 px-3 rounded-xl border border-zinc-700 hover:border-[#D4FF00] hover:text-[#D4FF00] text-xs font-bold text-zinc-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer bg-zinc-900"
              >
                <span>View project details</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
