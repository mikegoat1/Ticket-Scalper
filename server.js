const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/auth');

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

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});


function searchBar(data){
  const response = await fetch("https://ticketmasterstefan-skliarovv1.p.rapidapi.com/getSingleGenre", {
    method: "GET",
    body: {
      "genreId": "KnvZfZ7vAde",
      "apiKey": "y7jtPwcsLI955aEToVqLFC7r53xG1Umr"
    }
  });
  if (response.ok){
    console.log(response);
  } else {
    alert("Nothing to search"); 
  }

}

// fetch("https://ticketmasterstefan-skliarovv1.p.rapidapi.com/getSingleGenre", {
// 	"method": "GET",
// 	"body": {
// 		"genreId": "KnvZfZ7vAde",
// 		"apiKey": "y7jtPwcsLI955aEToVqLFC7r53xG1Umr"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });