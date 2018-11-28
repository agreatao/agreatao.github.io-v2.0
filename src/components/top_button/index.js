import './style/index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import addEventListener from 'add-dom-event-listener';

import { scroll } from 'lib/utils';

class TopButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            top: true,
            run: false
        }
    }
    componentDidMount() {
        this.addScrollListener(this.props.target);
    }
    componentWillReceiveProps(nextProps) {
        this.addScrollListener(this.props.target);
    }
    addScrollListener(target) {
        if(!this.targetScroll && target) {
            this.targetScroll = addEventListener(target, 'scroll', () => {
                let scrollTop = target.scrollY || target.scrollTop;
                if (scrollTop > 0) {
                    this.setState({ top: false })
                } else {
                    this.setState({ top: true, run: false })
                }
            })
        }
    }
    componentWillUnmount() {
        this.targetScroll && this.targetScroll.remove();
    }
    onScrollTop() {
        this.setState({ run: true });
        scroll(null, this.props.target);
    }
    render() {
        const { top, run } = this.state;
        const { target } = this.props;
        return target ? ReactDOM.createPortal(
            <a className={"top-button" + (!top ? ' show' : '') + (run ? ' run' : '')} onClick={::this.onScrollTop}></a>
        , document.body) : null;
    }
}

export default TopButton;