const { DataTypes } = require('sequelize');
const db = require('../db');

const Room = db.define('room', {
  roomType: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
  feature: {
    type: DataTypes.STRING(1000),
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

module.exports = Room;
