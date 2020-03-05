module.exports = [
    {
        name: 'douban',
        root: './rules/douban',
        // time: '30 * * * * *',
        children: [
            {
                rule: 'buyTickets.js',
                paths: [
                    {
                        database: 'douban',
                        document: 'beijing',
                        url: 'https://movie.douban.com/cinema/nowplaying/beijing/',
                    },
                    {
                        database: 'douban',
                        document: 'mianyang',
                        url: 'https://movie.douban.com/cinema/nowplaying/mianyang/',
                    },
                    {
                        database: 'douban',
                        document: 'shanghai',
                        url: 'https://movie.douban.com/cinema/nowplaying/shanghai/',
                    },
                ]
            },
            {
                rule: 'buyTickets.js',
                paths: [
                    {
                        database: 'douban',
                        document: 'beijing',
                        url: 'https://movie.douban.com/cinema/nowplaying/beijing/',
                    },
                    {
                        database: 'douban',
                        document: 'mianyang',
                        url: 'https://movie.douban.com/cinema/nowplaying/mianyang/',
                    },
                    {
                        database: 'douban',
                        document: 'shanghai',
                        url: 'https://movie.douban.com/cinema/nowplaying/shanghai/',
                    },
                ]
            },
            {
                rule: 'buyTickets.js',
                paths: [
                    {
                        database: 'douban',
                        document: 'beijing',
                        url: 'https://movie.douban.com/cinema/nowplaying/beijing/',
                    },
                    {
                        database: 'douban',
                        document: 'mianyang',
                        url: 'https://movie.douban.com/cinema/nowplaying/mianyang/',
                    },
                    {
                        database: 'douban',
                        document: 'shanghai',
                        url: 'https://movie.douban.com/cinema/nowplaying/shanghai/',
                    },
                ]
            },
            {
                rule: 'buyTickets.js',
                paths: [
                    {
                        database: 'douban',
                        document: 'beijing',
                        url: 'https://movie.douban.com/cinema/nowplaying/beijing/',
                    },
                    {
                        database: 'douban',
                        document: 'mianyang',
                        url: 'https://movie.douban.com/cinema/nowplaying/mianyang/',
                    },
                    {
                        database: 'douban',
                        document: 'shanghai',
                        url: 'https://movie.douban.com/cinema/nowplaying/shanghai/',
                    },
                ]
            },
            {
                rule: 'buyTickets.js',
                paths: [
                    {
                        database: 'douban',
                        document: 'beijing',
                        url: 'https://movie.douban.com/cinema/nowplaying/beijing/',
                    },
                    {
                        database: 'douban',
                        document: 'mianyang',
                        url: 'https://movie.douban.com/cinema/nowplaying/mianyang/',
                    },
                    {
                        database: 'douban',
                        document: 'shanghai',
                        url: 'https://movie.douban.com/cinema/nowplaying/shanghai/',
                    },
                ]
            },
            {
                rule: 'buyTickets.js',
                paths: [
                    {
                        database: 'douban',
                        document: 'beijing',
                        url: 'https://movie.douban.com/cinema/nowplaying/beijing/',
                    },
                    {
                        database: 'douban',
                        document: 'mianyang',
                        url: 'https://movie.douban.com/cinema/nowplaying/mianyang/',
                    },
                    {
                        database: 'douban',
                        document: 'shanghai',
                        url: 'https://movie.douban.com/cinema/nowplaying/shanghai/',
                    },
                ]
            },
            {
                rule: 'buyTickets.js',
                paths: [
                    {
                        database: 'douban',
                        document: 'beijing',
                        url: 'https://movie.douban.com/cinema/nowplaying/beijing/',
                    },
                    {
                        database: 'douban',
                        document: 'mianyang',
                        url: 'https://movie.douban.com/cinema/nowplaying/mianyang/',
                    },
                    {
                        database: 'douban',
                        document: 'shanghai',
                        url: 'https://movie.douban.com/cinema/nowplaying/shanghai/',
                    },
                ]
            },
        ],
    },

    {
        name: 'shicimingjv',
        root: './rules/shicimingjv',
        time:'20 * * * * *',
        children: [
            {
                rule: 'sanguoyanyi.js',
                hasPostfix: true,
                paths: [
                    {
                        database: 'shicimingjv',
                        document: 'sanguoyanyi',
                        url: 'http://www.shicimingju.com/book/sanguoyanyi/1.html',
                    },
                    {
                        database: 'shicimingjv',
                        document: 'sanguoyanyi',
                        url: 'http://www.shicimingju.com/book/sanguoyanyi/2.html',
                    },
                ]
            },
            {
                rule: 'sanguoyanyi1.js',
                hasPostfix: true,
                paths: [
                    {
                        database: 'shicimingjv',
                        document: 'sanguoyanyi',
                        url: 'http://www.shicimingju.com/book/sanguoyanyi/3.html',
                    },
                    {
                        database: 'shicimingjv',
                        document: 'sanguoyanyi',
                        url: 'http://www.shicimingju.com/book/sanguoyanyi/4.html',
                    },
                ]
            },
        ],
    },

    {
        name: 'blog',
        root: './rules/blog',
        time:'10 * * * * *',
        children: [
            {
                rule: 'segmentfault_article.js',
                hasPostfix: false,
                paths: [
                    {
                        database: 'spider',
                        document: 'BLOG',
                        url: 'https://segmentfault.com/u/ipromise/articles',
                        username: 'ipromise',
                        realname: '简佳成',
                        sitename: 'segmentfault',
                    },
                ]
            },
            {
                rule: 'segmentfault_article.js',
                hasPostfix: false,
                paths: [
                    {
                        database: 'spider',
                        document: 'BLOG',
                        url: 'https://segmentfault.com/u/laoxie_59b8a26ad8c18/articles',
                        username: 'laoxie_59b8a26ad8c18',
                        realname: '老谢',
                        sitename: 'segmentfault',
                    },
                ]
            },
            {
                rule: 'segmentfault_article.js',
                hasPostfix: false,
                paths: [
                    {
                        database: 'spider',
                        document: 'BLOG',
                        url: 'https://segmentfault.com/u/eizobro/articles',
                        username: 'eizobro',
                        realname: '戴宇尘',
                        sitename: 'segmentfault',
                    },
                ]
            }
        ],
    },
];
