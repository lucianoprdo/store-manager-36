const camelize = require('camelize');
const connection = require('./connection');

const getAllSales = async () => {
  const [sales] = await connection.execute(`
    SELECT sp.sale_id, sa.date, sp.product_id, sp.quantity
  FROM sales as sa
  INNER JOIN sales_products as sp
  ON sa.id = sp.sale_id
  ORDER BY sp.sale_id, sp.product_id
    `);
  return camelize(sales);
};

module.exports = {
  getAllSales,
};
