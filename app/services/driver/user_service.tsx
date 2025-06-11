import { API_CONFIG } from '../../config/api_config';

const API_BASE_URL = `${API_CONFIG.DRIVER_BASE_URL}:3001/api`;


export const addVehicle = async (userId: string, vehicleData: {
  vehicleId: string;
  brand: string;
  model: string;
  fuelType: string;
  year: number;
  registrationNumber: string;
  lastServiceDate?: string;
  nextServiceDue?: string;
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/vehicles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicleData),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: data.message, data: data.data };
    } else {
      return { success: false, message: data.message || 'Failed to add vehicle' };
    }
  } catch (error) {
    console.error('Add vehicle API error:', error);
    return { success: false, message: 'Network error. Please try again.' };
  }
};

export const fetchUserProfile = async (userId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    const data = await response.json();

    if (response.ok) {
      return { success: true, user: data.data };
    } else {
      return { success: false, message: data.message || 'Failed to fetch user profile' };
    }
  } catch (error) {
    console.error('Fetch user profile API error:', error);
    return { success: false, message: 'Network error. Please try again.' };
  }
};

export const fetchFullUserProfile = async (userId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/profile`);
    const data = await response.json();

    if (response.ok) {
      return { success: true, userProfile: data };
    } else {
      return { success: false, message: data.message || 'Failed to fetch full user profile' };
    }
  } catch (error) {
    console.error('Fetch full user profile API error:', error);
    return { success: false, message: 'Network error. Please try again.' };
  }
};

export const updateUserLocation = async (userId: string, coordinates: [number, number]) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location: {
          type: 'Point',
          coordinates: coordinates
        }
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data: data.data };
    } else {
      return { success: false, message: data.message || 'Failed to update location' };
    }
  } catch (error) {
    console.error('Update location API error:', error);
    return { success: false, message: 'Network error. Please try again.' };
  }
};
