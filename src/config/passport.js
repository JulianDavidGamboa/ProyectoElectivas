const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

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
    // Match Password's User
    const match = await user.matchPassword(contraseña);
    console.log(match);
    if(match) {
      return done(null, user);
    } else {
      return done(null, false, req.flash('ingreso_msg', 'Contraseña incorrecta'));
    }
  }
}));

/*
passport.use('local-signin', new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'contraseña',
    passReqToCallback: true
}, async (req, correo, contraseña, done) => {
    const user = await User.findOne({email: correo});
    console.log(user);
    if(!user) {
        return done(null, false, req.flash('mensajeInicio', 'Usuario no encontrado'));
    }
    if(!user.matchPassword(contraseña)) {
        return done(null, false, req.flash('mensajeInicio', 'Contraseña incorrecta'));
    }

    done(null, user);
}));*/