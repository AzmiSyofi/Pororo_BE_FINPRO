import Adopt from "../models/AdoptModel.js";
import path from 'path';
import fs from 'fs';

export const getAdopt = async (req, res) => {
    try {
        const response = await Adopt.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getAdoptById = async (req, res) => {
    try {
        const response = await Adopt.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveAdopt = async (req, res) => {
    if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
    const nama = req.body.nama;
    const keterangan = req.body.keterangan;
    const harga = req.body.harga;
    const status = req.body.status;

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
            await Adopt.create({
                nama: nama,
                keterangan: keterangan,
                harga: harga,
                status: status,
                
                image: fileName,
                url: url
            });
            res.status(201).json({ msg: "Adopt Created Succesfully" });
        } catch (error) {
            console.log(error.message);
        }
    });
}

export const updateAdopt = async (req, res) => {
    const adopt = await Adopt.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!adopt) return res.status(404).json({ msg: "No Data Found" });

    let fileName = "";
    if (req.files === null) {
        fileName = adopt.image;
        
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png', '.jpg', '.jpeg'];

        if (!allowedType.includes(ext.toLocaleLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
        if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5MB" });

        const filepath = `./public/images/${adopt.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        });
    }
    const nama = req.body.nama;
    const keterangan = req.body.keterangan;
    const harga = req.body.harga;
    const status = req.body.status;

    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    try {
        await Adopt.update({
            nama: nama, 
            keterangan: keterangan, 
            harga: harga,
            status: status, 
            
            image: fileName, 
            url: url},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg:"Adopt Updated Succesfully"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteAdopt = async (req, res) => {
    const adopt = await Adopt.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!adopt) return res.status(404).json({ msg: "No Data Found" });

    try {
        const filepath = `./public/images/${adopt.image}`;
        fs.unlinkSync(filepath);
        await Adopt.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Adopt Deleted Succesfully" });
    } catch (error) {
        console.log(error.message);
    }
}