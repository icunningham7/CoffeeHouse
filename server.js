const dotenv = require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session')
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const auth = require('./utils/auth');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const { route } = require('./controllers');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;


const hbs = exphbs.create({ auth, helpers });

const secret = process.env.SESSION_SECRET
const sess = {
    secret: '63377433-3a0d-4cd2-8780-7575c16ce3f2',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});