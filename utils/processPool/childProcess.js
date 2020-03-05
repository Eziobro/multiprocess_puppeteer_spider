const {
    TimeoutError
} = require('puppeteer/Errors');
const puppeteer = require('puppeteer');
const defaultConfig = require('../config');
const path = require('path');
let browser;
process.on('message', async (msg) => {
    let status = 0;
    const {
        task,
    } = msg;
    switch (task) {
        case 'ready':
            browser = await puppeteer.launch(defaultConfig.config);
            await process.send({
                status,
                ...msg,
            })
            break;
        case undefined:
            await browser.close();
            await process.exit();
            break;
        default:
            const {
                url,
                rule,
            } = task;
            try {
                const spider = require(path.join(__dirname, '../../rules', rule));
                const page = await browser.newPage();
                await page.goto(url)
                await spider(page, task);
                await page.close();
            } catch (e) {
                if (e instanceof TimeoutError) {
                    status = 2
                } else if (e instanceof TypeError) {
                    status = 2
                } else if (e instanceof ReferenceError) {
                    status = 2
                } else {
                    status = 1
                    if (task.time > 5) {
                        status = 2;
                    }
                }
            } finally {
                await process.send({
                    status,
                    ...msg,
                })
            }
            break;
    }
})
