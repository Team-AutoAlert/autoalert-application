import { API_CONFIG } from '../../config/api_config';

const API_BASE_URL = `${API_CONFIG.DRIVER_BASE_URL}:3004/api`;


export const fetchTutorials = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tutorials`);
    const data = await response.json();

    if (response.ok) {
      return { success: true, tutorials: data.tutorials };
    } else {
      return { success: false, message: data.message || 'Failed to fetch tutorials' };
    }
  } catch (error) {
    console.error('Fetch tutorials API error:', error);
    return { success: false, message: 'Network error. Please try again.' };
  }
};
