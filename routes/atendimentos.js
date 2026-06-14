const express = require('express');
const router = express.Router();
const atendimentoController = require('../controller/atendimentoController');
const { autenticar, autorizar } = require('../middleware/auth');

router.post('/', autenticar, autorizar('recepcao'), (req, res, next) => {
  // #swagger.tags = ['Atendimentos']
  // #swagger.description = 'Cadastra um novo atendimento'
  // #swagger.security = [{ "BearerAuth": [] }]
  /* #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: { $ref: '#/definitions/NovoAtendimento' }
  } */
  /* #swagger.responses[201] = {
    description: 'Atendimento cadastrado com sucesso',
    schema: { $ref: '#/definitions/Atendimento' }
  } */
  atendimentoController.cadastrar(req, res, next);
});

router.get('/:id', autenticar, autorizar('recepcao'), (req, res, next) => {
  // #swagger.tags = ['Atendimentos']
  // #swagger.description = 'Consulta detalhes de um atendimento por ID, incluindo dados do pet'
  // #swagger.security = [{ "BearerAuth": [] }]
  /* #swagger.responses[200] = {
    description: 'Detalhes do atendimento',
    schema: { $ref: '#/definitions/Atendimento' }
  } */
  atendimentoController.consultarPorId(req, res, next);
});

router.put('/:id/iniciar', autenticar, autorizar('veterinario'), (req, res, next) => {
  // #swagger.tags = ['Atendimentos']
  // #swagger.description = 'Inicia um atendimento, alterando status para em_atendimento'
  // #swagger.security = [{ "BearerAuth": [] }]
  atendimentoController.iniciar(req, res, next);
});

router.put('/:id/finalizar', autenticar, autorizar('veterinario'), (req, res, next) => {
  // #swagger.tags = ['Atendimentos']
  // #swagger.description = 'Finaliza um atendimento, alterando status para finalizado'
  // #swagger.security = [{ "BearerAuth": [] }]
  atendimentoController.finalizar(req, res, next);
});

module.exports = router;
