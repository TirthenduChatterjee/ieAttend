import axios from 'axios'

const api = axios.create({
  // Matches the default HTTPS launch profile in HRMS/Properties/launchSettings.json.
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://localhost:7207/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('hrms_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(new Error(error.response?.data?.message || 'Something went wrong. Please try again.')),
)

export default api
