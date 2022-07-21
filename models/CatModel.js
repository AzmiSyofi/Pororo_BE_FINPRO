import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Cat = db.define('cats', {
    rambut: DataTypes.STRING,
    nama: DataTypes.STRING,
    kilasan: DataTypes.STRING,
    tentang: DataTypes.STRING,
    negara: DataTypes.STRING,
    ukuran: DataTypes.STRING,
    lifetime: DataTypes.STRING,
    sifat: DataTypes.STRING,
    fakta1: DataTypes.STRING,
    fakta2: DataTypes.STRING,
    fakta3: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING
}, {
    freezeTableName: true
});

export default Cat;

(async()=>{
    await db.sync();
})();