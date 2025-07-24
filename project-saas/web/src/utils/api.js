// src/utils/api.js

import axios from 'axios';

/**
 * Base URL of the API.
 * En environnement web local, on pointe sur localhost:4000.
 * Si vous déployez ailleurs, changez cette constante ou utilisez une variable d'environnement.
 */
const BASE_URL = 'http://localhost:4000/api';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // pour transmettre cookies / JWT si besoin
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur d’erreur global (optionnel) :
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;
