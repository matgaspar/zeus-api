const { Estado } = require('../models');

module.exports = {
  async index(req, res) {
    const estados = await Estado.findAll();

    return res.json(estados);
  },

  async create(req, res) {
    try {
      const estado = await Estado.create(req.body);

      return res.json(estado);
    } catch (ex) {
      return res.json(ex);
    }
  },

  async read(req, res) {
    const estado = await Estado.findByPk(req.body);

    return res.json(estado);
  },

  async update(req, res) {
    try {
      const estado = await Estado.create(req.body);

      return res.json(estado);
    } catch (ex) {
      return res.json(ex);
    }
  },

  async delete(req, res) {
    try {
      const estado = await Estado.create(req.body);

      return res.json(estado);
    } catch (ex) {
      return res.json(ex);
    }
  },
};
