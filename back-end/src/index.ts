import express from 'express';
import db from './helper/dbConnection'
require('dotenv').config();

const port = process.env.PORT || 4500;
const app = express();

app.use('/user', (req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Request-Headers", "*");
    res.set("Access-Control-Allow-Headers", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    next();
});

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
    let limit = 10;
    let page = +req.query.page;
    let selectQ = 'SELECT * FROM users';
    let conditionQ = `WHERE first_name LIKE '%${req.query.name}%'`;
    let areaQ = `LIMIT 10 OFFSET ${limit * page}`;
    connection.query(`${selectQ} ${conditionQ} ${areaQ}`, (err: any, data: Array<any>, fields: any) => {
        if(err) console.log(err);
        res.send(data);
    });
});


app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});