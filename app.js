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
app.get('/noticias', async(req, res) => {

    var result = await db.query('SELECT * FROM noticias ORDER BY id_noticia DESC');
    res.render('noticias/noticias', { noticias: result.rows, title: 'Noticias' });
})

//Criando uma rota para a página noticia
app.get('/noticia', async(req, res) => {
//recuperando o id da noticia por get
    var id = req.query.id;

    let result = await db.query('SELECT * FROM noticias WHERE id_noticia = $1', [id]);

    res.render('noticias/noticia', { noticias: result.rows[0], title: 'Noticia' });
})

//Rota responsável pela autenticação
app.post('/admin/autenticar', (req, res) => {

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

//Rota responsável por salvar as noticias
app.post('/admin/salvar-noticia', async(req, res) => {
    //recupera infromações passadas por post
    const { titulo, conteudo} = req.body;

    //Criando um objeto com as informações
    await db.query('INSERT INTO noticias (titulo, conteudo) VALUES ($1, $2)', [titulo, conteudo], (err, result) => {res.redirect('/noticias')});
})

//Rota responsável pela saida do usuário
app.get('/admin/sair', (req, res) => {
    req.session.destroy((err) => {});
    res.redirect('/admin');
})

app.listen(port, () => {
    console.log('Server iniciado na porta 3000');
    console.log("Pressione CTRL + C para interrompir o servidor");
})


