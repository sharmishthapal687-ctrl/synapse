export type UserRole = 'individual' | 'community';

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
  college: string;
  year: string;
  bio: string;
  about: string;
  skills: string[];
  interests: string[];
  lookingFor: string[];
  projects?: UserProject[];
  contact?: string;
}

export interface UserProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  role: string;
  link?: string;
}

export interface CommunityProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  lookingForRoles: string[];
  requiredSkills: string[];
  teamSizeNeeded: number;
  currentMembers: number;
  ownerName: string;
  ownerAvatar?: string;
  status: 'Open for Contributors' | 'Forming Team' | 'In Progress';
}

export interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  isOnline: boolean;
  category: 'AI' | 'Design' | 'Web' | 'Robotics' | 'Hackathons' | 'Workshops';
  tags: string[];
  shortDescription: string;
  fullDescription: string;
  organizer: string;
  communityId?: string;
  aiSummary: {
    tldr: string[];
    bestSuitedFor: string[];
    keyRequirements: string[];
  };
}

export interface EventCommentReply {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  isOrganizer?: boolean;
  content: string;
  timestamp: string;
  likes: number;
  likedByMe?: boolean;
}

export interface EventComment {
  id: string;
  eventId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  isOrganizer?: boolean;
  type: 'question' | 'team-up' | 'general';
  content: string;
  timestamp: string;
  likes: number;
  likedByMe?: boolean;
  replies?: EventCommentReply[];
}

export interface Community {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logo: string;
  banner?: string;
  domains: string[];
  memberCount: number;
  leads: string[];
  contactEmail: string;
  activeEventsCount: number;
  openProjectsCount: number;
  verified: boolean;
}

export interface ChatMessage {
  id: string;
  communityId: string;
  senderId: string;
  senderName: string;
  senderRole: 'individual' | 'community';
  text: string;
  timestamp: string;
  avatar?: string;
}

export interface AIInterpretation {
  query: string;
  topics: string[];
  roles: string[];
  collaborationIntent: string;
}

export interface SearchResults {
  interpretation: AIInterpretation;
  people: Array<User & { matchReason: string }>;
  events: Array<CommunityEvent & { matchReason: string }>;
  projects: Array<CommunityProject & { matchReason: string }>;
}

export interface TeamMatchResult {
  candidate: User;
  matchScoreReason: string;
  matchedSkills: string[];
}
