import './style/index.less';

import React from 'react';
import { connect } from 'react-redux';

class App2 extends React.Component {
    render() {
        const { width, height } = this.props.browser;
        return (
            <div className="app-2" style={{width, height}}>
                {this.props.children}
            </div>
        )
    }
}

export default connect(
    state => ({ browser: state.browser })
)(App2);