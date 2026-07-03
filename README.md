# Xavier Leonard — Portfolio

Full-stack MERN portfolio — React + Vite frontend, Express + MongoDB backend.

## Project Structure

```
Portfolio/
├── backend/                  # Express + MongoDB API
│   ├── config/db.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── public/                   # Static assets served as-is
│   ├── photo.jpg
│   ├── favicon.svg
│   ├── icons.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── _redirects            # Netlify SPA routing
│
├── src/                      # React source
│   ├── components/
│   ├── features/
│   ├── hooks/
│   ├── services/
│   └── styles/
│
├── index.html
├── vite.config.js
├── package.json
├── netlify.toml
├── .env.example
└── .gitignore
```

## Getting Started

### Prerequisites
- Node.js 20+
- MongoDB (local or Atlas)

### Frontend

```bash
# Install dependencies
npm install

# Copy env file and fill in values
cp .env.example .env

# Start dev server (http://localhost:5173)
npm run dev

# Production build
npm run build
```

### Backend

```bash
cd backend
npm install

# Copy env file and fill in values
cp .env.example .env

# Start with hot reload
npm run dev

# Production start
npm start
```

## Deployment

### Frontend → Netlify

| Setting | Value |
|---|---|
| Base directory | *(empty)* |
| Build command | `npm run build` |
| Publish directory | `dist` |

Set `VITE_API_URL` in Netlify environment variables.

### Backend → Render / Railway

Deploy the `backend/` folder as a Node.js service.  
Set all variables from `backend/.env.example` in the platform dashboard.

## Tech Stack

**Frontend:** React 19, Vite 8, Framer Motion, GSAP, React Router v7, Axios  
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs  
**Deployment:** Netlify (frontend), Render / Railway (backend)
