import React, { useContext } from 'react';
import { SubscriptionContext } from '../contexts/SubscriptionContext';

export default function SubscriptionPage() {
  const { subscriptions, loading, removeSubscription, clearSubscriptions } =
    useContext(SubscriptionContext);

  if (loading) return <div>Chargement…</div>;
  if (!subscriptions.length) return <div>Pas d’abonnements.</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Mes abonnements</h2>
      <ul className="space-y-4">
        {subscriptions.map(sub => (
          <li key={sub.serviceId} className="flex justify-between items-center border-b pb-2">
            <span>Service #{sub.serviceId} — Qté : {sub.quantity}</span>
            <button
              onClick={() => removeSubscription(sub.serviceId)}
              className="text-red-600 hover:text-red-800"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-between">
        <button
          onClick={clearSubscriptions}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Vider tout
        </button>
      </div>
    </div>
  );
}
