export const EVENT_TYPES = {
  STRUGGLE: 'struggle',
  GOAL_SET: 'goal_set',
  MILESTONE_REACHED: 'milestone_reached',
  INTERVIEW_COMPLETED: 'interview_completed',
} as const;

export type EventType = typeof EVENT_TYPES[keyof typeof EVENT_TYPES];

export const RECOMMENDATION_TYPES = {
  COURSE: 'course',
  RESOURCE: 'resource',
  ACTION_ITEM: 'action_item',
  MOTIVATIONAL_NUDGE: 'motivational_nudge',
  GOAL_SUGGESTION: 'goal_suggestion',
} as const;

export type RecommendationType = typeof RECOMMENDATION_TYPES[keyof typeof RECOMMENDATION_TYPES];

export const FEATURES = {
  CHAT: 'chat',
  DASHBOARD: 'dashboard',
  STUDY_SUCCEED: 'study_succeed',
  LEARN_DEVELOP: 'learn_develop',
  PREPARE_FUTURE: 'prepare_future',
  EXPLORER: 'explorer',
} as const;

export type FeatureType = typeof FEATURES[keyof typeof FEATURES];
