const{Pool} = require('pg');

const client = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgres://pqwzagkmojoikm:b2430b4747da3cd3dce0905156388b3f9e45f9feba0a45caaad79252b8ef6f5d@ec2-52-4-104-184.compute-1.amazonaws.com:5432/d559iqiacht5ar',
    ssl: {
        rejectUnauthorized: false
    }
})

//Teste de conexão
// async function connectTeste() {

//     const res = await client.query('SELECT $1::text as message', ['Hello world!'],(err, result) => {
//     console.log(result.rows[0].message)})
// }
// connectTeste();

module.exports = client