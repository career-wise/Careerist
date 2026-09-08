import { apiFetch } from '../lib/api';

export type GoalStatus = 'active' | 'pending' | 'in-progress' | 'completed' | 'overdue' | 'abandoned';

export interface Goal {
  id: string;
  title: string;
  description?: string;
  category: string;
  target_date?: string;
  status: GoalStatus;
  progress: number;
  priority: 'low' | 'medium' | 'high';
}

export class GoalService {
  async getGoals(): Promise<Goal[]> {
    return await apiFetch('/goals/');
  }

  async createGoal(goal: Partial<Goal>): Promise<Goal> {
    return await apiFetch('/goals/', {
      method: 'POST',
      body: JSON.stringify(goal)
    });
  }

  async updateGoal(id: string, updates: Partial<Goal>): Promise<Goal> {
    return await apiFetch(`/goals/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    });
  }

  async deleteGoal(id: string): Promise<void> {
    await apiFetch(`/goals/${id}`, {
      method: 'DELETE'
    });
  }
}

export const goalService = new GoalService();
