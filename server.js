const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

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

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

fetch("https://ticketmasterstefan-skliarovv1.p.rapidapi.com/getSingleGenre", {
	"method": "POST",
	"headers": {
		"content-type": "application/x-www-form-urlencoded",
		"x-rapidapi-key": "a905819813mshb487c4aa03c8e57p1f0687jsnfe693ad390a5",
		"x-rapidapi-host": "Ticketmasterstefan-skliarovV1.p.rapidapi.com"
	},
	"body": {
		"genreId": "KnvZfZ7vAde",
		"apiKey": "y7jtPwcsLI955aEToVqLFC7r53xG1Umr"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});