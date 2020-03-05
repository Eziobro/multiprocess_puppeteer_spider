const fs = require('fs');
const axios = require('axios');
const path = require('path')

/**
 * 下载网络图片
 * @returns {Promise<void>}
 * @param URL       资源地址
 * @param Name      资源名称，下载的资源存放在本地的名称(具有标志性)
 * @param dirName
 */
async function downloadFromWeb(URL, Name, dirName) {
    const data = await axios.get(URL, {
        responseType: 'stream',
        headers: {
            Accept: 'image/png',
        },
    })
    if (!await fs.existsSync(path.join(dirName, 'img'))) {
        await fs.mkdirSync(path.join(dirName, 'img'));
    } else
        await data.data.pipe(fs.createWriteStream(`${path.join(dirName, 'img', `${Name}.png`)}`, data.data));
}

/**
 *
 * @param URL 资源位于服务器的地址
 * @returns {Promise<void>}
 */
function downloadFromServer(URL) {
    axios.post(URL, {
        responseType: 'stream',
        headers: {
            Accept: 'image/png',
        },
    }).then(res => ({data: res.data}));
}

function uploadImgToServer(URL, data, dirname, database, document) {
    data.forEach(value => {
        axios({
            method: 'post',
            url: URL,
            data: {
                data: value.data,
                filename: value.name,
                dirname,
                database,
                document
            },
            responseType: 'json'
        })
    })
}

module.exports = {
    downloadFromWeb,
    downloadFromServer,
    uploadImgToServer,
};
