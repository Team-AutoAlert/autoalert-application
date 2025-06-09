import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://192.168.15.251:3007/api';

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

interface NearbyMechanic {
  location: {
    type: string;
    coordinates: [number, number];
  };
  _id: string;
  userId: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profilePicture: string | null;
  status: string;
  address: string;
  language: string;
  createdAt: string;
  updatedAt: string;
  distance: {
    meters: number;
    kilometers: string;
  };
}

interface NearbyMechanicsResponse {
  success: boolean;
  data: NearbyMechanic[];
  message: string;
}

interface HireMechanicRequest {
  driverId: string;
  registrationNumber: string;
  breakdownDetails: string;
}

interface HireMechanicResponse {
  success: boolean;
  data: {
    driverId: string;
    mechanicId: string;
    status: string;
    driverLocation: {
      type: string;
      coordinates: [number, number];
    };
    registrationNumber: string;
    breakdownDetails: string;
    totalAmount: number;
    _id: string;
    services: any[];
    createdAt: string;
    updatedAt: string;
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

export const getNearbyMechanics = async (userId: string): Promise<NearbyMechanicsResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/nearby-mechanics/list/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: NearbyMechanicsResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching nearby mechanics:', error);
    throw error;
  }
};

export const hireMechanic = async (
  mechanicId: string,
  driverId: string,
  registrationNumber: string,
  breakdownDetails: string
): Promise<HireMechanicResponse> => {
  try {
    const requestBody: HireMechanicRequest = {
      driverId,
      registrationNumber,
      breakdownDetails,
    };

    const response = await fetch(`${API_BASE_URL}/nearby-mechanics/hire/${mechanicId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: HireMechanicResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error hiring mechanic:', error);
    throw error;
  }
};
