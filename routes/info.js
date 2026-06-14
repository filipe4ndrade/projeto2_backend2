const express = require('express');
const router = express.Router();
const infoController = require('../controller/infoController');

router.get('/', (req, res, next) => {
  // #swagger.tags = ['Index']
  // #swagger.description = 'Retorna informacoes basicas sobre o servico'
  infoController.infoServico(req, res, next);
});

module.exports = router;
