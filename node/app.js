const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection(config);
        console.log('Conectado ao MySQL!');
        return connection;
    } catch (error) {
        console.error('Erro ao conectar ao MySQL:', error.message);
        throw error;
    }
}

async function insertData() {
    try {
        const connection = await connectToDatabase();
        const sql = `INSERT INTO people (name) values ('Thayson')`;
        await connection.execute(sql);
        console.log('Dados inseridos com sucesso!');
        await connection.end();
    } catch (error) {
        console.error('Erro ao inserir dados:', error.message);
    }
}

async function getAllNames() {
    try {
        const connection = await connectToDatabase();
        const [rows, fields] = await connection.execute('SELECT name FROM people');
        await connection.end();
        return rows.map(row => row.name);
    } catch (error) {
        console.error('Erro ao buscar nomes:', error.message);
        throw error;
    }
}

app.get('/', async (req, res) => {
    await insertData();
    
    const nomes = await getAllNames();

    res.send(`<h1>Full Cycle Rocks!</h1><p>${nomes.join(', ')}</p>`);
});

app.listen(port, () => {
    console.log('Rodando na porta: ' + port);
});