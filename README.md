# SnakeGaming

E-commerce site de PC gaming et matériel informatique basé au Maroc. Vente de PC gamer sur mesure, composants, périphériques, chaises gaming et setups complets.

## Tech Stack

| Couche | Technologie |
|--------|------------|
| Frontend | React 19, React Router 7, Tailwind CSS 4 |
| Build | Vite 8 |
| Backend | Laravel 12 (PHP) |
| Base de données | MySQL |
| API | REST (Laravel) / Local fallback |

## Architecture

```
snakegaming/
├── src/                          # Frontend React
│   ├── App.jsx                   # Routes & layout
│   ├── main.jsx                  # Entry point
│   ├── index.css                 # Tailwind + design tokens
│   ├── components/               # Composants réutilisables
│   │   ├── Navbar.jsx            # Navigation responsive
│   │   ├── Hero.jsx              # Hero section homepage
│   │   ├── ProductCard.jsx       # Carte produit (3 variants)
│   │   └── Footer.jsx            # Footer
│   ├── pages/                    # Pages / Routes
│   │   ├── Home.jsx              # Accueil
│   │   ├── PCGamer.jsx           # PC Gamer
│   │   ├── PCByGame.jsx          # PC par jeu
│   │   ├── ProAI.jsx             # IA & Professionnel
│   │   ├── SetupComplet.jsx      # Setups complets
│   │   ├── Laptops.jsx           # PC portables
│   │   ├── Components.jsx        # Composants
│   │   ├── Monitors.jsx          # Moniteurs
│   │   ├── Peripherals.jsx       # Périphériques
│   │   ├── ChairsDesks.jsx       # Chaises & bureaux
│   │   ├── ConfiguratorPage.jsx  # Configurateur PC
│   │   └── ProductDetail.jsx     # Fiche produit
│   ├── data/
│   │   └── products.js           # Données produits + configurateur
│   └── services/
│       └── api.js                # Service API (local data)
├── backend/                      # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/Api/ # Controllers REST
│   │   │   ├── ProductController.php
│   │   │   ├── CategoryController.php
│   │   │   └── ContactController.php
│   │   └── Models/               # Eloquent models
│   │       ├── Product.php
│   │       ├── Category.php
│   │       ├── ContactLead.php
│   │       └── User.php
│   ├── database/
│   │   ├── migrations/           # Schéma DB
│   │   └── seeders/              # Données de démo
│   │       ├── CategorySeeder.php  # 9 catégories
│   │       └── ProductSeeder.php   # 32 produits
│   └── routes/
│       └── api.php               # Routes API
├── vite.config.js                # Proxy API → localhost:8000
└── package.json
```

## Pages

| Route | Page | Contenu |
|-------|------|---------|
| `/` | Accueil | Hero featured, Pourquoi SnakeGaming, PC Gamer, Configurateur CTA |
| `/pc-gamer` | PC Gamer | Filtres CPU / budget, 6 configs |
| `/pc-by-game` | PC par jeu | Groupé par catégorie de jeu (FPS, Battle Royale, AAA) |
| `/pc-ai` | IA & Pro | Stations 3D/IA/Data, 2 configs |
| `/setup-complet` | Setups | Bundles PC + écran + chaise, 3 bundles |
| `/laptops` | Portables | Filtre CPU, 3 laptops gaming |
| `/components` | Composants | Filtre type, 6 composants |
| `/monitors` | Moniteurs | Filtres taille / résolution, 3 écrans |
| `/peripherals` | Périphériques | Filtre type, 5 accessoires |
| `/chairs-desks` | Chaises & bureaux | Filtre type, 4 articles |
| `/configurator` | Configurateur | 10 étapes de sélection composants |
| `/product/:id` | Fiche produit | Détail complet avec specs |

## Fonctionnalités

- **Catalogue produits** — 32 produits répartis dans 9 catégories
- **Filtres** — Par CPU, budget, type, taille d'écran, résolution
- **Configurateur PC** — Sélection pas à pas de 10 composants avec calcul du prix total
- **Fiches produit** — Spécifications détaillées, jeux compatibles, logiciels supportés
- **Mode hors-ligne** — Fonctionne sans backend grâce aux données locales intégrées
- **Design dark** — Palette sombre avec accent doré, typographie Fraunces + Figtree

## Données Produits

32 produits au total :

| Catégorie | Nb | Types |
|-----------|----|-------|
| PC Gamer | 6 | Viper V1, Cobra 120A, Maker M100A, Apollo II, Pro Mini, Viper V2 |
| PC IA & Pro | 2 | GR701, NV7 V2 |
| Setups | 3 | Gamer R3, Viper Bundle, Cobra Ultimate |
| Portables | 3 | MSI Cyborg 15, ASUS ROG Strix G16, Lenovo Legion Pro 5 |
| Moniteurs | 3 | MSI MAG 255F, Samsung Odyssey G7, LG UltraGear 34 |
| Périphériques | 5 | Souris (2), Clavier (1), Casques (2) |
| Chaises & Bureaux | 4 | Chaises (2), Bureau (1), Bundle (1) |
| Composants | 6 | Boitier, CG, CPU, RAM, SSD, Watercooling |

## Démarrage

### Frontend seul (recommandé)

```bash
npm install
npm run dev        # → http://localhost:5173
npm run build      # build production dans dist/
npm run preview    # prévisualisation du build
```

### Avec backend Laravel

```bash
# 1. Créer la base MySQL "snakegaming"
# 2. Configurer backend/.env (DB_USERNAME, DB_PASSWORD)

cd backend
composer install
php artisan migrate --seed   # tables + données
php artisan serve             # → http://localhost:8000

# 3. Démarrer le frontend
cd ..
npm run dev                   # proxy /api → localhost:8000
```

## Design System

Tokens CSS définis dans `src/index.css` via `@theme` Tailwind :

| Token | Valeur | Usage |
|-------|--------|-------|
| `bg` | `#0b0d14` | Fond principal |
| `bg-alt` | `#12151f` | Fond alternatif |
| `bg-card` | `#191d29` | Fond des cartes |
| `text` | `#e8e6e3` | Texte principal |
| `text-muted` | `#868a97` | Texte secondaire |
| `text-dim` | `#555966` | Texte tertiaire |
| `border` | `#272c3d` | Bordures |
| `accent` | `#e8b84b` | Accent doré |

Typographie : Fraunces (titres) + Figtree (corps) + JetBrains Mono (monospace/étiquettes).

## API

Routes disponibles dans le backend Laravel :

```
GET  /api/products            Liste produits (paginée, filtres: category, featured, search)
GET  /api/products/{id}       Détail produit
GET  /api/categories          Liste catégories
GET  /api/categories/{slug}   Catégorie avec ses produits
POST /api/contact             Formulaire de contact
```

Le frontend utilise actuellement un fallback local (`src/services/api.js`) qui sert les données depuis `src/data/products.js` sans nécessiter le backend.
