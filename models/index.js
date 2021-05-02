const Unit = require('./unit');
const User = require('./user');
const Feature = require('./feature');
const Property = require('./property');
const Photo = require('./photo');
const Company = require('./company');

User.belongsTo(Company);
Company.hasMany(User);

Unit.associate = (models) => {
  Unit.hasMany(models.Photo, {
    onDelete: 'cascade',
  });
  Photo.belongsTo(models.Unit, {
    onDelete: 'cascade',
    foreignKey: {
      allowNull: false,
    },
  });
};

Unit.associate = (models) => {
  Unit.hasMany(models.Feature, {
    onDelete: 'cascade',
  });
  Feature.belongsTo(models.Unit, {
    onDelete: 'cascade',
    foreignKey: {
      allowNull: false,
    },
  });
};

Property.associate = (models) => {
  Property.hasMany(models.Unit, {
    onDelete: 'cascade',
  });
  Unit.belongsTo(models.Property, {
    onDelete: 'cascade',
    foreignKey: {
      allowNull: false,
    },
  });
};

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
