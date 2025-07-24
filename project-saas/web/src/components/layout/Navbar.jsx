// web/src/components/layout/Navbar.jsx
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { SubscriptionContext } from '../../contexts/SubscriptionContext';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { subscriptions } = useContext(SubscriptionContext);
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center py-3">
        {/* Logo / Titre */}
        <Link to="/products" className="text-2xl font-semibold text-blue-600">
          Mon SaaS
        </Link>

        {/* Bouton mobile (hamburger) */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <HiX className="h-6 w-6 text-gray-700" /> : <HiMenu className="h-6 w-6 text-gray-700" />}
          </button>
        </div>

        {/* Menu desktop */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/products" className="hover:text-blue-600">
            Services
          </Link>
          {user ? (
            <>
              <Link to="/subscriptions" className="relative hover:text-blue-600">
                Abonnements
                {subscriptions.length > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-1 rounded-full">
                    {subscriptions.length}
                  </span>
                )}
              </Link>
              <button onClick={logout} className="hover:text-blue-600">
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="hover:text-blue-600">
                Inscription
              </Link>
              <Link to="/login" className="hover:text-blue-600">
                Connexion
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Menu mobile déroulant */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/products" onClick={() => setOpen(false)} className="block hover:text-blue-600">
            Services
          </Link>
          {user ? (
            <>
              <Link to="/subscriptions" onClick={() => setOpen(false)} className="block hover:text-blue-600">
                Abonnements
              </Link>
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="block w-full text-left hover:text-blue-600"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/register" onClick={() => setOpen(false)} className="block hover:text-blue-600">
                Inscription
              </Link>
              <Link to="/login" onClick={() => setOpen(false)} className="block hover:text-blue-600">
                Connexion
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
);
}
