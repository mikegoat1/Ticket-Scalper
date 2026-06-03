const Sequelize = require('sequelize');
const { db } = require('./index');

let sequelize;

if (db.jawsdbUrl) {
  sequelize = new Sequelize(db.jawsdbUrl);
} else {
  sequelize = new Sequelize(db.name, db.user, db.password, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  });
}
module.exports = sequelize;
