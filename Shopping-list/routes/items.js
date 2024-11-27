const express = require('express');
const router = new express.Router();
const items = require('../fakeDb');

// GET /items - list all items
router.get('/', (req, res) => {
  return res.json(items);
});

// POST /items - create an item
router.post('/', (req, res) => {
  const newItem = { name: req.body.name, price: req.body.price };
  items.push(newItem);
  return res.status(201).json({ added: newItem });
});

// GET /items/:name - get single item
router.get('/:name', (req, res) => {
  const item = items.find(i => i.name === req.params.name);
  if (!item) return res.status(404).json({ error: "Item not found" });
  return res.json(item);
});

// PATCH /items/:name - update item
router.patch('/:name', (req, res) => {
  const item = items.find(i => i.name === req.params.name);
  if (!item) return res.status(404).json({ error: "Item not found" });
  
  item.name = req.body.name || item.name;
  item.price = req.body.price || item.price;
  return res.json({ updated: item });
});

// DELETE /items/:name - delete item
router.delete('/:name', (req, res) => {
  const itemIndex = items.findIndex(i => i.name === req.params.name);
  if (itemIndex === -1) return res.status(404).json({ error: "Item not found" });
  
  items.splice(itemIndex, 1);
  return res.json({ message: "Deleted" });
});

module.exports = router;