const service = require('../services/products.service');

async function getAllProductsController(_req, res) {
  const { status, data } = await service.findAll();
  if (!data) return res.status(status).json({ message: 'Products not found' });
  return res.status(status).json(data);
}
  
async function getProductByIdController(req, res) {
  const product = await service.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' }); 
  }
  res.status(200).json(product.data); 
}

async function createProductController(req, res) {
  const { name } = req.body;
  const { data } = await service.create(name);
  res.status(201).json(data);
}

module.exports = {
  getAllProductsController,
  getProductByIdController,
  createProductController,
};