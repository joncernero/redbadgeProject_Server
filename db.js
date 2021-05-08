const { Sequelize } = require('sequelize');
// const db = new Sequelize('red-badge-project', 'postgres', 'password', {
//   host: 'localhost',
//   dialect: 'postgres',
// });

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectedUnauthorized: false,
    },
  },
});

sequelize.authenticate().then(
  function () {
    console.logI(`Connected to red-badge-project postgres database`);
  },
  function (err) {
    console.log(err);
  }
);

module.exports = sequelize;
