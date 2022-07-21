import { Sequelize } from "sequelize";

const db = new Sequelize('pororo_db','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

export default db;
