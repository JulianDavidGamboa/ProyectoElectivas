const { Schema, model } = require('mongoose');

const bcrypt = require('bcryptjs');

const Usuario = new Schema({
    correo: { type: String, required: true},
    codigo: { type: Number, required: true },
    contraseña: { type: String, required: true }
});

Usuario.methods.encryptPassword = async (contraseña) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(contraseña, salt);
    return await hash;
}

Usuario.methods.matchPassword = async function(contraseña) {
    return await bcrypt.compareSync(contraseña, this.contraseña);
}

module.exports = model('Usuario', Usuario);