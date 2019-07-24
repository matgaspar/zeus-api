const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const ConfigDB = require('../../config/database.js');

const db = {};
const sequelize = new Sequelize(ConfigDB);

fs.readdirSync(__dirname)
  .filter(
    file => file.indexOf('.') !== 0 && file !== path.basename(__filename) && file.slice(-3) === '.js',
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Pessoa.belongsTo(db.Empresa, { foreignKey: 'empresa', constraints: false });
db.Cidade.belongsTo(db.Estado, { foreignKey: 'estado', constraints: false });

module.exports = db;
