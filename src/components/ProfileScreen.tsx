import { useState } from 'react';
import { ArrowLeft, Check, FolderGit2, UserPlus, Send, Edit3, Sparkles } from 'lucide-react';
import type { User } from '../types';
import { EditProfileModal } from './EditProfileModal';

interface ProfileScreenProps {
  user: User;
  currentUser?: User;
  onBack: () => void;
  onInviteToProject?: (user: User) => void;
  onUpdateUser?: (updated: User) => void;
}

export const ProfileScreen = ({ 
  user, 
  currentUser, 
  onBack, 
  onInviteToProject,
  onUpdateUser 
}: ProfileScreenProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const isOwnProfile = currentUser ? user.id === currentUser.id : false;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleConnect = () => {
    setIsConnected(!isConnected);
    showToast(!isConnected ? `Connection request sent to ${user.name}!` : `Connection removed.`);
  };

  const handleInvite = () => {
    if (onInviteToProject) {
      onInviteToProject(user);
    } else {
      showToast(`Invited ${user.name} to join your project team!`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#141417] text-[#D4FF00] text-xs sm:text-sm font-mono font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-[#D4FF00]/40 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-[#D4FF00]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Action Bar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-zinc-300 hover:text-[#D4FF00] bg-[#141417] border border-zinc-800 hover:border-[#D4FF00]/50 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK</span>
        </button>

        {/* Quick Edit button accessible from top if viewing someone else's profile */}
        {!isOwnProfile && currentUser && (
          <button
            type="button"
            onClick={() => setIsEditingProfile(true)}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-zinc-400 hover:text-white bg-[#141417] border border-zinc-800 hover:border-[#D4FF00]/50 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#D4FF00]" />
            <span>EDIT MY PROFILE</span>
          </button>
        )}
      </div>

      {/* Profile Card Header */}
      <div className="bg-[#141417] rounded-2xl border border-zinc-800 p-6 sm:p-8 mb-6 shadow-xl relative overflow-hidden">
        {/* Subtle top lime line for active profile */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4FF00]/40 to-transparent" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-start sm:items-center gap-4 sm:gap-5">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-2 ring-[#D4FF00]/80 shadow-md shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase font-mono">
                  {user.name}
                </h1>
                {isOwnProfile ? (
                  <span className="text-[10px] font-mono font-bold text-[#D4FF00] bg-[#D4FF00]/10 border border-[#D4FF00]/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#D4FF00]" />
                    // YOUR PROFILE
                  </span>
                ) : (
                  <span className="text-[10px] font-mono font-bold text-[#D4FF00] bg-[#D4FF00]/10 border border-[#D4FF00]/30 px-2 py-0.5 rounded-full">
                    // ACTIVE BUILDER
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold text-zinc-300 mt-1">
                {user.role}
              </p>
              <p className="text-xs text-zinc-500 font-mono mt-0.5">
                {user.college} • {user.year}
              </p>
              {user.contact && (
                <p className="text-[11px] text-[#D4FF00] font-mono mt-1">
                  Contact: {user.contact}
                </p>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5 pt-2 sm:pt-0 flex-wrap">
            {isOwnProfile ? (
              <button
                type="button"
                onClick={() => setIsEditingProfile(true)}
                className="px-5 py-2.5 bg-[#D4FF00] hover:bg-[#BEF200] text-black text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(212,255,0,0.3)] font-mono"
              >
                <Edit3 className="w-4 h-4 text-black stroke-[2.5]" />
                <span>EDIT PROFILE</span>
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleConnect}
                  className={`px-5 py-2.5 text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                    isConnected
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-[#D4FF00] hover:bg-[#BEF200] text-black'
                  }`}
                >
                  {isConnected ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>CONNECTED</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 text-black" />
                      <span>CONNECT</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleInvite}
                  className="px-4 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl border border-zinc-700 hover:border-[#D4FF00] hover:text-[#D4FF00] bg-zinc-900 text-zinc-300 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5 text-zinc-400" />
                  <span>INVITE TO TEAM</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Short Bio */}
        <p className="mt-5 text-xs sm:text-sm text-zinc-300 leading-relaxed pt-5 border-t border-zinc-800">
          "{user.bio}"
        </p>
      </div>

      {/* Main Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: About & Looking For */}
        <div className="md:col-span-1 space-y-6">
          {/* About */}
          <div className="bg-[#141417] rounded-2xl border border-zinc-800 p-5 shadow-xs">
            <h2 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest mb-2.5">
              // ABOUT
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {user.about}
            </p>
          </div>

          {/* Looking For */}
          <div className="bg-[#141417] rounded-2xl border border-zinc-800 p-5 shadow-xs">
            <h2 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest mb-3">
              // LOOKING FOR
            </h2>
            <div className="flex flex-wrap gap-2">
              {user.lookingFor.map(item => (
                <span
                  key={item}
                  className="text-xs font-mono font-bold bg-[#D4FF00]/10 text-[#D4FF00] border border-[#D4FF00]/30 px-3 py-1 rounded-lg"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Skills, Interests, and Projects */}
        <div className="md:col-span-2 space-y-6">
          {/* Skills & Interests */}
          <div className="bg-[#141417] rounded-2xl border border-zinc-800 p-5 shadow-xs">
            <div className="mb-5">
              <h2 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest mb-2.5">
                // SKILLS & STACK
              </h2>
              <div className="flex flex-wrap gap-2">
                {user.skills.map(skill => (
                  <span
                    key={skill}
                    className="text-xs font-mono font-medium bg-zinc-900 border border-zinc-800 text-zinc-200 px-3 py-1 rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest mb-2.5">
                // INTERESTS & DOMAINS
              </h2>
              <div className="flex flex-wrap gap-2">
                {user.interests.map(interest => (
                  <span
                    key={interest}
                    className="text-xs font-mono font-medium bg-zinc-900/50 border border-zinc-800/80 text-zinc-400 px-3 py-1 rounded-lg"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Projects */}
          <div className="bg-[#141417] rounded-2xl border border-zinc-800 p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <FolderGit2 className="w-4 h-4 text-[#D4FF00]" />
              <h2 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">
                // FEATURED PROJECTS ({user.projects?.length || 0})
              </h2>
            </div>

            <div className="space-y-3.5">
              {user.projects && user.projects.length > 0 ? (
                user.projects.map(p => (
                  <div
                    key={p.id}
                    className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/50 hover:bg-zinc-900 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="text-sm font-bold text-white">
                        {p.title}
                      </h3>
                      <span className="text-[11px] font-mono font-bold text-[#D4FF00] bg-[#D4FF00]/10 border border-[#D4FF00]/30 px-2 py-0.5 rounded-md">
                        {p.role}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mb-2.5 leading-relaxed">
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map(t => (
                        <span
                          key={t}
                          className="text-[10px] font-mono font-medium text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-700/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-zinc-500 font-mono">No projects added yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <EditProfileModal
          user={isOwnProfile ? user : (currentUser || user)}
          onSave={(updated) => {
            if (onUpdateUser) {
              onUpdateUser(updated);
            }
            setIsEditingProfile(false);
            showToast('Profile updated successfully!');
          }}
          onClose={() => setIsEditingProfile(false)}
        />
      )}
    </div>
  );
};
