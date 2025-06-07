const API_BASE_URL = 'http://192.168.178.251:3002/api/auth';

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: data.message, token: data.token, user: data.user };
    } else {
      return { success: false, message: data.message || 'Login failed' };
    }
  } catch (error) {
    console.error('Login API error:', error);
    return { success: false, message: 'Network error. Please try again.' };
  }
};
