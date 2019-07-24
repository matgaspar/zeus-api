const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const CONFIG = require('../../config/config');
const { TE, to } = require('../services/util.service');
const PessoaController = require('../controllers/PessoaController');

module.exports = {
  async compareHash(senha, hash) {
    const compare = await to(bcrypt.compare(senha, hash));
    return compare;
  },

  async generateHash(senha) {
    let err;
    if (senha) {
      let salt;
      let hash;
      [err, salt] = await to(bcrypt.genSalt(10));
      if (err) TE(err.message, true);

      [err, hash] = await to(bcrypt.hash(senha, salt));
      if (err) TE(err.message, true);

      return hash;
    }
    return senha;
  },

  generateToken(payload) {
    const { secretOrKey, Options } = CONFIG.JWT;
    return jwt.sign(payload, secretOrKey, Options);
  },
};

const authentication = async (reqBody) => {
  // returns token
  const auth_info = {};
  auth_info.status = 'login';
  const { email, senha } = reqBody;

  if (!email) TE('Please enter an email to login');

  if (!senha) TE('Please enter a password to login');

  let pessoa;
  let err;
  if (validator.isEmail(email)) {
    auth_info.method = 'email';

    [err, pessoa] = await to(PessoaController.login(email));
    if (err) TE(err.message);
  } else {
    TE('A valid email was not entered');
  }

  if (!pessoa) TE('Not registered');

  [err, pessoa] = await to(pessoa.comparePassword(senha));

  if (err) TE(err.message);

  return pessoa;
};

module.exports.authentication = authentication;
