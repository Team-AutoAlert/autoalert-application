// services/order_service.tsx

export interface Alert {
  _id: string;
  driverId: string;
  vehicleId: string;
  status: string;
  communicationMode: 'audio' | 'video';
  breakdownDetails: string;
  requiredSpecializations: string[];
  matchedMechanicIds: string[];
  mechanicId: string | null;
  callDuration: string | null;
  charges: string | null;
  createdAt: string;
  acceptedAt: string | null;
  completedAt: string | null;
  driver: any;
  vehicle: any;
}

const BASE_URL = 'http://192.168.8.167:3007';

/**
 * Fetches all active SOS alerts from the server.
 */
export const getActiveSOSAlerts = async (): Promise<Alert[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/sos-alerts/active`);
    const json = await response.json();
    if (json.success) {
      return json.data;
    } else {
      console.warn('Failed to fetch active alerts');
      return [];
    }
  } catch (error) {
    console.error('Error fetching SOS alerts:', error);
    return [];
  }
};

/**
 * Accepts an SOS alert on behalf of a mechanic.
 */
export const acceptSOSAlert = async (alertId: string, mechanicId: string): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/api/sos-alerts/accept`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alertId, mechanicId }),
    });

    const json = await response.json();
    if (!response.ok) {
      console.warn('Failed to accept alert:', json.message);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error accepting SOS alert:', error);
    return false;
  }
};


export const completeSOSAlert = async (alertId: string, callDuration: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/sos-alerts/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alertId, callDuration }),
    });
    const json = await response.json();
    if (!response.ok) {
      console.warn('Failed to complete alert:', json.message);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to complete alert:', error);
    return false;
  }
  
};


export const viewJobNotifications = async (mechanicId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/nearby-mechanics/requests/${mechanicId}`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error fetching job notifications:', error);
    return { success: false, data: [] };
  }
};

export const acceptJobNotification = async (requestId: string, mechanicId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/nearby-mechanics/requests/accept`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requestId, mechanicId }),
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error accepting job notification:', error);
    return { success: false };
  }
};

