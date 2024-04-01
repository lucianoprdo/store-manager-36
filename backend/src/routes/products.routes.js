const router = require('express').Router();
const {
  inputValidations,
} = require('../middlewares/validations/inputValidations');
const productsController = require('../controllers/products.controller');

router.get('/', productsController.getAllProductsController);
router.get('/:id', productsController.getProductByIdController);
router.post('/', inputValidations, productsController.createProductController);

module.exports = router;
