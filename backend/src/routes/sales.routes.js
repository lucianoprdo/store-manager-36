const router = require('express').Router();
const { salesController } = require('../controllers');
const { inputValidationsSales } = require('../middlewares/validations/inputValidationSale');

router.get('/', salesController.getAllSalesController);
router.get('/:id', salesController.getSaleByIdController);
router.post('/', inputValidationsSales, salesController.createSaleController);
router.delete('/:id', salesController.deleteSale);

module.exports = router;