const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { Usuario } = require('../model/modelos');

const opcoes = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

module.exports = (passport) => {
  passport.use(new JwtStrategy(opcoes, async (payload, done) => {
    try {
      const usuario = await Usuario.findByPk(payload.id);
      if (usuario) {
        return done(null, usuario);
      }
      return done(null, false);
    } catch (erro) {
      return done(erro, false);
    }
  }));
};
