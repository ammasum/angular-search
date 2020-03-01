import express from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import quickRes from './helper/quickResponse';
import db from './helper/dbConnection';
import authController from './controller/auth';
require('dotenv').config();

const port = process.env.PORT || 4500;
const app = express();

app.all('*', (req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Request-Headers", "*");
    res.set("Access-Control-Allow-Headers", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', (req, res, next) => {
    const token = <string>req.get('Authorization');
    if(!token) {
        quickRes.unAuthorized(res, true);
        return;
    }
    jwt.verify(token, <string>process.env.jwt_secret, function(err: any, decoded: Object) {
        if(err) {
            quickRes.unAuthorized(res, true);
            return;
        }
        res.send({status: false, messae: 'Unauthorized'});
        next();

    }); 
});

app.use('/auth', authController);

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