const config = {
    owner      : 'agreatao',
    repo       : 'agreatao.github.io',
    title      : '骜 - 做一个了不起的人',
    titleLoad  : '骜 - 正在加载...',
    token      : '11753d053d72991d5058fa69abebd58ae0fc9444'
}

module.exports = {
    ...config,
    request: `https://api.github.com/repos/${config.owner}/${config.repo}`
    // request: 'http://localhost:8800'
};