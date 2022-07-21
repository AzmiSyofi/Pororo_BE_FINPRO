import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Article = db.define('articles', {
    judul: DataTypes.STRING,
    konten: DataTypes.STRING,
    penulis: DataTypes.STRING,
    
    image: DataTypes.STRING,
    url: DataTypes.STRING
}, {
    freezeTableName: true
});

export default Article;

(async()=>{
    await db.sync();
})();