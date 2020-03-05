const {MongoClient} = require('mongodb');

const {mongoDBURL} = require('./databaseConfig');

/**
 *
 * @param database 数据库
 * @param document 数据表
 * @returns {Promise<void>}
 */
async function connectMongoDB(database, document) {

    const Mongo = {};

    Mongo.dbName = database;
    Mongo.dcName = document;

    /**
     * 创建mongoDB对象
     * @returns {Promise<*>}
     */
    async function createMongoDBObj() {
        const {dbName, dcName} = Mongo;
        const client = new MongoClient(mongoDBURL, {useNewUrlParser: true});
        await client.connect();
        // 返回数据库数据表对象，若没有指定数据表，则创建
        return await client.db(dbName).collection(dcName);
    }

    /**
     * @param params 新增数据
     * @returns {Promise<*>}
     */
    async function add(params = []) {
        const dbo = await createMongoDBObj();
        const data = await dbo.insertMany(params);
        return data;
    }

    /**
     * @param params 查询条件
     * @returns {Promise<*>}
     */
    async function find(params = {}) {
        const dbo = await createMongoDBObj();
        return await dbo.find(params).toArray();
    }

    /**
     * @param params 修改插入条件
     * @param newData 新数据
     * @returns {Promise<*>}
     */
    async function update(params = {}, newData) {
        const dbo = await createMongoDBObj();
        return await dbo.updateOne(params, {$set: newData});
    }

    /**
     *
     * @param params 删除条件
     * @returns {Promise<*>}
     */
    async function deleteMany(params = []) {
        const dbo = await createMongoDBObj();
        await params.forEach(param => {
            dbo.deleteOne(param);
        });
    }

    Mongo.add = add;            // 增(增加一条数据)
    Mongo.find = find;          // 查
    Mongo.update = update;      // 改(修改字段数据，或新增一个字段)
    Mongo.delete = deleteMany;   // 删

    return Mongo;
}

module.exports = connectMongoDB;
