const { Pais } = require('../models');

module.exports = {
  async index(req, res) {
    const paises = await Pais.findAll();

    return res.json(paises);
  },

  async create(req, res) {
    try {
      const pais = await Pais.create(req.body);

      return res.json(pais);
    } catch (ex) {
      return res.json(ex);
    }
  },

  async read(req, res) {
    const pais = await Pais.findByPk(req.body);

    return res.json(pais);
  },

  async update(req, res) {
    try {
      const pais = await Pais.create(req.body);

      return res.json(pais);
    } catch (ex) {
      return res.json(ex);
    }
  },

  async delete(req, res) {
    try {
      const pais = await Pais.create(req.body);

      return res.json(pais);
    } catch (ex) {
      return res.json(ex);
    }
  },
};
