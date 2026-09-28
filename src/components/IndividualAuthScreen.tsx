import { useState, type FormEvent, type KeyboardEvent } from 'react';
import { 
  User as UserIcon, 
  ArrowRight, 
  Check, 
  X, 
  ArrowLeft, 
  LogIn, 
  UserPlus, 
  GraduationCap,
  Briefcase,
  Code2
} from 'lucide-react';
import type { User } from '../types';

interface IndividualAuthScreenProps {
  onLogin: (user: User) => void;
  onBackToRoles: () => void;
  existingUsers: User[];
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
];

const SUGGESTED_SKILLS = [
  'Python', 'React', 'TypeScript', 'Machine Learning', 'PyTorch', 
  'Node.js', 'Figma', 'UI/UX', 'FastAPI', 'C++', 'Next.js', 
  'Tailwind CSS', 'Docker', 'Solidity', 'Go', 'Data Science'
];

const SUGGESTED_INTERESTS = [
  'AI & Machine Learning', 'Web3 & Crypto', 'Open Source', 
  'Robotics & IoT', 'Healthcare AI', 'FinTech', 'DevTools', 'UI/UX Design'
];

const LOOKING_FOR_OPTIONS = [
  'Hackathon Teammates',
  'Project Collaborators',
  'Startup Co-Founders',
  'Mentorship',
  'Open Source Contributors',
  'Study & Coding Buddies'
];

export const IndividualAuthScreen = ({
  onLogin,
  onBackToRoles,
  existingUsers
}: IndividualAuthScreenProps) => {
  const [activeTab, setActiveTab] = useState<'signup' | 'login'>('signup');

  // Sign up form state
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [college, setCollege] = useState('');
  const [year, setYear] = useState('3rd Year');
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('');
  const [about, setAbout] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(PRESET_AVATARS[0]);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  
  const [skills, setSkills] = useState<string[]>(['React', 'TypeScript']);
  const [newSkillInput, setNewSkillInput] = useState('');
  
  const [interests, setInterests] = useState<string[]>(['AI & Machine Learning', 'Open Source']);
  const [newInterestInput, setNewInterestInput] = useState('');
  
  const [lookingFor, setLookingFor] = useState<string[]>([
    'Hackathon Teammates',
    'Project Collaborators'
  ]);

  const [formError, setFormError] = useState<string | null>(null);

  // Quick Sign In search
  const [loginQuery, setLoginQuery] = useState('');

  // Skill management
  const handleAddSkill = () => {
    const val = newSkillInput.trim();
    if (val && !skills.includes(val)) {
      setSkills(prev => [...prev, val]);
      setNewSkillInput('');
    }
  };

  const handleTogglePresetSkill = (s: string) => {
    if (skills.includes(s)) {
      setSkills(skills.filter(item => item !== s));
    } else {
      setSkills([...skills, s]);
    }
  };

  const handleRemoveSkill = (s: string) => {
    setSkills(skills.filter(item => item !== s));
  };

  // Interest management
  const handleAddInterest = () => {
    const val = newInterestInput.trim();
    if (val && !interests.includes(val)) {
      setInterests(prev => [...prev, val]);
      setNewInterestInput('');
    }
  };

  const handleTogglePresetInterest = (i: string) => {
    if (interests.includes(i)) {
      setInterests(interests.filter(item => item !== i));
    } else {
      setInterests([...interests, i]);
    }
  };

  // Looking for toggles
  const handleToggleLookingFor = (item: string) => {
    if (lookingFor.includes(item)) {
      setLookingFor(lookingFor.filter(l => l !== item));
    } else {
      setLookingFor([...lookingFor, item]);
    }
  };

  const handleSignUpSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }

    if (!role.trim()) {
      setFormError('Please enter your headline or primary role (e.g., Full-Stack Developer).');
      return;
    }

    if (skills.length === 0) {
      setFormError('Please add or select at least 1 technical skill.');
      return;
    }

    const finalAvatar = customAvatarUrl.trim() || selectedAvatar;

    // Create fresh brand new user with REAL user-entered details (NO dummy data!)
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: fullName.trim(),
      avatar: finalAvatar,
      role: role.trim(),
      college: college.trim() || 'Campus Builder',
      year: year || 'Undergraduate',
      bio: bio.trim() || `${role.trim()} passionate about building technology.`,
      about: about.trim() || `Hi, I am ${fullName.trim()}. Excited to connect with collaborators on Synapse and build impactful projects!`,
      skills: [...skills],
      interests: [...interests],
      lookingFor: [...lookingFor],
      contact: contact.trim() || undefined,
      projects: []
    };

    onLogin(newUser);
  };

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!loginQuery.trim()) return;

    const q = loginQuery.toLowerCase().trim();
    const found = existingUsers.find(
      u => u.name.toLowerCase().includes(q) || (u.contact && u.contact.toLowerCase().includes(q))
    );

    if (found) {
      onLogin(found);
    } else {
      setFormError(`No builder found matching "${loginQuery}". You can create a new account in the Sign Up tab!`);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] bg-grid-pattern text-white flex flex-col justify-start items-center p-4 sm:p-8 font-sans selection:bg-[#D4FF00] selection:text-black relative">
      {/* Background grain texture overlay */}
      <div className="fixed inset-0 pointer-events-none bg-noise opacity-35 z-0" />

      {/* Ambient Neon Lighting */}
      <div className="fixed top-12 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#D4FF00]/10 blur-[130px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-3xl w-full mx-auto my-6">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800/80">
          <button
            type="button"
            onClick={onBackToRoles}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-zinc-400 hover:text-[#D4FF00] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Back to Role Gateway</span>
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141417] border border-zinc-800 text-xs font-mono text-zinc-300">
            <div className="w-2 h-2 rounded-full bg-[#D4FF00] animate-pulse" />
            <span>INDIVIDUAL ACCESS</span>
          </div>
        </div>

        {/* Hero Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-5xl font-black text-white font-mono uppercase tracking-tight mb-2">
            Builder Identity
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-lg mx-auto">
            {activeTab === 'signup' 
              ? 'Create your personalized developer profile. Your real details power AI teammate matching and community discovery.'
              : 'Sign in to access your saved profile or explore with a builder profile.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-2 p-1.5 bg-[#141417] border border-zinc-800 rounded-2xl max-w-md mx-auto mb-8">
          <button
            type="button"
            onClick={() => { setActiveTab('signup'); setFormError(null); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'signup'
                ? 'bg-[#D4FF00] text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Create Account</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('login'); setFormError(null); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'login'
                ? 'bg-[#D4FF00] text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In / Demo</span>
          </button>
        </div>

        {/* Form Error Alert */}
        {formError && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs sm:text-sm font-mono flex items-center justify-between">
            <span>{formError}</span>
            <button 
              type="button" 
              onClick={() => setFormError(null)} 
              className="text-red-400 hover:text-red-200 cursor-pointer ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* TAB 1: SIGN UP FORM */}
        {activeTab === 'signup' && (
          <form onSubmit={handleSignUpSubmit} className="space-y-8 bg-[#141417]/90 border border-zinc-800 p-6 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-sm">
            {/* Section 1: Basic Identity */}
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#D4FF00] uppercase tracking-widest mb-4">
                <UserIcon className="w-4 h-4" />
                <span>// 01. PERSONAL INFORMATION</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">
                    Full Name <span className="text-[#D4FF00]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Devansh Sharma"
                    className="w-full bg-[#09090B] border border-zinc-800 focus:border-[#D4FF00] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">
                    Email / Contact Handle
                  </label>
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="e.g. devansh@example.com or @devansh"
                    className="w-full bg-[#09090B] border border-zinc-800 focus:border-[#D4FF00] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-300 uppercase mb-2 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-zinc-400" />
                    <span>College / University / Org</span>
                  </label>
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="e.g. Delhi Technological University"
                    className="w-full bg-[#09090B] border border-zinc-800 focus:border-[#D4FF00] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">
                    Academic Year / Stage
                  </label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full bg-[#09090B] border border-zinc-800 focus:border-[#D4FF00] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="1st Year Undergrad">1st Year Undergrad</option>
                    <option value="2nd Year Undergrad">2nd Year Undergrad</option>
                    <option value="3rd Year Undergrad">3rd Year Undergrad</option>
                    <option value="Final Year Undergrad">Final Year Undergrad</option>
                    <option value="Postgraduate / Master's">Postgraduate / Master's</option>
                    <option value="Alumni / Industry Engineer">Alumni / Industry Engineer</option>
                    <option value="Self-Taught Builder">Self-Taught Builder</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Role & Story */}
            <div className="pt-6 border-t border-zinc-800/80">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#D4FF00] uppercase tracking-widest mb-4">
                <Briefcase className="w-4 h-4" />
                <span>// 02. BUILDER ROLE & BIO</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">
                    Headline / Primary Role <span className="text-[#D4FF00]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Full-Stack Developer & AI Researcher | Hackathon Enthusiast"
                    className="w-full bg-[#09090B] border border-zinc-800 focus:border-[#D4FF00] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">
                    Short Bio (One-liner for match cards)
                  </label>
                  <input
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="e.g. Building distributed agents and healthcare diagnostic interfaces."
                    className="w-full bg-[#09090B] border border-zinc-800 focus:border-[#D4FF00] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">
                    About You (Story, interests, past projects)
                  </label>
                  <textarea
                    rows={3}
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Tell other builders about yourself, what you love building, and what projects excite you..."
                    className="w-full bg-[#09090B] border border-zinc-800 focus:border-[#D4FF00] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Avatar Selection */}
            <div className="pt-6 border-t border-zinc-800/80">
              <label className="block text-xs font-mono font-bold text-[#D4FF00] uppercase tracking-widest mb-3">
                // 03. CHOOSE YOUR AVATAR
              </label>

              <div className="flex flex-wrap items-center gap-3 mb-3">
                {PRESET_AVATARS.map((preset, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setSelectedAvatar(preset);
                      setCustomAvatarUrl('');
                    }}
                    className={`relative rounded-2xl overflow-hidden p-1 border-2 transition-all cursor-pointer ${
                      selectedAvatar === preset && !customAvatarUrl
                        ? 'border-[#D4FF00] scale-105 shadow-[0_0_15px_rgba(212,255,0,0.3)]'
                        : 'border-zinc-800 hover:border-zinc-600'
                    }`}
                  >
                    <img src={preset} alt="preset avatar" className="w-12 h-12 rounded-xl object-cover" />
                    {selectedAvatar === preset && !customAvatarUrl && (
                      <div className="absolute inset-0 bg-[#D4FF00]/20 flex items-center justify-center rounded-xl">
                        <Check className="w-4 h-4 text-[#D4FF00]" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-2">
                <input
                  type="url"
                  value={customAvatarUrl}
                  onChange={(e) => setCustomAvatarUrl(e.target.value)}
                  placeholder="Or paste custom image URL (optional)"
                  className="w-full bg-[#09090B] border border-zinc-800 focus:border-[#D4FF00] rounded-xl px-4 py-2 text-xs text-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Section 4: Technical Skills */}
            <div className="pt-6 border-t border-zinc-800/80">
              <div className="flex items-center justify-between mb-3">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#D4FF00] uppercase tracking-widest">
                  <Code2 className="w-4 h-4" />
                  <span>// 04. TECHNICAL SKILLS</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">
                  {skills.length} selected
                </span>
              </div>

              {/* Selected skills badges */}
              <div className="flex flex-wrap gap-2 mb-3 min-h-[36px] p-2 bg-[#09090B] rounded-xl border border-zinc-800">
                {skills.length === 0 ? (
                  <span className="text-xs text-zinc-500 italic p-1">No skills added yet. Click tags below or type to add.</span>
                ) : (
                  skills.map(s => (
                    <span 
                      key={s}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#D4FF00]/10 border border-[#D4FF00]/40 text-[#D4FF00] text-xs font-mono font-bold"
                    >
                      {s}
                      <button 
                        type="button" 
                        onClick={() => handleRemoveSkill(s)} 
                        className="hover:text-white cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))
                )}
              </div>

              {/* Quick Preset Skill Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {SUGGESTED_SKILLS.map(skill => {
                  const isSelected = skills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleTogglePresetSkill(skill)}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-mono transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#D4FF00] text-black border-[#D4FF00] font-bold'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}
                      {skill}
                    </button>
                  );
                })}
              </div>

              {/* Custom Skill Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill();
                    }
                  }}
                  placeholder="Add custom skill (e.g. Flutter, GraphQL, Rust) and hit Enter"
                  className="flex-1 bg-[#09090B] border border-zinc-800 focus:border-[#D4FF00] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Section 5: Interests & Looking For */}
            <div className="pt-6 border-t border-zinc-800/80">
              <label className="block text-xs font-mono font-bold text-[#D4FF00] uppercase tracking-widest mb-3">
                // 05. WHAT ARE YOU LOOKING FOR ON SYNAPSE?
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                {LOOKING_FOR_OPTIONS.map(item => {
                  const isChecked = lookingFor.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleToggleLookingFor(item)}
                      className={`p-3 rounded-xl border text-left text-xs font-mono transition-all cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? 'bg-[#D4FF00]/10 border-[#D4FF00] text-[#D4FF00] font-bold shadow-sm'
                          : 'bg-[#09090B] border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                      }`}
                    >
                      <span>{item}</span>
                      {isChecked && <Check className="w-4 h-4 text-[#D4FF00]" />}
                    </button>
                  );
                })}
              </div>

              {/* Interests Tags */}
              <label className="block text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest mb-2">
                Areas of Interest
              </label>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_INTERESTS.map(interest => {
                  const isSelected = interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => handleTogglePresetInterest(interest)}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-mono transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-zinc-200 text-black border-white font-bold'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}
                      {interest}
                    </button>
                  );
                })}
              </div>

              {/* Custom Interest Input */}
              <div className="flex gap-2 mt-3">
                <input
                  type="text"
                  value={newInterestInput}
                  onChange={(e) => setNewInterestInput(e.target.value)}
                  onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddInterest();
                    }
                  }}
                  placeholder="Add custom interest (e.g. BioTech, Quantum Computing) and hit Enter"
                  className="flex-1 bg-[#09090B] border border-zinc-800 focus:border-[#D4FF00] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={handleAddInterest}
                  className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-zinc-800/80">
              <button
                type="submit"
                className="w-full bg-[#D4FF00] hover:bg-[#bce300] text-black font-mono font-black text-sm uppercase tracking-wider py-4 rounded-2xl transition-all shadow-[0_0_25px_rgba(212,255,0,0.3)] hover:shadow-[0_0_35px_rgba(212,255,0,0.45)] cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>Create Profile & Enter Synapse</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-center text-[11px] font-mono text-zinc-500 mt-3">
                Your profile will be saved locally in your browser and used throughout the platform.
              </p>
            </div>
          </form>
        )}

        {/* TAB 2: SIGN IN / QUICK DEMO */}
        {activeTab === 'login' && (
          <div className="space-y-8 bg-[#141417]/90 border border-zinc-800 p-6 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-sm">
            {/* Quick Login by Name/Email */}
            <form onSubmit={handleLoginSubmit}>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#D4FF00] uppercase tracking-widest mb-4">
                <LogIn className="w-4 h-4" />
                <span>// SIGN IN WITH EXISTING IDENTITY</span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={loginQuery}
                  onChange={(e) => setLoginQuery(e.target.value)}
                  placeholder="Enter your name or contact email..."
                  className="flex-1 bg-[#09090B] border border-zinc-800 focus:border-[#D4FF00] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#D4FF00] hover:bg-[#bce300] text-black font-mono font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Sign In</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* Saved Accounts on this Device */}
            <div className="pt-6 border-t border-zinc-800/80">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest">
                  Available Accounts ({existingUsers.length})
                </h3>
                <span className="text-[10px] font-mono text-zinc-500">Click any card to sign in</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                {existingUsers.map(u => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => onLogin(u)}
                    className="p-3.5 rounded-2xl bg-[#09090B] hover:bg-zinc-900 border border-zinc-800 hover:border-[#D4FF00]/60 text-left transition-all cursor-pointer flex items-center gap-3 group"
                  >
                    <img 
                      src={u.avatar} 
                      alt={u.name} 
                      className="w-11 h-11 rounded-xl object-cover ring-1 ring-zinc-700 group-hover:ring-[#D4FF00] transition-all"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-white group-hover:text-[#D4FF00] truncate transition-colors">
                        {u.name}
                      </div>
                      <div className="text-[11px] text-zinc-400 truncate">
                        {u.role}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-500 truncate mt-0.5">
                        {u.college}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-[#D4FF00] group-hover:translate-x-1 transition-all shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Need to create an account? */}
            <div className="pt-4 border-t border-zinc-800/80 text-center">
              <button
                type="button"
                onClick={() => setActiveTab('signup')}
                className="text-xs font-mono text-zinc-400 hover:text-[#D4FF00] transition-colors cursor-pointer"
              >
                Don't have an account? <span className="underline font-bold text-[#D4FF00]">Create a new profile</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
