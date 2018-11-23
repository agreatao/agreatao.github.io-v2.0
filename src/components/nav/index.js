import "./style/index.less";

import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router';

import { home_nav } from 'config/nav';

import Avatar from 'components/avatar';

export class HomeNav extends React.Component {
    render() {
        return (
            <div className="home-nav">
                {
                    home_nav.map((item, index) => {
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

class NavItemLink extends React.Component {
    render() {
        const { to, icon, title, className } = this.props;
        return (
            <Link to={to} className={className}>
                <i className={"icon " + icon} />
                <text>{title}</text>
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
                <text>{title}</text>
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
        const { data, bg } = this.props;
        return (
            <div className={"circle-nav" + (open ? " open" : "")}>
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
                    <Avatar active={bg.show} onClick={::this.onBgToggle} className={"menu-" + ((data && data.length || 0) + 1)} />
                </div>
            </div>
        )
    }
}

import { bgToggle } from 'store/actions';

export const CircleNav = connect(
    state => ({ bg: state.bg }),
    (dispatch) => ({ bgToggle: () => dispatch(bgToggle()) })
)(CircleNavConnect);

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