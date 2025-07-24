// web/src/utils/api.js  (ou mobile/src/utils/api.js)

import axios from 'axios';
import { Platform } from 'react-native';  // si c’est dans React Native

// Choix de l’URL en fonction de la plateforme
const getBaseURL = () => {
  if (Platform.OS === 'android') {
    // Android emulator (Android Studio)
    return 'http://10.0.2.2:4000';
  }
  if (Platform.OS === 'ios') {
    // iOS simulator
    return 'http://localhost:4000';
  }
  // Web ou autre
  return 'http://localhost:4000';
};

const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,  // pour envoyer/récupérer le cookie JWT
});

export default api;
