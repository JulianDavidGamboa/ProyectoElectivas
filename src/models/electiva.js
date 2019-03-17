const { Schema, model } = require('mongoose');

const Electiva = new Schema ({
    nombre: { type: String, required: true },
    nombreInstructor: { type: String, required: true },
    descripcion: { type: String, required: true },
    cupos: { type: Number, required: true}
});

module.exports = model('Electiva', Electiva);