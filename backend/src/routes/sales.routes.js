const router = require('express').Router();
const salesController = require('../controllers/sales.controller');
const {
  inputValidations,
} = require('../middlewares/validations/inputValidations');

router.get('/', salesController.getAllSalesController);
router.get('/:id', salesController.getSaleByIdController);
router.post('/', inputValidations, salesController.createSaleController);
router.delete('/:id', salesController.deleteSale);

module.exports = router;
