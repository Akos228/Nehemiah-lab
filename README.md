# 🚀 Nehemiah Lab - Dashboard de Gestion

Bienvenue dans le système de gestion de **Nehemiah Lab**. Cette application est conçue pour piloter l'activité des centres de formation, suivre la présence des enfants et gérer le personnel administratif et pédagogique.

## 🛠️ Stack Technique

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Langage**: TypeScript
- **Stylisation**: Tailwind CSS
- **Base de données & Auth**: [Firebase](https://firebase.google.com/) (Firestore & Firebase Auth)
- **Icônes**: Lucide React

## ✨ Fonctionnalités du MVP

### 👤 Gestion des Rôles (RBAC)
- **Directeur Général (DG)** : Vue d'ensemble globale, filtrage par centre, gestion des centres et validation des nouveaux membres.
- **Coordinateur** : Gestion opérationnelle d'un centre spécifique, suivi des enfants et des sessions.
- **Formateur** : Saisie rapide des présences et gestion de son agenda de cours.

### 🔑 Flux d'Accès
- Système d'invitation par email avec token unique.
- Processus de validation des profils par le DG avant l'accès complet.

### 📝 Suivi Pédagogique
- Prise de présence dynamique connectée à Firestore.
- Historique des entrées/sorties des enfants.
- Gestion des centres et des paramètres utilisateur.

## 🚀 Installation Locale

### 1. Cloner le projet
```bash
git clone <url-du-depot>
cd web
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration de l'environnement
Créez un fichier `.env.local` à la racine du dossier `web/` en vous basant sur le fichier `.env.example` :
```bash
cp .env.example .env.local
```
Remplissez ensuite les variables avec vos propres clés Firebase (Client et Admin SDK).

### 4. Lancer l'application
```bash
npm run dev
```
L'application sera disponible sur `http://localhost:3000`.

### 5. Initialiser les données (Seed)
Pour créer les comptes de test (DG, Coordinateur, Formateur) et les centres, lancez le script de seed :
```bash
npx tsx src/lib/firebase/seed.ts
```

## 🔐 Sécurité
- Les fichiers `.env.local` et les clés JSON de Firebase sont strictement exclus du dépôt via le `.gitignore`.
- L'accès aux routes `/dashboard` est protégé par un middleware et une vérification de session.

## 🗺️ Roadmap (Évolutions futures)
- [ ] Exportation des rapports de présence en PDF.
- [ ] Module de planification d'agenda interactif.
- [ ] Graphiques d'évolution pédagogique par enfant.
- [ ] Système de notifications en temps réel pour le DG.