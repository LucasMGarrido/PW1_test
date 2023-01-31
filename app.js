const express = require('express'); // chama o express
const routes = require('./routes'); // importa o routes
const bodyParser = require('body-parser'); // chama o body parser pra ler o corpo do HTML ou json
let cookieParser = require('cookie-parser');
require("dotenv").config();

const app = express();

app.use(bodyParser.json()); // lê json
app.use(bodyParser.urlencoded({extended: true })); // lê corpo do HTML
app.use(cookieParser());
app.use(routes);
app.set('view engine', 'ejs'); // configura a engine

module.exports = app;