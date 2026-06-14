const { Atendimento, Pet, Usuario } = require('../model/modelos');

const cadastrar = async (req, res) => {
  try {
    const erros = [];
    const { data_hora, motivo, pet_id } = req.body;

    if (!data_hora) {
      erros.push('O campo data_hora e obrigatorio');
    }
    if (!motivo || motivo.trim() === '') {
      erros.push('O campo motivo e obrigatorio');
    }
    if (!pet_id || !Number.isInteger(Number(pet_id)) || Number(pet_id) <= 0) {
      erros.push('O campo pet_id deve ser um inteiro positivo valido');
    }

    if (erros.length > 0) {
      return res.status(400).json({ erros });
    }

    const pet = await Pet.findByPk(pet_id);
    if (!pet) {
      return res.status(404).json({ erro: 'Pet nao encontrado' });
    }

    const usuario_id = req.user.id;

    const atendimento = await Atendimento.create({
      data_hora,
      motivo,
      pet_id,
      usuario_id
    });

    const atendimentoCompleto = await Atendimento.findByPk(atendimento.id, {
      include: [
        { model: Pet, as: 'pet' },
        { model: Usuario, as: 'usuario', attributes: ['id', 'nome', 'usuario', 'perfil'] }
      ]
    });

    return res.status(201).json(atendimentoCompleto);
  } catch (erro) {
    return res.status(500).json({ erro: 'Erro ao cadastrar atendimento' });
  }
};

const consultarPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({ erro: 'ID deve ser um inteiro positivo valido' });
    }

    res.set('Cache-Control', 'private, no-cache, max-age=86400');

    const atendimento = await Atendimento.findByPk(id, {
      include: [
        { model: Pet, as: 'pet' }
      ]
    });

    if (!atendimento) {
      return res.status(404).json({ erro: 'Atendimento nao encontrado' });
    }

    return res.status(200).json(atendimento);
  } catch (erro) {
    return res.status(500).json({ erro: 'Erro ao consultar atendimento' });
  }
};

const iniciar = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({ erro: 'ID deve ser um inteiro positivo valido' });
    }

    const atendimento = await Atendimento.findByPk(id);

    if (!atendimento) {
      return res.status(404).json({ erro: 'Atendimento nao encontrado' });
    }

    if (atendimento.status === 'em_atendimento') {
      return res.status(400).json({ mensagem: 'Este atendimento ja esta em andamento' });
    }

    atendimento.status = 'em_atendimento';
    await atendimento.save();

    return res.status(200).json(atendimento);
  } catch (erro) {
    return res.status(500).json({ erro: 'Erro ao iniciar atendimento' });
  }
};

const finalizar = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({ erro: 'ID deve ser um inteiro positivo valido' });
    }

    const atendimento = await Atendimento.findByPk(id);

    if (!atendimento) {
      return res.status(404).json({ erro: 'Atendimento nao encontrado' });
    }

    if (atendimento.status === 'finalizado') {
      return res.status(400).json({ mensagem: 'Este atendimento ja esta finalizado' });
    }

    atendimento.status = 'finalizado';
    await atendimento.save();

    return res.status(200).json(atendimento);
  } catch (erro) {
    return res.status(500).json({ erro: 'Erro ao finalizar atendimento' });
  }
};

module.exports = { cadastrar, consultarPorId, iniciar, finalizar };
