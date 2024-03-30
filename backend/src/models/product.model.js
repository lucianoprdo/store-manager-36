const connection = require('./connection');

const getAllProducts = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products ORDER BY id',
  );
  return products;
};

const getProductById = async (id) => {
  const [product] = await connection.execute(
    //foi retirado uma [] de product
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
};
