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

const createSaleService = async (products) => {
  if (!Array.isArray(products) || products.length === 0) {
    throw new Error('A lista de produtos não pode ser vazia');
  }

  try {
    const saleId = await createSale(products);
    return saleId;
  } catch (error) {
    throw new Error(`Error creating sale: ${error.message}`);
  }
};

const deleteSale = async (id) => {
  const sale = await getSaleById(id);
  if (sale.length === 0) {
    return { status: 404, data: { message: 'Sale not found' } };
  }

  await deleteSaleModel(id);
  return null;
};

module.exports = {
  findAll,
  findById,
  createSaleService,
  deleteSale,
};
