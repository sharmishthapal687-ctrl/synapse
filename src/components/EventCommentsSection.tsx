import { useState, type FormEvent } from 'react';
import { 
  MessageSquare, 
  Send, 
  Heart, 
  Reply, 
  ShieldCheck, 
  Users, 
  HelpCircle, 
  Sparkles, 
  X
} from 'lucide-react';
import type { EventComment, User } from '../types';

interface EventCommentsSectionProps {
  eventId: string;
  eventTitle: string;
  organizerName: string;
  currentUser?: User;
  initialComments?: EventComment[];
  onUpdateComments?: (comments: EventComment[]) => void;
}

export const EventCommentsSection = ({
  eventId,
  eventTitle,
  organizerName,
  currentUser,
  initialComments = [],
  onUpdateComments
}: EventCommentsSectionProps) => {
  const [comments, setComments] = useState<EventComment[]>(initialComments);
  const [filter, setFilter] = useState<'all' | 'question' | 'team-up' | 'general'>('all');
  
  // New top-level comment form state
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentType, setNewCommentType] = useState<'question' | 'team-up' | 'general'>('question');
  
  // Reply form state
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // Calculate filtered comments
  const filteredComments = comments.filter(c => {
    if (filter === 'all') return true;
    return c.type === filter;
  });

  const questionCount = comments.filter(c => c.type === 'question').length;
  const teamUpCount = comments.filter(c => c.type === 'team-up').length;
  const generalCount = comments.filter(c => c.type === 'general').length;

  const handleAddComment = (e: FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: EventComment = {
      id: `cmt-${Date.now()}`,
      eventId,
      authorId: currentUser?.id || 'guest-user',
      authorName: currentUser?.name || 'Student Builder',
      authorAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      authorRole: currentUser?.role || 'Campus Participant',
      isOrganizer: false,
      type: newCommentType,
      content: newCommentText.trim(),
      timestamp: 'Just now',
      likes: 0,
      likedByMe: false,
      replies: []
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    setNewCommentText('');
    onUpdateComments?.(updated);
  };

  const handleLikeComment = (commentId: string) => {
    const updated = comments.map(c => {
      if (c.id === commentId) {
        const isLiked = !c.likedByMe;
        return {
          ...c,
          likedByMe: isLiked,
          likes: isLiked ? c.likes + 1 : Math.max(0, c.likes - 1)
        };
      }
      return c;
    });
    setComments(updated);
    onUpdateComments?.(updated);
  };

  const handleAddReply = (parentCommentId: string) => {
    if (!replyText.trim()) return;

    const updated = comments.map(c => {
      if (c.id === parentCommentId) {
        const newReply = {
          id: `rep-${Date.now()}`,
          authorId: currentUser?.id || 'guest-user',
          authorName: currentUser?.name || 'Student Builder',
          authorAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
          authorRole: currentUser?.role || 'Campus Participant',
          isOrganizer: false,
          content: replyText.trim(),
          timestamp: 'Just now',
          likes: 0,
          likedByMe: false
        };
        return {
          ...c,
          replies: [...(c.replies || []), newReply]
        };
      }
      return c;
    });

    setComments(updated);
    setReplyText('');
    setReplyingToId(null);
    onUpdateComments?.(updated);
  };

  const handleLikeReply = (parentCommentId: string, replyId: string) => {
    const updated = comments.map(c => {
      if (c.id === parentCommentId && c.replies) {
        return {
          ...c,
          replies: c.replies.map(r => {
            if (r.id === replyId) {
              const isLiked = !r.likedByMe;
              return {
                ...r,
                likedByMe: isLiked,
                likes: isLiked ? r.likes + 1 : Math.max(0, r.likes - 1)
              };
            }
            return r;
          })
        };
      }
      return c;
    });
    setComments(updated);
    onUpdateComments?.(updated);
  };

  return (
    <div className="pt-6 mt-6 border-t border-zinc-800">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="w-4 h-4 text-[#D4FF00]" />
            <h3 className="text-xs font-mono font-black text-white uppercase tracking-wider">
              // COMMUNITY QUESTIONS & DISCUSSION
            </h3>
            <span className="text-[10px] font-mono font-bold text-black bg-[#D4FF00] px-2 py-0.5 rounded-full">
              {comments.length}
            </span>
          </div>
          <p className="text-xs text-zinc-400">
            Ask questions, find team members for this event, or chat with organizers.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-zinc-200 text-black shadow-xs'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            All ({comments.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('question')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all flex items-center gap-1 cursor-pointer ${
              filter === 'question'
                ? 'bg-amber-400 text-black shadow-xs'
                : 'bg-zinc-900 text-zinc-400 hover:text-amber-400 border border-zinc-800'
            }`}
          >
            <HelpCircle className="w-3 h-3" />
            Questions ({questionCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter('team-up')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all flex items-center gap-1 cursor-pointer ${
              filter === 'team-up'
                ? 'bg-[#D4FF00] text-black shadow-xs'
                : 'bg-zinc-900 text-zinc-400 hover:text-[#D4FF00] border border-zinc-800'
            }`}
          >
            <Users className="w-3 h-3" />
            Team-Up ({teamUpCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter('general')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
              filter === 'general'
                ? 'bg-zinc-200 text-black shadow-xs'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            General ({generalCount})
          </button>
        </div>
      </div>

      {/* NEW COMMENT INPUT FORM */}
      <form onSubmit={handleAddComment} className="bg-[#09090B] border border-zinc-800 rounded-2xl p-4 mb-6 focus-within:border-[#D4FF00]/60 transition-colors">
        {/* Posting As & Intent Selector */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-zinc-900">
          <div className="flex items-center gap-2">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
              alt={currentUser?.name || 'You'}
              className="w-6 h-6 rounded-full border border-zinc-700 object-cover"
            />
            <span className="text-xs font-mono text-zinc-300">
              Posting as <strong className="text-white">{currentUser?.name || 'You'}</strong>
            </span>
          </div>

          {/* Type Selector Buttons */}
          <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
            <button
              type="button"
              onClick={() => setNewCommentType('question')}
              className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                newCommentType === 'question'
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <HelpCircle className="w-2.5 h-2.5" />
              Question
            </button>
            <button
              type="button"
              onClick={() => setNewCommentType('team-up')}
              className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                newCommentType === 'team-up'
                  ? 'bg-[#D4FF00]/20 text-[#D4FF00] border border-[#D4FF00]/40'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Users className="w-2.5 h-2.5" />
              Team-Up
            </button>
            <button
              type="button"
              onClick={() => setNewCommentType('general')}
              className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold transition-colors cursor-pointer ${
                newCommentType === 'general'
                  ? 'bg-zinc-800 text-white border border-zinc-700'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              General
            </button>
          </div>
        </div>

        {/* Textarea */}
        <textarea
          rows={2}
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder={
            newCommentType === 'question'
              ? `Ask organizers of "${eventTitle}" or participants about rules, prerequisites, or timings...`
              : newCommentType === 'team-up'
              ? "Looking for teammates? Mention the roles or skills you need (e.g., 'Looking for 1 frontend dev with Next.js')..."
              : "Share your thoughts, suggestions, or excitement for this event..."
          }
          className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none resize-none leading-relaxed"
        />

        {/* Form Bottom Row */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-zinc-900/80">
          <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#D4FF00]" />
            Connect with {organizerName} & campus peers
          </span>

          <button
            type="submit"
            disabled={!newCommentText.trim()}
            className="ml-auto px-4 py-1.5 rounded-xl bg-[#D4FF00] hover:bg-[#BEF200] disabled:opacity-40 disabled:hover:bg-[#D4FF00] text-black text-xs font-black uppercase font-mono tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Post</span>
            <Send className="w-3 h-3 text-black" />
          </button>
        </div>
      </form>

      {/* COMMENTS LIST */}
      <div className="space-y-4">
        {filteredComments.length === 0 ? (
          <div className="text-center py-8 bg-[#09090B]/50 border border-dashed border-zinc-800 rounded-2xl p-6">
            <MessageSquare className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
            <p className="text-xs font-mono text-zinc-400 font-bold mb-1">
              No comments in this filter yet
            </p>
            <p className="text-[11px] text-zinc-500 max-w-sm mx-auto">
              Be the first to ask a question, recruit a hackathon partner, or start a discussion for {eventTitle}!
            </p>
          </div>
        ) : (
          filteredComments.map((comment) => (
            <div
              key={comment.id}
              className="bg-[#09090B] border border-zinc-800/90 rounded-2xl p-4 sm:p-5 hover:border-zinc-700 transition-colors space-y-3"
            >
              {/* Comment Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <img
                    src={comment.authorAvatar}
                    alt={comment.authorName}
                    className="w-8 h-8 rounded-full border border-zinc-700 object-cover shrink-0 mt-0.5"
                  />
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-xs font-bold text-white">
                        {comment.authorName}
                      </span>
                      
                      {comment.isOrganizer && (
                        <span className="inline-flex items-center gap-1 text-[9px] font-mono font-black text-black bg-[#D4FF00] px-1.5 py-0.2 rounded">
                          <ShieldCheck className="w-2.5 h-2.5" />
                          ORGANIZER
                        </span>
                      )}

                      <span className="text-[10px] font-mono text-zinc-400">
                        • {comment.authorRole}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-zinc-500">
                      {comment.timestamp}
                    </span>
                  </div>
                </div>

                {/* Comment Type Badge */}
                <div>
                  {comment.type === 'question' && (
                    <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <HelpCircle className="w-2.5 h-2.5" />
                      QUESTION
                    </span>
                  )}
                  {comment.type === 'team-up' && (
                    <span className="text-[10px] font-mono font-bold text-[#D4FF00] bg-[#D4FF00]/10 border border-[#D4FF00]/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Users className="w-2.5 h-2.5" />
                      TEAM-UP
                    </span>
                  )}
                  {comment.type === 'general' && (
                    <span className="text-[10px] font-mono font-medium text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-md">
                      DISCUSSION
                    </span>
                  )}
                </div>
              </div>

              {/* Comment Content */}
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed pl-11">
                {comment.content}
              </p>

              {/* Comment Actions (Like & Reply) */}
              <div className="flex items-center gap-4 pl-11 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => handleLikeComment(comment.id)}
                  className={`flex items-center gap-1 transition-colors cursor-pointer ${
                    comment.likedByMe
                      ? 'text-pink-400 font-bold'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${comment.likedByMe ? 'fill-pink-500 text-pink-500' : ''}`} />
                  <span>{comment.likes}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setReplyingToId(replyingToId === comment.id ? null : comment.id);
                    setReplyText('');
                  }}
                  className="flex items-center gap-1 text-zinc-500 hover:text-[#D4FF00] transition-colors cursor-pointer"
                >
                  <Reply className="w-3.5 h-3.5" />
                  <span>Reply</span>
                </button>
              </div>

              {/* INLINE REPLY FORM */}
              {replyingToId === comment.id && (
                <div className="ml-11 mt-2 p-3 bg-zinc-900/90 border border-zinc-800 rounded-xl animate-in fade-in duration-150">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-zinc-400">
                      Replying to <strong className="text-white">@{comment.authorName}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => setReplyingToId(null)}
                      className="text-zinc-500 hover:text-white p-0.5 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleAddReply(comment.id);
                        }
                      }}
                      placeholder="Write your reply..."
                      className="flex-1 bg-[#09090B] border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4FF00]"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => handleAddReply(comment.id)}
                      disabled={!replyText.trim()}
                      className="px-3 py-1.5 rounded-lg bg-[#D4FF00] hover:bg-[#BEF200] disabled:opacity-40 text-black text-xs font-mono font-bold cursor-pointer transition-colors"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              )}

              {/* THREADED REPLIES LIST */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-11 mt-3 pt-3 border-t border-zinc-900 space-y-3">
                  {comment.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="bg-zinc-900/60 border border-zinc-800/70 rounded-xl p-3 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={reply.authorAvatar}
                            alt={reply.authorName}
                            className="w-5 h-5 rounded-full border border-zinc-700 object-cover"
                          />
                          <span className="text-xs font-bold text-white">
                            {reply.authorName}
                          </span>
                          {reply.isOrganizer && (
                            <span className="inline-flex items-center gap-0.5 text-[8px] font-mono font-black text-black bg-[#D4FF00] px-1 py-0.1 rounded">
                              <ShieldCheck className="w-2 h-2" />
                              ORGANIZER
                            </span>
                          )}
                          <span className="text-[10px] font-mono text-zinc-500">
                            • {reply.authorRole}
                          </span>
                        </div>
                        <span className="text-[9px] font-mono text-zinc-500">
                          {reply.timestamp}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-300 pl-7 leading-relaxed">
                        {reply.content}
                      </p>

                      <div className="pl-7 pt-0.5">
                        <button
                          type="button"
                          onClick={() => handleLikeReply(comment.id, reply.id)}
                          className={`flex items-center gap-1 text-[10px] font-mono transition-colors cursor-pointer ${
                            reply.likedByMe
                              ? 'text-pink-400 font-bold'
                              : 'text-zinc-500 hover:text-zinc-300'
                          }`}
                        >
                          <Heart className={`w-3 h-3 ${reply.likedByMe ? 'fill-pink-500 text-pink-500' : ''}`} />
                          <span>{reply.likes}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
