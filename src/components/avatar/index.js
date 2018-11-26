import "./style/index.less";

import React from 'react';

class Avatar extends React.Component {
    render() {
        let { active, className, length } = this.props;
        length = length || 100;
        let [width, height] = [length || 100, length || 100];
        let fontSize = length >= 100 ? 22 : 16;
        let borderWidth = length >= 100 ? 1.5 : 1;
        return (
            <a onClick={this.props.onClick} className={"avatar" + (active ? " active" : "") + " " + (className || "")} style={{width, height, borderWidth}}>
                <span style={{fontSize, width: length - 3, height:  length - 3, lineHeight: (length - 3) + "px"}}>骜</span>
            </a>
        )
    }
}

export default Avatar;