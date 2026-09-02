import { AppState, College, Major, Goal, JourneyNode } from '../types';

export const initialMockState: AppState = {
  user: {
    firstName: "Alex",
    lastName: "Johnson",
    initials: "AJ",
    persona: "high-school",
    clarityLevel: "torn",
    goal: "choose the right degree/major"
  },
  shortlistedColleges: [
    {
      id: "c1",
      name: "Stanford University",
      location: "Stanford, CA",
      matchScore: 98,
      tags: ["Target", "Reach"],
      tuition: "$56,169",
      acceptanceRate: "4%"
    }
  ],
  shortlistedMajors: [
    {
      id: "m1",
      name: "Computer Science",
      category: "STEM",
      matchScore: 95
    }
  ],
  goals: [
    {
      id: "g1",
      title: "Complete SAT Prep Course",
      status: "in-progress",
      category: "academic",
      dueDate: "Oct 15"
    },
    {
      id: "g2",
      title: "Submit Common App Draft",
      status: "pending",
      category: "academic",
      dueDate: "Nov 1"
    }
  ],
  journey: [
    { id: 1, status: 'completed', label: 'Onboarding', detail: 'Profile & goals set up' },
    { id: 2, status: 'completed', label: 'First Field', detail: 'Explored Computer Science' },
    { id: 3, status: 'completed', label: 'Skills Module', detail: 'Started Intro to Logic' },
    { id: 4, status: 'current', label: 'Compare Options', detail: 'Compare 3 potential majors' },
    { id: 5, status: 'upcoming', label: 'Colleges', detail: 'Shortlist top colleges' }
  ]
};
