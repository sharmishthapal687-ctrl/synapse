import { User, Users, ArrowRight } from 'lucide-react';

interface RoleSelectScreenProps {
  onSelectRole: (role: 'individual' | 'community') => void;
}

export const RoleSelectScreen = ({ onSelectRole }: RoleSelectScreenProps) => {
  return (
    <div className="min-h-screen bg-[#09090B] bg-grid-pattern text-white flex flex-col justify-center items-center p-6 font-sans selection:bg-[#D4FF00] selection:text-black relative overflow-hidden">
      {/* Background grain texture overlay */}
      <div className="fixed inset-0 pointer-events-none bg-noise opacity-35 z-0" />

      {/* Ambient Neon Lighting */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#D4FF00]/10 blur-[140px] rounded-full pointer-events-none z-0" />

      {/* Centered Modal / Gateway */}
      <div className="relative z-10 max-w-xl w-full mx-auto text-center">
        {/* Brand Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#141417] border border-zinc-800 text-zinc-300 text-xs font-mono font-bold mb-6 shadow-sm">
          <div className="w-5 h-5 rounded-md bg-[#D4FF00] flex items-center justify-center text-black font-black text-xs font-mono">
            S
          </div>
          <span className="tracking-wider">SYNAPSE</span>
        </div>

        {/* Clear, direct question */}
        <h1 className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight uppercase mb-3">
          Join as Individual or Community?
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 mb-10 font-sans">
          Select how you want to join Synapse.
        </p>

        {/* Two Straightforward Choice Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Card 1: Individual */}
          <button
            type="button"
            onClick={() => onSelectRole('individual')}
            className="group relative bg-[#141417]/90 hover:bg-[#18181C] border-2 border-zinc-800 hover:border-[#D4FF00] rounded-3xl p-8 text-left transition-all duration-200 cursor-pointer shadow-xl hover:shadow-[0_0_30px_rgba(212,255,0,0.2)] hover:-translate-y-1 flex flex-col justify-between min-h-[220px]"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 group-hover:bg-[#D4FF00] border border-zinc-700 group-hover:border-[#D4FF00] flex items-center justify-center text-zinc-300 group-hover:text-black transition-all duration-200 mb-6 shadow-sm">
                <User className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-black text-white font-mono uppercase tracking-tight mb-1 group-hover:text-[#D4FF00] transition-colors">
                Individual
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400">
                Student, builder, developer, or creator
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono font-bold text-zinc-400 group-hover:text-[#D4FF00] transition-colors">
              <span>Continue as Individual</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 2: Community */}
          <button
            type="button"
            onClick={() => onSelectRole('community')}
            className="group relative bg-[#141417]/90 hover:bg-[#18181C] border-2 border-zinc-800 hover:border-[#D4FF00] rounded-3xl p-8 text-left transition-all duration-200 cursor-pointer shadow-xl hover:shadow-[0_0_30px_rgba(212,255,0,0.2)] hover:-translate-y-1 flex flex-col justify-between min-h-[220px]"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 group-hover:bg-[#D4FF00] border border-zinc-700 group-hover:border-[#D4FF00] flex items-center justify-center text-zinc-300 group-hover:text-black transition-all duration-200 mb-6 shadow-sm">
                <Users className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-black text-white font-mono uppercase tracking-tight mb-1 group-hover:text-[#D4FF00] transition-colors">
                Community
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400">
                Club, chapter, society, or organization
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono font-bold text-zinc-400 group-hover:text-[#D4FF00] transition-colors">
              <span>Continue as Community</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
