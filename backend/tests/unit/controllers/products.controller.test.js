const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { productService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

const { products, createProduct } = require('../mocks/products.mock');

describe('Realizando testes - PRODUCT CONTROLLER', function () {
  it('Recupera todos os produtos com sucesso', async function () {
    sinon.stub(productService, 'findAll').resolves({ status: 200, data: products });

    const req = { params: { }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getAllProductsController(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products);
  });

  it('Recupera o produto buscado pelo id com sucesso', async function () {
    sinon.stub(productService, 'findAll').resolves(products[0]);

    const req = { params: { id: 1 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getProductByIdController(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products[0]);
  });

  it('Produto não encontrado com id inexistente', async function () {
    sinon.stub(productService, 'findAll').resolves({ status: 404, message: 'Product not found' });

    const req = { params: { id: 500 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getProductByIdController(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
  });

  it('Cadastra um produto com sucesso', async function () {
    sinon.stub(productService, 'create').resolves(createProduct);

    const req = { params: { }, body: { name: 'ProdutoX' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.createProductController(req, res);
    expect(res.status).to.have.been.calledWith(201);
    // expect(res.json).to.have.been.calledWith(createProduct);
  });

  // it('Falha ao cadastrar produto com input inválido', async function () {
  //   sinon.stub(productService, 'createProduct').resolves(productFromServiceInvalidValue);

  //   const req = { params: { }, body: { name: 'Prod' } };
  //   const res = {
  //     status: sinon.stub().returnsThis(),
  //     json: sinon.stub(),
  //   };

  //   await productController.createProduct(req, res);
  //   expect(res.status).to.have.been.calledWith(422);
  //   expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
  // });

  beforeEach(function () {
    sinon.restore();
  });
});