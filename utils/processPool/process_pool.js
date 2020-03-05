const {
    fork
} = require('child_process');
const {_type} = require('../utils');
const path = require('path');
const fs = require('fs');

function ProcessPool(tasks = [], maxProcess = 5) {
    if (_type(tasks) !== 'array' || _type(maxProcess) !== 'number') {
        throw '参数错误'
    }
    this.tasks = JSON.parse(JSON.stringify(tasks));
    this.maxProcess = Math.min(maxProcess, 10);
    this.process = [];
    this.currentProcess = Math.min(this.tasks.length, this.maxProcess);
}

ProcessPool.prototype.run = async function () {
    const processes = Math.min(this.tasks.length, this.maxProcess);
    for (let _process = 0; _process < processes; _process++) {
        this.process[_process] = await fork(path.join(__dirname, './childProcess.js'));
        this.log(`${this.process[_process].pid}开启`)
        await this.process[_process].send({
            task: 'ready',
            processid: _process,
        });
        await this.listener(this.process[_process]);
    }
};

ProcessPool.prototype.addTasks = function (task) {
    if (_type(task) === 'Array')
        this.tasks = this.tasks.concat(task)
    if (_type(task) === 'Object')
        this.tasks.push(task)
};

ProcessPool.prototype.addProcess = function (processid, task) {
    this.process[processid].send({
        task: task ? task : this.tasks.shift(),
        processid,
    })
};

ProcessPool.prototype.killProcess = function (processid) {
    this.process[processid].kill()
};

ProcessPool.prototype.listener = function (workProcess) {
    workProcess.on('message', (params) => {
        const {
            status,
            processid,
            task,
        } = params;
        switch (status) {
            case 0:
                this.addProcess(processid);
                break;
            case 1:
                task.time = task.time ? task.time + 1 : 1;
                this.addProcess(processid, task);
                break;
            case 2:
                this.killProcess(processid);
                break;
            default:
                break;
        }
    });

    workProcess.on('close', (code) => {
        if (code !== 0) {
            this.log(`${workProcess.pid} 异常退出`)
        } else {
            this.log(`${workProcess.pid} 正常退出`)
        }
        this.currentProcess--;
    });
};

ProcessPool.prototype.log = function (str) {
    const log = `[${new Date().toLocaleString()}] ${str}\n`
    fs.writeFileSync(path.join(__dirname, './process.log'), log, {flag: 'a'})
};

module.exports = ProcessPool;
