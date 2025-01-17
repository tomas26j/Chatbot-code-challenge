const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/Products');
const orderRoutes = require('./routes/Orders');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

module.exports = app;