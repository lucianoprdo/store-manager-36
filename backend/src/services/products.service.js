const { getAllProducts } = require('../controllers/products.controller');

async function findAll() {
  const products = await getAllProducts();
  return { status: 200, data: products };
}

async function findById(id) {
  const product = await getProductById(id);
  if (product) return { status: 200, data: product };
}

module.exports = { findAll, findById };
