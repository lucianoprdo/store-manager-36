const { getAllSales, getSaleById } = require('../models/sale.model');

async function findAll() {
  const sales = await getAllSales();
  return { status: 200, data: sales };
}

async function findById(id) {
  const sale = await getSaleById(id);
  if (sale.length === 0) {
    return { message: 'Sale not found' };
  }
  return sale;
}

module.exports = {
  findAll,
  findById,
};
