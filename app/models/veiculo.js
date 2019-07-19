module.exports = (sequelize, DataTypes) => {
  const Veiculo = sequelize.define(
    'Veiculo',
    {
      empresa: DataTypes.INTEGER,
      marca: DataTypes.STRING,
      modelo: DataTypes.STRING,
      ano: DataTypes.INTEGER,
      chassi: DataTypes.STRING,
      renavam: DataTypes.INTEGER,
      placa: DataTypes.STRING,
      estado: DataTypes.INTEGER,
      ativo: DataTypes.BOOLEAN,
    },
    {
      timestamp: true,
    },
  );
  Veiculo.associate = function (models) {
    // associations can be defined here
  };
  return Veiculo;
};
