const exphbs = require('express-handlebars');
const path = require('path');


const express = require('express');
const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const compression = require("compression")

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/auth');

// initialize app & define port
const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });
// Set Handelbars.js as the default template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Add middleware so that you can accept JSON objects 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression())
// Connecting the routes folder to server
app.use(routes);

// Force true to drop/recreate tables on evey sync
// Take off when you dont want it to reload
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

