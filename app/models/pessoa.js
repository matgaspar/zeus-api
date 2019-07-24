/* eslint-disable func-names */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sequelizePaginate = require('sequelize-paginate');
const { TE, to } = require('../services/util.service');
const CONFIG = require('../../config/config');

module.exports = (sequelize, DataTypes) => {
  const Pessoa = sequelize.define(
    'Pessoa',
    {
      empresa: DataTypes.INTEGER,
      nome: DataTypes.STRING,
      sobrenome: DataTypes.STRING,
      rg: DataTypes.STRING,
      cpf: DataTypes.STRING,
      sexo: DataTypes.ENUM('M', 'F'),
      email: DataTypes.STRING,
      senha: DataTypes.STRING,
      logradouro: DataTypes.STRING,
      numero: DataTypes.STRING,
      bairro: DataTypes.STRING,
      cep: DataTypes.STRING,
      cidade: DataTypes.INTEGER,
      motorista: DataTypes.BOOLEAN,
      inspetor: DataTypes.BOOLEAN,
      passageiro: DataTypes.BOOLEAN,
      ativo: DataTypes.BOOLEAN,
    },
    {
      timestamp: true,
    },
  );

  Pessoa.associate = (models) => {
    // Pessoa.belongsTo(Empresa);
  };

  Pessoa.beforeSave(async (pessoa) => {
    let err;
    if (pessoa.changed('senha')) {
      let salt;
      let hash;
      [err, salt] = await to(bcrypt.genSalt(10));
      if (err) TE(err.message, true);

      [err, hash] = await to(bcrypt.hash(pessoa.senha, salt));
      if (err) TE(err.message, true);

      pessoa.senha = hash;
    }
  });

  Pessoa.prototype.comparePassword = async function (pw) {
    let err;
    let pass;
    if (!this.senha) TE('senha not set');

    [err, pass] = await to(bcrypt.compare(pw, this.senha));
    if (err) TE(err);

    if (!pass) TE('invalid senha');

    return this;
  };

  Pessoa.prototype.getJWT = function () {
    const { secretOrKey, Options } = CONFIG.JWT;
    const payload = { id: this.id };
    return jwt.sign(payload, secretOrKey, Options);
  };

  sequelizePaginate.paginate(Pessoa);

  return Pessoa;
};
