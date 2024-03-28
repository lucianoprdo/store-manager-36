const router = require('express').Router();
const { productsController } = require('../controllers');

router.get('/', productsController.getAllProductsController);

module.exports = router;
