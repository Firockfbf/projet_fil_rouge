// mobile-app/contexts/SubscriptionContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from './AuthContext';

export const SubscriptionContext = createContext();

export function SubscriptionProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    if (!user) return setSubscriptions([]);
    api.get('/api/subscriptions')
      .then(res => setSubscriptions(res.data))
      .catch(console.error);
  }, [user]);

  const addSubscription = async (serviceId) => {
    await api.post('/api/subscriptions/add', { serviceId });
    // refresh
    const res = await api.get('/api/subscriptions');
    setSubscriptions(res.data);
  };

  return (
    <SubscriptionContext.Provider value={{ subscriptions, addSubscription }}>
      {children}
    </SubscriptionContext.Provider>
  );
}
