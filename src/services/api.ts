import axios, { AxiosError, AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';
import { getBaseUrl } from '../config/remoteConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = getBaseUrl();

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosRetry(apiClient, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: error => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error);
  },
});

//request interceptor
apiClient.interceptors.request.use(
  async config => {
    const dynamicUrl = getBaseUrl();

    if (!dynamicUrl) {
      console.warn('⚠️ Base URL is empty! Check Remote Config initialization.');
    }

    config.baseURL = dynamicUrl;

    // Token logic
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

// Response interceptor
apiClient.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      try {
        await AsyncStorage.removeItem('authToken');
        // Trigger logout action or navigate to login
      } catch (err) {
        console.error('Error clearing auth token:', err);
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
