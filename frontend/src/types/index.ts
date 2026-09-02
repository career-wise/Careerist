export type ClarityLevel = 'no idea' | 'torn' | 'decided';
export type Persona = 'high-school' | 'college' | 'career-changer';

export interface UserProfile {
  firstName: string;
  lastName: string;
  initials: string;
  persona: Persona;
  clarityLevel: ClarityLevel;
  goal: string;
}

export interface College {
  id: string | number;
  name: string;
  location: string;
  matchScore: number;
  tags?: string[];
  description?: string;
  type?: string;
  ranking?: number;
  acceptance?: string;
  tuition?: string;
  enrollment?: string;
  satRange?: string;
  programs?: string[];
  image?: string;
  highlights?: string[];
  applicationDeadline?: string;
}

export interface Major {
  id?: string | number;
  name: string;
  category: string;
  matchScore: number;
  description?: string;
  averageSalary?: string;
  entryLevelSalary?: string;
  jobGrowth?: string;
  difficulty?: string;
  timeToComplete?: string;
  careers?: string[];
  requiredCourses?: string[];
  icon?: any;
  image?: string;
  demandLevel?: string;
  topSkills?: string[];
  workLifeBalance?: string;
  remoteOpportunities?: string;
}

export interface Goal {
  id: string | number;
  title: string;
  status: 'pending' | 'in_progress' | 'in-progress' | 'completed' | 'overdue';
  dueDate?: string;
  description?: string;
  category?: string;
  targetLabel?: string;
  progress?: number;
  priority?: string;
  milestones?: { task: string; completed: boolean }[];
}

export interface JourneyNode {
  id: number;
  status: 'upcoming' | 'current' | 'completed';
  label: string;
  detail: string;
}

export interface AppState {
  user: UserProfile;
  shortlistedColleges: College[];
  shortlistedMajors: Major[];
  goals: Goal[];
  journey: JourneyNode[];
}
