const express = require("express");
const routes = express.Router();

const UsuarioController = require("./controllers/UsuarioController");
const MarcaController = require("./controllers/MarcaController");
const CarroController = require("./controllers/CarroController");

const login = require("./middlewares/login");

routes.get("/usuarios", UsuarioController.index)
      .post("/usuarios", login, UsuarioController.store)
      .post("/login", UsuarioController.login)
      .get("/senhas", login, UsuarioController.senhas);

routes.get("/marcas", MarcaController.index)
      .post("/marcas", MarcaController.store);

routes.get("/carros", CarroController.index)
      .post("/carros", CarroController.store);

module.exports = routes;