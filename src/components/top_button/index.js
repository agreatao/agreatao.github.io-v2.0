import './style/index.less';

import React from 'react';
import { connect } from 'react-redux';

import addEventListener from 'add-dom-event-listener';

let timeout = null;

let easing = (x) => {
    if (x < 0.5) {
        return Math.pow(x * 2, 2) / 2;
    }
    return 1 - Math.pow((1 - x) * 2, 2) / 2;
};

let animateScroll = (easing, options, target) => {
    options.progress = new Date().getTime() - options.start;
    options.percent = options.progress >= options.duration ? 1 : easing(options.progress / options.duration);
    options.currentPositionY = options.startPositionY + Math.ceil(options.deltaTop * options.percent);
    target.scrollTo(0, options.currentPositionY);
    if(options.percent < 1) {
        clearTimeout(timeout);
        let easedAnimate = animateScroll.bind(null, easing, options, target);
        timeout = setTimeout(easedAnimate, 1000 / 60);
        return;
    } else {
        clearTimeout(timeout);
    }
};

let currentY = (target) => {
    return target.scrollY || target.scrollTop;
};

let scroll = (options, target) => {
    options = options || {
        currentPositionY: 0,
        startPositionY: 0,
        targetPositionY: 0,
        progress: 0,
        duration: 0,
        start: null,
        deltaTop: null,
        percent: null
    };
    options.startPositionY = currentY(target);
    options.deltaTop = Math.round(options.targetPositionY - options.startPositionY);
    options.duration = 0;
    options.start = new Date().getTime();

    options.duration = 800;
    let easedAnimate = animateScroll.bind(null, easing, options, target);
    clearTimeout(timeout);
    timeout = setTimeout(easedAnimate, 1000 / 60);
};

class TopButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            top: true,
            run: false
        }
    }
    componentWillReceiveProps(nextProps) {
        if(!this.appScroll)
            this.appScroll = addEventListener(nextProps.targetRef, 'scroll', () => {
                let scrollTop = nextProps.targetRef.scrollY || nextProps.targetRef.scrollTop;
                if (scrollTop > 0) {
                    this.setState({ top: false })
                } else {
                    this.setState({ top: true, run: false })
                }
            })
    }
    componentWillUnmount() {
        this.appScroll && this.appScroll.remove();
    }
    onScrollTop() {
        this.setState({ run: true });
        scroll(null, this.props.targetRef);
    }
    render() {
        const { top, run } = this.state;
        return (
            <a className={"top-button" + (!top ? ' show' : '') + (run ? ' run' : '')} onClick={::this.onScrollTop}></a>
        )
    }
}

export default connect(
    state => ({ browser: state.browser })
)(TopButton);