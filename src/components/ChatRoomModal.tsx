import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Send, X, Sparkles, CheckCircle2 } from 'lucide-react';
import type { Community, ChatMessage, User } from '../types';

interface ChatRoomModalProps {
  community: Community;
  currentUser: User;
  chatMessages: ChatMessage[];
  onSendMessage: (msg: ChatMessage) => void;
  onClose: () => void;
}

const QUICK_INQUIRIES = [
  'How do I join this community as a member?',
  'Are beginners welcome for your upcoming hackathons?',
  'I am looking for a project team/mentor in this domain.'
];

export const ChatRoomModal = ({
  community,
  currentUser,
  chatMessages,
  onSendMessage,
  onClose
}: ChatRoomModalProps) => {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const communityMessages = chatMessages.filter(m => m.communityId === community.id);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [communityMessages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      communityId: community.id,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: 'individual',
      text: text.trim(),
      timestamp: 'Just now',
      avatar: currentUser.avatar
    };

    onSendMessage(newMsg);
    setInputText('');

    // Simulate smart organizer auto-reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let replyText = `Thanks for reaching out, ${currentUser.name}! The ${community.name} organizers received your inquiry.`;
      
      const lower = text.toLowerCase();
      if (lower.includes('join') || lower.includes('member')) {
        replyText = `We would love to have you! We hold open onboardings every Wednesday at 5 PM. Drop by or join our project channel!`;
      } else if (lower.includes('beginner') || lower.includes('hackathon')) {
        replyText = `Yes, 100%! We specifically designed starter tracks and peer mentors for our events so beginners can learn comfortably.`;
      } else if (lower.includes('project') || lower.includes('mentor')) {
        replyText = `Great! Several of our project leads are actively seeking contributors with your skills. Check out our open projects on the dashboard!`;
      }

      const replyMsg: ChatMessage = {
        id: `msg-reply-${Date.now()}`,
        communityId: community.id,
        senderId: 'comm-organizer',
        senderName: `${community.leads[0]} (${community.name})`,
        senderRole: 'community',
        text: replyText,
        timestamp: 'Just now',
        avatar: community.logo
      };
      onSendMessage(replyMsg);
    }, 900);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSend(inputText);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-hidden">
      <div className="bg-[#141417] w-full max-w-2xl h-[90vh] max-h-[680px] rounded-2xl border border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-4 border-b border-zinc-800 bg-[#09090B] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={community.logo}
              alt={community.name}
              className="w-10 h-10 rounded-xl object-cover ring-1 ring-zinc-700"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-bold text-white leading-tight font-mono">
                  {community.name}
                </h2>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4FF00]" />
              </div>
              <p className="text-[11px] text-zinc-400 font-mono">
                Direct Club Chat • Led by {community.leads.join(', ')}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 bg-[#09090B]">
          <div className="text-center my-2">
            <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-[#D4FF00] bg-zinc-900/90 border border-zinc-800 px-3 py-1 rounded-full">
              // DIRECT INQUIRY CHANNEL WITH COMMUNITY LEADS
            </span>
          </div>

          {communityMessages.map(msg => {
            const isUser = msg.senderRole === 'individual';

            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                <img
                  src={msg.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                  alt={msg.senderName}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-zinc-700 shrink-0 mt-0.5"
                />

                <div>
                  <div className={`flex items-center gap-1.5 text-[11px] mb-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <span className="font-semibold text-zinc-300 font-mono">{msg.senderName}</span>
                    <span className="text-zinc-500 text-[10px] font-mono">{msg.timestamp}</span>
                  </div>

                  <div
                    className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? 'bg-[#D4FF00] text-black font-semibold rounded-tr-xs shadow-md selection:bg-black selection:text-[#D4FF00]'
                        : 'bg-[#18181B] text-zinc-200 border border-zinc-800 rounded-tl-xs shadow-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-900 w-fit px-3 py-1.5 rounded-full border border-zinc-800 shadow-xs font-mono">
              <Sparkles className="w-3 h-3 text-[#D4FF00] animate-spin" />
              <span>Organizer is typing a response...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2.5 bg-[#141417] border-t border-zinc-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 shrink-0 mr-1">
            Quick Ask:
          </span>
          {QUICK_INQUIRIES.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(q)}
              className="text-[11px] text-zinc-300 bg-zinc-900 hover:bg-[#D4FF00] hover:text-black px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer border border-zinc-800 font-medium"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSubmit} className="p-3 sm:p-4 bg-[#141417] border-t border-zinc-800 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message or inquiry to the community..."
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-[#D4FF00] text-white placeholder:text-zinc-500 font-sans"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="px-4 py-2.5 bg-[#D4FF00] hover:bg-[#BEF200] disabled:opacity-40 text-black rounded-xl text-xs sm:text-sm font-bold font-mono transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(212,255,0,0.2)] shrink-0"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5 text-black" />
          </button>
        </form>
      </div>
    </div>
  );
};
