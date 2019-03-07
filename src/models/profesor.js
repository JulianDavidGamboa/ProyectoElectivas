const { Schema, model } = require('mongoose');

const Profesor = new Schema({
    nombreProfesor: { type: String, required: true},
    nombreElectiva: { type: String, required: true }
});

module.exports = model('Profesor', Profesor);