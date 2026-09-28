import { useState, type FormEvent } from 'react';
import { Users, Sparkles, Check, ArrowUpRight, Send } from 'lucide-react';
import type { User } from '../types';
import { mockUsers } from '../data/mockData';

interface FindMyTeamScreenProps {
  onSelectPerson: (user: User) => void;
}

const COMMON_SKILL_OPTIONS = [
  'Python',
  'Machine Learning',
  'React',
  'UI/UX',
  'Node.js',
  'Figma',
  'C++',
  'Data Science',
  'FastAPI',
  'TypeScript'
];

interface MatchedCandidate {
  user: User;
  matchedSkills: string[];
  reason: string;
}

export const FindMyTeamScreen = ({ onSelectPerson }: FindMyTeamScreenProps) => {
  const [projectName, setProjectName] = useState('AI Clinical Diagnostics Assistant');
  const [projectDescription, setProjectDescription] = useState('Building a medical imaging triage tool for rural clinics that analyzes X-rays and summarizes findings.');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Python', 'Machine Learning', 'UI/UX']);
  const [customSkillInput, setCustomSkillInput] = useState('');
  const [teamSize, setTeamSize] = useState<number>(3);
  
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<MatchedCandidate[]>([]);
  const [invitedMap, setInvitedMap] = useState<Record<string, boolean>>({});

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleAddCustomSkill = (e: FormEvent) => {
    e.preventDefault();
    if (customSkillInput.trim() && !selectedSkills.includes(customSkillInput.trim())) {
      setSelectedSkills([...selectedSkills, customSkillInput.trim()]);
      setCustomSkillInput('');
    }
  };

  const handleFindTeammates = (e: FormEvent) => {
    e.preventDefault();
    if (selectedSkills.length === 0) return;

    const matched: MatchedCandidate[] = mockUsers.map(user => {
      const userSkillsLower = user.skills.map(s => s.toLowerCase());
      const overlapping = selectedSkills.filter(reqSkill =>
        userSkillsLower.some(us => us.includes(reqSkill.toLowerCase()) || reqSkill.toLowerCase().includes(us))
      );

      let reason = '';
      if (overlapping.length > 1) {
        reason = `Directly covers your need for ${overlapping.join(' and ')} with demonstrated project history.`;
      } else if (overlapping.length === 1) {
        reason = `Fills your gap for ${overlapping[0]} and aligns with your ${user.interests[0] || 'tech'} goals.`;
      } else {
        reason = `Complementary background in ${user.skills.slice(0, 2).join(', ')} to diversify your team.`;
      }

      return {
        user,
        matchedSkills: overlapping,
        reason
      };
    })
    .sort((a, b) => b.matchedSkills.length - a.matchedSkills.length)
    .slice(0, teamSize);

    setResults(matched);
    setHasSearched(true);
  };

  const toggleInvite = (userId: string) => {
    setInvitedMap(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Heading */}
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4FF00]/10 border border-[#D4FF00]/30 text-[#D4FF00] text-xs font-mono font-bold mb-3">
          <Users className="w-3.5 h-3.5 text-[#D4FF00]" />
          <span>// 002. COLLABORATOR MATCHER</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white uppercase font-mono tracking-tight">
          Build your team
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-2">
          Tell us what you're building and we'll match you with students with complementary skills.
        </p>
      </div>

      {/* Main Creation Card */}
      <div className="bg-[#141417] rounded-2xl border border-zinc-800 p-6 sm:p-8 shadow-xl mb-10">
        <form onSubmit={handleFindTeammates} className="space-y-6">
          {/* Step 1: Project Name */}
          <div>
            <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-2">
              1. Project Name
            </label>
            <input
              type="text"
              required
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g. AI-powered healthcare assistant"
              className="w-full px-4 py-2.5 text-xs sm:text-sm bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-[#D4FF00] text-white"
            />
          </div>

          {/* Step 2: Project Description */}
          <div>
            <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-2">
              2. Short Project Description
            </label>
            <textarea
              rows={2}
              required
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Briefly explain what you're creating and who it helps..."
              className="w-full px-4 py-2.5 text-xs sm:text-sm bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-[#D4FF00] text-white"
            />
          </div>

          {/* Step 3: Required Skills */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">
                3. What skills do you need?
              </label>
              <span className="text-xs font-mono text-zinc-500">
                ({selectedSkills.length} selected)
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {COMMON_SKILL_OPTIONS.map(skill => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-150 flex items-center gap-1.5 cursor-pointer border ${
                      isSelected
                        ? 'bg-[#D4FF00] text-black border-[#D4FF00] shadow-xs'
                        : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-black" />}
                    {skill}
                  </button>
                );
              })}
            </div>

            {/* Custom Skill Input */}
            <div className="flex items-center gap-2 max-w-xs">
              <input
                type="text"
                value={customSkillInput}
                onChange={(e) => setCustomSkillInput(e.target.value)}
                placeholder="+ Add other skill..."
                className="px-3 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-[#D4FF00] w-full"
              />
              <button
                type="button"
                onClick={handleAddCustomSkill}
                className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>

          {/* Step 4: Team Size */}
          <div>
            <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-2">
              4. How many teammates do you need?
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map(num => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setTeamSize(num)}
                  className={`w-12 h-10 rounded-xl text-sm font-mono font-bold transition-all cursor-pointer border ${
                    teamSize === num
                      ? 'bg-[#D4FF00] text-black border-[#D4FF00]'
                      : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  {num}
                </button>
              ))}
              <span className="text-xs font-mono text-zinc-500 ml-2">collaborator{teamSize > 1 ? 's' : ''}</span>
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-4 border-t border-zinc-800 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#D4FF00] hover:bg-[#BEF200] text-black text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Find teammates</span>
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      {hasSearched && (
        <section className="animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-zinc-800">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                <span>RECOMMENDED TEAMMATES</span>
                <span className="text-[11px] font-bold text-[#D4FF00] bg-[#D4FF00]/10 border border-[#D4FF00]/30 px-2 py-0.5 rounded-full">
                  {results.length} MATCHES
                </span>
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Matched based on required skills: {selectedSkills.join(', ')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {results.map(({ user, matchedSkills, reason }) => {
              const isInvited = !!invitedMap[user.id];

              return (
                <div
                  key={user.id}
                  className="bg-[#141417] rounded-2xl border border-zinc-800 p-5 flex flex-col justify-between hover:border-zinc-700 transition-all shadow-xs"
                >
                  <div>
                    <div className="flex items-start gap-3 mb-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-11 h-11 rounded-full object-cover ring-2 ring-zinc-800 shrink-0"
                      />
                      <div className="overflow-hidden">
                        <h3 className="text-sm font-bold text-white truncate">
                          {user.name}
                        </h3>
                        <p className="text-xs text-zinc-400 truncate">
                          {user.role}
                        </p>
                        <p className="text-[11px] text-zinc-500 font-mono mt-0.5">
                          {user.college}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {user.skills.slice(0, 3).map(skill => (
                        <span
                          key={skill}
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                            matchedSkills.includes(skill)
                              ? 'bg-[#D4FF00]/15 text-[#D4FF00] border border-[#D4FF00]/40'
                              : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="bg-zinc-900/90 border-l-2 border-[#D4FF00] p-2.5 rounded-r-lg mb-4">
                      <p className="text-[11px] text-zinc-300 leading-relaxed">
                        <strong className="text-[#D4FF00] font-mono font-bold">WHY THEY MATCH: </strong>
                        {reason}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800">
                    <button
                      type="button"
                      onClick={() => onSelectPerson(user)}
                      className="py-1.5 px-2 rounded-xl border border-zinc-700 hover:border-zinc-600 bg-zinc-900 text-xs font-bold text-zinc-300 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Profile</span>
                      <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleInvite(user.id)}
                      className={`py-1.5 px-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isInvited
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40'
                          : 'bg-[#D4FF00] hover:bg-[#BEF200] text-black'
                      }`}
                    >
                      {isInvited ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Invited</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3 h-3 text-black" />
                          <span>Invite</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
