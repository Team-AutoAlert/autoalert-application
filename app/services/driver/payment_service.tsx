import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://172.19.23.148:3008/api';

interface Service {
  name: string;
  description: string;
  charge: number;
  _id: string;
}

interface PaymentBill {
  _id: string;
  alertId?: string;
  requestId?: string;
  driverId: string;
  mechanicId: string;
  amount: number;
  orderType: 'sos_alert' | 'nearby_mechanic';
  status: 'paid' | 'unpaid';
  callDuration?: number;
  services: Service[];
  createdAt: string;
  __v: number;
}

interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

interface DriverBillsResponse {
  success: boolean;
  data: PaymentBill[];
  pagination: PaginationInfo;
  message: string;
}

export const getDriverBills = async (userId: string): Promise<DriverBillsResponse> => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    console.log('Making API request for userId:', userId);
    const response = await fetch(`${API_BASE_URL}/payments/bills/driver/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: DriverBillsResponse = await response.json();
    console.log('API Response:', data);

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Error fetching driver bills:', error);
    throw error;
  }
};
