import "./style/index.less";

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { Link } from 'react-router';

import Avatar from 'components/avatar';

class NavItemLink extends React.Component {
    render() {
        const { to, icon, title, className } = this.props;
        return (
            <Link to={to} className={className}>
                <i className={"icon " + icon} />
                <div className="text">{title}</div>
            </Link>
        )
    }
}

class NavItemA extends React.Component {
    render() {
        const { to, icon, title, className } = this.props;
        return (
            <a href={to} target="_blank" className={className}>
                <i className={"icon " + icon} />
                <div className="text">{title}</div>
            </a>
        )
    }
}

export class CircleNavConnect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }
    onNavToggle() {
        this.setState(prev => ({
            open: !prev.open
        }))
    }
    onBgToggle() {
        this.props.bgToggle();
    }
    render() {
        const { open } = this.state;
        const { data, app } = this.props;
        return ReactDOM.createPortal(
            <div className={"circle-nav" + (open ? " open" : "") + (app.appBgShow ? " show-bg" : "")}>
                <a className="nav-toggle" onClick={::this.onNavToggle}><span className="nav-bars"></span></a>
                <div className="nav-menu">
                    {
                        data && data.map((item, index) => {
                            if (item.tag == 'a') {
                                return <NavItemA {...item} className={"menu-" + (index + 1)} key={index} />
                            }
                            else if (item.tag == 'link') {
                                return <NavItemLink {...item} className={"menu-" + (index + 1)} key={index} />
                            }
                            else {
                                return null;
                            }
                        })
                    }
                    <Avatar length={34} active={app.appBgShow} onClick={::this.onBgToggle} className={"menu-" + ((data && data.length || 0) + 1)} />
                </div>
            </div>
        , document.body)
    }
}

import { bgToggle } from 'store/actions';

export const CircleNav = connect(
    state => ({ app: state.app }),
    (dispatch) => ({ bgToggle: () => dispatch(bgToggle()) })
)(CircleNavConnect);

class HomeNavConnect extends React.Component {
    render() {
        const { data, app } = this.props;
        return (
            <div className={"home-nav" + (app.appBgShow ? " show-bg" : "")}>
                {
                    data && data.map((item, index) => {
                        if (item.tag == 'a') {
                            return <NavItemA {...item} key={index} />
                        }
                        else if (item.tag == 'link') {
                            return <NavItemLink {...item} key={index} />
                        }
                        else {
                            return null;
                        }
                    })
                }
            </div>
        )
    }
}
export const HomeNav = connect(
    state => ({ app: state.app })
)(HomeNavConnect);

export class AboutNav extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <div className="about-nav">
                {
                    data && data.map((item, index) => {
                        if(item.tag == "link") {
                            return <NavItemLink {...item} key={index} />
                        } else if(item.tag == "a") {
                            return <NavItemA {...item} key={index} />
                        }
                    })
                }
            </div>
        )
    }
}