const mongoose = require ('mongoose');
const { Schema } = mongoose;
// creo el esquema
const Task = new Schema ({
    title: String,
    description: String,
    cantidad: String
});
//se exporta = se define el modelo (nombre cualquiera , y el schema)
module.exports = mongoose.model('Task', Task);

