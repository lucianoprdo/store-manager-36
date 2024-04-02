const camelize = require('camelize');
const connection = require('./connection');

const getAllSales = async () => {
  const [sales] = await connection.execute(`
  SELECT SP.sale_id, S.date, SP.product_id, SP.quantity 
    FROM sales_products AS SP
    JOIN sales AS S
    ON SP.sale_id = S.id
    ORDER BY SP.sale_id, SP.product_id; 
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

const insertSaleProducts = async (saleId, products) => {
  const values = products.map(({ productId, quantity }) => [
    saleId,
    productId,
    quantity,
  ]);
  const placeholders = values.map(() => '(?, ?, ?)').join(', ');
  const sql = `INSERT INTO sales_products (sale_id, product_id, quantity) VALUES ${placeholders}`;
  await connection.execute(sql, values.flat());
};

const createSale = async (products) => {
  try {
    const [{ insertId }] = await connection.execute(
      'INSERT INTO sales (date) VALUES (NOW())',
    );
    await insertSaleProducts(insertId, products);
    return insertId;
  } catch (error) {
    throw new Error(`Error creating sale: ${error.message}`);
  }
};

const deleteSaleModel = async (id) => {
  await connection.execute('DELETE FROM sales WHERE id = ?', [id]);
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  deleteSaleModel,
};
