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

const {rules} = require('./bin/rules');
const ProcessPool = require('./utils/processPool/process_pool');

const schedule = require('node-schedule');

function spderRun() {
    const Pool = new ProcessPool(rules, 6);
    Pool.run();
}

spderRun();
// schedule.scheduleJob('30 * * * * *', spderRun);
