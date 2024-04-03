const sinon = require('sinon');

const { validateName, validateLength } = require('../../../src/middlewares/validations/inputValidations');

describe('Realizando testes - VALIDAÇÃO DE ENTRADA', function () {
  beforeEach(function () {
    sinon.restore(); // Reseta mocks antes de cada teste
  });

  it('validateName deve retornar 400 para nome ausente', function () {
    const req = { body: {} };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
    const next = sinon.spy();
  
    validateName(req, res, next);
  
    sinon.assert.calledWith(res.status, 400);
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, { message: '"name" is required' }); // Correção aqui
    sinon.assert.notCalled(next);
  });

  it('validateName deve chamar next com nome válido', function () {
    const req = { body: { name: 'Produto' } };
    const res = { status: sinon.stub(), json: sinon.spy() };
    const next = sinon.spy();

    validateName(req, res, next);

    sinon.assert.notCalled(res.status); // Correção aqui
    sinon.assert.notCalled(res.json); // Correção aqui
    sinon.assert.calledOnce(next); // Correção aqui
  });

  it('validateLength deve retornar 422 para nome com menos de 6 caracteres', function () {
    const req = { body: { name: 'Prod' } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
    const next = sinon.spy();
  
    validateLength(req, res, next);
  
    sinon.assert.calledWith(res.status, 422);
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, { message: '"name" length must be at least 5 characters long' }); // Correção aqui
    sinon.assert.notCalled(next);
  });
  
  it('validateLength deve chamar next para nome com 6 ou mais caracteres', function () {
    const req = { body: { name: 'Produto' } };
    const res = { status: sinon.stub(), json: sinon.spy() };
    const next = sinon.spy();

    validateLength(req, res, next);

    sinon.assert.notCalled(res.status); // Correção aqui
    sinon.assert.notCalled(res.json); // Correção aqui
    sinon.assert.calledOnce(next); // Correção aqui
  });
});
