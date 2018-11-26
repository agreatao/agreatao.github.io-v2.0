import './style/index.less';

import React from 'react';
import { connect } from 'react-redux';

import Avatar from 'components/avatar';
import { HomeNav } from 'components/nav';
import { home_nav } from 'config/nav';
import moment from 'moment';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    onAvatarClick() {
        this.props.bgToggle();
    }
    render() {
        const { browser, bg } = this.props;
        const { width, height } = browser;
        return (
            <div className="home-page" style={{width, height}}>
                <div className="main-wrapper" style={{ paddingTop: (height - 200) / 2}}>
                    <div className="avatar-wrapper">
                        <Avatar onClick={::this.onAvatarClick} active={bg.show} />
                    </div>
                    <div className="nav-wrapper">
                        <HomeNav data={home_nav} />
                    </div>
                </div>
                <div className="copyright">&copy; {moment().format("YYYY")} Designed By Ao</div>
            </div>
        )
    }
}

import { bgToggle } from 'store/actions';

export default connect(
    state => ({ browser: state.browser, bg: state.bg }),
    dispatch => ({ bgToggle: () => dispatch(bgToggle()) })
)(Home);