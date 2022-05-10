<<<<<<< HEAD
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const routes = require("./routes");

// middleware para aceitar dados no formato JSON 
app.use(express.json());

app.use(routes);

app.get('/', (req, res) => {
    res.send('Programação Web. Revenda de Veículos');
})

app.listen(port, () => {
    console.log(`Servidor em execução na porta: ${port}`);
=======
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const routes = require("./routes");

// middleware para aceitar dados no formato JSON 
app.use(express.json());

app.use(routes);

app.get('/', (req, res) => {
    res.send('Programação Web. Revenda de Veículos');
})

app.listen(port, () => {
    console.log(`Servidor em execução na porta: ${port}`);
>>>>>>> d5065469abd1908003c02358998abc0d8343b99f
})