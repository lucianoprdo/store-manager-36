const { getAllProducts } = require('../controllers/products.controller');

async function findAll() {
  const products = await getAllProducts();
  return { status: 200, data: products };
}

module.exports = { findAll };
