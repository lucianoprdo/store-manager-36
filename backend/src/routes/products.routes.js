const { productsController } = require('../controllers');

const router = require('express').Router();

router.get('/', productsController.getAllProductsController);

module.exports = router;
