const config = {
    owner      : 'agreatao',
    repo       : 'agreatao.github.io',
    title      : '骜 - 做一个了不起的人',
    titleLoad  : '骜 - 正在加载...',
    token      : '0ff406fe0880ab03dba53cc0dbc426e366e9387b'
}

module.exports = {
    ...config,
    request: `https://api.github.com/repos/${config.owner}/${config.repo}`
    // request: 'http://localhost:8800'
};