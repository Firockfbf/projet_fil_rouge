// src/components/products/ProductCard.jsx
import React from 'react';

export default function ProductCard({ service, onSubscribe }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <img
        src={service.imageUrl}
        alt={service.name}
        className="w-full h-48 object-cover rounded"
        onError={(e) => {
          // En cas d’erreur de chargement, on peut afficher une image par défaut locale
          e.target.onerror = null;
          e.target.src = '/fallback-image.png';
        }}
      />
      <h2 className="mt-2 font-semibold text-lg">{service.name}</h2>
      <p className="text-gray-600 flex-1">{service.description}</p>
      <p className="mt-2 font-bold text-xl">{service.price} € / mois</p>
      <button
        onClick={onSubscribe}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        S’abonner
      </button>
    </div>
  );
}
