const { Schema, model } = require('mongoose');

const TareaSchema = Schema({

    iduser: {
        type: String,
        required: true
    },

    nombre: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true,
        default: "No Resuelto"
    },
    descripcion: {
        type: String,
        required: true,
    },
    fechaCreacion:{
        type: Date, 
        required: true,
        default: Date.now 
    },
    fechaActualizacion:{
        type: Date, 
        default: Date.now 
    }

});


TareaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})



module.exports = model( 'Tarea', TareaSchema );