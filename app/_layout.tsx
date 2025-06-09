import { Stack, router } from "expo-router";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { registerForPushNotificationsAsync, setupNotificationListeners } from './services/notification_service';

function InitialLayout() {
  const { userId, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!userId) {
        router.replace('/views/driver/driver_login');
      } else {
        // Redirect to home if already logged in and navigating to root
        router.replace('/views/driver/home');
      }
    }
  }, [userId, isLoading]);

  useEffect(() => {
    // Register for push notifications and log the token
    const getToken = async () => {
      const token = await registerForPushNotificationsAsync();
      console.log('FCM Token in Layout:', token);
    };
    getToken();

    // Set up notification listeners
    const cleanup = setupNotificationListeners();

    // Cleanup listeners on unmount
    return cleanup;
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
        <ActivityIndicator size="large" color="#e53935" />
      </View>
    );
  }

  return <Stack>
    <Stack.Screen 
      name="views/driver/(tabs)" 
      options={{ 
        headerShown: false 
      }} 
    />
    <Stack.Screen 
      name="views/driver/driver_login" 
      options={{
        headerShown: false
      }}
    />
    <Stack.Screen
      name="views/driver/sign_up_form"
      options={{
        headerShown: false
      }}
    />
    <Stack.Screen
      name="views/driver/contact_info"
      options={{
        headerShown: false
      }}
    />
    <Stack.Screen
      name="views/driver/mobile_verify"
      options={{
        headerShown: false
      }}
    />
    <Stack.Screen
      name="views/driver/vehicle_info"
      options={{
        headerShown: false
      }}
    />
    <Stack.Screen
      name="views/driver/tutorial/videoPlayer"
      options={{
        headerShown: false
      }}
    />
     <Stack.Screen
      name="views/driver/tutorial/pdfViewer"
      options={{
        headerShown: false
      }}
    />
  </Stack>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}
