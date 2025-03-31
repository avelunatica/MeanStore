const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    marca: { type: String, required: true },
    tipo_de_lapiz: { type: String, required: true },
    dureza: { 
        type: String, 
        required: true, 
        enum: ['H', 'HB', 'B', 'F'] // Só permite valores válidos
    },
    grosor: {
        type: Number,
        required: true,
        enum: [0.3, 0.5, 0.7]
    },
    color: {
        type: String,
        required: true,
        enum: ['azul', 'verde', 'amarillo']
    },
    precio: { type: Number, required: true },
    cantidad: { type: Number, required: true, default: 0 }, 
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Producto', ProductoSchema);
