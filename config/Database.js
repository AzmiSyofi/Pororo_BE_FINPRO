import { Sequelize } from "sequelize";

const db = new Sequelize('crud_db','root','9e100164c938$',{
    host: 'localhost',
    dialect: 'mysql'
});

export default db;