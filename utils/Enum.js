const DATERULE = [
    {
        key: 'day',
        value: '今天',
        num: Number(0),
    },
    {
        key: 'day',
        value: '昨天',
        num: 1,
    },
    {
        key: 'day',
        value: '前天',
        num: 2,
    },
    {
        key: 'second',
        value: '秒',
    },
    {
        key: 'minute',
        value: '分',
    },
    {
        key: 'hour',
        value: '时',
    },
    {
        key: 'day',
        value: '天前',
    },
    {
        key: 'month',
        value: '月',
    },
    {
        key: 'year',
        value: '年',
    }
]

const DATE_SPECIFICATION = ["MM月DD日", "YYYY-MM-DD"];

module.exports = {
    DATE_SPECIFICATION,
    DATERULE
}

