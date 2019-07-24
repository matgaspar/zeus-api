const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
  const Estado = sequelize.define(
    'Estado',
    {
      nome: DataTypes.STRING,
      uf: DataTypes.STRING,
      ibge: DataTypes.INTEGER,
      pais: DataTypes.INTEGER,
      ddd: DataTypes.STRING,
    },
    {
      timestamp: true,
    },
  );
  Estado.associate = function (models) {
    // associations can be defined here
  };

  sequelizePaginate.paginate(Estado);

  return Estado;
};
