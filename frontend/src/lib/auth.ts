import { apiFetch, setAuthToken, removeAuthToken } from './api';

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    full_name?: string;
    onboarding_completed?: boolean;
    persona?: string;
  };
  session: { access_token: string } | null;
}

class AuthService {
  async signUp(email: string, password: string, fullName: string): Promise<AuthResponse> {
    const data = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, fullName }),
    });

    setAuthToken(data.access_token);
    
    const userProfile = await apiFetch('/profiles/me');
    
    return { 
      user: {
        id: userProfile.id,
        email: userProfile.email,
        full_name: userProfile.full_name,
        persona: userProfile.persona,
        onboarding_completed: !!userProfile.onboarding_completed_at
      },
      session: { access_token: data.access_token }
    };
  }

  async signIn(email: string, password: string): Promise<AuthResponse> {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    const data = await apiFetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    setAuthToken(data.access_token);
    
    const userProfile = await apiFetch('/profiles/me');

    return { 
      user: {
        id: userProfile.id,
        email: userProfile.email,
        full_name: userProfile.full_name,
        persona: userProfile.persona,
        onboarding_completed: !!userProfile.onboarding_completed_at
      },
      session: { access_token: data.access_token }
    };
  }

  async signOut(): Promise<void> {
    removeAuthToken();
    // Clear legacy local storage items
    localStorage.removeItem('careerwise_token');
    localStorage.removeItem('careerwise_user');
    localStorage.removeItem('careerwise_needs_onboarding');
    localStorage.removeItem('careerwise_onboarding_completed');
    localStorage.removeItem('careerwise_user_profile');
  }

  async resetPassword(email: string): Promise<void> {
    throw new Error('Password reset not implemented yet');
  }

  async getSession(): Promise<{ user: any, access_token: string } | null> {
    try {
      const userProfile = await apiFetch('/profiles/me');
      return { 
        user: {
          id: userProfile.id,
          email: userProfile.email,
          persona: userProfile.persona,
          onboarding_completed: !!userProfile.onboarding_completed_at
        },
        access_token: localStorage.getItem('careerist_token') || ''
      };
    } catch {
      return null;
    }
  }
}

export const authService = new AuthService();