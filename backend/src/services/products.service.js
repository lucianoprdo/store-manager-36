const {
  getAllProducts,
  getProductById,
} = require('../controllers/products.controller');

async function findAll() {
  const products = await getAllProducts();
  return { status: 200, data: products };
}

async function findById(id) {
  const product = await getProductById(id);
  if (product) return { status: 200, data: product };
}

async function create(name) {
  const product = await createProduct(name);
  if (product) return { status: 201, data: { id: product, name } };
}

module.exports = { findAll, findById, create };
