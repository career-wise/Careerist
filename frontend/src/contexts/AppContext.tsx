import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppState, College, Major, Goal, JourneyNode, UserProfile } from '../types';
import { initialMockState } from '../data/mockDatabase';
import { eventService } from '../services/eventService';
import { EVENT_TYPES, FEATURES } from '../lib/constants';

interface AppContextType {
  state: AppState;
  updateUser: (user: Partial<UserProfile>) => void;
  toggleShortlistedCollege: (college: College) => void;
  toggleShortlistedMajor: (major: Major) => void;
  addGoal: (goal: Goal) => void;
  updateGoalStatus: (goalId: string, status: Goal['status']) => void;
  deleteGoal: (goalId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const savedState = localStorage.getItem('careerist_mvp_state');
    if (savedState) {
      try {
        return JSON.parse(savedState);
      } catch (e) {
        console.error("Failed to parse saved state", e);
      }
    }
    return initialMockState;
  });

  useEffect(() => {
    localStorage.setItem('careerist_mvp_state', JSON.stringify(state));
  }, [state]);

  const updateUser = (userUpdates: Partial<UserProfile>) => {
    setState(prev => ({
      ...prev,
      user: { ...prev.user, ...userUpdates }
    }));
  };

  const toggleShortlistedCollege = (college: College) => {
    setState(prev => {
      const isSaved = prev.shortlistedColleges.some(c => c.id === college.id);
      if (isSaved) {
        return {
          ...prev,
          shortlistedColleges: prev.shortlistedColleges.filter(c => c.id !== college.id)
        };
      } else {
        return {
          ...prev,
          shortlistedColleges: [...prev.shortlistedColleges, college]
        };
      }
    });
  };

  const toggleShortlistedMajor = (major: Major) => {
    setState(prev => {
      const isSaved = prev.shortlistedMajors.some(m => m.id === major.id);
      if (isSaved) {
        return {
          ...prev,
          shortlistedMajors: prev.shortlistedMajors.filter(m => m.id !== major.id)
        };
      } else {
        return {
          ...prev,
          shortlistedMajors: [...prev.shortlistedMajors, major]
        };
      }
    });
  };

  const addGoal = (goal: Goal) => {
    setState(prev => ({
      ...prev,
      goals: [...prev.goals, goal]
    }));
    eventService.logEvent(EVENT_TYPES.GOAL_SET, { title: goal.title, category: goal.category }, FEATURES.STUDY_SUCCEED);
  };

  const updateGoalStatus = (goalId: string, status: Goal['status']) => {
    setState(prev => {
      const updatedGoals = prev.goals.map(g => g.id === goalId ? { ...g, status } : g);
      const goal = updatedGoals.find(g => g.id === goalId);
      if (goal && status === 'completed') {
        eventService.logEvent(EVENT_TYPES.MILESTONE_REACHED, { title: goal.title, type: 'goal_completed' }, FEATURES.STUDY_SUCCEED);
      }
      return { ...prev, goals: updatedGoals };
    });
  };

  const deleteGoal = (goalId: string) => {
    setState(prev => ({
      ...prev,
      goals: prev.goals.filter(g => g.id !== goalId)
    }));
  };

  return (
    <AppContext.Provider value={{ 
      state, 
      updateUser, 
      toggleShortlistedCollege, 
      toggleShortlistedMajor, 
      addGoal, 
      updateGoalStatus,
      deleteGoal
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
