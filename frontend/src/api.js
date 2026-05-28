const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000';

const request = async (path, { method = 'GET', payload } = {}) => {
  const options = {
    method,
    headers: {}
  };

  if (payload) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(payload);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, options);

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Request failed.');
  }

  return data;
};

export const loginUser = (payload) =>
  request('/api/auth/login', { method: 'POST', payload });

export const signupUser = (payload) =>
  request('/api/auth/signup', { method: 'POST', payload });

export const getAppointments = () => request('/api/appointments');

export const createAppointment = (payload) =>
  request('/api/appointments', { method: 'POST', payload });

export const updateAppointmentStatus = (id, status) =>
  request(`/api/appointments/${id}`, { method: 'PUT', payload: { status } });
