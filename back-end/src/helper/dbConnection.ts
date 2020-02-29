import mysql from 'mysql';


export default class {
    connection: any;
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.db_host,
            user: process.env.db_username,
            database: process.env.db_name
        });
    }
}