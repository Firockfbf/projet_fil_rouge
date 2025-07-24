import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await api.get(`/services/${id}`);
      setService(res.data);
      setLoading(false);
    })();
  }, [id]);

  if (loading) return <div>Chargement…</div>;
  if (!service) return <div>Service introuvable.</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden my-8">
      <img src={service.imageUrl} alt={service.name} className="w-full h-64 object-cover" />
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2">{service.name}</h2>
        <p className="text-gray-600 mb-4">{service.category}</p>
        <p className="mb-4">{service.details}</p>
        <span className="text-2xl font-bold text-blue-600 mb-4 block">
          €{service.price.toFixed(2)}/mois
        </span>
        <div className="flex gap-4">
          <button
            onClick={() => navigate(`/purchase/${service.id}`)}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Souscrire
          </button>
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-2 border rounded hover:bg-gray-100"
          >
            Retour
          </button>
        </div>
      </div>
    </div>
  );
}
