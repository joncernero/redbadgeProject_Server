const Unit = require('./unit');
const User = require('./user');
const Feature = require('./feature');
const Property = require('./property');
const Photo = require('./photo');
const Company = require('./company');

User.belongsTo(Company);
Company.hasMany(User);

Unit.hasMany(Photo);
Photo.belongsTo(Unit);

Unit.hasMany(Feature);
Feature.belongsTo(Unit);

Property.hasMany(Unit);
Unit.belongsTo(Property);

Property.belongsTo(Company);
Company.hasMany(Property);

module.exports = {
  User,
  Unit,
  Feature,
  Property,
  Photo,
  Company,
};
