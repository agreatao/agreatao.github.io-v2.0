import React from 'react';
import { Router, hashHistory, Route, IndexRedirect } from 'react-router';
import { asyncComponent } from 'lib/async';

import Loading from 'components/loading';

import store from 'store';
import { receiveIssues } from 'store/actions';

import App from 'masters/app';
import App2 from 'masters/app2';

const { dispatch } = store;

const Home = asyncComponent(() => import("pages/home"), <Loading />);
const Issues = asyncComponent(() => import("pages/issues"), <Loading />, () => dispatch(receiveIssues()));
const Issue = asyncComponent(() => import("pages/issue"), <Loading />, () => dispatch(receiveIssues()));
const About = asyncComponent(() => import("pages/about"), <Loading />);

function createRouter() {
    return (
        <Router history={hashHistory}>
            <Route exact path="/" component={App}>
                <IndexRedirect to="home" />
                <Route exact path="home" component={Home} />
                <Route exact path="issues" component={Issues} />
                <Route exact path="issue/:id" component={Issue} />
                <Route exact path="wechat" component={Home} />
                <Route exact path="rss" component={Home} />
            </Route>
            <Route exact path="/" component={App2}>
                <Route exact path="about" component={About} />
            </Route>
        </Router>
    );
}

export default createRouter();