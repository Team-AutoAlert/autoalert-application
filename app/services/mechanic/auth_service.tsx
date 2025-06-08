// app/services/mechanic/auth_service.tsx

export const mechanicLogin = async (email: string, password: string) => {
  try {
    const response = await fetch(
      "http://192.168.8.167:3002/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      if (data.user?.role === "mechanic") {
        return { success: true, token: data.token, user: data.user };
      } else {
        return { success: false, message: "Access denied. Not a mechanic." };
      }
    } else {
      return { success: false, message: data.message || "Invalid credentials." };
    }
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Network error or server issue." };
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
    const response = await fetch("http://192.168.8.167:3002/api/auth/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userData.email, // As per instruction, userId is same as email
        email: userData.email,
        password: userData.password,
        role: 'mechanic',
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
