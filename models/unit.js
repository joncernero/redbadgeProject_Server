const { DataTypes } = require('sequelize');
const db = require('../db');

const Unit = db.define('unit', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  unitNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bldgNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numberOfBeds: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  numberOfBaths: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalSquareFootage: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Unit;
