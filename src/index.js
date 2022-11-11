const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

const route = require('./routes/index');
const db = require('./config/db');

db.connect()

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTTP logger
app.use(morgan('combined'));

// Template Engine
// app.engine(
//   'hbs',
//   engine({
//     extname: '.hbs',
//   }),
// );

// app.set('view engine', 'html');
// app.set('views', path.join(__dirname, 'resources/view'));
app.set('views', __dirname + '/resources/view');
app.engine('html', require('ejs').renderFile);

route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
}); 