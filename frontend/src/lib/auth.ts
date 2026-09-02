import { supabase } from './supabase';
import { User, Session } from '@supabase/supabase-js';

export interface AuthResponse {
  user: User & { onboarding_completed?: boolean; persona?: string };
  session: Session | null;
}

class AuthService {
  async signUp(email: string, password: string, fullName: string): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    });

    if (error) throw error;

    let isCompleted = false;
    let userPersona = undefined;
    if (data.user) {
      // Check if profile exists and onboarding is done
      const { data: profile } = await supabase
        .from('profiles')
        .select('onboarding_completed_at, persona')
        .eq('id', data.user.id)
        .single();
        
      if (profile) {
        if (profile.onboarding_completed_at) {
          isCompleted = true;
        }
        userPersona = profile.persona;
      }
    }

    return { 
      user: data.user ? { ...data.user, onboarding_completed: isCompleted, persona: userPersona } : null as any, 
      session: data.session 
    };
  }

  async signIn(email: string, password: string): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;

    let isCompleted = false;
    let userPersona = undefined;
    if (data.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('onboarding_completed_at, persona')
        .eq('id', data.user.id)
        .single();
        
      if (profile) {
        if (profile.onboarding_completed_at) {
          isCompleted = true;
        }
        userPersona = profile.persona;
      }
    }

    return { 
      user: data.user ? { ...data.user, onboarding_completed: isCompleted, persona: userPersona } : null as any, 
      session: data.session 
    };
  }

  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    // Clear legacy local storage items
    localStorage.removeItem('careerwise_token');
    localStorage.removeItem('careerwise_user');
    localStorage.removeItem('careerwise_needs_onboarding');
    localStorage.removeItem('careerwise_onboarding_completed');
    localStorage.removeItem('careerwise_user_profile');
  }

  async resetPassword(email: string): Promise<void> {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth?reset=true`
    });
    if (error) throw error;
  }

  async getSession(): Promise<Session | null> {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  }
}

export const authService = new AuthService();