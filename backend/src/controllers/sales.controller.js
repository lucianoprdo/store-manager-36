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

module.exports = {
  getAllSalesController,
  getSaleByIdController,
};
