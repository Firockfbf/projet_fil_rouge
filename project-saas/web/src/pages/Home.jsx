// web/src/pages/Home.jsx
import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-6 py-12 bg-gray-50">
      {/* Texte du Hero */}
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h1 className="text-4xl font-extrabold mb-4">
          Bienvenue sur SaaSify
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Découvrez, abonnez-vous et gérez vos services SaaS en un seul endroit.
        </p>
        <a
          href="/products"
          className="inline-block bg-blue-600 text-white px-5 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Voir les services
        </a>
      </div>

      {/* Image du Hero */}
      <div className="md:w-1/2">
        {/* Placez votre image hero.png dans public/images/hero.png */}
        <img
          src="/images/hero.png"
          alt="Illustration SaaS"
          className="w-full h-auto rounded-lg shadow-lg"
          onError={(e) => {
            // fallback si l'image n'est pas trouvée
            e.currentTarget.src = "/images/hero-fallback.png";
          }}
        />
      </div>
    </div>
  );
}
