const express = require('express');
const router = express.Router();
const petController = require('../controller/petController');
const { autenticar, autorizar } = require('../middleware/auth');

router.post('/', autenticar, autorizar('admin'), (req, res, next) => {
  // #swagger.tags = ['Pets']
  // #swagger.description = 'Cadastra um novo pet'
  // #swagger.security = [{ "BearerAuth": [] }]
  /* #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: { $ref: '#/definitions/NovoPet' }
  } */
  /* #swagger.responses[201] = {
    description: 'Pet cadastrado com sucesso',
    schema: { $ref: '#/definitions/Pet' }
  } */
  petController.cadastrar(req, res, next);
});

router.get('/', autenticar, autorizar('recepcao'), (req, res, next) => {
  // #swagger.tags = ['Pets']
  // #swagger.description = 'Lista todos os pets cadastrados. Permite filtrar por especie via query string.'
  // #swagger.security = [{ "BearerAuth": [] }]
  /* #swagger.parameters['especie'] = {
    in: 'query',
    required: false,
    type: 'string',
    description: 'Filtra pets por especie'
  } */
  /* #swagger.responses[200] = {
    description: 'Lista de pets',
    schema: [{ $ref: '#/definitions/Pet' }]
  } */
  petController.listar(req, res, next);
});

module.exports = router;
