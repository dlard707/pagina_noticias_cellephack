//importando o express
const express = require('express');

//Criando um objeto express na variável app
const app = express();

//Pegar noticias do Mockup
const noticias = require('./mockup')

//incorpoar o ejs para renderizar as páginas
app.set('view engine', 'ejs');
//Adicionar suporte para arquivos estaticos
app.use(express.static('./public/public'));
//dinindo o caminho para a pasta views
app.set('views', './app/views');


//Criando uma rota para a página inicial
app.get('/', (req, res) => {
    // res.send('Hello World!');
    res.render('home/index', { noticias: noticias.slice(0,3) });
});

//Criando uma rota para a página noticias
app.get('/noticias', (req, res) => {
    res.send('Notícias!');
})

app.listen(3000, () => {
    console.log('Server iniciado na porta 3000');
    console.log("Pressione CTRL + C para interrompir o servidor");
})


