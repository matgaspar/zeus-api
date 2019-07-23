const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const logger = require('morgan');
const pe = require('parse-error');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io');
const authService = require('./services/auth.service');
const { ReE, ReS, to } = require('./services/util.service');

const CONFIG = require('../config/config');
const db = require('./models');
const PessoaController = require('./controllers/PessoaController');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Conectado ao banco de dados SQL:', CONFIG.DB.name);
  })
  .catch(() => {
    console.error('Não é possível conectar-se ao banco de dados SQL:', CONFIG.DB.name);
  });

app.use(cors());

const jwtFromRequest = passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken();
const secretOrKey = CONFIG.JWT.secretPublic;

const strategy = new passportJWT.Strategy({ jwtFromRequest, secretOrKey }, async (token, next) => {
  let err;
  let pessoa;
  [err, pessoa] = await to(PessoaController.pessoaById(token.id));

  console.log('token received', token);

  // const pessoa = await PessoaController.pessoaById(token.id);
  if (err) return next(err, false);

  if (pessoa) {
    next(null, pessoa);
  } else {
    next(null, false);
  }
});

// use the strategy
passport.use(strategy);

app.use((req, res, next) => {
  req.io = io;

  next();
});

app.get('/', (req, res) => res.send(
  '<div style="font-family:Courier New;font-size:20px;font-weight:bold;text-align:center;margin-top:250px;">⚙️ ZEUS API! ⚙️</div>',
));

app.post('/login', async (req, res) => {
  const { body } = req;
  let err;
  let pessoa;

  [err, pessoa] = await to(authService.authentication(body));
  if (err) return ReE(res, err, 422);

  return ReS(res, { token: pessoa.getJWT(), pessoa });
});

app.use('/public', require('./routes/public.routes'));
app.use(
  '/private',
  passport.authenticate('jwt', { session: false }),
  require('./routes/private.routes'),
);

/* app.use('/', (req, res) => {
  res.statusCode = 200; // send the appropriate status code
  res.json({ status: 'success', message: 'Parcel Pending API', data: {} });
}); */

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.message = 'Not Found';
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  /* res.status(err.status || 500);
  res.json(TE(err.message)); */
  ReE(res, err, err.status || 500);
});

process.on('unhandledRejection', (error) => {
  console.error('Uncaught Error', pe(error));
});

const port = CONFIG.port || 3000;

server.listen(port, () => {
  console.log('Servidor em execução na porta :', port);
});
