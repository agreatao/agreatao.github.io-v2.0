import React from "react";
import { Router, hashHistory, Route, IndexRedirect } from "react-router";
import { asyncComponent } from "lib/async";

import Loading from "components/loading";

import App from "masters/app";
import App2 from "masters/app2";

import { listIssues, listComments } from 'api';

const Home = asyncComponent(() => import("pages/home"), <Loading />);
const Issues = asyncComponent(() => import("pages/issues"), <Loading />, () => {
    return Promise.all([
        listIssues()
    ])
    .then(([issues]) => ({ issues }))
    .catch(e => { throw '网络链接失败啦'})
});
const Issue = asyncComponent(() => import("pages/issue"), <Loading />, ({ query, params }) => {
    if(params && params.id)
        return Promise.all([
            listIssues(),
            listComments(params.id)
        ])
        .then(([issues, comments]) => ({ issues, comments }))
        .catch(e => { throw '网络链接失败啦'})
    else Promise.reject("不存在该文章");
});
const About = asyncComponent(() => import("pages/about"), <Loading />);

function createRouter() {
    return (
        <Router history={hashHistory}>
            <Route exact path="/" component={App}>
                <IndexRedirect to="home" />
                <Route exact path="home" component={Home} />
                <Route exact path="issues" component={Issues} />
                <Route exact path="issue/:id" component={Issue} key={new Date().getTime()} />
                <Route exact path="rss" component={Home} />
            </Route>
            <Route exact path="/" component={App2}>
                <Route exact path="about" component={About} />
            </Route>
        </Router>
    );
}

export default createRouter();
