import React from 'react';
import config from 'config';

class CommentsFormWrapper extends React.Component {
    render() {
        const { id } = this.props;
        return (
            <div className="comment-form-wrapper">
                <div className="comment-form-header">
                    <div className="comment-form-title">我要评论</div>
                </div>
                <div className="login-form">
                    <p>您需要登录您的<span>github</span>评论，<a href={`https://github.com/${config.owner}/${config.repo}/issues/${id}#new_comment_field`} target="_blank">点击</a> 前往</p>
                </div>
            </div>
        )
    }
}

export default CommentsFormWrapper;