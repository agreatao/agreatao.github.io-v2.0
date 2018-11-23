import "./style/index.less";

import React from 'react';

class Avatar extends React.Component {
    render() {
        const { active, className } = this.props;
        return (
            <a onClick={this.props.onClick} className={"avatar" + (active ? " active" : "") + " " + className}/>
        )
    }
}

export default Avatar;