const Unit = require('./unit.js');
const User = require('./user.js');
const Room = require('./room.js');
const Property = require('./property.js');
const Photo = require('./photo.js');
const Company = require('./company.js');

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
