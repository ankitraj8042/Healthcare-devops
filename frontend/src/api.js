const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000';

const request = async (path, payload) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Request failed.');
  }

  return data;
};

export const loginUser = (payload) => request('/api/auth/login', payload);

export const signupUser = (payload) => request('/api/auth/signup', payload);
