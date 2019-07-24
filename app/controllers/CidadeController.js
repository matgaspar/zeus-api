const { Cidade, Estado } = require('../models');
const { ReS, ReE, to } = require('../services/util.service');
const { Pagination } = require('../../config/config');

module.exports = {
  async index(req, res) {
    try {
      const { body } = req;
      const page = parseInt(body.page, 0) || Pagination.default.page;
      const paginate = parseInt(body.paginate, 0) || Pagination.default.paginate;
      const estado = body.estado || null;
      const [err, cidades] = await to(
        Cidade.paginate({
          page,
          paginate,
          where: { estado },
          include: Estado,
        }),
      );
      // if (err) return ReE(res, err, 422);
      const { docs, ...totals } = cidades;

      return ReS(res, { data: docs, ...totals });
    } catch (err) {
      return ReE(res, err, 422);
    }
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
