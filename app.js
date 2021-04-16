require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./db');
const controllers = require('./controllers');

// sequelize.sync();
// sequelize.sync({ force: true });
app.use(require('./middleware/headers'));

app.use(express.json());

//app.use(require('./middleware/validate-session))
app.use('/company', controllers.company);
app.use('/user', controllers.user);
app.use('/property', controllers.property);
app.use('/unit', controllers.unit);
app.use('/feature', controllers.feature);
app.use('/photo', controllers.photo);

sequelize
  .authenticate()
  .then(() => sequelize.sync())
  // .then(() => sequelize.sync({ force: true }))
  .then(() =>
    app.listen(3000, function () {
      console.log('App is listening on port 3000');
    })
  )
  .catch((e) => {
    console.log('[server]: Server Crashed');
    console.log(e);
  });
