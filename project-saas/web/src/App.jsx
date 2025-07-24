import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductPage from './pages/ProductPage';
import PurchasePage from './pages/PurchasePage';
import SubscriptionPage from './pages/SubscriptionPage';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { AuthContext } from './contexts/AuthContext';

function ProtectedRoute({ children }) {
  const { user, loading } = React.useContext(AuthContext);
  if (loading) return <div>Chargement…</div>;
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <SubscriptionProvider>
          <Navbar />
          <main className="min-h-screen bg-gray-50 p-4">
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductPage />} />
              <Route path="/purchase/:id" element={<PurchasePage />} />
              <Route
                path="/subscriptions"
                element={
                  <ProtectedRoute>
                    <SubscriptionPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/products" />} />
            </Routes>
          </main>
          <Footer />
        </SubscriptionProvider>
      </AuthProvider>
    </Router>
  );
}
