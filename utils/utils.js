const fs = require('fs');
const path = require('path');
const moment = require('moment');
const {DATERULE, DATE_SPECIFICATION} = require('../utils/Enum')

function changeUrlToPath(url) {
    const reg = /(https?:\/\/[^\/]+)([^\?]+)(.+)/gi;
    return url.replace(reg, (a, b, c, d) => '.' + c);
}

/**
 * 创建多级目录
 * @param dirs
 * @returns {Promise<boolean>}
 */
async function createDirs(dirs) {
    function mkdirs(dirname) {
        if (fs.existsSync(dirname)) {
            return true;
        }
        if (mkdirs(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
        return true;
    }

    await mkdirs(dirs);
};

async function fileDisplay(dirName) {
    const imgs = [];
    const imgsPath = path.join(process.cwd(), dirName, 'img');
    const files = await fs.readdirSync(imgsPath);
    await files.forEach(value => {
        const img = fs.readFileSync(`${path.join(process.cwd(), dirName, 'img')}\\${value}`, 'base64');
        imgs.push({
            name: value.replace(/\.\w+/gi, ""),
            data: img,
        });
    });
    return imgs;
}

function debounce(func, wait, immediate) {

    var timeout, result;

    var debounced = function () {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            var callNow = !timeout;
            timeout = setTimeout(function () {
                timeout = null;
            }, wait)
            if (callNow) result = func.apply(context, args)
        } else {
            timeout = setTimeout(function () {
                func.apply(context, args)
            }, wait);
        }
        return result;
    };

    debounced.cancel = function () {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
}

function _type(obj) {
    var class2type = {};
    "Boolean Number String Function Array Date RegExp Object Error".split(" ").map(function (item, index) {
        class2type["[object " + item + "]"] = item.toLowerCase();
    });
    if (obj == null) {
        return obj + "";
    }
    return typeof obj === "object" || typeof obj === "function" ?
        class2type[Object.prototype.toString.call(obj)] || "object" :
        typeof obj;
}

function dateFormat(date) {
    const isFormatDate = moment(date, DATE_SPECIFICATION,true).isValid();
    if (isFormatDate) {
        return moment(date, DATE_SPECIFICATION).format("YYYY-MM-DD")
    }
    return getDateFormat(date)
}

function getDateFormat(date) {
    const reg = /\d+/gi
    const _dataRule = DATERULE.filter(item => {
        if (date.indexOf(item.value) !== -1) {
            item.num = parseInt(date.match(reg)[0]);
            return true;
        }
    });
    if (_dataRule.length === 0) {
        console.log('日期规则不存在，在utils/Enum.js DATERULE中添加');
        return moment().format('YYYY-MM-DD')
    }
    const dataRule = _dataRule[0];
    return moment(moment().format("YYYY-MM-DD HH:mm:ss")).subtract(dataRule.hasOwnProperty('num') ? dataRule.num : 0, dataRule.key).format("YYYY-MM-DD")
}

module.exports = {
    createDirs,
    changeUrlToPath,
    fileDisplay,
    debounce,
    _type,
    dateFormat
};
