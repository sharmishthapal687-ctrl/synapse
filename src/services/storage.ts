import type { User, CommunityEvent, Community, EventComment } from '../types';
import { mockUsers, mockEvents, mockCommunities, mockEventComments } from '../data/mockData';

const STORAGE_KEYS = {
  USERS: 'synapse_users_v2',
  CURRENT_USER: 'synapse_current_user_v2',
  EVENTS: 'synapse_events_v2',
  COMMENTS: 'synapse_comments_v2',
  COMMUNITIES: 'synapse_communities_v2',
  ACTIVE_COMMUNITY: 'synapse_active_community_v2',
  ORGANIZER_EMAIL: 'synapse_organizer_email_v2',
};

// Safe helper to read from localStorage with fallback
function safeGetItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`[Synapse Storage] Failed to parse ${key}:`, err);
    return fallback;
  }
}

// Safe helper to write to localStorage
function safeSetItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`[Synapse Storage] Failed to save ${key}:`, err);
  }
}

// Users
export function getStoredUsers(): User[] {
  return safeGetItem<User[]>(STORAGE_KEYS.USERS, mockUsers);
}

export function saveStoredUsers(users: User[]): void {
  safeSetItem(STORAGE_KEYS.USERS, users);
}

export function addUserToStorage(newUser: User): User[] {
  const existing = getStoredUsers();
  // If user already exists by ID, update it; otherwise append
  const index = existing.findIndex(u => u.id === newUser.id);
  let updated: User[];
  if (index >= 0) {
    updated = [...existing];
    updated[index] = newUser;
  } else {
    updated = [newUser, ...existing];
  }
  saveStoredUsers(updated);
  return updated;
}

// Current Logged In User
export function getStoredCurrentUser(): User | null {
  return safeGetItem<User | null>(STORAGE_KEYS.CURRENT_USER, null);
}

export function saveStoredCurrentUser(user: User | null): void {
  if (user) {
    safeSetItem(STORAGE_KEYS.CURRENT_USER, user);
  } else {
    try {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    } catch {}
  }
}

// Events
export function getStoredEvents(): CommunityEvent[] {
  return safeGetItem<CommunityEvent[]>(STORAGE_KEYS.EVENTS, mockEvents);
}

export function saveStoredEvents(events: CommunityEvent[]): void {
  safeSetItem(STORAGE_KEYS.EVENTS, events);
}

// Event Comments
export function getStoredComments(): Record<string, EventComment[]> {
  return safeGetItem<Record<string, EventComment[]>>(STORAGE_KEYS.COMMENTS, mockEventComments);
}

export function saveStoredComments(comments: Record<string, EventComment[]>): void {
  safeSetItem(STORAGE_KEYS.COMMENTS, comments);
}

// Communities
export function getStoredCommunities(): Community[] {
  return safeGetItem<Community[]>(STORAGE_KEYS.COMMUNITIES, mockCommunities);
}

export function saveStoredCommunities(communities: Community[]): void {
  safeSetItem(STORAGE_KEYS.COMMUNITIES, communities);
}

export function getStoredActiveCommunity(): Community {
  const stored = safeGetItem<Community | null>(STORAGE_KEYS.ACTIVE_COMMUNITY, null);
  return stored || mockCommunities[0];
}

export function saveStoredActiveCommunity(community: Community): void {
  safeSetItem(STORAGE_KEYS.ACTIVE_COMMUNITY, community);
}

export function addCommunityToStorage(newCommunity: Community): Community[] {
  const existing = getStoredCommunities();
  const index = existing.findIndex(c => c.id === newCommunity.id || c.contactEmail.toLowerCase() === newCommunity.contactEmail.toLowerCase());
  let updated: Community[];
  if (index >= 0) {
    updated = [...existing];
    updated[index] = newCommunity;
  } else {
    updated = [newCommunity, ...existing];
  }
  saveStoredCommunities(updated);
  return updated;
}

export function getStoredOrganizerEmail(): string | null {
  return safeGetItem<string | null>(STORAGE_KEYS.ORGANIZER_EMAIL, null);
}

export function saveStoredOrganizerEmail(email: string | null): void {
  if (email) {
    safeSetItem(STORAGE_KEYS.ORGANIZER_EMAIL, email);
  } else {
    try {
      localStorage.removeItem(STORAGE_KEYS.ORGANIZER_EMAIL);
    } catch {}
  }
}
