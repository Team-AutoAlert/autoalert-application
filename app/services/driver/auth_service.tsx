const API_BASE_URL = 'http://192.168.15.251:3002/api/auth';

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

export const register = async (userData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userData.email, // As per instruction, userId is same as email
        email: userData.email,
        password: userData.password,
        role: 'driver',
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: data.message, userId: data.userId, token: data.token, user: data.user };
    } else {
      return { success: false, message: data.message || 'Registration failed' };
    }
  } catch (error) {
    console.error('Registration API error:', error);
    return { success: false, message: 'Network error. Please try again.' };
  }
};

export const verifyPhone = async (userId: string, code: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/verify-phone`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, code }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: data.message, data: data.data };
    } else {
      return { success: false, message: data.message || 'Phone verification failed' };
    }
  } catch (error) {
    console.error('Phone verification API error:', error);
    return { success: false, message: 'Network error. Please try again.' };
  }
};

export const resendCode = async (userId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/resend-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: data.message };
    } else {
      return { success: false, message: data.message || 'Failed to resend code' };
    }
  } catch (error) {
    console.error('Resend code API error:', error);
    return { success: false, message: 'Network error. Please try again.' };
  }
};
