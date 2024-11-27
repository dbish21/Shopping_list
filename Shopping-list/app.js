const express = require('express');
const itemsRoutes = require('./routes/items');

const app = express();

app.use(express.json());
app.use('/items', itemsRoutes);

// 404 handler
app.use((req, res, next) => {
  return res.status(404).json({ error: "Not Found" });
});

module.exports = app;