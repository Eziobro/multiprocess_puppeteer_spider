const express = require('express');
const router = express.Router();
const mysqlDB = require('../utils/database/connectMysql');


const routerConfig = {
    list: '/list',
    add: '/add',
    update: '/update',
    delete: '/delete',
};

const databaseConfig = {
    database: 'spider',
    table: 'BLOG'
};

router.get(routerConfig.list, async function (req, res, next) {
    const DB = await mysqlDB(databaseConfig.database, databaseConfig.table);
    const {pagination = {}} = {...req.body, ...req.query};
    const data = await DB.find({pagination: {...pagination}, order: 'ORDER BY date DESC'});
    const total = await DB.total({});
    pagination.total = total[0].total;
    await DB.close();
    res.status(200).send({
        code: 0,
        list: {
            pagination,
            data,
            website: "https://segmentfault.com"
        }
    });
});

router.post(routerConfig.add, async function (req, res, next) {
    const {params = {}} = req.body;
    if (!params) {
        res.status(400).send('参数不正确');
        return;
    }
    const DB = await mysqlDB(databaseConfig.database, databaseConfig.table);
    const data1 = await DB.add(params);
    await DB.close();
    res.send(data1);
});

router.post(routerConfig.update, async function (req, res, next) {
    const {params = {}} = req.body;
    if (!params) {
        res.status(400).send('参数不正确');
        return;
    }
    const DB = await mysqlDB(databaseConfig.database, databaseConfig.table);
    const data1 = await DB.update(params, data);
    await DB.close();
    res.send(data1);
});

router.post(routerConfig.delete, async function (req, res, next) {
    const {params} = req.body;
    if (!params) {
        res.status(400).send('参数不正确');
        return;
    }
    const DB = await mysqlDB(databaseConfig.database, databaseConfig.table);
    const data1 = await DB.deleteOne(params);
    await DB.close();
    res.send(data1);
});

module.exports = router;
