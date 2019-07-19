const express = require('express');
const PaisController = require('../controllers/PaisController');
const EstadoController = require('../controllers/EstadoController');
const CidadeController = require('../controllers/CidadeController');
const PessoaController = require('../controllers/PessoaController');
const EmpresaController = require('../controllers/EmpresaController');

const routes = new express.Router();

routes.get('/paises', PaisController.index);
routes.post('/pais', PaisController.create);
routes.get('/pais/:id', PaisController.read);
routes.put('/pais/:id', PaisController.update);
routes.delete('/pais/:id', PaisController.delete);

routes.get('/estados', EstadoController.index);
routes.post('/estado', EstadoController.create);
routes.get('/estado/:id', EstadoController.read);
routes.put('/estado/:id', EstadoController.update);
routes.delete('/estado/:id', EstadoController.delete);

routes.get('/cidades', CidadeController.index);
routes.post('/cidade', CidadeController.create);
routes.get('/cidade/:id', CidadeController.read);
routes.put('/cidade/:id', CidadeController.update);
routes.delete('/cidade/:id', CidadeController.delete);

routes.get('/pessoas', PessoaController.index);
routes.post('/pessoa', PessoaController.create);
routes.get('/pessoa/:id', PessoaController.read);
routes.put('/pessoa', PessoaController.update);
routes.delete('/pessoa', PessoaController.delete);

routes.get('/empresas', EmpresaController.index);
routes.post('/empresa', EmpresaController.create);
routes.get('/empresa/:id', EmpresaController.read);
routes.put('/empresa/:id', EmpresaController.update);
routes.delete('/empresa/:id', EmpresaController.delete);

module.exports = routes;
