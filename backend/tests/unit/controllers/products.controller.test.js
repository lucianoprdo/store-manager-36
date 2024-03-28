const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { productService } = require('../../../src/services/index');
const { productsController } = require('../../../src/controllers/index');

const { products, createProduct } = require('../mocks/products.mock');

describe('unitTests - PRODUCT CONTROLLER', function () {
  // beforeEach(function () {
  //   this.req = { params: {}, body: {} };
  //   this.res = {
  //     status: sinon.stub().returnsThis(),
  //     json: sinon.stub(),
  //   };
  // });

  it('PRODUCT CONTROLLER - Retrieves all products successfully', async function () {
    sinon
      .stub(productService, 'findAll')
      .resolves({ status: 200, data: products });

    const req = { params: {}, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getAllProductsController(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products);
  });

  it('PRODUCT CONTROLLER - Successfully retrieves the product searched for by id', async function () {
    sinon.stub(productService, 'findAll').resolves(products[0]);

    const req = { params: { id: 1 }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getProductByIdController(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products[0]);
  });

  it('PRODUCT CONTROLLER - Product not found with non-existent id', async function () {
    sinon
      .stub(productService, 'findAll')
      .resolves({ status: 404, message: 'Product not found' });

    const req = { params: { id: 500 }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getProductByIdController(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
  });

  it('PRODUCT CONTROLLER - Register a product successfully', async function () {
    sinon.stub(productService, 'create').resolves(createProduct);

    const req = { params: {}, body: { name: 'ProdutoX' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.createProductController(req, res);
    expect(res.status).to.have.been.calledWith(201);
  });

  beforeEach(function () {
    sinon.restore();
  });
});
