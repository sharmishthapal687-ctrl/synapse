import { useState, type FormEvent } from 'react';
import { 
  Building2, 
  MessageSquare, 
  Users, 
  Plus, 
  CheckCircle2, 
  Calendar, 
  X, 
  FolderGit2,
  Edit3
} from 'lucide-react';
import type { Community } from '../types';

interface CommunitiesScreenProps {
  communities: Community[];
  onOpenChat: (community: Community) => void;
  onRegisterCommunity: (community: Community) => void;
  onSelectCommunityHub?: (community: Community) => void;
}

const DOMAIN_FILTERS = [
  'All',
  'AI & ML',
  'UI/UX Design',
  'Robotics',
  'Web Development'
];

export const CommunitiesScreen = ({
  communities,
  onOpenChat,
  onRegisterCommunity,
  onSelectCommunityHub
}: CommunitiesScreenProps) => {
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [isRegistering, setIsRegistering] = useState(false);

  // Form State
  const [newName, setNewName] = useState('');
  const [newTagline, setNewTagline] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newDomains, setNewDomains] = useState('Web, AI, Open Source');
  const [newEmail, setNewEmail] = useState('');
  const [newLead, setNewLead] = useState('');

  const filteredCommunities = communities.filter(comm => {
    if (selectedDomain === 'All') return true;
    return comm.domains.some(d => d.toLowerCase().includes(selectedDomain.toLowerCase()));
  });

  const handleRegisterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const domainList = newDomains.split(',').map(d => d.trim()).filter(Boolean);
    const createdCommunity: Community = {
      id: `comm-${Date.now()}`,
      name: newName,
      tagline: newTagline || 'Student community for collaborative learning and building.',
      description: newDesc || 'Passionate group of student builders working together on innovative projects.',
      logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80',
      domains: domainList.length > 0 ? domainList : ['Tech', 'Community'],
      memberCount: 1,
      leads: [newLead || 'Student Founder'],
      contactEmail: newEmail,
      activeEventsCount: 0,
      openProjectsCount: 0,
      verified: true
    };

    onRegisterCommunity(createdCommunity);
    setIsRegistering(false);
    setNewName('');
    setNewTagline('');
    setNewDesc('');
    setNewEmail('');
    setNewLead('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header with Register Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4FF00]/10 border border-[#D4FF00]/30 text-[#D4FF00] text-xs font-mono font-bold mb-2">
            <Building2 className="w-3.5 h-3.5 text-[#D4FF00]" />
            <span>// 004. CAMPUS CLUBS & HUBS</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white uppercase font-mono tracking-tight">
            Discover Communities
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Connect directly with verified student clubs, tech societies, and project collectives.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsRegistering(true)}
          className="px-4 py-2.5 bg-[#D4FF00] hover:bg-[#BEF200] text-black rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-xs shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-black" />
          <span>Register Community</span>
        </button>
      </div>

      {/* Domain Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 no-scrollbar">
        {DOMAIN_FILTERS.map(filter => {
          const isSelected = selectedDomain === filter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setSelectedDomain(filter)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-[#D4FF00] text-black border-[#D4FF00] shadow-xs'
                  : 'bg-[#141417] text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white'
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Communities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCommunities.map(community => (
          <div
            key={community.id}
            className="bg-[#141417] rounded-2xl border border-zinc-800 p-6 flex flex-col justify-between hover:border-zinc-700 transition-all shadow-xs"
          >
            <div>
              {/* Top info */}
              <div className="flex items-start gap-3.5 mb-4">
                <img
                  src={community.logo}
                  alt={community.name}
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-zinc-800 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                      {community.name}
                    </h3>
                    <CheckCircle2 className="w-4 h-4 text-[#D4FF00] shrink-0" />
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">
                    {community.tagline}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-zinc-400 line-clamp-3 mb-4 leading-relaxed">
                {community.description}
              </p>

              {/* Domains */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {community.domains.map(d => (
                  <span
                    key={d}
                    className="text-[10px] font-mono font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 px-2.5 py-0.5 rounded-md"
                  >
                    {d}
                  </span>
                ))}
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-2 py-3 px-3 bg-zinc-900/80 border border-zinc-800/80 rounded-xl mb-5 text-center text-xs">
                <div>
                  <div className="font-bold font-mono text-white flex items-center justify-center gap-1">
                    <Users className="w-3 h-3 text-[#D4FF00]" />
                    <span>{community.memberCount}</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">MEMBERS</span>
                </div>
                <div>
                  <div className="font-bold font-mono text-white flex items-center justify-center gap-1">
                    <Calendar className="w-3 h-3 text-[#D4FF00]" />
                    <span>{community.activeEventsCount}</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">EVENTS</span>
                </div>
                <div>
                  <div className="font-bold font-mono text-white flex items-center justify-center gap-1">
                    <FolderGit2 className="w-3 h-3 text-[#D4FF00]" />
                    <span>{community.openProjectsCount}</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">PROJECTS</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800">
              <button
                type="button"
                onClick={() => onSelectCommunityHub?.(community)}
                className="py-2 px-2.5 rounded-xl border border-zinc-700 hover:border-[#D4FF00] hover:text-[#D4FF00] bg-zinc-900 text-xs font-bold text-zinc-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-mono"
                title="Manage and edit this community's profile"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#D4FF00]" />
                <span>Manage & Edit</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenChat(community)}
                className="py-2 px-2.5 rounded-xl bg-[#D4FF00] hover:bg-[#BEF200] text-black text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-black" />
                <span>Chat</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* REGISTER COMMUNITY MODAL */}
      {isRegistering && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#141417] w-full max-w-lg rounded-2xl border-2 border-zinc-800 shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-150 text-white">
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-zinc-800">
              <div>
                <h3 className="text-lg font-black font-mono uppercase tracking-tight text-white">
                  Register Your Community
                </h3>
                <p className="text-xs text-zinc-400">
                  Enable students to discover your club, join events, and chat with organizers
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsRegistering(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                  Community / Club Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Open Source Hardware Club"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-[#D4FF00] text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                  Tagline
                </label>
                <input
                  type="text"
                  placeholder="One sentence describing what you do..."
                  value={newTagline}
                  onChange={(e) => setNewTagline(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-[#D4FF00] text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                  Tech Domains & Focus Areas
                </label>
                <input
                  type="text"
                  placeholder="e.g. Hardware, IoT, Arduino, 3D Printing"
                  value={newDomains}
                  onChange={(e) => setNewDomains(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-[#D4FF00] text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                  Lead Organizer Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Joshi (Club Lead)"
                  value={newLead}
                  onChange={(e) => setNewLead(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-[#D4FF00] text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                  Official Club Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. oshw@gcet.edu"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-[#D4FF00] text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                  About the Community
                </label>
                <textarea
                  rows={2}
                  placeholder="What kind of activities, workshops, or competitions do you host?"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-[#D4FF00] text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsRegistering(false)}
                  className="px-4 py-2 text-xs font-mono font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#D4FF00] hover:bg-[#BEF200] text-black rounded-xl text-xs font-black uppercase tracking-wider transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-black" />
                  <span>REGISTER COMMUNITY</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
