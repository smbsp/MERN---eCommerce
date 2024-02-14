const express = require('express');

const { 
  createProduct,
  getProducts,
  getProductById,
//   updateProductById,
//   deleteProductById 
}  = require('../controllers/ProductController');

const { checkInput } = require('../utils/curdFactory');

  const router = express.Router();

  router.post('/', checkInput, createProduct);
  router.get('/', getProducts);
  router.get('/:id', getProductById);
//   router.put('/:id', checkInput, updateProductById);
//   router.delete('/:id', deleteProductById);

  module.exports = router;

