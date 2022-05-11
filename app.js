const app = require('./config/server');

//Pegar noticias do Mockup
// const noticias = require('./mockup')

const db = require('./config/dbConnection');

const port = process.env.PORT || 3000;

//Criando uma rota para a página inicial
app.get('/', async(req, res) => {
    // res.send('Hello World!');
    // res.render('home/index', { noticias: noticias.slice(0,3) });
    var result = await db.query('SELECT * FROM noticias ORDER BY id_noticia DESC LIMIT 3');

    //Passando dados para o template
    res.render('home/index', { noticias: result.rows, title: 'Home' });
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

app.listen(port, () => {
    console.log('Server iniciado na porta 3000');
    console.log("Pressione CTRL + C para interrompir o servidor");
})


