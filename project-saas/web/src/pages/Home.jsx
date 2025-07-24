import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto">
      <div className="md:w-1/2 p-6">
        <h1 className="text-5xl font-bold mb-4">Bienvenue sur Mon SaaS</h1>
        <p className="mb-6 text-gray-700">
          Gérez vos abonnements à des services cloud, email, analytics et plus.
        </p>
        <div className="space-x-4">
          <Link to="/products" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Services</Link>
          <Link to="/register" className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200">Inscription</Link>
        </div>
      </div>
      <div className="md:w-1/2">
        <img src="https://via.placeholder.com/600x400" alt="Hero" className="rounded-lg"/>
      </div>
    </div>
  );
}
