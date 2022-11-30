const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');

const app = express();

const conn = require('./db/conn');
const ToughtsController = require('./controllers/ToughtsController');

// Models
const Tought = require('./models/Tought');
const User = require('./models/User');

app.engine('handlebars', exphbs.engine({
  layoutsDir: require('path').join(__dirname, '/views/layout')
}));
app.set('view engine', 'handlebars');
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json());

app.use(
  session({
    name: "session",
    secret: "53CR37",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function() {},
      path: require("path").join(require('os').tmpdir(), 'sessions')
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true
    }
  })
)

// Flash messages
app.use(flash());

// Static files
app.use(express.static('public'));

// Salvar a session
app.get('/', (req, res, next) => {
  if(req.session.userid) {
    res.locals.session = req.session; 
  }

  next();
})

// Routes
const usersRoutes = require('./routes/usersRoutes');
const toughtsRoutes = require('./routes/toughtsRoutes');

app.use('/toughts', toughtsRoutes);

app.get('/', ToughtsController.showToughts);


conn
  //.sync({ force: true })
  .sync()
  .then(() => app.listen(3001))
  .catch(err => console.log(err));