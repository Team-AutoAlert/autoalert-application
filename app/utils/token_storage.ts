import AsyncStorage from '@react-native-async-storage/async-storage';

const FCM_TOKEN_KEY = 'fcm_token';

export const storeFCMToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(FCM_TOKEN_KEY, token);
  } catch (error) {
    console.error('Error storing FCM token:', error);
  }
};

export const getStoredFCMToken = async () => {
  try {
    return await AsyncStorage.getItem(FCM_TOKEN_KEY);
  } catch (error) {
    console.error('Error retrieving FCM token:', error);
    return null;
  }
};

export const removeFCMToken = async () => {
  try {
    await AsyncStorage.removeItem(FCM_TOKEN_KEY);
  } catch (error) {
    console.error('Error removing FCM token:', error);
  }
}; 