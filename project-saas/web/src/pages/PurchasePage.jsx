import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import { SubscriptionContext } from '../contexts/SubscriptionContext';

export default function PurchasePage() {
  const { id } = useParams();                     // serviceId
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addSubscription } = useContext(SubscriptionContext);

  // Charger les détails du service
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/services/${id}`);
        setService(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleConfirm = async () => {
    try {
      await addSubscription(service.id, quantity);
      navigate('/subscriptions');
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la souscription.');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Chargement du service…</div>;
  }
  if (!service) {
    return <div className="text-center py-8 text-red-500">Service introuvable.</div>;
  }

  const total = (service.price * quantity).toFixed(2);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden my-8">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{service.name}</h2>
        <p className="text-gray-600 mb-4">{service.description}</p>
        <p className="text-lg mb-4">
          Prix unitaire : <strong>€{service.price.toFixed(2)}/mois</strong>
        </p>
        <div className="flex items-center mb-4 space-x-2">
          <label htmlFor="qty" className="text-gray-700">Quantité :</label>
          <input
            id="qty"
            type="number"
            min="1"
            value={quantity}
            onChange={e => setQuantity(+e.target.value)}
            className="w-16 border px-2 py-1 rounded-md"
          />
        </div>
        <p className="text-xl mb-6">
          Total mensuel : <strong>€{total}</strong>
        </p>
        <div className="flex space-x-4">
          <button
            onClick={handleConfirm}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Confirmer l’abonnement
          </button>
          <Link
            to="/products"
            className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            Annuler
          </Link>
        </div>
      </div>
    </div>
  );
}
