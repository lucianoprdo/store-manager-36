const sinon = require('sinon');

const {
  validateName,
  validateLength,
} = require('../../../src/middlewares/validations/inputValidations');

describe('Performing tests - INPUT VALIDATION', function () {
  beforeEach(function () {
    sinon.restore(); // Reseta mocks antes de cada teste
  });

  it('INPUT VALIDATION - validateName should return 400 for missing name', function () {
    const req = { body: {} };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
    const next = sinon.spy();

    validateName(req, res, next);

    sinon.assert.calledWith(res.status, 400);
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, { message: '"name" is required' });
    sinon.assert.notCalled(next);
  });

  it('INPUT VALIDATION - validateName must call next with valid name', function () {
    const req = { body: { name: 'Produto' } };
    const res = { status: sinon.stub(), json: sinon.spy() };
    const next = sinon.spy();

    validateName(req, res, next);

    sinon.assert.notCalled(res.status);
    sinon.assert.notCalled(res.json);
    sinon.assert.calledOnce(next);
  });

  it('INPUT VALIDATION - validateLength must return 422 for name with less than 6 characters', function () {
    const req = { body: { name: 'Prod' } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
    const next = sinon.spy();

    validateLength(req, res, next);

    sinon.assert.calledWith(res.status, 422);
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, {
      message: '"name" length must be at least 5 characters long',
    });
    sinon.assert.notCalled(next);
  });

  it('INPUT VALIDATION - validateLength must call next for name with 6 or more characters', function () {
    const req = { body: { name: 'Produto' } };
    const res = { status: sinon.stub(), json: sinon.spy() };
    const next = sinon.spy();

    validateLength(req, res, next);

    sinon.assert.notCalled(res.status);
    sinon.assert.notCalled(res.json);
    sinon.assert.calledOnce(next);
  });
});
