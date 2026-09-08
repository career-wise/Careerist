export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const getAuthToken = () => {
  return localStorage.getItem('careerist_token');
};

export const setAuthToken = (token: string) => {
  localStorage.setItem('careerist_token', token);
};

export const removeAuthToken = () => {
  localStorage.removeItem('careerist_token');
};

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    let errorMessage = 'An error occurred';
    try {
      const errorData = await response.json();
      errorMessage = errorData.detail || errorData.message || errorMessage;
    } catch (e) {
      // Not JSON
    }
    
    if (response.status === 401) {
      removeAuthToken();
      // Optionally emit event or handle global logout here
      window.location.href = '/auth';
    }
    
    throw new Error(errorMessage);
  }

  if (response.status !== 204) {
    return response.json();
  }
};
