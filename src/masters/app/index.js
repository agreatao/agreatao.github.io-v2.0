import './style/index.less';

import React from 'react';
import { connect } from 'react-redux';

class App extends React.Component {
    render() {
        const { width, height } = this.props.browser;
        const { show } =this.props.bg;
        return (
            <div className="app">
                <div className={"bg" + (show ? " show" : "")} />
                {this.props.children}
            </div>
        );
    }
}

export default connect(
    state => ({ browser: state.browser, bg: state.bg })
)(App);