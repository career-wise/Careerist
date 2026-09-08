import { apiFetch } from '../lib/api';

export interface ResumeData {
  id?: string;
  user_id?: string;
  content: any;
  created_at?: string;
  updated_at?: string;
}

export class ResumeService {
  async getResume(): Promise<ResumeData | null> {
    const resumes = await apiFetch('/resumes/');
    if (resumes && resumes.length > 0) {
      return resumes[0];
    }
    return null;
  }

  async saveResume(content: any): Promise<void> {
    const existing = await this.getResume();
    
    if (existing && existing.id) {
      await apiFetch(`/resumes/${existing.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ content })
      });
    } else {
      await apiFetch('/resumes/', {
        method: 'POST',
        body: JSON.stringify({ content })
      });
    }
  }
}

export const resumeService = new ResumeService();
