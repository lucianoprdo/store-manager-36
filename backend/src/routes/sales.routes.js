const router = require('express').Router();
const salesController = require('../controllers');
const {
  inputValidationsSale,
} = require('../middlewares/validations/inputValidationsSale');

router.get('/', salesController.getAllProductsController);

module.exports = router;
