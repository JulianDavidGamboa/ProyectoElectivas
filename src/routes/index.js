const router = require('express').Router();
const passport = require('passport');

const User = require('../models/user');
const Profesor = require('../models/profesor');
const Electiva = require('../models/electiva');

router.get('/registro', (req, res) => {
    res.render('forms/registro');
});

router.post('/registro', async (req, res) => {
    const { correo, codigo, contraseña, confirm_contraseña } = req.body;
    let error = 0;
    if ( contraseña != confirm_contraseña ){
        req.flash('err_msg', 'La contraseña debe coincidir');
        res.redirect('/registro');
        error += 1;
    }

    if (error > 0) {
        res.render('/registro');
    } else {

        const correoUsuario = await User.findOne({email: correo});
        if (correoUsuario) {
            req.flash('err_msg', 'Este correo ya existe');
            res.redirect('/registro');
        } else {
            const nuevoUsuario = new User({correo, codigo, contraseña});
            nuevoUsuario.contraseña = await nuevoUsuario.encryptPassword(contraseña);
            await nuevoUsuario.save();
            req.flash('registro_msg', 'Te has registrado correctamente');
            res.redirect('/admin/profesor');
        }
    }
});

router.get('/', (req, res) => {
    res.render('forms/inicioSesion');
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/admin/profesor',
    failureRedirect: '/',
    failureFlash: true
}));

router.get('/cerrar', (req, res) => {
    req.logout();
    req.flash('salir_msg', 'Cerraste tu sesión');
    res.redirect('/');
});

// Crear Profesor
router.get('/admin/profesor', isAuthenticated, async (req, res) => {
    const profesor = await Profesor.find();
    res.render('forms/crearProfesor', {profesor: profesor});
});

router.post('/admin/crearProfesor', isAuthenticated, async (req, res) => {
    const nuevoProfesor = new Profesor(req.body);
    await nuevoProfesor.save();
    //console.log(nuevoProfesor);
    res.redirect('/admin/profesor');
});

router.get('/admin/delete/profesor/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    await Profesor.remove({_id: id});
    res.redirect('/admin/profesor');
});

router.get('/admin/profesor/editar/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const profesor = await Profesor.findById(id);

    res.render('forms/editar', {
        profesor
    });
});

router.post('/admin/profesor/editar/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    await Profesor.update({_id: id}, req.body);
    res.redirect('/admin/profesor');
});

// Crear Electivas
router.get('/admin/electivas', isAuthenticated, async (req, res) => {
    const electiva = await Electiva.find();
    const profesor = await Profesor.find();

    res.render('forms/crearElectivas', {electiva: electiva, profesor: profesor});
});

router.post('/admin/electivas', isAuthenticated, async (req, res) => {
    const nuevaElectiva = new Electiva(req.body);
    await nuevaElectiva.save();
    res.redirect('/admin/electivas');
});

router.get('/admin/delete/electiva/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    await Electiva.remove({_id: id});
    res.redirect('/admin/electivas');
});

router.get('/admin/update/electiva/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const electiva = await Electiva.findById(id);
    const profesor = await Profesor.find();

    res.render('forms/editarElectiva', {
        electiva: electiva
    });
});

router.post('/admin/update/electiva/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    await Electiva.updateOne({_id: id}, req.body);
    res.redirect('/admin/electivas');
});

router.get('/admin/listaEstudiantes', isAuthenticated, (req, res) => {
    res.send('Lista de estudiantes');
});

router.get('/estudiante/listaElectiva', isAuthenticated, (req, res) => {
    res.send('Listado de electivas activas');
});

router.get('/estudiante/inscripcion', isAuthenticated, (req, res) => {
    res.send('Inscripcion a una electiva');
});

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('err_msg', 'No estas autorizado para ingresar');
        res.redirect('/');
    }
};


module.exports = router;