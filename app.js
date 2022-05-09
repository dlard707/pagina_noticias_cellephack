//importando o express
const express = require('express');

//Criando um objeto express na variável app
const app = express();

//Pegar noticias do Mockup
const noticias = require('./mockup')

//incorpoar o ejs para renderizar as páginas
app.set('view engine', 'ejs');
//Adicionar suporte para arquivos estaticos
app.use(express.static('./app/public'));
//dinindo o caminho para a pasta views
app.set('views', './app/views');


//Criando uma rota para a página inicial
app.get('/', (req, res) => {
    // res.send('Hello World!');
    res.render('home/index', { noticias: noticias.slice(0,3) });
});

//Criando uma rota para a página noticias
app.get('/noticias', (req, res) => {
    res.render('noticias/noticias', { noticias: noticias });
})

//Criando uma rota para a página noticia
app.get('/noticia', (req, res) => {
//recuperando o id da noticia por get
    var id = req.query.id;

    res.render('noticia/noticia', { noticias: noticias[id] });
})

app.listen(3000, () => {
    console.log('Server iniciado na porta 3000');
    console.log("Pressione CTRL + C para interrompir o servidor");
})


