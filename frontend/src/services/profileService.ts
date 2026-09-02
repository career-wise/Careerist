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
}

export const profileService = new ProfileService();
