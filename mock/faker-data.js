const faker = require("faker");
const _ = require("lodash");

faker.locale = "zh_CN";

module.exports = function () {
    return {
        issues: [
            {
                "url": "https://api.github.com/repos/agreatao/agreatao.github.io/issues/4",
                "repository_url": "https://api.github.com/repos/agreatao/agreatao.github.io",
                "labels_url": "https://api.github.com/repos/agreatao/agreatao.github.io/issues/4/labels{/name}",
                "comments_url": "https://api.github.com/repos/agreatao/agreatao.github.io/issues/4/comments",
                "events_url": "https://api.github.com/repos/agreatao/agreatao.github.io/issues/4/events",
                "html_url": "https://github.com/agreatao/agreatao.github.io/issues/4",
                "id": 383356855,
                "node_id": "MDU6SXNzdWUzODMzNTY4NTU=",
                "number": 4,
                "title": "基于webpack的React项目（二）——webpack配置",
                "user": {
                    "login": "agreatao",
                    "id": 27670988,
                    "node_id": "MDQ6VXNlcjI3NjcwOTg4",
                    "avatar_url": "https://avatars1.githubusercontent.com/u/27670988?v=4",
                    "gravatar_id": "",
                    "url": "https://api.github.com/users/agreatao",
                    "html_url": "https://github.com/agreatao",
                    "followers_url": "https://api.github.com/users/agreatao/followers",
                    "following_url": "https://api.github.com/users/agreatao/following{/other_user}",
                    "gists_url": "https://api.github.com/users/agreatao/gists{/gist_id}",
                    "starred_url": "https://api.github.com/users/agreatao/starred{/owner}{/repo}",
                    "subscriptions_url": "https://api.github.com/users/agreatao/subscriptions",
                    "organizations_url": "https://api.github.com/users/agreatao/orgs",
                    "repos_url": "https://api.github.com/users/agreatao/repos",
                    "events_url": "https://api.github.com/users/agreatao/events{/privacy}",
                    "received_events_url": "https://api.github.com/users/agreatao/received_events",
                    "type": "User",
                    "site_admin": false
                },
                "labels": [
                    {
                        "id": 1134892447,
                        "node_id": "MDU6TGFiZWwxMTM0ODkyNDQ3",
                        "url": "https://api.github.com/repos/agreatao/agreatao.github.io/labels/%E5%AD%A6%E4%B9%A0%E6%80%BB%E7%BB%93",
                        "name": "学习总结",
                        "color": "8004d8",
                        "default": false
                    }
                ],
                "state": "open",
                "locked": false,
                "assignee": null,
                "assignees": [

                ],
                "milestone": null,
                "comments": 0,
                "created_at": "2018-11-22T02:21:51Z",
                "updated_at": "2018-11-22T02:26:01Z",
                "closed_at": null,
                "author_association": "OWNER",
                "body": "对于还不知道webpack到底是干什么的同学，可以自行去百度上去查一查，同样还有很多中文的api文档。本文仅仅是作为教大家如何一步一步的创建项目的第一步。\r\n\r\n### 首先新建文件夹 **react-empty-demo** （可自己定义），使用vscode打开文件夹。\r\n\r\n打开终端，打开终端并运行 ```npm init -y``` 生成 **package.json** 文件\r\n\r\n按如下的方式创建项目目录\r\n\r\n```shell\r\n├─ config/                # 项目配置文件夹，如：接口的请求的baseURL\r\n├─ src/                   # 开发目录\r\n    ├─ components/        # 存放组件的文件夹\r\n    ├─ entry/             # 入口文件夹\r\n    ├─ images/            # 存放图片的目录\r\n    ├─ lib/               # 一些依赖包和工具方法\r\n    ├─ masters/           # 母版文件夹\r\n    ├─ pages/             # 页面文件夹\r\n    ├─ router/            # 路由文件夹react-router\r\n    ├─ store/             # redux配置文件夹\r\n    ├─ theme/             # 主题样式或者基本css样式文件夹\r\n    └─ views/             # 存放模板文件夹\r\n├─ app.js             \t  # node server启动文件\r\n├─ package.json           # npm 包管理文件（执行npm init -y 自动生成）\r\n└─ webpack.config.js      # webpack 配置文件\r\n```\r\n![demo1](https://user-images.githubusercontent.com/27670988/48876479-443a0600-ee39-11e8-9a44-20a698e65a21.png)\r\n\r\n## 开始配置\r\n\r\n1. 使用 ```npm install``` 安装webpack（版本号 3.x）\r\n\r\n```shell\r\nnpm install -D webpack@3.x\r\n```\r\n\r\n> 此处我安装的webpack版本是3.x，```webpack@4.x``` 改动较大，用着不太习惯，相对而言3.x版本个人觉得更加稳定，大家可根据喜好选择，安装 ```webpack@4.x``` 的时候记得安装一个 ```webpack-cli``` \r\n\r\n2. 配置webpack.config.js\r\n\r\n\r\n```javascript\r\n// webpack.config.js\r\nconst path = require(\"path\");\r\n\r\nmodule.exports = {\r\n    devtool: \"source-map\",\r\n    entry: {\r\n        main: path.join(__dirname, \"src/entry\") // 在 src/entry 目录下新建index.js\r\n    },\r\n    output: {\r\n        path: path.resolve(__dirname, \"dist\"),\r\n        publicPath: \"/\",\r\n        filename: \"js/[name].js\",\r\n        chunkFilename: \"js/[name].chunk.js\"\r\n    }\r\n}\r\n```\r\n\r\n> PS：在node中，文件夹下的index.js可省略不写，写到文件夹名称会定向到index.js\r\n\r\n3. 在 src/entry 目录新建 index.js\r\n\r\n```javascript\r\n// src/entry/index.js\r\nconsole.log(\"hello webpack\");\r\n```\r\n\r\n**到此最简单的webpack配置已经完成，在package.json中srcipt配置启动命令**\r\n\r\n```json\r\n\"scripts\": {\r\n    \"start\": \"webpack --progress --colors --watch --display-depth\"\r\n}\r\n```\r\n\r\n在终端上执行 ```npm run start``` ，成功后如下\r\n\r\n![cnd](https://user-images.githubusercontent.com/27670988/48877732-7d757480-ee3f-11e8-8db7-db49f48f36e9.png)\r\n\r\n根目录下会生成一个dist文件夹，打开生成的文件main.js，发现里面的代码都看不懂（没关系！），拉到最下面会看见一个你写在```src/entry/index.js```的代码\r\n\r\n## 总结\r\n\r\n关于webpack的最基本配置就是这些，下一章就结合react项目对webpack进一步进行配置。对于webpack想更深入的了解，可以去查看[webpack文档](https://www.webpackjs.com/concepts/)\r\n"
            },
            {
                "url": "https://api.github.com/repos/agreatao/agreatao.github.io/issues/3",
                "repository_url": "https://api.github.com/repos/agreatao/agreatao.github.io",
                "labels_url": "https://api.github.com/repos/agreatao/agreatao.github.io/issues/3/labels{/name}",
                "comments_url": "https://api.github.com/repos/agreatao/agreatao.github.io/issues/3/comments",
                "events_url": "https://api.github.com/repos/agreatao/agreatao.github.io/issues/3/events",
                "html_url": "https://github.com/agreatao/agreatao.github.io/issues/3",
                "id": 382939307,
                "node_id": "MDU6SXNzdWUzODI5MzkzMDc=",
                "number": 3,
                "title": "基于webpack的React项目（一）——准备工作，安装开发环境",
                "user": {
                    "login": "agreatao",
                    "id": 27670988,
                    "node_id": "MDQ6VXNlcjI3NjcwOTg4",
                    "avatar_url": "https://avatars1.githubusercontent.com/u/27670988?v=4",
                    "gravatar_id": "",
                    "url": "https://api.github.com/users/agreatao",
                    "html_url": "https://github.com/agreatao",
                    "followers_url": "https://api.github.com/users/agreatao/followers",
                    "following_url": "https://api.github.com/users/agreatao/following{/other_user}",
                    "gists_url": "https://api.github.com/users/agreatao/gists{/gist_id}",
                    "starred_url": "https://api.github.com/users/agreatao/starred{/owner}{/repo}",
                    "subscriptions_url": "https://api.github.com/users/agreatao/subscriptions",
                    "organizations_url": "https://api.github.com/users/agreatao/orgs",
                    "repos_url": "https://api.github.com/users/agreatao/repos",
                    "events_url": "https://api.github.com/users/agreatao/events{/privacy}",
                    "received_events_url": "https://api.github.com/users/agreatao/received_events",
                    "type": "User",
                    "site_admin": false
                },
                "labels": [
                    {
                        "id": 1134892447,
                        "node_id": "MDU6TGFiZWwxMTM0ODkyNDQ3",
                        "url": "https://api.github.com/repos/agreatao/agreatao.github.io/labels/%E5%AD%A6%E4%B9%A0%E6%80%BB%E7%BB%93",
                        "name": "学习总结",
                        "color": "8004d8",
                        "default": false
                    }
                ],
                "state": "open",
                "locked": false,
                "assignee": null,
                "assignees": [

                ],
                "milestone": null,
                "comments": 0,
                "created_at": "2018-11-21T03:24:33Z",
                "updated_at": "2018-11-21T03:27:02Z",
                "closed_at": null,
                "author_association": "OWNER",
                "body": "最近工作稍微空了一点，就想着要不要写一些教程供给朋友可以快速的入手react项目搭建。所以就在搭建了一个[react-empty-demo](https://github.com/agreatao/react-empty-demo)，首先贴最后搭建好的代码，为了能更深入的学习前端框架的搭建，我就将我详细搭建项目的步骤写下来。\r\n\r\n**首先，需要搭建node开发环境（已安装的请忽略后面一段）**\r\n\r\n[nodejs](https://nodejs.org/en/) 下载（建议安装LTS版本），安装完成后查看可使用cmd查看node是否安装成功\r\n\r\n```shell\r\nnode --version\r\nnpm --version\r\n```\r\n![cmd](https://user-images.githubusercontent.com/27670988/48815711-5a34c180-ed7a-11e8-9821-24c9d42d0a99.png)\r\n\r\n**其次，需要安装开发工具，我使用的是vscode**\r\n\r\n[vscode](https://code.visualstudio.com/)下载\r\n\r\n**当然还有webstorm，但是毕竟它需要购买才能使用正版，我等屌丝还是老实用免费的开发软件吧**\r\n\r\n[webstorm](https://www.jetbrains.com/webstorm/download/)下载\r\n\r\n**然后，浏览器使用chrome**\r\n\r\nchrome对于前端开发人员更加友好，相对而言比较好用\r\n\r\n> PS：如果开发的软件需要考虑ie兼容性等问题，你可以在chrome下调试好后，再去ie等其他浏览器中调试页面兼容性\r\n\r\n为了方便调试react开发的软件，一般会在浏览器中安装[react-devtools](https://github.com/facebook/react-devtools)\r\n\r\n> 如果您有翻墙的话，可以直接在chrome扩展商店中直接搜索安装（推荐）\r\n\r\n一般人都没有，那就使用npm安装（教程[在此](https://www.npmjs.com/package/react-devtools)，虽然是英文版，但很容易懂）\r\n```shell\r\nnpm install -g react-devtools\r\n```\r\n安装完成后，每次都要启动\r\n```shell\r\nreact-devtools\r\n```\r\n![react-devtools2](https://user-images.githubusercontent.com/27670988/48816963-3cb62680-ed7f-11e8-9162-10ec87140fa2.png)\r\n\r\n> 并且需要在调试的html中添加\r\n\r\n```html\r\n<script src=\"http://localhost:8097\"></script>\r\n```\r\n\r\n_好了，对于项目的准备工作，到此就完成了。相对而言比较简单。没做过的跟着做一下就好了，后续将慢慢的踏入项目搭建环节。欢迎各位大佬给意见，互相交流学习_"
            }
        ]
    }
};