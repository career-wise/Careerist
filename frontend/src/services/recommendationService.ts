import { apiFetch } from '../lib/api';

export interface Recommendation {
  id: string;
  type: string;
  source_feature: string;
  target_feature: string;
  payload: any;
  status: 'active' | 'dismissed' | 'saved';
  created_at: string;
}

export class RecommendationService {
  async getActiveRecommendations(targetFeature: string): Promise<Recommendation[]> {
    return await apiFetch(`/recommendations/active?target_feature=${targetFeature}`);
  }

  async updateRecommendationStatus(id: string, status: 'dismissed' | 'saved'): Promise<void> {
    await apiFetch(`/recommendations/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  }

  async generateExplorerPicks(): Promise<void> {
    await apiFetch('/recommendations/generate-picks', {
      method: 'POST'
    });
  }
}

export const recommendationService = new RecommendationService();
