const faker = require("faker");
const _ = require("lodash");

faker.locale = "zh_CN";

module.exports = function () {
    return {
        issues: [{
            title: '基于webpack的react项目实践（二）——webpack配置',
            created_at: '2018-11-21T11:22:00Z',
            comments: 0,
            labels: [{name: '学习知识'}],
            updated_at: '2018-11-21T11:22:00Z',
        }, {
            title: '基于webpack的react项目实践（一）——准备工作',
            created_at: '2018-11-21T11:22:00Z',
            comments: 0,
            labels: [{name: '学习知识'}],
            updated_at: '2018-11-21T11:22:00Z'
        }]
    }
};