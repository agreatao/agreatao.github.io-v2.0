import "./style/index.less";

import React from 'react';
import { Link } from 'react-router';

import navConfig from 'config/nav';

export class HomeNav extends React.Component {
    render() {
        return (
            <div className="home-nav">
                {
                    navConfig.map((item, index) => {
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
        const { to, icon, title } = this.props;
        return (
            <Link to={to}>
                <i className={"fa fa-" + icon} />
                <text>{title}</text>
            </Link>
        )
    }
}

class NavItemA extends React.Component {
    render() {
        const { to, icon, title } = this.props;
        return (
            <a href={to}>
                <i className={"fa fa-" + icon} />
                <text>{title}</text>
            </a>
        )
    }
}