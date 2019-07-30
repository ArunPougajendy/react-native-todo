const express = require('express');
const {
  getList,
  addItem,
  updateItem,
  deleteItem,
} = require('../controller/list/index');

const listRouter = express.Router();

listRouter.get('/lists', getList);
listRouter.post('/', addItem);
listRouter.put('/lists/:id', updateItem);
listRouter.delete('/lists/:id', deleteItem);

module.exports = listRouter;
