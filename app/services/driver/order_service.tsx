import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://192.168.178.251:3007/api';

interface SOSAlertRequest {
  driverId: string;
  vehicleId: string;
  communicationMode: 'audio' | 'video';
  breakdownDetails: string;
}

interface SOSAlertResponse {
  success: boolean;
  data: {
    driverId: string;
    vehicleId: string;
    status: string;
    communicationMode: string;
    breakdownDetails: string;
    requiredSpecializations: string[];
    matchedMechanicIds: string[];
    mechanicId: string | null;
    callDuration: number | null;
    charges: number | null;
    createdAt: string;
    acceptedAt: string | null;
    completedAt: string | null;
    _id: string;
  };
  notificationStatus: {
    success: boolean;
    message: string;
    availableMechanics: number;
    notifiedMechanics: number;
  };
  message: string;
}

export const createSOSAlert = async (
  breakdownDetails: string,
  driverId: string,
  vehicleId: string,
  communicationMode: 'audio' | 'video' = 'audio'
): Promise<SOSAlertResponse> => {
  try {
    const requestBody: SOSAlertRequest = {
      driverId,
      vehicleId,
      communicationMode,
      breakdownDetails,
    };

    const response = await fetch(`${API_BASE_URL}/sos-alerts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: SOSAlertResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating SOS alert:', error);
    throw error;
  }
};
