const API_BASE_URL = 'http://172.19.23.148:3004/api';

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
