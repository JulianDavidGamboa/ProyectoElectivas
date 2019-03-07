const express = require('express');
const path = require('path');
const ejsmate = require('ejs-mate');
const methOver = require('method-override');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

// Initializations
const app = express();
require('./database');
require('./config/passport');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsmate);
app.set('view engine', 'ejs');

// Middlewares
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(methOver('_method'));
app.use(session({
    secret: 'secretapp',
    reseave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.mensajeIngreso = req.flash('ingreso_msg');
    app.locals.mensajeError = req.flash('err_msg');
    app.locals.mensajeRegistro = req.flash('registro_msg');
    app.locals.mensajeSalida = req.flash('salir_msg');
    app.locals.user = req.user;
    next();
});

// Routes
app.use(require('./routes/index'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Server is Listening
app.listen(app.get('port'), () => {
    console.log("Servidor en el puerto", app.get('port'));
});