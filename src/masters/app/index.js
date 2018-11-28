import './style/index.less';

import React from 'react';
import { connect } from 'react-redux';

import TopButton from 'components/top_button';
import AppBg from 'components/app_bg';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.location.pathname != nextProps.location.pathname) {
            document.getElementById("app").scrollTo(0, 0);
        }
    }
    render() {
        const { appBgShow } =this.props.app;
        return (
            <div className={"app" + (appBgShow ? " show" : "")}>
                {this.props.children}
                <TopButton target={document.getElementById("app")} />
                <AppBg />
            </div>
        );
    }
}

export default connect(
    state => ({ app: state.app })
)(App);