import Cat from "../models/CatModel.js";
import path from 'path';
import fs from 'fs';

export const getCat = async (req, res) => {
    try {
        const response = await Cat.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getCatById = async (req, res) => {
    try {
        const response = await Cat.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveCat = async (req, res) => {
    if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
    const rambut = req.body.rambut;
    const nama = req.body.nama;
    const kilasan = req.body.kilasan;
    const tentang = req.body.tentang;
    const negara = req.body.negara;
    const ukuran = req.body.ukuran;
    const lifetime = req.body.lifetime;
    const sifat = req.body.sifat;
    const fakta1 = req.body.fakta1;
    const fakta2 = req.body.fakta2;
    const fakta3 = req.body.fakta3;

    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLocaleLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5MB" });

    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await Cat.create({
                rambut: rambut,
                nama: nama,
                kilasan: kilasan,
                tentang: tentang,
                negara: negara,
                ukuran: ukuran,
                lifetime: lifetime,
                sifat: sifat,
                fakta1: fakta1,
                fakta2: fakta2,
                fakta3: fakta3,
                image: fileName,
                url: url
            });
            res.status(201).json({ msg: "Cat Created Succesfully" });
        } catch (error) {
            console.log(error.message);
        }
    });
}

export const updateCat = async (req, res) => {
    const cat = await Cat.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!cat) return res.status(404).json({ msg: "No Data Found" });

    let fileName = "";
    if (req.files === null) {
        fileName = cat.image;
        
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png', '.jpg', '.jpeg'];

        if (!allowedType.includes(ext.toLocaleLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
        if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5MB" });

        const filepath = `./public/images/${cat.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        });
    }
    const rambut = req.body.rambut;
    const nama = req.body.nama;
    const kilasan = req.body.kilasan;
    const tentang = req.body.tentang;
    const negara = req.body.negara;
    const ukuran = req.body.ukuran;
    const lifetime = req.body.lifetime;
    const sifat = req.body.sifat;
    const fakta1 = req.body.fakta1;
    const fakta2 = req.body.fakta2;
    const fakta3 = req.body.fakta3;

    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    try {
        await Cat.update({
            rambut: rambut, 
            nama: nama, 
            kilasan: kilasan, 
            tentang: tentang,
            negara: negara,
            ukuran: ukuran, 
            lifetime: lifetime, 
            sifat: sifat, 
            fakta1: fakta1,   
            fakta2: fakta2, 
            fakta3: fakta3, 
            image: fileName, 
            url: url},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg:"Cat Updated Succesfully"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteCat = async (req, res) => {
    const cat = await Cat.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!cat) return res.status(404).json({ msg: "No Data Found" });

    try {
        const filepath = `./public/images/${cat.image}`;
        fs.unlinkSync(filepath);
        await Cat.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Cat Deleted Succesfully" });
    } catch (error) {
        console.log(error.message);
    }
}