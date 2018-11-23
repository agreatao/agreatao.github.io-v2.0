import React from 'react';
import { connect } from 'react-redux';

class About extends React.Component {
    render() {
        const { browser } = this.props;
        const { width, height } = browser;
        return (
            <div className="about-page" style={{width, height}}>

            </div>
        )
    }
}

export default connect(
    state => ({ browser: state.browser })
)(About);