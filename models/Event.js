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
    name: { 
      type: DataTypes.STRING,
      allowNull: false, 
    }, 
    venue: {
      type: DataTypes.STRING,
      allowNull: false,
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
        type: DataTypes.STRING,

        allowNull: false,
    },
      ticket_link: {
        type: DataTypes.STRING,

        allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'event',
  }
);

module.exports = Event;
