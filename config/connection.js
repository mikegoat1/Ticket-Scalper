const Sequelize = require('sequelize');
const { db } = require('./index');

let sequelize;

if (db.databaseUrl) {
  // Render / PostgreSQL platform
  sequelize = new Sequelize(db.databaseUrl, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else if (db.jawsdbUrl) {
  // Heroku JawsDB (MySQL)
  sequelize = new Sequelize(db.jawsdbUrl);
} else {
  // Local MySQL
  sequelize = new Sequelize(db.name, db.user, db.password, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  });
}

module.exports = sequelize;
