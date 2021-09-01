const { DataTypes } = require('sequelize');
const db = require('../db');

const Unit = db.define('unit', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  unitNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bldgNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  numberOfBeds: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  numberOfBaths: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  totalSquareFootage: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Unit;
