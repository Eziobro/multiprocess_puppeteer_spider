const fs = require('fs');
const path = require('path');

const MysqlDB = require('../../utils/database/connectMysql');
const {createDirs, changeUrlToPath, dateFormat} = require('../../utils/utils');
const websiteURL = 'https://segmentfault.com';

async function spider(page, params) {
    const {username, realname, sitename, database, document, url} = params;
    let articles = [];
    const urlPath = await changeUrlToPath(url);
    const {dir} = path.parse(urlPath);
    let workPath;
    if (path.extname(urlPath).indexOf('.') !== -1) {
        workPath = dir;
    } else {
        workPath = urlPath;
    }
    await createDirs(path.join(__dirname, workPath));
    do {
        const article = await page.$$eval('.wrap > .container > .row > .col-md-10 > .profile-mine__content > li', (items) =>
            items.map(li => {
                const item = {};
                item['title'] = li.getElementsByTagName('a')[0].innerText;
                item['href'] = li.getElementsByTagName('a')[0].getAttribute('href');
                item['date'] = li.getElementsByClassName('profile-mine__content--date')[0].innerText;
                return item;
            })
        );
        article.map(item => {
            item.date = dateFormat(item.date) || '';
            item.sitename = sitename || '';
            item.realname = realname || '';
            item.username = username;
        });
        articles.push(...article);
        if (!await page.$('.user-index div.profile div.wrap.mt30 div.container div.row div.col-md-10.profile-mine div.text-center ul.pagination li.next a')) {
            break;
        }
        const _next = await page.$eval('.next > a', a => a.getAttribute('href'));
        // 跳转页面就是换了一个page对象
        await page.goto(websiteURL + _next);
    } while (true);
    for (const article of articles) {
        article.href = websiteURL + article.href;
        // {waitUntil: 'domcontentloaded'} ，必须加上！！
        // 等到dom加载完才算跳转成功，不然可能出现卡死的情况
        await page.goto(article.href, {waitUntil: 'domcontentloaded'});
        article['summary'] = (await page.$eval('.article', A => A.innerText)).substr(0, 300);
    }
    await fs.writeFileSync(`${path.join(__dirname, workPath)}\\data.json`, JSON.stringify(articles));

    const DB = await MysqlDB(database, document);
    for (const article of articles) {
        await DB.add(article)
    }
    await DB.close();
}

module.exports = spider;
