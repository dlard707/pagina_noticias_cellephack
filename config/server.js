//importando o express
const express = require('express');
const session = require('express-session');

//Criando um objeto express na variável app
const app = express();



//incorpoar o ejs para renderizar as páginas
app.set('view engine', 'ejs');
//Adicionar suporte para arquivos estaticos
app.use(express.static('./app/public'));
//dinindo o caminho para a pasta views
app.set('views', './app/views');

//Configuração express-session
app.use(session({
    secret: '7jPLP=C:(Rj{.ft}',
    resave: false,
    saveUninitialized: false
}));

//Configuração do body-parser e json-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = app;