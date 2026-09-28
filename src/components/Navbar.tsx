import { Sparkles, Users, Calendar, UserCheck, Compass, Building2, ArrowLeftRight } from 'lucide-react';
import type { User, UserRole, Community } from '../types';

interface NavbarProps {
  activeScreen: string;
  onNavigate: (screen: any) => void;
  currentUser?: User;
  userRole: UserRole;
  onToggleRole: () => void;
  activeCommunity?: Community;
  onViewMyProfile?: () => void;
}

export const Navbar = ({
  activeScreen,
  onNavigate,
  currentUser,
  userRole,
  onToggleRole,
  activeCommunity,
  onViewMyProfile
}: NavbarProps) => {
  const studentNavItems = [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'search', label: 'Discover', icon: Compass },
    { id: 'communities', label: 'Communities', icon: Building2 },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'team', label: 'Find a Team', icon: Users },
    { id: 'profile', label: 'Profile', icon: UserCheck },
  ] as const;

  const communityNavItems = [
    { id: 'community-dashboard', label: 'Organizer Hub', icon: Building2 },
    { id: 'events', label: 'Public Events', icon: Calendar },
    { id: 'communities', label: 'All Communities', icon: Compass },
    { id: 'team', label: 'Student Talents', icon: Users },
  ] as const;

  const activeItems = userRole === 'community' ? communityNavItems : studentNavItems;

  return (
    <header className="sticky top-0 z-40 bg-[#09090B]/90 backdrop-blur-md border-b border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => onNavigate(userRole === 'community' ? 'community-dashboard' : 'home')} 
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#D4FF00] flex items-center justify-center text-black font-black text-sm shadow-xs group-hover:scale-105 transition-transform">
            S
          </div>
          <span className="font-extrabold text-lg text-white tracking-wider font-mono">SYNAPSE</span>
          
          {/* Active Role Badge */}
          <span className={`hidden sm:inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full ml-1.5 border ${
            userRole === 'community'
              ? 'text-[#D4FF00] bg-[#D4FF00]/10 border-[#D4FF00]/40'
              : 'text-zinc-300 bg-zinc-800/80 border-zinc-700'
          }`}>
            {userRole === 'community' ? '// COMMUNITY HUB' : '// STUDENT MODE'}
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5">
          {activeItems.map(item => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (item.id === 'profile' && onViewMyProfile) {
                    onViewMyProfile();
                  } else {
                    onNavigate(item.id);
                  }
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 border ${
                  isActive
                    ? 'bg-[#D4FF00] text-black border-[#D4FF00] font-bold shadow-xs'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60 border-transparent'
                }`}
              >
                <item.icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-zinc-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Section: Persona Role Switcher & Profile Badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Persona Switcher Button */}
          <button
            type="button"
            onClick={onToggleRole}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-800 hover:border-[#D4FF00]/60 bg-zinc-900/90 text-xs font-semibold text-zinc-300 hover:text-[#D4FF00] transition-all cursor-pointer shadow-xs"
            title="Toggle between Student and Community Organizer"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-[#D4FF00]" />
            <span className="hidden sm:inline">Switch to {userRole === 'community' ? 'Student' : 'Community'}</span>
            <span className="sm:hidden">{userRole === 'community' ? 'Student' : 'Club'}</span>
          </button>

          {/* User/Community Indicator */}
          {userRole === 'community' ? (
            <button
              type="button"
              onClick={() => onNavigate('community-dashboard')}
              className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 rounded-full border border-[#D4FF00]/40 bg-[#D4FF00]/10 hover:bg-[#D4FF00]/20 transition-all cursor-pointer"
              title="Community Dashboard"
            >
              <img
                src={activeCommunity?.logo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80'}
                alt={activeCommunity?.name || 'Club logo'}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-[#D4FF00]"
              />
              <span className="hidden lg:inline text-xs font-bold text-[#D4FF00] max-w-[120px] truncate">
                {activeCommunity?.name?.split(' ')[0] || 'Club'}
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onViewMyProfile || (() => onNavigate('profile'))}
              className="flex items-center gap-2.5 p-1 sm:px-2.5 sm:py-1 rounded-full border border-zinc-800 hover:border-[#D4FF00]/50 bg-zinc-900 transition-all cursor-pointer"
              title="View and edit your student profile"
            >
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                alt={currentUser?.name || 'User profile'}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-zinc-700"
              />
              <span className="hidden lg:inline text-xs font-medium text-zinc-300">
                {currentUser?.name || 'Student'}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="md:hidden flex items-center justify-around border-t border-zinc-800/80 py-1.5 px-1 bg-[#09090B]">
        {activeItems.map(item => {
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                if (item.id === 'profile' && onViewMyProfile) {
                  onViewMyProfile();
                } else {
                  onNavigate(item.id);
                }
              }}
              className={`p-1.5 rounded-lg flex flex-col items-center gap-0.5 text-[10px] font-semibold tracking-wide ${
                isActive ? 'text-[#D4FF00] font-bold' : 'text-zinc-500'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
