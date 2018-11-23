import './style/index.less';

import React from 'react';

class Loading extends React.Component {
    render() {
        return (
            <div className="loading">
                <div className="pre-container">
                    <div className="spinner">
                        <div className="double-bounce1"></div>
                        <div className="double-bounce2"></div>
                    </div>
                    <div className="loading-text">加载中...</div>
                </div>
            </div>
        )
    }
}

export default Loading;