const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
  const Cidade = sequelize.define(
    'Cidade',
    {
      nome: DataTypes.STRING,
      estado: DataTypes.INTEGER,
      ibge: DataTypes.INTEGER,
    },
    {
      timestamp: true,
    },
  );
  Cidade.associate = function (models) {
    // associations can be defined here
  };

  sequelizePaginate.paginate(Cidade);

  return Cidade;
};
