const { Empresa } = require('../models');
const { ReS, ReE, to } = require('../services/util.service');
const { Pagination } = require('../../config/config');

module.exports = {
  async index(req, res) {
    try {
      const { body } = req;
      const page = parseInt(body.page, 0) || Pagination.default.page;
      const paginate = parseInt(body.paginate, 0) || Pagination.default.paginate;
      const [err, empresas] = await to(
        Empresa.paginate({
          page,
          paginate,
        }),
      );
      // if (err) return ReE(res, err, 422);

      const { docs, ...totals } = empresas;

      return ReS(res, { data: docs, ...totals });
    } catch (err) {
      return ReE(res, err, 422);
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
