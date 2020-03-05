const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const MongoDB = require('../../utils/database/connectMongoDB');
const {downloadFromWeb, uploadImgToServer} = require('../../utils/imgOperation');
const {fileDisplay} = require('../../utils/utils');


async function spider(page, params) {
    if (await page.$('.more')) {
        await page.waitForSelector('.more');
        await page.click('.more');
    }
    // 模拟在控制台中的操作
    const result = await page.evaluate(() => {
        const items = document.querySelectorAll('#nowplaying > div.mod-bd > ul >li');
        const links = [];
        if (items.length >= 1) {
            items.forEach((item) => {
                const data = Array.from(item.attributes);
                const link = {};
                data.forEach((v) => {
                    link[v.nodeName] = v.value;
                });
                const a = item.querySelector('.poster > a');
                const img = a.querySelector('img');
                link.href = a.getAttribute('href');
                link.src = img.getAttribute('src');
                links.push({
                    ...link,
                });
            });
        }
        return links;
    });


    // const db = await MongoDB(database, document);
    // await db.add(result);

}

module.exports = spider;
