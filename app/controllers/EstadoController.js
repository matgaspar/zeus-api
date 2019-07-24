const { Estado } = require('../models');
const { ReS, ReE, to } = require('../services/util.service');
const { Pagination } = require('../../config/config');

module.exports = {
  async index(req, res) {
    try {
      const { body } = req;
      const page = parseInt(body.page, 0) || Pagination.default.page;
      const paginate = parseInt(body.paginate, 0) || Pagination.default.paginate;
      const [err, estados] = await to(Estado.paginate(page, paginate));
      // if (err) return ReE(res, err, 422);

      const { docs, ...totals } = estados;

      return ReS(res, { data: docs, ...totals });
    } catch (err) {
      return ReE(res, err, 422);
    }
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
