import './style/index.less';

import React from 'react';
import { connect } from 'react-redux';

import TopButton from 'components/top_button';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            targetRef: null
        }
    }
    componentDidMount() {
        this.setState({
            targetRef: this.refs.app
        })
    }
    render() {
        const { width, height } = this.props.browser;
        const { show } =this.props.bg;
        const { targetRef } = this.state;
        return (
            <div className="app" ref="app" style={{width, height}}>
                <div className={"bg" + (show ? " show" : "")} />
                {this.props.children}
                <TopButton targetRef={targetRef} />
            </div>
        );
    }
}

export default connect(
    state => ({ browser: state.browser, bg: state.bg })
)(App);