const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'contraseña',
    passReqToCallback: true
}, async (req, correo, contraseña, done) => {

    const user = await User.findOne({correo: correo});
    if (!user) {
        return done(null, false, req.flash('ingreso_msg', 'Usuario no encontrado'));
    } else {
        // Busca la contraseña
        const match = await user.matchPassword(contraseña);
        //console.log(match);
        if(match) {
            session = req.session;
            return done(null, user);
        } else {
            return done(null, false, req.flash('ingreso_msg', 'Contraseña incorrecta'));
        }
  }
}));