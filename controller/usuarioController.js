const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../model/modelos');

const cadastrar = async (req, res) => {
  try {
    const erros = [];
    const { nome, usuario, senha, perfil } = req.body;

    if (!nome || nome.trim() === '') {
      erros.push('O campo nome e obrigatorio');
    }
    if (!usuario || usuario.trim() === '') {
      erros.push('O campo usuario e obrigatorio');
    }
    if (!senha || senha.length < 6) {
      erros.push('A senha deve ter no minimo 6 caracteres');
    }

    if (erros.length > 0) {
      return res.status(400).json({ erros });
    }

    const usuarioExistente = await Usuario.findOne({ where: { usuario } });
    if (usuarioExistente) {
      return res.status(400).json({ erro: 'Este usuario ja esta cadastrado' });
    }

    const senha_hash = await bcrypt.hash(senha, 10);

    const dados = { nome, usuario, senha_hash };
    if (perfil) {
      dados.perfil = perfil;
    }

    const novoUsuario = await Usuario.create(dados);

    return res.status(201).json({
      id: novoUsuario.id,
      nome: novoUsuario.nome,
      usuario: novoUsuario.usuario,
      perfil: novoUsuario.perfil
    });
  } catch (erro) {
    return res.status(500).json({ erro: 'Erro ao cadastrar usuario' });
  }
};

const login = async (req, res) => {
  try {
    const erros = [];
    const { usuario, senha } = req.body;

    if (!usuario || usuario.trim() === '') {
      erros.push('O campo usuario e obrigatorio');
    }
    if (!senha || senha.trim() === '') {
      erros.push('O campo senha e obrigatorio');
    }

    if (erros.length > 0) {
      return res.status(400).json({ erros });
    }

    const usuarioEncontrado = await Usuario.findOne({ where: { usuario } });
    if (!usuarioEncontrado) {
      return res.status(401).json({ erro: 'Usuario ou senha invalidos' });
    }

    const senhaValida = await bcrypt.compare(senha, usuarioEncontrado.senha_hash);
    if (!senhaValida) {
      return res.status(401).json({ erro: 'Usuario ou senha invalidos' });
    }

    const payload = {
      id: usuarioEncontrado.id,
      usuario: usuarioEncontrado.usuario,
      perfil: usuarioEncontrado.perfil
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

    return res.status(200).json({
      token,
      usuario: {
        id: usuarioEncontrado.id,
        nome: usuarioEncontrado.nome,
        usuario: usuarioEncontrado.usuario,
        perfil: usuarioEncontrado.perfil
      }
    });
  } catch (erro) {
    return res.status(500).json({ erro: 'Erro ao realizar login' });
  }
};

module.exports = { cadastrar, login };
