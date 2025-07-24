// web/src/contexts/SubscriptionContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from './AuthContext';

export const SubscriptionContext = createContext();

export function SubscriptionProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [subscriptions, setSubscriptions] = useState([]);

  // Charge la liste des abonnements au démarrage ou quand l'utilisateur change
  useEffect(() => {
    async function load() {
      if (!user) return;
      try {
        const res = await api.get('/subscriptions');
        setSubscriptions(res.data);
      } catch (err) {
        console.error('ERROR LOAD SUBS ERR', err);
      }
    }
    load();
  }, [user]);

  // Ajoute un abonnement pour l'utilisateur connecté
  const addSubscription = async (serviceId) => {
    try {
      const res = await api.post('/subscriptions/add', { serviceId });
      // on refait un fetch ou on met à jour localement
      setSubscriptions((prev) => [...prev, res.data]);
    } catch (err) {
      console.error('ERROR ADD SUB ERR', err);
      throw err;
    }
  };

  return (
    <SubscriptionContext.Provider value={{ subscriptions, addSubscription }}>
      {children}
    </SubscriptionContext.Provider>
  );
}
