const express = require('express');
const PaisController = require('../controllers/PaisController');
const EstadoController = require('../controllers/EstadoController');
const CidadeController = require('../controllers/CidadeController');

const routes = new express.Router();

routes.get('/paises', PaisController.index);
routes.get('/pais/:id', PaisController.read);

routes.get('/estados', EstadoController.index);
routes.get('/estado/:id', EstadoController.read);

routes.get('/cidades', CidadeController.index);
routes.get('/cidade/:id', CidadeController.read);

module.exports = routes;
