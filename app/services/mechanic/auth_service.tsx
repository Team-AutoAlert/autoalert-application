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
