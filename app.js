const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const db = require('./config/mongoose');
const customMware = require('./config/middleware');

const app = express();

const PORT = process.env.PORT || 8000;

// setup view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// serve static files
app.use(express.static('./assets'));

// parses incoming request
app.use(express.urlencoded({ extended: true }));

// cookie-parser and session for flash messages
app.use(cookieParser());
app.use(
  session({
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60000 },
  })
);
app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/', require('./routes'));

app.listen(PORT, function () {
  console.log(`Server is running at PORT: ${PORT}`);
});
