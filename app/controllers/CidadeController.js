const { Cidade } = require('../models');

module.exports = {
  async index(req, res) {
    const cidades = await Cidade.findAll();

    return res.json(cidades);
  },

  async create(req, res) {
    try {
      const cidade = await Cidade.create(req.body);

      return res.json(cidade);
    } catch (ex) {
      return res.json(ex);
    }
  },

  async read(req, res) {
    const cidade = await Cidade.findByPk(req.body);

    return res.json(cidade);
  },

  async update(req, res) {
    try {
      const cidade = await Cidade.create(req.body);

      return res.json(cidade);
    } catch (ex) {
      return res.json(ex);
    }
  },

  async delete(req, res) {
    try {
      const cidade = await Cidade.create(req.body);

      return res.json(cidade);
    } catch (ex) {
      return res.json(ex);
    }
  },
};
