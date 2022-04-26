const express = require("express");
const routes = express.Router();

const UsuarioController = require("./controllers/UsuarioController");

routes.get("/usuarios", UsuarioController.index)
      .post("/usuarios", UsuarioController.store)
      .post("/login", UsuarioController.login);

module.exports = routes;