import "./style/index.less";

import React from "react";
import { connect } from "react-redux";
import addEventListener from 'add-dom-event-listener';

import play from "images/play.mp4";

class Video extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlay: true
        }
    }
    componentDidMount() {
        addEventListener(this.refs.play, 'ended', (e) => {
            this.setState({ isPlay: false })
            this.props.onPlayEnd && this.props.onPlayEnd();
        })
    }
    componentWillReceiveProps(nextProps) {
        const { play } = nextProps;
        if(play != this.props.play && play) {
            this.setState({ isPlay: true });
            this.refs.play.play();
        } else if(play != this.props.play && !play) {
            this.refs.play.pause();
        }
    }
    render() {
        const { browser } = this.props;
        const { width, height } = browser;
        const { isPlay } = this.state;
        let scale  = Math.max(width / 1920, height / 1080);
        return (
            <div className={"video" + (isPlay ? " play" : "")}>
                <video
                    className="video-tag"
                    ref="play"
                    autoPlay
                    muted
                    style={{width: 1920 * scale, height: 1080 * scale}}
                >
                    <source src={play} type="video/mp4"  style={{width, height}}/>
                </video>
                <div
                    className="video-bg"
                    style={{ width, height }}
                />
                <div className="video-mask" />
            </div>
        );
    }
}

export default connect(state => ({ browser: state.browser }))(Video);
