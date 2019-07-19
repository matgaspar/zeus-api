module.exports = (sequelize, DataTypes) => {
  const Rota = sequelize.define(
    'Rota',
    {
      empresa: DataTypes.INTEGER,
      nome: DataTypes.STRING,
      veiculo: DataTypes.INTEGER,
      motorista: DataTypes.INTEGER,
      inspetor: DataTypes.INTEGER,
      orig_nome: DataTypes.STRING,
      orig_logradouro: DataTypes.STRING,
      orig_numero: DataTypes.STRING,
      orig_bairro: DataTypes.STRING,
      orig_cep: DataTypes.STRING,
      orig_cidade: DataTypes.INTEGER,
      dest_nome: DataTypes.STRING,
      dest_logradouro: DataTypes.STRING,
      dest_numero: DataTypes.STRING,
      dest_bairro: DataTypes.STRING,
      dest_cep: DataTypes.STRING,
      dest_cidade: DataTypes.INTEGER,
      ativo: DataTypes.BOOLEAN,
    },
    {
      timestamp: true,
    },
  );
  Rota.associate = function (models) {
    // associations can be defined here
  };
  return Rota;
};
