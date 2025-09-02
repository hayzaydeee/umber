# Umber

**Contemplative Commerce Platform** - A mindful wishlist app that helps users curate meaningful collections and transform want into wisdom.

## Overview

Umber is like "Pinterest meets wishlist with intentional design" - featuring visual mind map organization and encouraging thoughtful reflection on what we truly want.

### Key Features

- **Umbers** - Main collections (like "Tech Dreams", "Home Wishlist")
- **Nests** - Sub-containers within Umbers (like "Office", "Living Room", + default "Unnested")
- **Items** - Individual wishlist items scraped from URLs
- **Mind Maps** - Visual React Flow representation of Umbers/Nests/Items
- **Reflection Prompts** - "Why do I want this?" for mindful curation

## Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS + Framer Motion + React Flow
- **Backend**: Node.js + Express + MongoDB + Mongoose + JWT Auth
- **URL Scraping**: Microlink API for product information extraction

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd umber
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   # Root level
   cp .env.example .env
   
   # Frontend
   cp umber-frontend/.env.example umber-frontend/.env
   
   # Backend
   cp umber-backend/.env.example umber-backend/.env
   ```

4. **Configure your environment**
   - Update `umber-backend/.env` with your MongoDB URI
   - Set a secure JWT secret
   - Configure other environment variables as needed

### Development

**Start both frontend and backend concurrently:**
```bash
npm run dev
```

**Or start them individually:**
```bash
# Frontend only (http://localhost:3000)
npm run dev:frontend

# Backend only (http://localhost:5000)
npm run dev:backend
```

### Building for Production

```bash
npm run build
```

## Project Structure

```
umber/
├── umber-frontend/          # React application
├── umber-backend/           # Node.js API
├── docs/                    # Documentation
├── package.json             # Root package with scripts
└── README.md
```

## Core Concepts

### Design Philosophy
- **Contemplative** - Thoughtful, not rushed decision-making
- **Natural** - Organic colors and forms inspired by earth
- **Clarity** - Clean, uncluttered visual communication
- **Warmth** - Inviting, human-centered design

### Data Hierarchy
```
User → Umbers → (Items + Nests)
Nests → Items (via ItemNestMembership)
```

Items ALWAYS belong to Umbers first, and OPTIONALLY belong to Nests within that Umber.

## Features Roadmap

### MVP (Current Focus)
- ✅ User authentication
- ✅ Umber creation and management
- 🚧 URL scraping for items
- 🚧 Basic mind map visualization
- ⏳ Nest organization
- ⏳ Simple dashboard

### Future Enhancements
- Advanced mind map interactions
- Reflection and mindfulness features
- Sharing and community
- Advanced organization tools
- Mobile app

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Documentation

Detailed documentation is available in the `/docs` directory:

- [Directory Structure](docs/directoryStructure.md)
- [API Endpoints](docs/apiEndpoints.md)
- [Component Guide](docs/componentGuide.md)
- [Database Schema](docs/databaseSchema.md)
- [Development Guide](docs/umberDevGuide.md)
- [Color & Brand Guide](docs/umberColorGuide.md)

## License

This project is licensed under the MIT License.

---

*Transform want into wisdom with Umber* 🌳
