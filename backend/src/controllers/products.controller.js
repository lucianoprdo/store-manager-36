const service = require('../services/products.service');

async function getAllProductsController(_req, res) {
  const { status, data } = await service.findAll();
  if (!data) return res.status(status).json({ message: 'Products not found' });
  return res.status(status).json(data);
}

module.exports = {
  getAllProductsController,
};
