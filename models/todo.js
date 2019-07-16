// Importamos mongoose para utilizarlo
var mongoose = require('mongoose')

// Creamos un objeto del tipo Schema para configurar modelos
var Schema = mongoose.Schema

// Creamos el modelo
var TodoSchema = Schema({
    todos: [],
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    }
});

// Lo exportamos
module.exports = mongoose.model('Todo', TodoSchema)