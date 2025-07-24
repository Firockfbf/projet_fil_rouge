Cette application est une plateforme SaaS permettant :
- **Consultation** d’un catalogue de services (cloud, email pro, analytics, VPN…)
- **Inscription / connexion** sécurisée des utilisateurs via JWT
- **Souscription** et gestion d’abonnements (quantité, liste “Mes abonnements”)
- **Back-office** d’administration (CRUD services) avec React-Admin
- **Prototype mobile** (Expo) pour consultation et souscription en mobilité

---

## ⚙️ Technologies & Outils

| Catégorie         | Technologie / Outil               |
|-------------------|-----------------------------------|
| **Langages**      | JavaScript, JSX, SQL (SQLite)     |
| **Serveur**       | Node.js, Express                  |
| **Base de données** | SQLite via Sequelize ORM         |
| **Authentification** | JSON Web Token (JWT)           |
| **Client Web**    | React, Vite, React Router, Axios  |
| **Back-office**   | React-Admin                       |
| **Mobile (proto)**| Expo / React Native               |
| **CI / CD**       | (À prévoir) GitHub Actions, Docker |
| **Versioning**    | Git, GitHub                       |

---

## 📥 Installation & Lancement

1. **Cloner le dépôt**  
   ```bash
   git clone https://github.com/Firockfbf/projet_fil_rouge.git
   cd projet_fil_rouge


cd backend
cp .env.example .env      # adapter clé JWT, etc.
npm install
npm run dev               # lance nodemon sur src/index.js (http://localhost:4000)

cd ../web
npm install
npm run dev               # lance Vite (http://localhost:5173)

cd ../admin
npm install
npm run start             # lance React-Admin (http://localhost:3000 par défaut)
