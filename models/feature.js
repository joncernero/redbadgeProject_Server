const { DataTypes } = require('sequelize');
const db = require('../db');

const Feature = db.define('feature', {
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

Feature.associate = (models) => {
  Feature.belongsTo(models.Unit, {
    foreignKey: {
      allowNull: false,
    },
  });
};

module.exports = Feature;
