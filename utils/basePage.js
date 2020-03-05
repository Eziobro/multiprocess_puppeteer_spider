const path = require('path');
const {createDirs, changeUrlToPath} = require('./utils');
const fs = require('fs')

async function startPage(root) {
    await process.chdir(root);
    process.on('message', async (child) => {
        const {rule, hasPostfix, paths} = child;
        const spider = require(path.join(process.cwd(), rule));
        for (const Path of paths) {
            const {url, database, document, ...params} = Path;
            const urlPath = await changeUrlToPath(url);
            const {dir, base, name, ext} = path.parse(urlPath);
            const {name: ruleName} = path.parse(rule);
            let _dir = '';
            if (hasPostfix) {
                _dir = path.join(`./${ruleName}`, dir);
            } else {
                _dir = path.join(`./${ruleName}`, urlPath);
            }
            await createDirs(_dir);
            await fs.writeFileSync(path.join(__dirname, 'spider.log'), `[${new Date().toLocaleString()}] 开始爬取 ${Path.url}\n`, {flag: 'a'});
            await spider(Path.url, {
                workPath: _dir,
                Postfix: base,
                PostfixExt: ext,
                PostfixName: name,
            }, database, document, params)
            await fs.writeFileSync(path.join(__dirname, 'spider.log'), `[${new Date().toLocaleString()}] 结束爬取 ${Path.url}\n`, {flag: 'a'});
        }
    })
}

startPage(process.argv[2]);
