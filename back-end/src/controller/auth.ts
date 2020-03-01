import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import dbConnection from '../helper/dbConnection';

const router = express.Router();

router.get('/hash/:text', (req, res) => {
    var hash = crypto.createHash('md5').update(req.params.text).digest('hex');
    res.send(hash);
});

router.get('/login', (req, res) => {
    const { connection } = new dbConnection();
    connection.connect();
    connection.query(`SELECT * FROM users WHERE email='${req.body.email}'`, (err: any, data: any, fields: any) => {
        if(err) console.log(err);
        const user = <any>data[0];
        const verify = crypto.createVerify('md5');
        if(verify.verify(req.body.password, user.password)){
            res.send("Ok");
        }
        res.send("False");
    });
    // res.send("Login");
    // jwt.sign();
});

router.get('/logout', (req, res) => {
    res.send('hello logout');
});

export default router;
