import './style/index.less';

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';

import addEventListener from 'add-dom-event-listener';

import Video from 'components/video';
import { AboutNav } from 'components/nav';
import { about_nav } from 'config/nav';

class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            play: true,
            detailOpen: false
        }
    }
    componentDidMount() {
        addEventListener(this.refs.detail, 'scroll', () => {
            let scrollTop = this.refs.detail.scrollY || this.refs.detail.scrollTop;
            if(scrollTop > 0) {
                this.setState({
                    detailOpen: true
                })
            } else {
                this.setState({
                    detailOpen: false
                })
            }
        })
    }
    handleVideoToggle() {
        this.setState(prev => ({
            play: !prev.play
        }))
    }
    onPlayEnd() {
        this.setState({
            play: false
        })
    }
    render() {
        const { browser } = this.props;
        const { width, height } = browser;
        const { play, detailOpen } = this.state;
        return (
            <div className="about-page" style={{width, height}}>
                <Video play={play} onPlayEnd={::this.onPlayEnd} />
                <div className="about-wrapper">
                    <div className={"about-box" + (!detailOpen ? " open" : "")} style={{ marginTop: (height - 160) / 2}}>
                        <h4>AO XU</h4>
                        <p>I'm <span>Web</span> Developer</p>
                        <div className="btns">
                            <Link className="home-btn" to="/home"></Link>
                            <a onClick={::this.handleVideoToggle} className={"video-play-btn" + (play ? " pause" : " play")}></a>
                        </div>
                    </div>
                    <div ref="detail" className={"about-detail-wrapper" + (detailOpen ? " open" : "")} style={{ height }}>
                        <div className="about-detail">
                            <div className="detail">
                                <h1>AO XU</h1>
                                <h4>许 骜</h4>
                                <div className="avatar-lg"></div>
                                <div className="intro">
                                    <p>喜爱<span>猫狗</span>，喜欢玩玩游戏，喜欢<span>旅游</span>，偶尔想尝试搞搞设计</p>
                                    <p>目前身在<span>杭州</span>，从事于IT行业</p>
                                    <p>热衷于web前端开发</p>
                                </div>
                                <div className="footer-text"><span>在wo眼里没什么</span>不可以</div>
                                <AboutNav data={about_nav} />
                                <div className="copyright">&copy; {moment().format("YYYY")} Designed By Ao</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({ browser: state.browser })
)(About);