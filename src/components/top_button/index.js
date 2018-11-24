import './style/index.less';

import React from 'react';
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