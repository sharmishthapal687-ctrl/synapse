import { mockUsers, mockProjects, mockEvents } from '../data/mockData';
import type { SearchResults, AIInterpretation, User, CommunityEvent } from '../types';

export function parseQueryIntent(query: string): AIInterpretation {
  const q = query.toLowerCase();
  const topics: string[] = [];
  const roles: string[] = [];
  let collaborationIntent = 'Community Discovery & Networking';

  // Topic detection
  if (q.includes('ai') || q.includes('ml') || q.includes('machine learning') || q.includes('model')) {
    topics.push('AI & Machine Learning');
  }
  if (q.includes('health') || q.includes('med') || q.includes('clinical') || q.includes('patient')) {
    topics.push('Healthcare / HealthTech');
  }
  if (q.includes('design') || q.includes('ui') || q.includes('ux') || q.includes('figma')) {
    topics.push('UI/UX & Product Design');
  }
  if (q.includes('web') || q.includes('frontend') || q.includes('fullstack') || q.includes('react')) {
    topics.push('Web Development');
  }
  if (q.includes('robot') || q.includes('iot') || q.includes('hardware') || q.includes('c++')) {
    topics.push('Robotics & Embedded Systems');
  }

  // Role detection
  if (q.includes('python')) {
    roles.push('Python Developer');
  }
  if (q.includes('developer') || q.includes('engineer') || q.includes('coder')) {
    roles.push('Software Engineer');
  }
  if (q.includes('designer') || q.includes('figma') || q.includes('ui')) {
    roles.push('UI/UX Designer');
  }
  if (q.includes('ml') || q.includes('ai developer') || q.includes('data scientist')) {
    roles.push('ML / AI Specialist');
  }

  // Fallbacks if empty
  if (topics.length === 0) {
    topics.push('General Community Collaboration');
  }
  if (roles.length === 0) {
    roles.push('Project Collaborator');
  }

  // Intent classification
  if (q.includes('build') || q.includes('project') || q.includes('need') || q.includes('find people')) {
    collaborationIntent = 'Project Collaboration & Teammate Search';
  } else if (q.includes('hackathon') || q.includes('event') || q.includes('workshop')) {
    collaborationIntent = 'Event & Hackathon Participation';
  }

  return {
    query,
    topics,
    roles,
    collaborationIntent
  };
}

export function performSemanticSearch(
  query: string, 
  customUsers?: User[], 
  customEvents?: CommunityEvent[]
): SearchResults {
  const q = query.toLowerCase().trim();
  const interpretation = parseQueryIntent(query);
  const peoplePool = customUsers && customUsers.length > 0 ? customUsers : mockUsers;
  const eventsPool = customEvents && customEvents.length > 0 ? customEvents : mockEvents;

  // Score and filter People
  const matchedPeople = peoplePool.map(user => {
    let score = 0;
    const reasons: string[] = [];

    const userSkillsLower = user.skills.map(s => s.toLowerCase());
    const userInterestsLower = user.interests.map(i => i.toLowerCase());

    // Check Python
    if (q.includes('python') && userSkillsLower.includes('python')) {
      score += 4;
      reasons.push('strong Python expertise');
    }
    // Check AI / ML
    if ((q.includes('ai') || q.includes('ml')) && (userSkillsLower.includes('machine learning') || userInterestsLower.includes('ai'))) {
      score += 3;
      reasons.push('focus on AI & Machine Learning');
    }
    // Check Healthcare
    if ((q.includes('health') || q.includes('patient')) && userInterestsLower.includes('healthcare')) {
      score += 4;
      reasons.push('active interest in Healthcare AI');
    }
    // Check UI/UX / Figma
    if ((q.includes('design') || q.includes('figma') || q.includes('ui')) && userSkillsLower.includes('ui/ux')) {
      score += 3;
      reasons.push('UI/UX & Figma design skills');
    }
    // Check Web / React
    if ((q.includes('web') || q.includes('react') || q.includes('frontend')) && userSkillsLower.includes('react')) {
      score += 3;
      reasons.push('React and modern frontend development');
    }
    // Check Robotics
    if ((q.includes('robot') || q.includes('iot')) && userInterestsLower.includes('robotics')) {
      score += 3;
      reasons.push('Robotics & embedded systems background');
    }

    // Default general match if query is generic
    if (reasons.length === 0) {
      score = 1;
      reasons.push(`skills in ${user.skills.slice(0, 2).join(' & ')}`);
    }

    const matchReason = `Relevant because they bring ${reasons.join(' and ')}.`;

    return {
      ...user,
      score,
      matchReason
    };
  })
  .sort((a, b) => b.score - a.score)
  .slice(0, 3);

  // Score and filter Events
  const matchedEvents = eventsPool.map(evt => {
    let score = 0;
    const reasons: string[] = [];

    const evtTagsLower = evt.tags.map(t => t.toLowerCase());

    if ((q.includes('ai') || q.includes('ml')) && (evtTagsLower.includes('ai') || evt.category === 'Hackathons')) {
      score += 3;
      reasons.push('AI prototyping focus');
    }
    if ((q.includes('health') || q.includes('med')) && evtTagsLower.includes('healthcare')) {
      score += 5;
      reasons.push('dedicated Healthcare track');
    }
    if ((q.includes('design') || q.includes('ui') || q.includes('figma')) && evt.category === 'Design') {
      score += 4;
      reasons.push('practical UI/UX & design system focus');
    }
    if (q.includes('hackathon') && evt.category === 'Hackathons') {
      score += 4;
      reasons.push('hackathon team building');
    }

    if (reasons.length === 0) {
      score = 1;
      reasons.push(`aligned with community learning in ${evt.category}`);
    }

    const matchReason = `Recommended because it features ${reasons.join(' and ')}.`;

    return {
      ...evt,
      score,
      matchReason
    };
  })
  .sort((a, b) => b.score - a.score)
  .slice(0, 2);

  // Score and filter Projects
  const matchedProjects = mockProjects.map(proj => {
    let score = 0;
    const reasons: string[] = [];

    const projTagsLower = proj.tags.map(t => t.toLowerCase());

    if ((q.includes('health') || q.includes('clinical')) && projTagsLower.includes('healthcare')) {
      score += 5;
      reasons.push('directly targets clinical & healthcare challenges');
    }
    if (q.includes('python') && proj.requiredSkills.includes('Python')) {
      score += 4;
      reasons.push('actively looking for Python talent');
    }
    if ((q.includes('ai') || q.includes('ml')) && projTagsLower.includes('ai')) {
      score += 3;
      reasons.push('core AI architecture');
    }

    if (reasons.length === 0) {
      score = 1;
      reasons.push('has open roles for collaborative contributors');
    }

    const matchReason = `High alignment because it ${reasons.join(' and ')}.`;

    return {
      ...proj,
      score,
      matchReason
    };
  })
  .sort((a, b) => b.score - a.score)
  .slice(0, 2);

  return {
    interpretation,
    people: matchedPeople,
    events: matchedEvents,
    projects: matchedProjects
  };
}
