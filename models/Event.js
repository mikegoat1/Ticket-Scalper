const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model {}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    venue: {
      type: DataTypes.STRING,
      allowNull: false,
    // },
    // segment: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // genre: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // subGenre: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    },
    price_range_min: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    price_range_max: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    start_date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
     start_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'event',
  }
);

module.exports = Event;
