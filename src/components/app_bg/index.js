import './style/index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'

class AppBg extends React.Component {
    render() {
        const { appBgShow } = this.props.app;
        return ReactDOM.createPortal(<div className={"app-bg" + (appBgShow ? " show" : "")} />, document.body)
    }
}

export default connect(
    state => ({ app: state.app })
)(AppBg);