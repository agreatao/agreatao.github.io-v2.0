const config = {
    owner      : 'agreatao',
    repo       : 'agreatao.github.io',
    title      : '骜 - 做一个了不起的人',
    titleLoad  : '骜 - 正在加载...',
    token      : '313ec5d8fbc25c236782167c99f51033e5891540'
}

module.exports = {
    ...config,
    request: `https://api.github.com/repos/${config.owner}/${config.repo}`
    // request: 'http://localhost:8800'
};