import React from 'react';
import { connect} from 'react-redux';

import http from 'lib/http';

class CommentsFormWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentBody: ""
        }
    }
    onCommentsChange(e) {
        this.setState({ commentBody: e.target.value })
    }
    onCommentSubmit() {
        const { commentBody } = this.state;
        const { user, id } = this.props;
        if(user && user.data && id && commentBody && commentBody != "") {
            http.post(`/issues/${id}/comments`, {
                body: commentBody
            }, {
                headers: {
                    Authorization: 'token ' +  user.data.token
                }
            })
            .then(result => {
                if(result) {
                    this.props.onCommentOk && this.props.onCommentOk(result);
                    this.setState({
                        commentBody: ""
                    })
                }
            })
            .catch(e => {
            })
        }
    }
    componentWillReceiveProps(nextProps) {
        const { reply } = nextProps;
        if(reply != this.props.reply) {
            this.setState({
                commentBody: reply
            });
            this.refs.input.focus();
        }
    }
    render() {
        const { user } = this.props;
        const { commentBody } = this.state;
        return (
            <div className="comment-form-wrapper">
                <div className="comment-form-header">
                    <div className="comment-form-title">我要评论</div>
                </div>
                {
                    user && user.data ?
                    <div className="comment-form">
                        <div className="avatar-user">
                            <img src={user.data && user.data.avatar_url}/>
                        </div>
                        <div className="form">
                            <textarea onChange={::this.onCommentsChange} value={commentBody} ref="input" />
                            <div className="btn">
                                <button onClick={::this.onCommentSubmit}>发送</button>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="login-form">
                        <p>您需要登录您的<span>github</span>账号才可以评论，请先 <a href={`https://github.com/login/oauth/authorize?client_id=${"3b94ec6434f646b1f439"}&scope=admin,repo,user&redirect_uri=${window.location.origin + "/" + window.location.hash}`}>登录</a></p>
                    </div>
                }
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user })
)(CommentsFormWrapper);