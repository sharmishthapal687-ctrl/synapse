import { useState, type FormEvent, type KeyboardEvent } from 'react';
import { X, Plus, Sparkles, Check, Image as ImageIcon } from 'lucide-react';
import type { User } from '../types';

interface EditProfileModalProps {
  user: User;
  onSave: (updatedUser: User) => void;
  onClose: () => void;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
];

const LOOKING_FOR_OPTIONS = [
  'Projects',
  'Teammates',
  'Hackathons',
  'Events',
  'Communities',
  'Mentorship',
  'Open Source'
];

export const EditProfileModal = ({ user, onSave, onClose }: EditProfileModalProps) => {
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);
  const [college, setCollege] = useState(user.college);
  const [year, setYear] = useState(user.year);
  const [bio, setBio] = useState(user.bio);
  const [about, setAbout] = useState(user.about);
  const [avatar, setAvatar] = useState(user.avatar);
  const [contact, setContact] = useState(user.contact || '');
  const [skills, setSkills] = useState<string[]>([...user.skills]);
  const [interests, setInterests] = useState<string[]>([...user.interests]);
  const [lookingFor, setLookingFor] = useState<string[]>([...user.lookingFor]);

  const [newSkillInput, setNewSkillInput] = useState('');
  const [newInterestInput, setNewInterestInput] = useState('');

  const handleAddSkill = () => {
    const trimmed = newSkillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setNewSkillInput('');
    }
  };

  const handleSkillKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleAddInterest = () => {
    const trimmed = newInterestInput.trim();
    if (trimmed && !interests.includes(trimmed)) {
      setInterests([...interests, trimmed]);
      setNewInterestInput('');
    }
  };

  const handleInterestKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddInterest();
    }
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    setInterests(interests.filter(i => i !== interestToRemove));
  };

  const toggleLookingFor = (item: string) => {
    if (lookingFor.includes(item)) {
      setLookingFor(lookingFor.filter(i => i !== item));
    } else {
      setLookingFor([...lookingFor, item]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const updatedUser: User = {
      ...user,
      name: name.trim(),
      role: role.trim(),
      college: college.trim(),
      year: year.trim(),
      bio: bio.trim(),
      about: about.trim(),
      avatar: avatar.trim(),
      contact: contact.trim(),
      skills,
      interests,
      lookingFor
    };

    onSave(updatedUser);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#141417] w-full max-w-2xl rounded-2xl border-2 border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4FF00]/10 border border-[#D4FF00]/30 text-[#D4FF00] text-[10px] font-mono font-bold mb-1.5">
              <Sparkles className="w-3 h-3 text-[#D4FF00]" />
              <span>// STUDENT DOSSIER EDITOR</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase font-mono tracking-tight">
              Edit Individual Profile
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5 font-sans">
              Update your personal builder identity, skill matrix, and collaboration preferences.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Avatar Section */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4">
            <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-[#D4FF00]" />
              <span>Profile Photo</span>
            </label>
            <div className="flex items-center gap-4 flex-wrap">
              <img
                src={avatar}
                alt="Avatar preview"
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#D4FF00] shrink-0"
              />
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  {PRESET_AVATARS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setAvatar(preset)}
                      className={`w-8 h-8 rounded-lg overflow-hidden border-2 transition-transform cursor-pointer ${
                        avatar === preset ? 'border-[#D4FF00] scale-105' : 'border-zinc-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={preset} alt="Preset" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <input
                  type="url"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  placeholder="Or paste custom image URL..."
                  className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-[#D4FF00] text-zinc-300 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Row 1: Name & Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sharmishtha Pal"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-[#D4FF00] text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                Role / Headline *
              </label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Full-Stack AI Developer"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-[#D4FF00] text-white"
              />
            </div>
          </div>

          {/* Row 2: College & Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                College / University
              </label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="e.g. Delhi Technological University"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-[#D4FF00] text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                Year of Study
              </label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="e.g. 3rd Year B.Tech"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-[#D4FF00] text-white"
              />
            </div>
          </div>

          {/* Bio Tagline */}
          <div>
            <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
              Short Tagline Bio
            </label>
            <input
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="e.g. Building applied machine learning tools and intuitive interfaces."
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-[#D4FF00] text-white"
            />
          </div>

          {/* Detailed About */}
          <div>
            <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
              Extended About Background
            </label>
            <textarea
              rows={3}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Share what you're currently working on, your engineering philosophy, and what projects excite you..."
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-[#D4FF00] text-white leading-relaxed"
            />
          </div>

          {/* Contact Handle */}
          <div>
            <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
              Contact / GitHub Handle
            </label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="e.g. github.com/username or user@college.edu"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-[#D4FF00] text-white"
            />
          </div>

          {/* Skills Section */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4">
            <label className="block text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest mb-2 flex items-center justify-between">
              <span>// Skills Matrix ({skills.length})</span>
              <span className="text-[10px] text-zinc-500 font-normal">Press Enter to add</span>
            </label>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {skills.map(skill => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold bg-[#D4FF00]/10 text-[#D4FF00] border border-[#D4FF00]/30 px-2.5 py-1 rounded-lg"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-white transition-colors cursor-pointer"
                    title="Remove skill"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                placeholder="Add a new skill (e.g. Docker, Tailwind, Rust)..."
                className="flex-1 px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-[#D4FF00] text-white font-mono"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                disabled={!newSkillInput.trim()}
                className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 text-xs font-mono font-bold text-white rounded-lg transition-colors cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Interests Section */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4">
            <label className="block text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest mb-2 flex items-center justify-between">
              <span>// Domain Interests ({interests.length})</span>
              <span className="text-[10px] text-zinc-500 font-normal">Press Enter to add</span>
            </label>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {interests.map(interest => (
                <span
                  key={interest}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-medium bg-zinc-800 text-zinc-200 border border-zinc-700 px-2.5 py-1 rounded-lg"
                >
                  <span>{interest}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveInterest(interest)}
                    className="hover:text-red-400 transition-colors cursor-pointer"
                    title="Remove interest"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newInterestInput}
                onChange={(e) => setNewInterestInput(e.target.value)}
                onKeyDown={handleInterestKeyDown}
                placeholder="Add domain interest (e.g. AI Ethics, Web3)..."
                className="flex-1 px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-[#D4FF00] text-white font-mono"
              />
              <button
                type="button"
                onClick={handleAddInterest}
                disabled={!newInterestInput.trim()}
                className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 text-xs font-mono font-bold text-white rounded-lg transition-colors cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Looking For Section */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4">
            <label className="block text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest mb-2">
              // What are you looking for?
            </label>
            <div className="flex flex-wrap gap-2">
              {LOOKING_FOR_OPTIONS.map(opt => {
                const isSelected = lookingFor.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggleLookingFor(opt)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-[#D4FF00] text-black border-[#D4FF00] font-bold shadow-xs'
                        : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-5 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#D4FF00] hover:bg-[#BEF200] text-black rounded-xl text-xs font-black font-mono uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(212,255,0,0.3)] flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
              <span>SAVE PROFILE CHANGES</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
