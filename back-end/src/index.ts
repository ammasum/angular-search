import express from 'express';
const dotenv = require('dotenv');

const port = process.env.PORT || 4500;
const app = express();

app.use(dotenv);

app.get('/user', (req, res) => {
    res.send("Users");
});

app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});