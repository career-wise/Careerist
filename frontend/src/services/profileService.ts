import { apiFetch } from '../lib/api';
import { OnboardingAnswers } from '../components/shared/onboarding/OnboardingFlow';

export class ProfileService {
  async saveOnboardingData(userId: string, data: OnboardingAnswers) {
    const { persona, ...answers } = data;
    
    await apiFetch('/profiles/onboarding', {
      method: 'POST',
      body: JSON.stringify({
        persona: persona || 'high-school',
        onboarding_answers: answers
      })
    });
  }

  async getProfile(userId: string) {
    return await apiFetch('/profiles/me');
  }

  async generateCareerRoadmap() {
    const result = await apiFetch('/goals/roadmap/generate', {
      method: 'POST'
    });
    
    if (!result.success) {
      throw new Error('Failed to generate roadmap');
    }
    
    return result;
  }
}

export const profileService = new ProfileService();
