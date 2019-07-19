module.exports = (sequelize, DataTypes) => {
  const Rota_Passageiro = sequelize.define(
    'Rota_Passageiro',
    {
      rota: DataTypes.INTEGER,
      passageiro: DataTypes.INTEGER,
      lat: DataTypes.DECIMAL(10, 8),
      long: DataTypes.DECIMAL(11, 8),
      ativo: DataTypes.BOOLEAN,
    },
    {
      timestamp: true,
    },
  );
  Rota_Passageiro.associate = function (models) {
    // associations can be defined here
  };
  return Rota_Passageiro;
};
