import { supabase } from '../lib/supabase';
import { RecommendationType, FeatureType } from '../lib/constants';

export interface Recommendation {
  id: string;
  user_id: string;
  type: RecommendationType | string;
  payload: any;
  source_feature: FeatureType | string;
  target_feature: FeatureType | string;
  status: 'active' | 'dismissed' | 'completed';
  created_at: string;
}

export const recommendationService = {
  async getActiveRecommendations(userId: string, targetFeature?: string) {
    let query = supabase
      .from('recommendations')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active');
      
    if (targetFeature) {
      query = query.eq('target_feature', targetFeature);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching recommendations:', error);
      throw error;
    }
    
    return data as Recommendation[];
  },

  async updateStatus(id: string, status: 'dismissed' | 'completed') {
    const { data, error } = await supabase
      .from('recommendations')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating recommendation:', error);
      throw error;
    }
    
    return data as Recommendation;
  }
};
