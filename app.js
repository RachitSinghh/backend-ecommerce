const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/auth.js');
const dotenv = require('dotenv');
const productRoutes = require('./src/routes/productRoutes.js');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json())
app.use('/api/products',productRoutes);

app.use('/api/auth',authRoutes);

app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});


module.exports = app;

