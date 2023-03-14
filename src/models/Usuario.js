const mongoose = require ('mongoose');
const { Schema } = mongoose;
// creo el esquema
const Usuario = new Schema ({
    id: String,
    nombre: String,
    apellido: String,
    telefono: String,
    email: String,
    img: String
});
//se exporta = se define el modelo (nombre cualquiera , y el schema)
module.exports = mongoose.model('Usuario', Usuario);

