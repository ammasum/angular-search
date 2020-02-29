import express from 'express';
import db from './helper/dbConnection'
require('dotenv').config();

const port = process.env.PORT || 4500;
const app = express();

app.get('/user', (req, res) => {
    let { connection } = new db();
    connection.connect();
    connection.query('SELECT * FROM users', (err: any, data: Array<any>, fields: any) => {
        res.send(data);
    });
});

app.get('/user/search', (req, res) => {
    let { connection } = new db();
    connection.connect();
    connection.query(`SELECT * FROM users WHERE name LIKE '%${req.query.name}%'`, (err: any, data: Array<any>, fields: any) => {
        res.send(data);
    });
});


app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});