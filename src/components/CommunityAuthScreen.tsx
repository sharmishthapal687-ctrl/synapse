import { useState, type FormEvent, type KeyboardEvent } from 'react';
import { 
  Building2, 
  ArrowRight, 
  Check, 
  X, 
  ArrowLeft, 
  Sparkles, 
  Mail, 
  Users, 
  Compass, 
  LogIn
} from 'lucide-react';
import type { Community } from '../types';

interface CommunityAuthScreenProps {
  onSelectCommunity: (community: Community, email: string) => void;
  onBackToRoles: () => void;
  communities: Community[];
}

const PRESET_LOGOS = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=150&auto=format&fit=crop&q=80',
];

const PRESET_DOMAINS = [
  'AI & ML',
  'Web Development',
  'Robotics',
  'UI/UX Design',
  'Open Source',
  'IoT & Hardware',
  'Blockchain & Web3',
  'Cybersecurity',
  'Data Science',
  'Competitive Coding'
];

export const CommunityAuthScreen = ({
  onSelectCommunity,
  onBackToRoles,
  communities
}: CommunityAuthScreenProps) => {
  // Step 1: Email check
  const [emailInput, setEmailInput] = useState('');
  const [checkedEmail, setCheckedEmail] = useState<string | null>(null);
  const [matchedCommunity, setMatchedCommunity] = useState<Community | null>(null);
  const [isNewCommunityFlow, setIsNewCommunityFlow] = useState(false);

  // Step 2: New Community registration form fields
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [campus, setCampus] = useState('');
  const [leads, setLeads] = useState('');
  const [memberCount, setMemberCount] = useState<number>(45);
  const [selectedLogo, setSelectedLogo] = useState(PRESET_LOGOS[0]);
  const [customLogoUrl, setCustomLogoUrl] = useState('');

  const [domains, setDomains] = useState<string[]>(['AI & ML', 'Open Source']);
  const [newDomainInput, setNewDomainInput] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  // Check email entered by organizer
  const handleCheckEmail = (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const cleanEmail = emailInput.trim().toLowerCase();
    if (!cleanEmail) {
      setFormError('Please enter your community organizer email.');
      return;
    }

    if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setFormError('Please enter a valid email address (e.g. devclub@campus.edu).');
      return;
    }

    setCheckedEmail(cleanEmail);

    // Search existing registered communities for this email
    const found = communities.find(
      c => c.contactEmail.toLowerCase() === cleanEmail
    );

    if (found) {
      setMatchedCommunity(found);
      setIsNewCommunityFlow(false);
    } else {
      setMatchedCommunity(null);
      setIsNewCommunityFlow(true);
    }
  };

  // Add custom domain
  const handleAddDomain = () => {
    const val = newDomainInput.trim();
    if (val && !domains.includes(val)) {
      setDomains([...domains, val]);
      setNewDomainInput('');
    }
  };

  const handleTogglePresetDomain = (d: string) => {
    if (domains.includes(d)) {
      setDomains(domains.filter(item => item !== d));
    } else {
      setDomains([...domains, d]);
    }
  };

  const handleRemoveDomain = (d: string) => {
    setDomains(domains.filter(item => item !== d));
  };

  // Register brand new community
  const handleRegisterCommunitySubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!name.trim()) {
      setFormError('Please enter your community or organization name.');
      return;
    }

    if (!tagline.trim()) {
      setFormError('Please provide a short tagline summarizing your community.');
      return;
    }

    if (!leads.trim()) {
      setFormError('Please provide the lead organizer name(s).');
      return;
    }

    if (domains.length === 0) {
      setFormError('Please select or add at least 1 focus area / domain.');
      return;
    }

    const finalLogo = customLogoUrl.trim() || selectedLogo;
    const leadList = leads.split(',').map(l => l.trim()).filter(Boolean);

    // Create fresh community with user's REAL details (no dummy data!)
    const newCommunity: Community = {
      id: `comm-${Date.now()}`,
      name: name.trim(),
      tagline: tagline.trim(),
      description: description.trim() || `${name.trim()} is an active student builder organization at ${campus.trim() || 'campus'}.`,
      logo: finalLogo,
      banner: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
      domains: [...domains],
      memberCount: Number(memberCount) || 30,
      leads: leadList.length > 0 ? leadList : ['Lead Organizer'],
      contactEmail: checkedEmail || emailInput.trim(),
      activeEventsCount: 0,
      openProjectsCount: 0,
      verified: true
    };

    onSelectCommunity(newCommunity, checkedEmail || emailInput.trim());
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
            <Building2 className="w-3.5 h-3.5 text-[#D4FF00]" />
            <span>ORGANIZER HUB GATEWAY</span>
          </div>
        </div>

        {/* Hero Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-5xl font-black text-white font-mono uppercase tracking-tight mb-2">
            Community Portal
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-lg mx-auto">
            Manage your campus club, publish hackathons, and recruit builders. Enter your organizer email to continue.
          </p>
        </div>

        {/* Error Alert */}
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

        {/* STEP 1: ORGANIZER EMAIL VERIFICATION CARD */}
        <div className="bg-[#141417]/90 border border-zinc-800 p-6 sm:p-8 rounded-3xl shadow-2xl backdrop-blur-sm mb-6">
          <form onSubmit={handleCheckEmail}>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#D4FF00] uppercase tracking-widest mb-3">
              <Mail className="w-4 h-4" />
              <span>// 01. ORGANIZER EMAIL AUTHENTICATION</span>
            </div>

            <p className="text-xs text-zinc-400 mb-4">
              If your community is already registered, this email takes you directly to your dashboard. If it's new, you'll be prompted to build your community.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                    if (checkedEmail && e.target.value.trim().toLowerCase() !== checkedEmail) {
                      setCheckedEmail(null);
                      setMatchedCommunity(null);
                      setIsNewCommunityFlow(false);
                    }
                  }}
                  placeholder="e.g. devclub@gcet.edu or ai-society@campus.edu"
                  className="w-full bg-[#09090B] border border-zinc-800 focus:border-[#D4FF00] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-[#D4FF00] hover:bg-[#bce300] text-black font-mono font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(212,255,0,0.2)] shrink-0"
              >
                <span>Verify Email</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* CASE A: EXISTING COMMUNITY DETECTED */}
          {matchedCommunity && (
            <div className="mt-6 pt-6 border-t border-zinc-800/80 animate-in fade-in slide-in-from-top-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold mb-4">
                <Check className="w-3.5 h-3.5" />
                <span>// COMMUNITY RECOGNIZED</span>
              </div>

              <div className="bg-[#09090B] border border-emerald-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={matchedCommunity.logo}
                    alt={matchedCommunity.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-500/40"
                  />
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white font-mono">
                      {matchedCommunity.name}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-1">
                      {matchedCommunity.tagline}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 text-[11px] font-mono text-zinc-500">
                      <span>{matchedCommunity.memberCount} members</span>
                      <span>•</span>
                      <span>{matchedCommunity.leads.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectCommunity(matchedCommunity, checkedEmail || emailInput)}
                  className="px-5 py-3 bg-[#D4FF00] hover:bg-[#bce300] text-black font-mono font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,255,0,0.3)] shrink-0"
                >
                  <span>Open Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* CASE B: NEW EMAIL DETECTED - PROMPT TO BUILD */}
          {checkedEmail && !matchedCommunity && isNewCommunityFlow && (
            <div className="mt-6 pt-6 border-t border-zinc-800/80 animate-in fade-in slide-in-from-top-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4FF00]/10 border border-[#D4FF00]/30 text-[#D4FF00] text-xs font-mono font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>// NEW ORGANIZER DETECTED</span>
              </div>
              <p className="text-sm text-zinc-300">
                No existing community is registered under <span className="text-[#D4FF00] font-mono font-bold">{checkedEmail}</span>.
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                Fill in the details below to establish your community's official presence on Synapse!
              </p>
            </div>
          )}
        </div>

        {/* STEP 2: BUILD A NEW COMMUNITY FORM (Shows when new email detected or directly chosen) */}
        {isNewCommunityFlow && (
          <form 
            onSubmit={handleRegisterCommunitySubmit}
            className="space-y-8 bg-[#141417]/90 border border-zinc-800 p-6 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-sm animate-in fade-in slide-in-from-bottom-3"
          >
            {/* Section 1: Community Identity */}
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#D4FF00] uppercase tracking-widest mb-4">
                <Building2 className="w-4 h-4" />
                <span>// 02. COMMUNITY IDENTITY & BASICS</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">
                    Community / Organization Name <span className="text-[#D4FF00]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Google Developer Student Club or Robotics Society"
                    className="w-full bg-[#09090B] border border-zinc-800 focus:border-[#D4FF00] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">
                    Official Contact Email <span className="text-[#D4FF00]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    disabled
                    value={checkedEmail || emailInput}
                    className="w-full bg-[#09090B]/60 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-400 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">
                    Campus / University <span className="text-[#D4FF00]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={campus}
                    onChange={(e) => setCampus(e.target.value)}
                    placeholder="e.g. Delhi Technological University"
                    className="w-full bg-[#09090B] border border-zinc-800 focus:border-[#D4FF00] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">
                    Punchy Tagline / Mission <span className="text-[#D4FF00]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="e.g. Campus hub for machine learning, AI buildathons, and software engineering."
                    className="w-full bg-[#09090B] border border-zinc-800 focus:border-[#D4FF00] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Leadership & Story */}
            <div className="pt-6 border-t border-zinc-800/80">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#D4FF00] uppercase tracking-widest mb-4">
                <Users className="w-4 h-4" />
                <span>// 03. LEADERSHIP & DETAILS</span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">
                      Lead Organizer Name(s) <span className="text-[#D4FF00]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={leads}
                      onChange={(e) => setLeads(e.target.value)}
                      placeholder="e.g. Priya Sharma (Lead), Rohan Gupta"
                      className="w-full bg-[#09090B] border border-zinc-800 focus:border-[#D4FF00] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">
                      Estimated Active Members
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={memberCount}
                      onChange={(e) => setMemberCount(parseInt(e.target.value) || 0)}
                      className="w-full bg-[#09090B] border border-zinc-800 focus:border-[#D4FF00] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">
                    Full Description & About the Community
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what your community does, what kind of events or workshops you host, and why builders should connect with you..."
                    className="w-full bg-[#09090B] border border-zinc-800 focus:border-[#D4FF00] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Focus Areas / Domains */}
            <div className="pt-6 border-t border-zinc-800/80">
              <div className="flex items-center justify-between mb-3">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#D4FF00] uppercase tracking-widest">
                  <Compass className="w-4 h-4" />
                  <span>// 04. TECHNICAL FOCUS & DOMAINS</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">
                  {domains.length} selected
                </span>
              </div>

              {/* Selected domains pills */}
              <div className="flex flex-wrap gap-2 mb-3 min-h-[36px] p-2 bg-[#09090B] rounded-xl border border-zinc-800">
                {domains.length === 0 ? (
                  <span className="text-xs text-zinc-500 italic p-1">No domains selected yet. Click tags below to add.</span>
                ) : (
                  domains.map(d => (
                    <span 
                      key={d}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#D4FF00]/10 border border-[#D4FF00]/40 text-[#D4FF00] text-xs font-mono font-bold"
                    >
                      {d}
                      <button 
                        type="button" 
                        onClick={() => handleRemoveDomain(d)} 
                        className="hover:text-white cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))
                )}
              </div>

              {/* Preset Domain Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {PRESET_DOMAINS.map(domain => {
                  const isSelected = domains.includes(domain);
                  return (
                    <button
                      key={domain}
                      type="button"
                      onClick={() => handleTogglePresetDomain(domain)}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-mono transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#D4FF00] text-black border-[#D4FF00] font-bold'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}
                      {domain}
                    </button>
                  );
                })}
              </div>

              {/* Custom Domain Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newDomainInput}
                  onChange={(e) => setNewDomainInput(e.target.value)}
                  onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddDomain();
                    }
                  }}
                  placeholder="Add custom domain (e.g. GameDev, Quantum) and press Enter"
                  className="flex-1 bg-[#09090B] border border-zinc-800 focus:border-[#D4FF00] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={handleAddDomain}
                  className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Section 4: Logo Selection */}
            <div className="pt-6 border-t border-zinc-800/80">
              <label className="block text-xs font-mono font-bold text-[#D4FF00] uppercase tracking-widest mb-3">
                // 05. CHOOSE COMMUNITY LOGO
              </label>

              <div className="flex flex-wrap items-center gap-3 mb-3">
                {PRESET_LOGOS.map((preset, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setSelectedLogo(preset);
                      setCustomLogoUrl('');
                    }}
                    className={`relative rounded-2xl overflow-hidden p-1 border-2 transition-all cursor-pointer ${
                      selectedLogo === preset && !customLogoUrl
                        ? 'border-[#D4FF00] scale-105 shadow-[0_0_15px_rgba(212,255,0,0.3)]'
                        : 'border-zinc-800 hover:border-zinc-600'
                    }`}
                  >
                    <img src={preset} alt="preset logo" className="w-12 h-12 rounded-xl object-cover" />
                    {selectedLogo === preset && !customLogoUrl && (
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
                  value={customLogoUrl}
                  onChange={(e) => setCustomLogoUrl(e.target.value)}
                  placeholder="Or paste custom logo image URL (optional)"
                  className="w-full bg-[#09090B] border border-zinc-800 focus:border-[#D4FF00] rounded-xl px-4 py-2 text-xs text-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-zinc-800/80">
              <button
                type="submit"
                className="w-full bg-[#D4FF00] hover:bg-[#bce300] text-black font-mono font-black text-sm uppercase tracking-wider py-4 rounded-2xl transition-all shadow-[0_0_25px_rgba(212,255,0,0.3)] hover:shadow-[0_0_35px_rgba(212,255,0,0.45)] cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>Launch Community Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-center text-[11px] font-mono text-zinc-500 mt-3">
                Your community will be saved in your browser and automatically recognized on future logins with this email.
              </p>
            </div>
          </form>
        )}

        {/* QUICK ACCESS / DEMO COMMUNITIES FOR EVALUATION */}
        <div className="mt-8 bg-[#141417]/60 border border-zinc-800/70 p-6 rounded-3xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <LogIn className="w-3.5 h-3.5 text-[#D4FF00]" />
              <span>Or Select From Registered Communities ({communities.length})</span>
            </h3>
            <span className="text-[10px] font-mono text-zinc-500">1-Click Organizer Login</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {communities.map(comm => (
              <button
                key={comm.id}
                type="button"
                onClick={() => onSelectCommunity(comm, comm.contactEmail)}
                className="p-3.5 rounded-2xl bg-[#09090B] hover:bg-zinc-900 border border-zinc-800 hover:border-[#D4FF00]/50 text-left transition-all cursor-pointer flex items-center gap-3 group"
              >
                <img
                  src={comm.logo}
                  alt={comm.name}
                  className="w-11 h-11 rounded-xl object-cover ring-1 ring-zinc-700 group-hover:ring-[#D4FF00] transition-all shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-white group-hover:text-[#D4FF00] truncate transition-colors">
                    {comm.name}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-400 truncate mt-0.5">
                    {comm.contactEmail}
                  </div>
                  <div className="text-[10px] text-zinc-500 truncate">
                    {comm.memberCount} members • {comm.activeEventsCount} events
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-[#D4FF00] group-hover:translate-x-1 transition-all shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
