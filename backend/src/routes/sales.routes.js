const router = require('express').Router();
const salesController = require('../controllers/sales.controller');

router.get('/', salesController.getAllSalesController);
router.get('/:id', salesController.getSaleByIdController);

module.exports = router;
