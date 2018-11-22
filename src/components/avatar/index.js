import "./style/index.less";

import React from 'react';

class Avatar extends React.Component {
    render() {
        const { active } = this.props;
        return (
            <a onClick={this.props.onClick} className={"avatar" + (active ? " active" : "")}/>
        )
    }
}

export default Avatar;