// Importamos mongoose para utilizarlo
var mongoose = require('mongoose')

// Creamos un objeto del tipo Schema para configurar modelos
var Schema = mongoose.Schema

// Creamos el modelo
var UserSchema = Schema({
    name: {type: String, required: "Name can't be empty"},
    surname: {type: String, required: "Surname can't be empty"},    
    email: {type: String, required: "email can't be empty", unique: "email must be unique"},
    password: {type: String, required: "Password can't be empty"}
});

// Lo exportamos
module.exports = mongoose.model('User', UserSchema)