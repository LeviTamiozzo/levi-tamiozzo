//Utilizamos ES6
'use strict'

//Cargamos el modulo de MongoDB con mongoose
const mongoose = require('mongoose');
const express = require("express");
const cors = require('cors');
const path = require('path');

const app = express();

//Configuramos el puerto de la Api
const port = process.env.PORT || 8080;

app.use(cors({
  origin: "*"
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

const controller = require('./controller.js');

// Especificamos la base hacia donde nos conectaremos
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://levi:levi1234@ds343895.mlab.com:43895/levi-tamiozzo', { useNewUrlParser: true },
  (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log("Mongo connection done");

      //Empezamos a escuchar el puerto
      app.listen(port, () => {
        console.log("Server listening on port " + port)
      })
    }
  });

app.post('/register', controller.saveUser);
app.post('/login', controller.loginUser);
app.get('/get_todos/:userId', controller.findTodosByUser);
app.post('/post_todos', controller.postTodo);
app.post('/update_todos/:id', controller.updateTodos);
app.post('/send-email', controller.sendMail);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});