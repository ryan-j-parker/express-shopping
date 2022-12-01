const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const Item = require('../models/Item');

// TO DO - implement items CRUD
module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try {
      const newItem = await Item.insert({
        ...req.body,
        user_id: req.user.id,
      });
      res.json(newItem);
    } catch (e) {
      next(e);
    }
  })
  .get('/', authenticate, async (req, res, next) => {
    try {
      const list = await Item.getAll(req.user.id);
      res.json(list);
    } catch (e) {
      next(e);
    }
  })
  .put('/', [authenticate, authorize], async (req, res, next) => {
    try {
      const updatedItem = await Item.updateById(req.params.id, req.body);
      res.json(updatedItem);
    } catch (e) {
      next(e);
    }
  });
