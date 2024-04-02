const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');

const { salesDB, salesById } = require('../mocks/sales.mock');

describe('Performing tests - SALES CONTROLLER', function () {
  it('SALES CONTROLLER - Retrieves all sales successfully', async function () {
    sinon
      .stub(salesService, 'findAll')
      .resolves({ status: 200, data: salesDB });

    const req = { params: {}, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getAllSalesController(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesDB);
  });

  it('SALES CONTROLLER - Retrieves the sale successfully searched for by the id', async function () {
    sinon.stub(salesService, 'findById').resolves(salesById);

    const req = { params: { id: 1 }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getSaleByIdController(req, res);
    expect(res.status).to.have.been.calledWith(200);
  });

  // it('SALES CONTROLLER - Should return 201 with saleId and itemsSold if all products are valid', async function () {
  //   const req = {
  //     body: [
  //       { productId: 1, quantity: 5 },
  //       { productId: 2, quantity: 10 },
  //     ],
  //   };
  //   const res = {
  //     status: sinon.stub().returnsThis(),
  //     json: sinon.spy(),
  //   };
  //   sinon.stub(salesService, 'createSaleService').resolves(123); // Stub para simular o serviço de criação de venda

  //   await salesController.createSaleController(req, res);

  //   sinon.assert.calledWith(res.status, 201);

  //   sinon.assert.calledWith(res.json, {
  //     id: 123,
  //     itemsSold: [
  //       { productId: 1, quantity: 5 },
  //       { productId: 2, quantity: 10 },
  //     ],
  //   });

  //   sinon.assert.calledOnce(salesService.createSaleService);

  //   salesService.createSaleService.restore(); // Restaura o stub para evitar interferência com outros testes
  // });

  // it('Falha ao deletar um sale com id inexistente', async function () {
  //   sinon.stub(salesService, 'deleteSale').resolves(saleFromServiceNotFound);

  //   const req = { params: { id: 555 }, body: {} };
  //   const res = {
  //     status: sinon.stub().returnsThis(),
  //     json: sinon.stub(),
  //   };

  //   await salesController.deleteSale(req, res);
  //   expect(res.status).to.have.been.calledWith(404);
  //   expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
  // });

  // it('SALES CONTROLLER - Deletes a sale successfully', async function () {
  //   sinon
  //     .stub(salesService, 'deleteSale')
  //     .resolves({ status: 204, data: null });

  //   const req = { params: { id: 3 }, body: {} };
  //   const res = {
  //     status: sinon.stub().returnsThis(),
  //     json: sinon.stub(),
  //   };

  //   await salesController.deleteSale(req, res);
  //   expect(res.status).to.have.been.calledWith(204);
  //   expect(res.json).to.have.been.calledWith();
  // });
  beforeEach(function () {
    sinon.restore();
  });
});
