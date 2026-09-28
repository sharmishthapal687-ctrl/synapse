import { useState } from 'react';
import { Sparkles, ArrowRight, Check } from 'lucide-react';

interface OnboardingProps {
  onComplete: (data: {
    interests: string[];
    skills: string[];
    lookingFor: string[];
  }) => void;
}

const INTEREST_OPTIONS = [
  'AI',
  'Web Development',
  'UI/UX',
  'Graphic Design',
  'Robotics',
  'IoT',
  'Data Science',
  'Entrepreneurship'
];

const SKILL_OPTIONS = [
  'Python',
  'C / C++',
  'Figma',
  'React',
  'Machine Learning',
  'Graphic Design',
  'UI/UX'
];

const LOOKING_FOR_OPTIONS = [
  'Projects',
  'Teammates',
  'Events',
  'Communities',
  'Learning Resources'
];

export const OnboardingScreen: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['AI', 'UI/UX']);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Figma', 'UI/UX', 'Python']);
  const [selectedLookingFor, setSelectedLookingFor] = useState<string[]>(['Projects', 'Teammates']);

  const toggleItem = (list: string[], setList: (vals: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleContinue = () => {
    onComplete({
      interests: selectedInterests,
      skills: selectedSkills,
      lookingFor: selectedLookingFor
    });
  };

  return (
    <div className="min-h-screen bg-[#09090B] bg-grid-pattern text-white flex flex-col justify-between p-6 sm:p-10 font-sans selection:bg-[#D4FF00] selection:text-black relative">
      {/* Background grain texture overlay */}
      <div className="fixed inset-0 pointer-events-none bg-noise opacity-35 z-0" />
      <div className="relative z-10 flex flex-col justify-between min-h-full flex-1">
      {/* Top Header & Progress */}
      <div className="max-w-2xl w-full mx-auto flex items-center justify-between border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#D4FF00] flex items-center justify-center text-black font-black text-sm font-mono shadow-[0_0_15px_rgba(212,255,0,0.3)]">
            S
          </div>
          <span className="font-bold text-lg text-white font-mono tracking-wider">SYNAPSE</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">Step 1 of 1</span>
          <div className="w-20 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div className="w-full h-full bg-[#D4FF00] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main Form Content */}
      <main className="max-w-2xl w-full mx-auto my-auto py-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[#D4FF00] text-xs font-mono font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4FF00]" />
            <span>// WELCOME TO THE BUILDER NETWORK</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
            Let's personalize your experience
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base mt-2">
            Select what you love doing and what you're hoping to discover. This powers your AI recommendations and teammate matches.
          </p>
        </div>

        {/* Section 1: Interests */}
        <section className="mb-8">
          <h2 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span>// What are you interested in?</span>
            <span className="text-xs font-normal text-zinc-500 font-mono">({selectedInterests.length} selected)</span>
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {INTEREST_OPTIONS.map(interest => {
              const isSelected = selectedInterests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleItem(selectedInterests, setSelectedInterests, interest)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 flex items-center gap-1.5 cursor-pointer border ${
                    isSelected
                      ? 'bg-[#D4FF00] text-black border-[#D4FF00] font-bold shadow-[0_0_15px_rgba(212,255,0,0.25)]'
                      : 'bg-[#141417] text-zinc-300 border-zinc-800 hover:border-zinc-600 hover:text-white'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  {interest}
                </button>
              );
            })}
          </div>
        </section>

        {/* Section 2: Skills */}
        <section className="mb-8">
          <h2 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span>// What can you contribute?</span>
            <span className="text-xs font-normal text-zinc-500 font-mono">({selectedSkills.length} selected)</span>
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {SKILL_OPTIONS.map(skill => {
              const isSelected = selectedSkills.includes(skill);
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleItem(selectedSkills, setSelectedSkills, skill)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 flex items-center gap-1.5 cursor-pointer border ${
                    isSelected
                      ? 'bg-[#D4FF00] text-black border-[#D4FF00] font-bold shadow-[0_0_15px_rgba(212,255,0,0.25)]'
                      : 'bg-[#141417] text-zinc-300 border-zinc-800 hover:border-zinc-600 hover:text-white'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  {skill}
                </button>
              );
            })}
          </div>
        </section>

        {/* Section 3: Looking For */}
        <section className="mb-10">
          <h2 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span>// What are you looking for?</span>
            <span className="text-xs font-normal text-zinc-500 font-mono">({selectedLookingFor.length} selected)</span>
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {LOOKING_FOR_OPTIONS.map(opt => {
              const isSelected = selectedLookingFor.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleItem(selectedLookingFor, setSelectedLookingFor, opt)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 flex items-center gap-1.5 cursor-pointer border ${
                    isSelected
                      ? 'bg-[#D4FF00] text-black border-[#D4FF00] font-bold shadow-[0_0_15px_rgba(212,255,0,0.25)]'
                      : 'bg-[#141417] text-zinc-300 border-zinc-800 hover:border-zinc-600 hover:text-white'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  {opt}
                </button>
              );
            })}
          </div>
        </section>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
          <p className="text-xs text-zinc-500 font-mono">
            You can always update these preferences in your profile.
          </p>
          <button
            type="button"
            onClick={handleContinue}
            className="px-6 py-2.5 bg-[#D4FF00] hover:bg-[#BEF200] text-black text-sm font-bold font-mono rounded-xl shadow-[0_0_20px_rgba(212,255,0,0.3)] hover:shadow-[0_0_25px_rgba(212,255,0,0.5)] transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Continue to Home</span>
            <ArrowRight className="w-4 h-4 text-black stroke-[2.5]" />
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-2xl w-full mx-auto text-center text-xs text-zinc-600 font-mono pt-4 uppercase tracking-wider">
        Synapse Community Intelligence Platform • Built for Student Builders
      </footer>
      </div>
    </div>
  );
};
