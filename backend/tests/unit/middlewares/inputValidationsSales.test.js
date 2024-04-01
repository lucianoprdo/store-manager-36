const sinon = require('sinon');
const {
  inputValidationsSales,
  validateSaleDataProductId,
} = require('../../../src/middlewares/validations/inputValidationSale');
const { productModel } = require('../../../src/models');

describe('Performing tests - INPUT VALIDATIONS', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('PRODUCTS - Should call next if productId and quantity are valid', function () {
    const req = { body: [{ productId: 1, quantity: 2 }] };
    const res = {};
    const next = sinon.spy();

    inputValidationsSales(req, res, next);

    sinon.assert.calledOnce(next);
  });

  it('PRODUCTS - Should return 400 if productId is missing', function () {
    const req = { body: [{ quantity: 2 }] };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
    const next = sinon.spy();

    inputValidationsSales(req, res, next);

    sinon.assert.calledWith(res.status, 400);
    sinon.assert.calledOnce(res.json);
    sinon.assert.notCalled(next);
  });

  it('PRODUCTS - Should return 422 if quantity is less than 1', function () {
    const req = { body: [{ productId: 1, quantity: 0 }] };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
    const next = sinon.spy();

    inputValidationsSales(req, res, next);

    sinon.assert.calledWith(res.status, 422);
    sinon.assert.calledOnce(res.json);
    sinon.assert.notCalled(next);
  });

  it('PRODUCTS - Should return an array of products for valid sale data', async function () {
    const saleData = [{ productId: 1 }, { productId: 2 }];
    const products = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
    ];
    sinon
      .stub(productModel, 'getProductById')
      .callsFake(async (productId) => products.find((p) => p.id === productId));

    const result = await validateSaleDataProductId(saleData);

    sinon.assert.match(result, products);
    productModel.getProductById.restore();
  });
});
