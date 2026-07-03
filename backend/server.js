require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contact');
const authRoutes = require('./routes/auth');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// --- Security headers
app.use(helmet());

// --- CORS — only allow the React dev server (and production domain)
const allowedOrigins = [
  process.env.CLIENT_ORIGIN || 'http://localhost:5173',
];
app.use(
  cors({
    origin: (origin, cb) => {
      // Allow requests with no origin (Postman, curl, server-to-server)
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      cb(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// --- Body parsing
app.use(express.json({ limit: '10kb' })); // prevent large payload attacks

// --- Logging (only in dev)
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// --- Routes
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);

// --- Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, status: 'ok', env: process.env.NODE_ENV });
});

// --- 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// --- Centralized error handler (must be last)
app.use(errorHandler);

// --- Connect to DB then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} [${process.env.NODE_ENV}]`);
  });
});
