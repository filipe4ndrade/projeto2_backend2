const { Pet } = require('../model/modelos');

const cadastrar = async (req, res) => {
  try {
    const erros = [];
    const { nome, especie } = req.body;

    if (!nome || nome.trim() === '') {
      erros.push('O campo nome e obrigatorio');
    }
    if (!especie || especie.trim() === '') {
      erros.push('O campo especie e obrigatorio');
    }

    if (erros.length > 0) {
      return res.status(400).json({ erros });
    }

    const pet = await Pet.create({ nome, especie });
    return res.status(201).json(pet);
  } catch (erro) {
    return res.status(500).json({ erro: 'Erro ao cadastrar pet' });
  }
};

const listar = async (req, res) => {
  try {
    res.set('Cache-Control', 'public, max-age=15768000, must-revalidate');

    const where = {};
    if (req.query.especie) {
      where.especie = req.query.especie;
    }

    const pets = await Pet.findAll({ where });
    return res.status(200).json(pets);
  } catch (erro) {
    return res.status(500).json({ erro: 'Erro ao listar pets' });
  }
};

module.exports = { cadastrar, listar };
