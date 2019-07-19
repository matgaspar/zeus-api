module.exports = (sequelize, DataTypes) => {
  const Empresa = sequelize.define(
    'Empresa',
    {
      nome: DataTypes.STRING,
      rg: DataTypes.STRING,
      cpf: DataTypes.STRING,
      cnpj: DataTypes.STRING,
      email: DataTypes.STRING,
      senha: DataTypes.STRING,
      pFisica: DataTypes.BOOLEAN,
      pJuridica: DataTypes.BOOLEAN,
      logradouro: DataTypes.STRING,
      numero: DataTypes.STRING,
      bairro: DataTypes.STRING,
      cep: DataTypes.STRING,
      cidade: DataTypes.INTEGER,
      ativo: DataTypes.BOOLEAN,
    },
    {
      timestamp: true,
    },
  );
  Empresa.associate = function (models) {
    // associations can be defined here
  };
  return Empresa;
};
