const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuarioController');

router.post('/cadastro', (req, res, next) => {
  // #swagger.tags = ['Usuarios']
  // #swagger.description = 'Cadastra um novo usuario no sistema'
  /* #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: { $ref: '#/definitions/NovoUsuario' }
  } */
  /* #swagger.responses[201] = {
    description: 'Usuario cadastrado com sucesso',
    schema: { $ref: '#/definitions/UsuarioCriado' }
  } */
  usuarioController.cadastrar(req, res, next);
});

router.post('/login', (req, res, next) => {
  // #swagger.tags = ['Usuarios']
  // #swagger.description = 'Realiza login e retorna token JWT'
  /* #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: { $ref: '#/definitions/LoginUsuario' }
  } */
  /* #swagger.responses[200] = {
    description: 'Login realizado com sucesso',
    schema: { $ref: '#/definitions/LoginResposta' }
  } */
  usuarioController.login(req, res, next);
});

module.exports = router;
