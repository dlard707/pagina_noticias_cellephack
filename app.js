//importando o express
const express = require('express');
const session = require('express-session');

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

//Configuração express-session
app.use(session({
    secret: '7jPLP=C:(Rj{.ft}',
    resave: false,
    saveUninitialized: false
}));

//Configuração do body-parser e json-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

    res.render('noticias/noticia', { noticias: noticias[id] });
})

//Rota responsável plea autenticação
app.post('/admin', (req, res) => {

    const {usuario, senha} = req.body;

    if (usuario === 'root' && senha === 'cellep1234') {
        req.session.autorizado = true;
    }
    res.redirect('/admin');
})

//Rota responsável pelo recurso /admin
app.get('/admin', (req, res) => {
    if (req.session.autorizado) {
        res.render('admin/form_add_noticia',{title: 'Admin', autorizado:req.session.autorizado});
    }else{
        res.render('admin/login', {title:'Login'})
    }
})

app.listen(3000, () => {
    console.log('Server iniciado na porta 3000');
    console.log("Pressione CTRL + C para interrompir o servidor");
})


