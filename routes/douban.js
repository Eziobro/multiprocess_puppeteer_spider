const express = require('express');
const router = express.Router();
const mongoDB = require('../utils/database/connectMongoDB');
const fs = require('fs');
const path = require('path');

const {createDirs} = require('../utils/utils');


router.get('/list', async function (req, res, next) {
    const {params = {}, database, document} = req.query;
    if (!document || !database) {
        res.send('参数不正确');
        return;
    }
    const DB = await mongoDB(database, document);
    const data = await DB.find(params);
    res.send(data);
});

router.post('/add', async function (req, res, next) {
    const {params = {}, database, document} = req.body;
    if (!document || !database) {
        res.send('参数不正确');
        return;
    }
    const DB = await mongoDB(database, document);
    const data1 = await DB.add(params);
    res.send(data1);
});

router.post('/update', async function (req, res, next) {
    const {params = {}, database, document} = req.body;
    if (!document || !database) {
        res.send('参数不正确');
        return;
    }
    const DB = await mongoDB(database, document);
    const data1 = await DB.update(params, data);
    res.send(data1);
});

router.post('/delete', async function (req, res, next) {
    const {params, database, document} = req.body;
    if (!document || !database || !params) {
        res.send('参数不正确');
        return;
    }
    const DB = await mongoDB(database, document);
    const data1 = await DB.deleteOne(params);
    res.send(data1);
});

router.post('/uploadImg', async function (req, res, next) {
    const {data, dirname, filename, document, database} = req.body;
    if (!data || !dirname || !filename || !document || !database) {
        res.send('参数不全');
        return;
    }
    // await data.forEach(value => {
    //     const base64Data = value.data.replace(/^data:image\/\w+;base64,/, "");
    //     const dataBuffer = Buffer.from(base64Data, 'base64');
    //     fs.writeFileSync(`${dirname}\\${value.name}`, dataBuffer)
    // });
    const base64Data = data.replace(/^data:image\/\w+;base64,/, "");
    const dataBuffer = Buffer.from(base64Data, 'base64');
    let imgPath = path.join(process.cwd(), './public/images', dirname);
    await createDirs(imgPath);
    if (imgPath[imgPath.length] !== '/') {
        imgPath += '/'
    }
    await fs.writeFileSync(`${imgPath}${filename}.png`, dataBuffer);
    const DB = await mongoDB(database, document);
    await DB.update({id: filename}, {imgUrl: path.join('./public/images', dirname, imgPath, `${filename}.png`)});
    res.send('success')
});

router.post('/downloadImg', function (req, res, next) {
    const {name, filename} = req.body;
    if (!name || !filename) {
        res.send('参数不正确');
        return;
    }
    const data = fs.readFileSync(`./public/images/${filename}/${name}.png`, 'base64');
    res.send({data: data});
});


module.exports = router;
