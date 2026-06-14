require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var swaggerUi = require('swagger-ui-express');
var swaggerFile = require('./swagger_output.json');

var configurarHelmet = require('./config/helmet');
var configurarPassport = require('./config/passport');

var infoRoutes = require('./routes/info');
var petRoutes = require('./routes/pets');
var atendimentoRoutes = require('./routes/atendimentos');
var usuarioRoutes = require('./routes/usuarios');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

configurarHelmet(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
configurarPassport(passport);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/api', infoRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/atendimentos', atendimentoRoutes);
app.use('/api/usuarios', usuarioRoutes);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ erro: err.message });
});

module.exports = app;
