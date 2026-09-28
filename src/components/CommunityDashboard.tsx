import { useState, type FormEvent } from 'react';
import { 
  Building2, 
  Calendar, 
  Users, 
  Plus, 
  MessageSquare, 
  Edit3, 
  Sparkles, 
  Check, 
  X, 
  MapPin, 
  Mail, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';
import type { Community, CommunityEvent, ChatMessage, User } from '../types';

interface CommunityDashboardProps {
  community: Community;
  onUpdateCommunity: (updated: Community) => void;
  onPublishEvent: (event: CommunityEvent) => void;
  onOpenChat: (community: Community) => void;
  events: CommunityEvent[];
  chatMessages: ChatMessage[];
  currentUser: User;
}

export const CommunityDashboard = ({
  community,
  onUpdateCommunity,
  onPublishEvent,
  onOpenChat,
  events,
  chatMessages,
}: CommunityDashboardProps) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Edit Community State
  const [editName, setEditName] = useState(community.name);
  const [editTagline, setEditTagline] = useState(community.tagline);
  const [editDesc, setEditDesc] = useState(community.description);
  const [editEmail, setEditEmail] = useState(community.contactEmail);
  const [editLogo, setEditLogo] = useState(community.logo);
  const [editDomains, setEditDomains] = useState(community.domains.join(', '));
  const [editLeads, setEditLeads] = useState(community.leads.join(', '));

  // Create Event State
  const [eventTitle, setEventTitle] = useState('');
  const [eventCategory, setEventCategory] = useState<'AI' | 'Design' | 'Web' | 'Robotics' | 'Hackathons' | 'Workshops'>('AI');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventTags, setEventTags] = useState('AI, Machine Learning, Workshop');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveProfile = (e: FormEvent) => {
    e.preventDefault();
    const domainList = editDomains.split(',').map(d => d.trim()).filter(Boolean);
    const leadsList = editLeads.split(',').map(l => l.trim()).filter(Boolean);

    onUpdateCommunity({
      ...community,
      name: editName.trim(),
      tagline: editTagline.trim(),
      description: editDesc.trim(),
      contactEmail: editEmail.trim(),
      logo: editLogo.trim(),
      domains: domainList.length > 0 ? domainList : community.domains,
      leads: leadsList.length > 0 ? leadsList : community.leads,
    });
    setIsEditingProfile(false);
    showToast('Community profile updated successfully!');
  };

  const handleCreateEvent = (e: FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim() || !eventDate.trim()) return;

    // AI generated summary logic
    const tagArray = eventTags.split(',').map(t => t.trim()).filter(Boolean);
    const newEvent: CommunityEvent = {
      id: `evt-${Date.now()}`,
      title: eventTitle,
      category: eventCategory,
      date: eventDate,
      time: '10:00 AM - 04:00 PM IST',
      location: eventLocation || 'Campus Innovation Lab',
      isOnline: eventLocation.toLowerCase().includes('online') || eventLocation.toLowerCase().includes('virtual'),
      tags: tagArray.length > 0 ? tagArray : [eventCategory, 'Student Event'],
      shortDescription: eventDesc.slice(0, 120) + '...',
      fullDescription: eventDesc,
      organizer: community.name,
      communityId: community.id,
      aiSummary: {
        tldr: [
          `Interactive ${eventCategory} session hosted by ${community.name}.`,
          `Practical prototyping focus with live student mentorship.`,
          `Networking and team formation opportunities for upcoming campus challenges.`
        ],
        bestSuitedFor: [
          `${eventCategory} Enthusiasts`,
          'Student Developers & Builders',
          'Cross-disciplinary Collaborators'
        ],
        keyRequirements: [
          'Bring your laptop with development tools ready.',
          'Active student ID for campus entry or online registration link.'
        ]
      }
    };

    onPublishEvent(newEvent);
    setIsCreatingEvent(false);
    setEventTitle('');
    setEventDesc('');
    setEventDate('');
    setEventLocation('');
    showToast('Event published live to the platform calendar!');
  };

  const myEvents = events.filter(e => e.communityId === community.id || e.organizer === community.name);
  const myChats = chatMessages.filter(m => m.communityId === community.id);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#141417] text-[#D4FF00] text-xs sm:text-sm font-mono font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-[#D4FF00]/40 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-[#D4FF00]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Community Banner / Header */}
      <div className="bg-[#141417] rounded-2xl border border-zinc-800 p-6 sm:p-8 mb-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-start sm:items-center gap-4 sm:gap-5">
            <img
              src={community.logo}
              alt={community.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-2 ring-zinc-800 shadow-md shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight uppercase font-mono">
                  {community.name}
                </h1>
                <span className="text-[10px] font-mono font-bold text-[#D4FF00] bg-[#D4FF00]/10 border border-[#D4FF00]/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#D4FF00]" />
                  VERIFIED HUB
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                {community.tagline}
              </p>
              <div className="flex items-center gap-4 text-xs text-zinc-500 font-mono mt-2 flex-wrap">
                <span className="flex items-center gap-1 text-zinc-400">
                  <Mail className="w-3.5 h-3.5 text-[#D4FF00]" />
                  {community.contactEmail}
                </span>
                <span>•</span>
                <span>LEADS: {community.leads.join(', ')}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 pt-2 sm:pt-0">
            <button
              type="button"
              onClick={() => setIsEditingProfile(true)}
              className="px-4 py-2.5 text-xs sm:text-sm font-bold uppercase rounded-xl border border-zinc-700 hover:border-[#D4FF00] hover:text-[#D4FF00] bg-zinc-900 text-zinc-300 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Edit3 className="w-3.5 h-3.5 text-zinc-400" />
              <span>EDIT DETAILS</span>
            </button>

            <button
              type="button"
              onClick={() => setIsCreatingEvent(true)}
              className="px-4 py-2.5 text-xs sm:text-sm font-black uppercase rounded-xl bg-[#D4FF00] hover:bg-[#BEF200] text-black transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4 text-black" />
              <span>CREATE EVENT</span>
            </button>
          </div>
        </div>

        {/* Description & Domain Badges */}
        <div className="mt-6 pt-6 border-t border-zinc-800">
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
            {community.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {community.domains.map(d => (
              <span
                key={d}
                className="text-xs font-mono font-medium bg-zinc-900 text-zinc-300 px-3 py-1 rounded-lg border border-zinc-800"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Activity & Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#141417] rounded-2xl border border-zinc-800 p-5 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 mb-2 font-mono text-xs font-bold uppercase tracking-wider">
            <span>TOTAL MEMBERS</span>
            <Users className="w-4 h-4 text-[#D4FF00]" />
          </div>
          <div className="text-2xl font-black font-mono text-white">{community.memberCount}</div>
          <p className="text-[11px] text-[#D4FF00] mt-1 font-mono font-bold">+18 this week</p>
        </div>

        <div className="bg-[#141417] rounded-2xl border border-zinc-800 p-5 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 mb-2 font-mono text-xs font-bold uppercase tracking-wider">
            <span>PUBLISHED EVENTS</span>
            <Calendar className="w-4 h-4 text-[#D4FF00]" />
          </div>
          <div className="text-2xl font-black font-mono text-white">{myEvents.length}</div>
          <p className="text-[11px] text-zinc-400 mt-1 font-mono">Live in calendar</p>
        </div>

        <div className="bg-[#141417] rounded-2xl border border-zinc-800 p-5 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 mb-2 font-mono text-xs font-bold uppercase tracking-wider">
            <span>STUDENT INQUIRIES</span>
            <MessageSquare className="w-4 h-4 text-[#D4FF00]" />
          </div>
          <div className="text-2xl font-black font-mono text-white">{myChats.length}</div>
          <p className="text-[11px] text-[#D4FF00] mt-1 font-mono font-bold">Direct questions</p>
        </div>

        <div className="bg-[#141417] rounded-2xl border border-zinc-800 p-5 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 mb-2 font-mono text-xs font-bold uppercase tracking-wider">
            <span>OPEN PROJECTS</span>
            <Building2 className="w-4 h-4 text-[#D4FF00]" />
          </div>
          <div className="text-2xl font-black font-mono text-white">{community.openProjectsCount}</div>
          <p className="text-[11px] text-zinc-400 mt-1 font-mono">Team initiatives</p>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Published Events Management */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#141417] rounded-2xl border border-zinc-800 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-zinc-800">
              <div>
                <h2 className="text-base sm:text-lg font-black text-white font-mono uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#D4FF00]" />
                  <span>YOUR PUBLISHED EVENTS ({myEvents.length})</span>
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Events visible to all students on the platform
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsCreatingEvent(true)}
                className="px-3 py-1.5 bg-[#D4FF00]/10 hover:bg-[#D4FF00]/20 text-[#D4FF00] text-xs font-mono font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer border border-[#D4FF00]/30"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>NEW EVENT</span>
              </button>
            </div>

            <div className="space-y-4">
              {myEvents.map(event => (
                <div
                  key={event.id}
                  className="p-4 rounded-xl border border-zinc-800/90 hover:border-zinc-700 bg-zinc-900/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[11px] font-mono font-bold text-[#D4FF00] bg-[#D4FF00]/10 border border-[#D4FF00]/30 px-2 py-0.5 rounded-md">
                        {event.date}
                      </span>
                      <span className="text-[11px] font-mono text-zinc-400">
                        {event.category}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {event.title}
                    </h3>
                    <p className="text-xs text-zinc-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-zinc-500" />
                      <span>{event.location}</span>
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {event.tags.map(t => (
                        <span key={t} className="text-[10px] font-mono font-medium bg-zinc-900 text-zinc-300 px-2 py-0.5 rounded border border-zinc-800">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex sm:flex-col gap-2 shrink-0">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-md text-center">
                      LIVE & OPEN
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Student Chat Inquiries */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#141417] rounded-2xl border border-zinc-800 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
              <h2 className="text-base font-black text-white font-mono uppercase tracking-wider flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#D4FF00]" />
                <span>STUDENT INQUIRIES</span>
              </h2>
              <span className="text-xs font-mono text-[#D4FF00]">DIRECT</span>
            </div>

            <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
              Students asking regarding club memberships, event prerequisites, and project collaborations.
            </p>

            <div className="space-y-3 mb-5 max-h-72 overflow-y-auto pr-1">
              {myChats.map(chat => (
                <div
                  key={chat.id}
                  className="p-3 rounded-xl border border-zinc-800 bg-zinc-900/60 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between font-bold text-white">
                    <span>{chat.senderName}</span>
                    <span className="text-[10px] font-mono text-zinc-500">{chat.timestamp}</span>
                  </div>
                  <p className="text-zinc-400 line-clamp-2 leading-relaxed">
                    {chat.text}
                  </p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onOpenChat(community)}
              className="w-full py-2.5 px-3 bg-[#D4FF00] hover:bg-[#BEF200] text-black rounded-xl text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>OPEN COMMUNITY CHAT ROOM</span>
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </button>
          </div>
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#141417] w-full max-w-lg rounded-2xl border-2 border-zinc-800 shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-150 text-white">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
              <h3 className="text-lg font-black font-mono uppercase tracking-wider text-white">
                Edit Community Details
              </h3>
              <button
                type="button"
                onClick={() => setIsEditingProfile(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* Logo Preview & Input */}
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3.5 flex items-center gap-3.5">
                <img
                  src={editLogo}
                  alt="Logo preview"
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-[#D4FF00] shrink-0"
                />
                <div className="flex-1">
                  <label className="block text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1">
                    Community Logo URL
                  </label>
                  <input
                    type="url"
                    value={editLogo}
                    onChange={(e) => setEditLogo(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-[#D4FF00] text-zinc-200 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                  Community Name *
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-[#D4FF00] text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                  Tagline *
                </label>
                <input
                  type="text"
                  required
                  value={editTagline}
                  onChange={(e) => setEditTagline(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-[#D4FF00] text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-[#D4FF00] text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                    Community Leads (comma-separated)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Arjun Mehta, Sharmishtha Pal"
                    value={editLeads}
                    onChange={(e) => setEditLeads(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-[#D4FF00] text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                  Domain Tags (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. AI, Machine Learning, Robotics, Computer Vision"
                  value={editDomains}
                  onChange={(e) => setEditDomains(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-[#D4FF00] text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                  About Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-[#D4FF00] text-white leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2 text-xs font-mono font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#D4FF00] hover:bg-[#BEF200] text-black rounded-xl text-xs font-black font-mono uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(212,255,0,0.25)]"
                >
                  SAVE CHANGES
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE EVENT MODAL WITH AI AUTO-SUMMARIZATION */}
      {isCreatingEvent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#141417] w-full max-w-xl rounded-2xl border-2 border-zinc-800 shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto text-white">
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-zinc-800">
              <div>
                <h3 className="text-lg font-black font-mono uppercase tracking-wider text-white">
                  Publish New Event
                </h3>
                <p className="text-xs text-zinc-400">
                  Published events automatically generate an AI Summary for students
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCreatingEvent(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                  Event Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI Prompt Engineering & Agent Sprint"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-[#D4FF00] text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                    Category
                  </label>
                  <select
                    value={eventCategory}
                    onChange={(e) => setEventCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-[#D4FF00] text-white"
                  >
                    <option value="AI">AI</option>
                    <option value="Design">Design</option>
                    <option value="Web">Web</option>
                    <option value="Robotics">Robotics</option>
                    <option value="Hackathons">Hackathons</option>
                    <option value="Workshops">Workshops</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                    Date
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 18 October 2026"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-[#D4FF00] text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                  Location or Platform
                </label>
                <input
                  type="text"
                  placeholder="e.g. Campus Audi 1 or Online via Google Meet"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-[#D4FF00] text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. AI, Python, Agents, Hands-on"
                  value={eventTags}
                  onChange={(e) => setEventTags(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-[#D4FF00] text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                  Full Announcement Description
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain what participants will build, speaker lineup, team size rules..."
                  value={eventDesc}
                  onChange={(e) => setEventDesc(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-[#D4FF00] text-white"
                />
              </div>

              {/* Live AI Summarization Preview */}
              <div className="bg-[#D4FF00]/10 border border-[#D4FF00]/30 rounded-xl p-3.5 text-xs text-white">
                <div className="flex items-center gap-1.5 font-mono font-bold text-[#D4FF00] mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4FF00]" />
                  <span>// AI AUTO-SUMMARIZATION ACTIVE</span>
                </div>
                <p className="text-zinc-300 text-[11px] leading-relaxed">
                  When published, an automated 3-point TL;DR, required skill badges, and attendee guidelines will be generated automatically for the student discovery feed.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsCreatingEvent(false)}
                  className="px-4 py-2 text-xs font-mono font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#D4FF00] hover:bg-[#BEF200] text-black rounded-xl text-xs font-black uppercase tracking-wider transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                  <span>PUBLISH EVENT</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
