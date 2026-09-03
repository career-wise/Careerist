import { supabase } from '../lib/supabase';
import { OnboardingAnswers } from '../components/shared/onboarding/OnboardingFlow';

export class ProfileService {
  async saveOnboardingData(userId: string, data: OnboardingAnswers) {
    const { persona, ...answers } = data;
    
    // We expect the profile to either exist (if created via trigger) or we upsert it.
    // The id must match the auth.users id.
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        persona: persona || 'high-school', // default if skipped
        onboarding_answers: answers,
        onboarding_completed_at: new Date().toISOString()
      }, { onConflict: 'id' });

    if (error) {
      console.error('Error saving onboarding data:', error);
      throw error;
    }
  }

  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error('Error fetching profile:', error);
      throw error;
    }

    return data;
  }

  async generateCareerRoadmap() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error("Not authenticated");

    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-roadmap`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
      }
    );

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to generate roadmap');
    }

    const result = await response.json();
    return result.roadmap;
  }
}

export const profileService = new ProfileService();
