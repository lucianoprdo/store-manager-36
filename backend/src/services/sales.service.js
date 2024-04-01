const { getAllSales } = require('../models/sale.model');

async function findAll() {
  const sales = await getAllSales();
  return { status: 200, data: sales };
}

module.exports = {
  findAll,
};
