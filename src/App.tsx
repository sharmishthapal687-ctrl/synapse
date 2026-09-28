import { useState } from 'react';
import { RoleSelectScreen } from './components/RoleSelectScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import { Navbar } from './components/Navbar';
import { HomeScreen } from './components/HomeScreen';
import { AIResultsScreen } from './components/AIResultsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { FindMyTeamScreen } from './components/FindMyTeamScreen';
import { EventsScreen } from './components/EventsScreen';
import { CommunitiesScreen } from './components/CommunitiesScreen';
import { CommunityDashboard } from './components/CommunityDashboard';
import { ChatRoomModal } from './components/ChatRoomModal';
import { CuteCompanion } from './components/CuteCompanion';
import { mockUsers, mockEvents, mockProjects, mockCommunities, initialChatMessages } from './data/mockData';
import type { User, CommunityEvent, CommunityProject, SearchResults, UserRole, Community, ChatMessage } from './types';
import { performSemanticSearch } from './services/semanticSearch';

type ScreenState = 
  | 'role-select'
  | 'onboarding' 
  | 'home' 
  | 'search' 
  | 'profile' 
  | 'team' 
  | 'events' 
  | 'communities' 
  | 'community-dashboard';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('role-select');
  const [previousScreen, setPreviousScreen] = useState<ScreenState>('home');
  const [userRole, setUserRole] = useState<UserRole>('individual');
  
  // Data layers
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[2]); // Sharmishtha Pal
  const [communities, setCommunities] = useState<Community[]>(mockCommunities);
  const [activeCommunity, setActiveCommunity] = useState<Community>(mockCommunities[0]);
  const [events, setEvents] = useState<CommunityEvent[]>(mockEvents);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChatMessages);
  
  // Modals & detail selections
  const [selectedProfileUser, setSelectedProfileUser] = useState<User>(mockUsers[0]);
  const [selectedEventForModal, setSelectedEventForModal] = useState<CommunityEvent | null>(null);
  const [activeChatCommunity, setActiveChatCommunity] = useState<Community | null>(null);

  // Search results state
  const [searchResults, setSearchResults] = useState<SearchResults>(() =>
    performSemanticSearch('I want to build an AI healthcare project and need a Python developer')
  );

  const navigateTo = (screen: ScreenState) => {
    setPreviousScreen(currentScreen);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleRole = () => {
    if (userRole === 'individual') {
      setUserRole('community');
      navigateTo('community-dashboard');
    } else {
      setUserRole('individual');
      navigateTo('home');
    }
  };

  const handleOnboardingComplete = (data: {
    interests: string[];
    skills: string[];
    lookingFor: string[];
  }) => {
    setCurrentUser(prev => ({
      ...prev,
      interests: data.interests,
      skills: data.skills,
      lookingFor: data.lookingFor
    }));
    navigateTo('home');
  };

  const handleExecuteSearch = (query: string) => {
    const res = performSemanticSearch(query);
    setSearchResults(res);
    navigateTo('search');
  };

  const handleViewPerson = (user: User) => {
    setSelectedProfileUser(user);
    navigateTo('profile');
  };

  const handleViewEvent = (event: CommunityEvent) => {
    setSelectedEventForModal(event);
    navigateTo('events');
  };

  const handleViewProject = (_project: CommunityProject) => {
    navigateTo('team');
  };

  const handlePublishEvent = (newEvent: CommunityEvent) => {
    setEvents(prev => [newEvent, ...prev]);
    setCommunities(prev => prev.map(c => 
      c.id === activeCommunity.id ? { ...c, activeEventsCount: c.activeEventsCount + 1 } : c
    ));
  };

  const handleUpdateCommunity = (updated: Community) => {
    setActiveCommunity(updated);
    setCommunities(prev => prev.map(c => c.id === updated.id ? updated : c));
  };

  const handleRegisterCommunity = (newCommunity: Community) => {
    setCommunities(prev => [newCommunity, ...prev]);
    setActiveCommunity(newCommunity);
  };

  const handleSendMessage = (msg: ChatMessage) => {
    setChatMessages(prev => [...prev, msg]);
  };

  const handleUpdateCurrentUser = (updated: User) => {
    setCurrentUser(updated);
    if (selectedProfileUser.id === updated.id) {
      setSelectedProfileUser(updated);
    }
  };

  const handleViewMyProfile = () => {
    setSelectedProfileUser(currentUser);
    setUserRole('individual');
    navigateTo('profile');
  };

  // Initial Role Selection Gateway
  if (currentScreen === 'role-select') {
    return (
      <RoleSelectScreen
        onSelectRole={(role) => {
          setUserRole(role);
          if (role === 'community') {
            navigateTo('community-dashboard');
          } else {
            navigateTo('home');
          }
        }}
      />
    );
  }

  // If initial onboarding
  if (currentScreen === 'onboarding') {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-[#09090B] bg-grid-pattern text-zinc-100 flex flex-col font-sans selection:bg-[#D4FF00] selection:text-black relative">
      {/* Background grain texture overlay */}
      <div className="fixed inset-0 pointer-events-none bg-noise opacity-35 z-0" />

      {/* Navigation */}
      <div className="relative z-10">
        <Navbar
          activeScreen={currentScreen}
          onNavigate={(screen) => navigateTo(screen)}
          currentUser={currentUser}
          userRole={userRole}
          onToggleRole={handleToggleRole}
          activeCommunity={activeCommunity}
          onViewMyProfile={handleViewMyProfile}
        />
      </div>

      {/* Screen Routing */}
      <main className="flex-1 relative z-10">
        {currentScreen === 'home' && (
          <HomeScreen
            onSearch={handleExecuteSearch}
            onSelectPerson={handleViewPerson}
            onSelectEvent={handleViewEvent}
            onSelectProject={handleViewProject}
            recommendedPerson={mockUsers[0]} // Aarav
            recommendedEvent={events[0]} // Live events
            recommendedProject={mockProjects[0]} // AI Healthcare Assistant
          />
        )}

        {currentScreen === 'search' && (
          <AIResultsScreen
            results={searchResults}
            onBack={() => navigateTo('home')}
            onNewSearch={handleExecuteSearch}
            onSelectPerson={handleViewPerson}
            onSelectEvent={handleViewEvent}
            onSelectProject={handleViewProject}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileScreen
            user={selectedProfileUser}
            currentUser={currentUser}
            onBack={() => navigateTo(previousScreen === 'profile' ? 'home' : previousScreen)}
            onInviteToProject={(_user) => navigateTo('team')}
            onUpdateUser={handleUpdateCurrentUser}
          />
        )}

        {currentScreen === 'team' && (
          <FindMyTeamScreen
            onSelectPerson={handleViewPerson}
          />
        )}

        {currentScreen === 'events' && (
          <EventsScreen
            onSelectEvent={handleViewEvent}
            initialSelectedEvent={selectedEventForModal}
            currentUser={currentUser}
          />
        )}

        {currentScreen === 'communities' && (
          <CommunitiesScreen
            communities={communities}
            onOpenChat={(comm) => setActiveChatCommunity(comm)}
            onRegisterCommunity={handleRegisterCommunity}
            onSelectCommunityHub={(comm) => {
              setActiveCommunity(comm);
              setUserRole('community');
              navigateTo('community-dashboard');
            }}
          />
        )}

        {currentScreen === 'community-dashboard' && (
          <CommunityDashboard
            community={activeCommunity}
            onUpdateCommunity={handleUpdateCommunity}
            onPublishEvent={handlePublishEvent}
            onOpenChat={(comm) => setActiveChatCommunity(comm)}
            events={events}
            chatMessages={chatMessages}
            currentUser={currentUser}
          />
        )}
      </main>

      {/* Direct Student-to-Community Chat Room Modal */}
      {activeChatCommunity && (
        <ChatRoomModal
          community={activeChatCommunity}
          currentUser={currentUser}
          chatMessages={chatMessages}
          onSendMessage={handleSendMessage}
          onClose={() => setActiveChatCommunity(null)}
        />
      )}

      {/* Cute Interactive Campus Companion (Byte) */}
      <CuteCompanion onNavigate={(screen) => navigateTo(screen as ScreenState)} />

      {/* Persistent Demo Flow Switcher Bar */}
      <aside className="border-t border-zinc-800 bg-[#0C0C0E]/95 backdrop-blur-md py-2.5 px-4 font-mono relative z-10">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-zinc-400 uppercase tracking-wider text-[11px]">// DEMO:</span>
            
            {/* Student Screens */}
            <div className="flex items-center gap-1 flex-wrap">
              <button
                type="button"
                onClick={() => navigateTo('role-select')}
                className="px-2 py-1 rounded transition-colors font-bold border bg-zinc-900/90 text-[#D4FF00] border-[#D4FF00]/40 hover:bg-[#D4FF00] hover:text-black cursor-pointer shadow-[0_0_8px_rgba(212,255,0,0.15)]"
                title="Open initial role selection gate"
              >
                0. Role Gate
              </button>
              <button
                type="button"
                onClick={() => { setUserRole('individual'); navigateTo('home'); }}
                className={`px-2 py-1 rounded transition-colors ${currentScreen === 'home' ? 'bg-[#D4FF00] text-black font-bold shadow-[0_0_10px_rgba(212,255,0,0.3)]' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/80 cursor-pointer'}`}
              >
                1. Home
              </button>
              <button
                type="button"
                onClick={() => { setUserRole('individual'); navigateTo('search'); }}
                className={`px-2 py-1 rounded transition-colors ${currentScreen === 'search' ? 'bg-[#D4FF00] text-black font-bold shadow-[0_0_10px_rgba(212,255,0,0.3)]' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/80 cursor-pointer'}`}
              >
                2. AI Search
              </button>
              <button
                type="button"
                onClick={() => { setUserRole('individual'); navigateTo('communities'); }}
                className={`px-2 py-1 rounded transition-colors ${currentScreen === 'communities' ? 'bg-[#D4FF00] text-black font-bold shadow-[0_0_10px_rgba(212,255,0,0.3)]' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/80 cursor-pointer'}`}
              >
                3. Communities
              </button>
              <button
                type="button"
                onClick={() => { setActiveChatCommunity(communities[0]); }}
                className="px-2 py-1 rounded bg-zinc-900 text-[#D4FF00] hover:bg-[#D4FF00] hover:text-black font-semibold transition-colors cursor-pointer border border-[#D4FF00]/40 shadow-[0_0_8px_rgba(212,255,0,0.15)]"
              >
                💬 Chat Room
              </button>
              <button
                type="button"
                onClick={() => { setUserRole('individual'); navigateTo('team'); }}
                className={`px-2 py-1 rounded transition-colors ${currentScreen === 'team' ? 'bg-[#D4FF00] text-black font-bold shadow-[0_0_10px_rgba(212,255,0,0.3)]' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/80 cursor-pointer'}`}
              >
                4. Find Team
              </button>
              <button
                type="button"
                onClick={() => { setUserRole('individual'); navigateTo('events'); }}
                className={`px-2 py-1 rounded transition-colors ${currentScreen === 'events' ? 'bg-[#D4FF00] text-black font-bold shadow-[0_0_10px_rgba(212,255,0,0.3)]' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/80 cursor-pointer'}`}
              >
                5. Events & AI
              </button>
              <button
                type="button"
                onClick={handleViewMyProfile}
                className={`px-2 py-1 rounded transition-colors ${currentScreen === 'profile' && selectedProfileUser.id === currentUser.id ? 'bg-[#D4FF00] text-black font-bold shadow-[0_0_10px_rgba(212,255,0,0.3)]' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/80 cursor-pointer'}`}
              >
                6. Profile & Edit
              </button>
              <button
                type="button"
                onClick={() => navigateTo('onboarding')}
                className="px-2 py-1 rounded text-zinc-500 hover:text-white hover:bg-zinc-800/80 transition-colors cursor-pointer"
              >
                Setup
              </button>
            </div>

            {/* Community Mode Switcher */}
            <div className="h-4 w-px bg-zinc-800 mx-1"></div>
            <button
              type="button"
              onClick={() => { setUserRole('community'); navigateTo('community-dashboard'); }}
              className={`px-2.5 py-1 rounded transition-all font-semibold border ${
                userRole === 'community' 
                  ? 'bg-[#D4FF00] text-black border-[#D4FF00] shadow-[0_0_12px_rgba(212,255,0,0.35)]' 
                  : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-[#D4FF00]/50 hover:text-white cursor-pointer'
              }`}
            >
              🏛️ Organizer Hub
            </button>
          </div>

          <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono">
            SYNAPSE • BUILDER INTELLIGENCE
          </span>
        </div>
      </aside>
    </div>
  );
}

export default App;
