const { Empresa } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const empresas = await Empresa.findAll();

      return res.json(empresas);
    } catch (ex) {
      return res.json(ex);
    }
  },

  async create(req, res) {
    try {
      return await Empresa.create(req.body).then(empresa => res.json(empresa));
    } catch (ex) {
      return res.json(ex);
    }
  },

  async read(req, res) {
    const { id } = req.body;
    const empresa = await Empresa.findByPk(id);

    return res.json(empresa);
  },

  async update(req, res) {
    try {
      const { id } = req.body;
      const empresa = await Empresa.findByPk(id);
      empresa.update(req.body);

      return res.json(empresa);
    } catch (ex) {
      return res.json(ex);
    }
  },

  async delete(req, res) {
    try {
      const empresa = await Empresa.destroy(req.body);

      return res.json(empresa);
    } catch (ex) {
      return res.json(ex);
    }
  },
};
