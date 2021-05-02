const { DataTypes } = require('sequelize');
const db = require('../db');

const Property = db.define('property', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  streetAddress: {
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
  numberOfUnits: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

Property.associate = (models) => {
  Property.hasMany(models.Unit, {
    onDelete: 'cascade',
  });
};
module.exports = Property;
