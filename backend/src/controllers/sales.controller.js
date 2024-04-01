const { findAll } = require('../services/sales.service');

async function getAllSalesController(_req, res, _next) {
  const sales = await findAll();
  if (!sales) return res.status(sales.status).json();
  res.status(200).json(sales.data);
}

module.exports = {
  getAllSalesController,
};
