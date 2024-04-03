const { productModel } = require('../../models');

const hasValidProductId = (item) => 'productId' in item && item.productId !== undefined;

const findInvalidProductId = (productId) => productId.find((item) => !hasValidProductId(item));

const validateProductId = (req, res, next) => {
  const productId = req.body;
  const invalidProductId = findInvalidProductId(productId);

  if (invalidProductId) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  next(); // Chama next() apenas se não houver erros
};

const hasValidQuantity = (item) => 'quantity' in item && item
  .quantity !== undefined && Number(item.quantity) >= 1;

const findInvalidQuantity = (quantity) => quantity.find((item) => !hasValidQuantity(item));

const validateQuantity = (req, res, next) => {
  const quantity = req.body;
  const invalidQuantity = findInvalidQuantity(quantity);

  if (invalidQuantity) {
    const status = 'quantity' in invalidQuantity ? 422 : 400;
    const message = status === 422
      ? '"quantity" must be greater than or equal to 1' : '"quantity" is required';
    return res.status(status).json({ message });
  }

  next(); // Chama next() apenas se não houver erros
};

const inputValidationsSales = (req, res, next) => {
  validateProductId(req, res, () => { // Encadeia os middlewares usando uma função de callback
    validateQuantity(req, res, next);
  });
};

const validateSaleDataProductId = async (saleData) => {
  const promises = saleData.map(async (saleItem) => {
    const product = await productModel.getProductById(saleItem.productId);
    return product;
  });
  const products = await Promise.all(promises);

  return products;
};

module.exports = {
  inputValidationsSales,
  validateSaleDataProductId,
};