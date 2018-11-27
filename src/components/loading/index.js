import './style/index.less';

import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class Loading extends React.Component {
    render() {
        const { browser } = this.props;
        return (
            <div className="loading">
                <div className="loader-wrapper" style={{ marginTop: (browser.height - 40) / 2}}>
                    <span>L</span>
                    <div className="loader">
                        <svg className="circular" viewBox="25 25 50 50">
                            <circle className="path" cx="50" cy="50" r="15" fill="none" strokeWidth="2" strokeMiterlimit="10"></circle>
                        </svg>
                    </div>
                    <span>ADING...</span>
                </div>
                <div className="copyright">&copy; {moment().format("YYYY")} Designed By Ao</div>
            </div>
        )
    }
}

export default connect(
    state => ({ browser: state.browser })
)(Loading);