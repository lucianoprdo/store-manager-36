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

const getSaleById = async (id) => {
  const [sale] = await connection.execute(
    `
      SELECT sales.date, sales_products.product_id, sales_products.quantity
      FROM sales
      INNER JOIN sales_products
      ON sales.id = sales_products.sale_id
      WHERE sales_products.sale_id = ?
      ORDER BY sales_products.sale_id, sales_products.product_id
      `,
    [id],
  );
  return camelize(sale);
};

module.exports = {
  getAllSales,
  getSaleById,
};
