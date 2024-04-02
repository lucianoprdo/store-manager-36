const { findAll, findById } = require('../services/sales.service');

async function getAllSalesController(_req, res, _next) {
  const sales = await findAll();
  if (!sales) return res.status(sales.status).json();
  res.status(200).json(sales.data);
}

async function getSaleByIdController(req, res) {
  const sale = await findById(req.params.id);
  if (sale.message) return res.status(404).json(sale);
  return res.status(200).json(sale);
}

sync function createSaleController(req, res) {
  const products = req.body;

  const sale = await validateSaleDataProductId(products);

  if (sale.includes(undefined)) {
    return res.status(404).json({ message: 'Product not found' });
  }
  const saleId = await service.createSaleService(products);

  const itemsSold = products.map((product) => ({
    productId: product.productId,
    quantity: product.quantity,
  }));

  return res.status(201).json({ id: saleId, itemsSold }); // error: res.status não é uma função
}

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const data = await service.deleteSale(id);
  return res.status(204).json(data);
};

module.exports = {
  getAllSalesController,
  getSaleByIdController,
  createSaleController,
  deleteSale,
};