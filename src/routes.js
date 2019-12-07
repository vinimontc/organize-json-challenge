const { Router } = require('express');

const main = require('./main');

const routes = new Router();

routes.get('/api/v2/order-by-status', main.listByStatus);
routes.get('/api/v2/order-total/:status', main.showCount);
routes.get('/api/v2/order-major-values', main.majorOrder);
routes.get('/api/v2/group-by-country', main.orderByCountry);

module.exports = routes;
