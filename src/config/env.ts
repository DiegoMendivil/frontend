const rawApiUrl = import.meta.env.VITE_API_URL?.trim() || '/api';

export const API_URL = rawApiUrl.replace(/\/+$/, '');
