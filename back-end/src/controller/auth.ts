import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import qResponse from '../helper/quickResponse';
import dbConnection from '../helper/dbConnection';

const router = express.Router();

router.get('/hash/:text', (req, res) => {
    bcrypt.hash(req.params.text, 16)
        .then((hash) => {
            res.send(hash);
        });
});

router.post('/login', (req, res) => {
    const { connection } = new dbConnection();
    connection.connect();
    console.log(req.body);
    connection.query(`SELECT * FROM users WHERE email='${req.body.email}'`, (err: any, data: any, fields: any) => {
        if(err) console.log(err);
        if(data.length === 0) {
            qResponse.loginFaild(res, true);
            return;
        }
        const user = <any>data[0];
        bcrypt.compare(req.body.password, user.password)
            .then((result: any) => {
                if(!result) {
                    qResponse.loginFaild(res, true);
                    return;
                }
                const token = jwt.sign({ id: user.id, email: user.email }, <string>process.env.jwt_secret);
                res.send({ status: true, token});
            });
    });
});

router.get('/logout', (req, res) => {
    res.send('hello logout');
});

export default router;
