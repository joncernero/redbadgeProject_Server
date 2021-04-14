const { DataTypes } = require('sequelize');
const db = require('../db');

const Photos = db.define('photos', {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Photos;