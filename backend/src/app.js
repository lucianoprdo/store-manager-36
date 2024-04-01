const express = require('express');
const productsRouter = require('./routes/products.routes');
const salesRoutes = require('./routes/sales.routes');

const app = express();

app.use(express.json());
app.use('/products', productsRouter);
app.use('/sales', salesRoutes);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
