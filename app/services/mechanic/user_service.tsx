// services/user_service.tsx
import { API_CONFIG } from '../../config/api_config';

const API_BASE_URL = `${API_CONFIG.MECHANIC_USER_BASE_URL}/api/users`;

export const updateMechanicStatus = async (userId: string, status: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${userId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error("Status update failed: Server responded with success = false");
    }

    return data;
  } catch (error) {
    console.error("Status update failed:", error);
    throw error;
  }
};


export const updateMechanicLocation = async (userId: string, lat: number, lng: number) => {
  const body = {
    location: {
      type: "Point",
      coordinates: [lng, lat],
    },
  };

  const response = await fetch(`${API_BASE_URL}/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error response from backend:", errorData);
    throw new Error("Failed to update location");
  }

  return await response.json();
};

export const uploadMechanicDocuments = async (
  mechanicId: string,
  nicUri: string
): Promise<any> => {
  const formData = new FormData();

  // Append NIC Image
  const filename = nicUri.split('/').pop() || 'nic_image.jpg';
  const match = /\.(\w+)$/.exec(filename ?? '');
  const type = match ? `image/${match[1]}` : 'image';

  formData.append('nicDocument', {
    uri: nicUri,
    name: filename,
    type: type,
  } as any);

  const response = await fetch(`${API_BASE_URL}/${mechanicId}/mechanic/documents`, {
    method: 'POST',
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to upload NIC document');
  }

  return await response.json();
};