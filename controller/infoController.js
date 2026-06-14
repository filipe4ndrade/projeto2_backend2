const infoServico = async (req, res) => {
  try {
    res.set('Cache-Control', 'no-store');
    return res.status(200).json({
      nome: 'VetCare API',
      descricao: 'API RESTful para gerenciamento de atendimentos veterinarios da clinica VetCare',
      versao: '1.0.0',
      tecnologias: {
        runtime: 'Node.js',
        framework: 'Express',
        banco_de_dados: 'MySQL',
        orm: 'Sequelize',
        autenticacao: 'JWT com Passport.js'
      },
      status: 'ativo',
      timestamp: new Date().toISOString(),
      documentacao: '/api-docs'
    });
  } catch (erro) {
    return res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

module.exports = { infoServico };
