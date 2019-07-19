const { Pessoa, Empresa } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const { empresa } = req.user;
      const pessoas = await Pessoa.findAll({ where: { empresa } });

      return res.json(pessoas);
    } catch (ex) {
      return res.json(ex);
    }
  },

  // INÍCIO CRUD
  async create(req, res) {
    try {
      const pessoa = await Pessoa.create(req.body);

      return res.json(pessoa);
    } catch (ex) {
      return res.json(ex);
    }
  },

  async read(req, res) {
    try {
      const { id } = req.params;
      const pessoa = await Pessoa.findByPk(id);

      return res.json(pessoa);
    } catch (ex) {
      return res.json(ex);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.body;
      /* if (req.body.senha) {
        req.body.senha = await auth.generateHash(senha);
      } */
      return res.json(
        await Pessoa.findByPk(id)
          .then(pessoa => pessoa.update(req.body))
          .then(pessoa => pessoa.reload()),
      );
    } catch (ex) {
      return res.json(ex);
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.body;
      return res.json(await Pessoa.findByPk(id).then(pessoa => pessoa.destroy({ force: true })));
    } catch (ex) {
      return res.json(ex);
    }
  },
  // FIM CRUD

  // MÉTODOS
  async login(email) {
    try {
      const pessoa = await Pessoa.findOne({
        where: { email },
        include: Empresa,
      });
      return pessoa;
    } catch (ex) {
      return ex;
    }
  },

  async pessoaById(id) {
    const pessoa = await Pessoa.findByPk(id);

    return pessoa;
  },
};
