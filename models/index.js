const Unit = require('./unit');
const User = require('./user');
const Feature = require('./feature');
const Property = require('./property');
const Photo = require('./photo');
const Company = require('./company');

User.belongsTo(Company);
Company.hasMany(User);

Unit.belongsTo(Property);
Property.hasMany(Unit);

Feature.belongsTo(Unit);
Unit.hasMany(Feature);

Photo.belongsTo(Unit);
Unit.hasMany(Photo);

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
