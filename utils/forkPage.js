/**
 * *  *  *  *  *  *
 ┬ ┬ ┬ ┬ ┬ ┬
 │ │ │ │ │  |
 │ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
 │ │ │ │ └───── month (1 - 12)
 │ │ │ └────────── day of month (1 - 31)
 │ │ └─────────────── hour (0 - 23)
 │ └──────────────────── minute (0 - 59)
 └───────────────────────── second (0 - 59, OPTIONAL)

 每分钟的第30秒触发： '30 * * * * *'

 每小时的1分30秒触发 ：'30 1 * * * *'

 每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'

 每月的1日1点1分30秒触发 ：'30 1 1 1 * *'

 2016年的1月1日1点1分30秒触发 ：'30 1 1 1 2016 *'

 每周1的1点1分30秒触发 ：'30 1 1 * * 1'

 */
const schedule = require('node-schedule');
const {fork} = require('child_process');
const fs = require('fs');
const path = require('path');

async function spderRun() {
    process.on('message', (config) => {
        const {root, children, time} = config;
        if (time) {
            schedule.scheduleJob(time, startBasePage)
        } else {
            startBasePage()
        }

        function startBasePage() {
            children.forEach((child) => {
                fork(path.join(__dirname, './basePage.js'), [root]).send(child);
            })
        }
    })
}

spderRun();
