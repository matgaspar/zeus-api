module.exports = (sequelize, DataTypes) => {
  const Pais = sequelize.define(
    'Pais',
    {
      nome: DataTypes.STRING,
      nome_en: DataTypes.STRING,
      sigla: DataTypes.STRING,
      bacen: DataTypes.INTEGER,
    },
    {
      timestamp: true,
    },
  );
  Pais.associate = function (models) {
    // associations can be defined here
  };
  return Pais;
};
