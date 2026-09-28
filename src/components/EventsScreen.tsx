import { useState, useRef } from 'react';
import { Calendar, MapPin, Sparkles, Search, Check, ArrowRight, X, Clock, MessageSquare } from 'lucide-react';
import type { CommunityEvent, User, EventComment } from '../types';
import { mockEvents, mockEventComments } from '../data/mockData';
import { EventCommentsSection } from './EventCommentsSection';

interface EventsScreenProps {
  onSelectEvent?: (event: CommunityEvent) => void;
  initialSelectedEvent?: CommunityEvent | null;
  currentUser?: User;
}

const CATEGORIES = [
  'All',
  'AI',
  'Design',
  'Web',
  'Robotics',
  'Hackathons',
  'Workshops'
] as const;

export const EventsScreen = ({ initialSelectedEvent, currentUser }: EventsScreenProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalEvent, setActiveModalEvent] = useState<CommunityEvent | null>(initialSelectedEvent || null);
  const [registeredMap, setRegisteredMap] = useState<Record<string, boolean>>({});
  const [commentsStore, setCommentsStore] = useState<Record<string, EventComment[]>>(mockEventComments);
  const commentsSectionRef = useRef<HTMLDivElement>(null);

  const getCommentCount = (eventId: string) => {
    return commentsStore[eventId]?.length || 0;
  };

  const filteredEvents = mockEvents.filter(evt => {
    const matchesCategory =
      selectedCategory === 'All' ||
      evt.category === selectedCategory ||
      evt.tags.includes(selectedCategory);

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      evt.title.toLowerCase().includes(q) ||
      evt.shortDescription.toLowerCase().includes(q) ||
      evt.tags.some(t => t.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const handleRegister = (eventId: string) => {
    setRegisteredMap(prev => ({
      ...prev,
      [eventId]: true
    }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4FF00]/10 border border-[#D4FF00]/30 text-[#D4FF00] text-xs font-mono font-bold mb-2">
            <Calendar className="w-3.5 h-3.5 text-[#D4FF00]" />
            <span>// 003. CAMPUS SESSIONS & HACKATHONS</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white uppercase font-mono tracking-tight">
            Discover Events
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Hands-on workshops, 24h buildathons, and developer meetups.
          </p>
        </div>

        {/* Search Input */}
        <div className="w-full sm:w-72 relative">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events or topics..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-[#141417] border border-zinc-800 rounded-xl focus:outline-none focus:border-[#D4FF00] text-white placeholder-zinc-500"
          />
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 no-scrollbar">
        {CATEGORIES.map(category => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-[#D4FF00] text-black border-[#D4FF00] shadow-xs'
                  : 'bg-[#141417] text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredEvents.map(event => (
          <div
            key={event.id}
            className="bg-[#141417] rounded-2xl border border-zinc-800 p-5 flex flex-col justify-between hover:border-zinc-700 transition-all shadow-xs"
          >
            <div>
              {/* Category & Date */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-mono font-bold text-[#D4FF00] bg-[#D4FF00]/10 border border-[#D4FF00]/30 px-2.5 py-0.5 rounded-md">
                  {event.date}
                </span>
                <span className="text-[11px] font-mono text-zinc-500">
                  {event.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-white mb-1.5 leading-snug">
                {event.title}
              </h3>

              {/* Location */}
              <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-3">
                <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                <span className="truncate">{event.location}</span>
              </div>

              {/* Description */}
              <p className="text-xs text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
                {event.shortDescription}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {event.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-0.5 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {/* Community Questions & Discussion Indicator */}
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-4 pt-3 border-t border-zinc-800/80">
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-400">
                  <MessageSquare className="w-3.5 h-3.5 text-[#D4FF00]" />
                  <span>{getCommentCount(event.id)} comments & Q&A</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModalEvent(event);
                    setTimeout(() => {
                      commentsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }, 120);
                  }}
                  className="text-[10px] font-mono text-[#D4FF00] hover:underline cursor-pointer"
                >
                  Discuss ↵
                </button>
              </div>
            </div>

            {/* Action CTA */}
            <button
              type="button"
              onClick={() => setActiveModalEvent(event)}
              className="w-full py-2 px-3 rounded-xl border border-zinc-700 hover:border-[#D4FF00] hover:text-[#D4FF00] text-xs font-bold text-zinc-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer bg-zinc-900"
            >
              <span>View event & AI summary</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
            </button>
          </div>
        ))}
      </div>

      {/* EVENT DETAILS & AI SUMMARY MODAL */}
      {activeModalEvent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#141417] w-full max-w-2xl rounded-2xl border-2 border-zinc-800 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-150 text-white">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModalEvent(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Event Header */}
            <div className="pr-8 mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-[#D4FF00] bg-[#D4FF00]/10 border border-[#D4FF00]/30 px-2.5 py-0.5 rounded-md">
                  {activeModalEvent.category}
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  Organized by {activeModalEvent.organizer}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-mono uppercase">
                {activeModalEvent.title}
              </h2>

              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 mt-3 pt-3 border-t border-zinc-800">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#D4FF00]" />
                  <span>{activeModalEvent.date}</span>
                </div>
                {activeModalEvent.time && (
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-zinc-500" />
                    <span>{activeModalEvent.time}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-zinc-500" />
                  <span>{activeModalEvent.location}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    commentsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="ml-auto inline-flex items-center gap-1.5 text-xs font-mono font-bold text-zinc-300 hover:text-[#D4FF00] bg-zinc-900 border border-zinc-800 hover:border-[#D4FF00]/40 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#D4FF00]" />
                  <span>{getCommentCount(activeModalEvent.id)} Questions & Discussion</span>
                </button>
              </div>
            </div>

            {/* AI-GENERATED SUMMARY SECTION */}
            <div className="bg-[#D4FF00]/10 border border-[#D4FF00]/30 rounded-2xl p-5 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-[#D4FF00]" />
                <h3 className="text-xs font-mono font-black text-[#D4FF00] uppercase tracking-wider">
                  // AI SUMMARY & QUICK BRIEF
                </h3>
                <span className="text-[10px] font-mono font-bold text-black bg-[#D4FF00] px-2 py-0.5 rounded-full ml-auto">
                  AUTO-SUMMARIZED
                </span>
              </div>

              {/* Key Takeaways TL;DR */}
              <div className="space-y-1.5 mb-3.5">
                {activeModalEvent.aiSummary.tldr.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-zinc-200 leading-relaxed">
                    <span className="text-[#D4FF00] font-bold">•</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Best Suited For */}
              <div className="pt-3 border-t border-[#D4FF00]/20">
                <h4 className="text-[11px] font-mono font-bold text-[#D4FF00] uppercase tracking-wider mb-2">
                  BEST SUITED FOR:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalEvent.aiSummary.bestSuitedFor.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono font-medium bg-zinc-900 text-zinc-200 border border-zinc-800 px-2.5 py-0.5 rounded-md"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Requirements */}
              {activeModalEvent.aiSummary.keyRequirements.length > 0 && (
                <div className="pt-3 mt-3 border-t border-[#D4FF00]/20">
                  <h4 className="text-[11px] font-mono font-bold text-[#D4FF00] uppercase tracking-wider mb-1.5">
                    REQUIREMENTS TO PARTICIPATE:
                  </h4>
                  <ul className="text-[11px] text-zinc-300 space-y-1 list-disc list-inside">
                    {activeModalEvent.aiSummary.keyRequirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* About the Event */}
            <div className="mb-6">
              <h3 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest mb-2">
                // ABOUT THE EVENT
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {activeModalEvent.fullDescription}
              </p>
            </div>

            {/* Skills / Topics */}
            <div className="mb-6">
              <h3 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest mb-2">
                // TOPICS & STACK
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {activeModalEvent.tags.map(t => (
                  <span
                    key={t}
                    className="text-xs font-mono font-medium bg-zinc-900 text-zinc-300 border border-zinc-800 px-2.5 py-1 rounded-md"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* COMMUNITY COMMENTS & DISCUSSION SECTION AT THE END OF THE EVENT */}
            <div ref={commentsSectionRef} className="mb-8">
              <EventCommentsSection
                eventId={activeModalEvent.id}
                eventTitle={activeModalEvent.title}
                organizerName={activeModalEvent.organizer}
                currentUser={currentUser}
                initialComments={commentsStore[activeModalEvent.id] || []}
                onUpdateComments={(updatedComments) => {
                  setCommentsStore(prev => ({
                    ...prev,
                    [activeModalEvent.id]: updatedComments
                  }));
                }}
              />
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
              <button
                type="button"
                onClick={() => setActiveModalEvent(null)}
                className="px-4 py-2 text-xs font-mono font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                CLOSE
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    commentsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-3.5 py-2.5 rounded-xl border border-zinc-700 hover:border-[#D4FF00] text-xs font-mono font-bold text-zinc-300 hover:text-[#D4FF00] transition-colors flex items-center gap-1.5 cursor-pointer bg-zinc-900"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Q&A</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRegister(activeModalEvent.id)}
                  className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                    registeredMap[activeModalEvent.id]
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40'
                      : 'bg-[#D4FF00] hover:bg-[#BEF200] text-black shadow-md'
                  }`}
                >
                  {registeredMap[activeModalEvent.id] ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>REGISTERED</span>
                    </>
                  ) : (
                    <>
                      <span>REGISTER NOW</span>
                      <ArrowRight className="w-4 h-4 text-black" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
