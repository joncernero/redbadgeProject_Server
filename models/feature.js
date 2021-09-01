const { DataTypes } = require('sequelize');
const db = require('../db');

const Feature = db.define('feature', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  feature: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  roomType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  value: {
    type: DataTypes.STRING(1000),
    allowNull: true,
  },
  notes: {
    type: DataTypes.STRING(1000),
    allowNull: true,
  },
});

module.exports = Feature;
