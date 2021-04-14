const Unit = require('./unit');
const User = require('./user');
const Room = require('./room');
const Property = require('./property');
const Photo = require('./photo');
const Company = require('./company');

User.belongsTo(Company);
Company.hasMany(User);

Room.hasMany(Photo);
Photo.belongsTo(Room);

Unit.hasMany(Room);
Room.belongsTo(Unit);

Property.hasMany(Unit);
Unit.belongsTo(Property);

Property.belongsTo(Company);
Company.hasMany(Property);

module.exports = {
  User,
  Unit,
  Room,
  Property,
  Photo,
  Company,
};
