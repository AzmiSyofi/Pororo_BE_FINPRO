import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Adopt = db.define('adopts', {
    nama: DataTypes.STRING,
    keterangan: DataTypes.STRING,
    harga: DataTypes.STRING,
    status: DataTypes.STRING,
    
    image: DataTypes.STRING,
    url: DataTypes.STRING
}, {
    freezeTableName: true
});

export default Adopt;

(async()=>{
    await db.sync();
})();