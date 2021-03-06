const { DataTypes } = require('sequelize');
const db = require('../db');

const Company = db.define('company', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  companyAddress: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  zipcode: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Company;
