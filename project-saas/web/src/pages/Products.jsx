// src/pages/Products.jsx
import React, { useEffect, useState, useContext } from 'react';
import api from '../utils/api';
import { SubscriptionContext } from '../contexts/SubscriptionContext';
import ProductCard from '../components/products/ProductCard';

export default function Products() {
  const [services, setServices] = useState([]);
  const { addSubscription } = useContext(SubscriptionContext);

  useEffect(() => {
    // Récupère directement le tableau de services
    api.get('/services')
      .then((response) => {
        // response.data est déjà un Array<service>
        setServices(response.data);
      })
      .catch((error) => {
        console.error('Erreur en récupérant les services :', error);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Nos services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ProductCard
            key={service.id}
            service={service}
            onSubscribe={() => addSubscription(service.id)}
          />
        ))}
      </div>
    </div>
  );
}
