import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl mb-4">Tableau de bord</h2>
      <p className="mb-2"><strong>Email :</strong> {user.email}</p>
      <p><strong>Inscrit le :</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
