//Importamos modelo de usuario y bcrypt para encriptar contraseñas
var User = require("./models/user");
var Todo = require("./models/todo");
var nodemailer = require("nodemailer");

var bcrypt = require("bcrypt");
const saltRounds = 10;

//Importamos servicio de JWT
var jwt = require("jwt-simple");

let saveUser = (req, res) => {
  var user = new User();
  var params = req.body;

  // Tomamos los valores desde los params del body
  user.name = params.name;
  user.surname = params.surname;
  user.email = params.email.toLowerCase();

  //Verificamos que la constraseña se haya enviado en request
  if (params.password) {
    // Si se recibio encriptamos contraseña y guardamos datos
    bcrypt.hash(params.password, saltRounds, (err, hash) => {
      user.password = hash;
      if (user.name != null && user.surname != null && user.email != null) {
        User.findOne({
          email: user.email.toLowerCase()
        }, (err, users) => {
          if (users) {
            res.status(400)
              .send({
                message: "User already Exists"
              })
          } else {
            user.save((err, userStored) => {
              //Guardamos el usuario y verificamos si existe o no un error
              if (err) {
                //Hubo un error
                res
                  .status(500)
                  .send({
                    message: "Hubo un error guardando el user"
                  });
              } else {
                if (!userStored) {
                  //No se pudo guardar
                  res
                    .status(404)
                    .send({
                      message: "Hubo un error guardando el user"
                    });
                } else {
                  res.status(200).send({
                    userStored
                  });
                }
              }
            });
          }
        })
        //
        //Si los otros campos no estan vacios, guardamos el user

      } else {
        res.status(202).send({
          message: "Rellena todos los campos"
        });
      }
    });
  } else {
    res.status(202).send({
      message: "Introduce contraseña"
    });
  }
};

// LOGUEAR USUARIO

let loginUser = (req, res) => {
  //Recibimos los parametros del body con body-parser
  var params = req.body;

  let email = params.email.toLowerCase();
  let password = params.password;

  User.findOne({
    email: email.toLowerCase()
  }, (err, user) => {
    // En primer lugar buscamos si existe un usuario con ese email
    if (err) {
      res.status(500).send({
        message: "Error en request"
      });
    } else {
      if (!user) {
        res.status(400).send({
          message: "El usuario no existe"
        });
      } else {
        //Si existe, comprobamos la contraseña
        bcrypt.compare(password, user.password, (err, check) => {
          if (check) {
            res.status(200).send({
              user
            });
          } else {
            res
              .status(400)
              .send({
                message: "El usuario no ha podido loguearse"
              });
          }
        });
      }
    }
  });
};


let findTodosByUser = (req, res) => {
  Todo.find((err, docs) => {
    let todos = docs.filter(todos => todos.user == req.params.userId);
    if (!err) {
      res.json(todos[0]);
    } else {
      res.send(err);
    }
  })
}

let postTodo = (req, res) => {

  var todo = new Todo({
    user: req.body.user,
    todos: req.body.todos
  });
  todo.save((err, doc) => {
    if (!err) {
      res.json(doc);
    } else {
      res.send(err);
    }
  });
}

let updateTodos = (req, res) => {
  Todo.findById(req.params.id, (err, doc) => {
    if (!err) {
      doc.todos = req.body.todos;
      doc.save();
      res.json(doc);
    } else {
      res.send(err)
    }
  });
}

let sendMail = async (req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: process.env.user,
      clientId: process.env.clientId,
      clientSecret: process.env.clientSecret,
      refreshToken: process.env.refreshToken,
      accessToken: process.env.accessToken
    }
  });

  let mailOptions = {
    from: "Some Employeer",
    to: "levi.tzzo@gmail.com",
    subject: "Cara E Poio!",
    html: `<h1>${req.body.email}</h1>`
  };

  let info = await transporter.sendMail(mailOptions);

  res.send(info);
}

module.exports = {
  saveUser,
  loginUser,
  findTodosByUser,
  updateTodos,
  postTodo,
  sendMail
};