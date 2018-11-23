import './style/index.less';

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import addEventListener from 'add-dom-event-listener';

import Video from 'components/video';

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
                                aaa
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