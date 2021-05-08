const { Sequelize } = require('sequelize');
// const db = new Sequelize('red-badge-project', 'postgres', 'password', {
//   host: 'localhost',
//   dialect: 'postgres',
// });

const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectedUnauthorized: false,
    },
  },
});

db.authenticate().then(
  function () {
    console.logI(`Connected to red-badge-project postgres database`);
  },
  function (err) {
    console.log(err);
  }
);

module.exports = db;
