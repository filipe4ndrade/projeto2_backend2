const passport = require('passport');

const autenticar = passport.authenticate('jwt', { session: false });

const autorizar = (...perfisPermitidos) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ erro: 'Usuario nao autenticado' });
    }
    if (!perfisPermitidos.includes(req.user.perfil)) {
      return res.status(403).json({ erro: 'Acesso negado. Perfil sem permissao.' });
    }
    next();
  };
};

module.exports = { autenticar, autorizar };
