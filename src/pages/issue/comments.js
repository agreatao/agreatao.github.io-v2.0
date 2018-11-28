import React from "react";
import moment from 'moment';

import marked from 'lib/markdown';
import { scroll } from 'lib/utils';
import UserCard from './user_card';

class CommentsWrapper extends React.Component {
    onCommentsClick() {
        scroll({
            targetPositionY: document.getElementById("app").scrollHeight
        }, document.getElementById("app"));
    }
    render() {
        const { comments } = this.props;
        return (
            <div className="comments-wrapper">
                <div className="comments-header">
                    <div className="comments-title">评论</div>
                    <div className="comments-infos clear">
                        <div className="fl">
                            <a className="comments">{comments && comments.length || 0}</a>
                        </div>
                        <div className="fr">
                            <a className="comments-a" onClick={::this.onCommentsClick}>我要评论</a>
                        </div>
                    </div>
                </div>
                {
                    comments && comments.length > 0 ?
                    <ul className="comments-list">
                        {
                            comments.map((item, index) => <li key={index}>
                                <UserCard user={item.user} />
                                <div className={"comment-wrapper" + (item.author_association == "OWNER" ? " owner" : "")}>
                                    <div className="header">
                                        <div className="fl">
                                            <span>{create_time(item.created_at)}</span>
                                        </div>
                                        <div className="fr">
                                            <a className="owner-a">作者</a>
                                            <a className="reply" title="回复" onClick={this.props.onReply && this.props.onReply.bind(null, item.body)}></a>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <div className="markdown-content" dangerouslySetInnerHTML={{__html: marked(item.body)}} ></div>
                                    </div>
                                </div>
                            </li>)
                        }
                    </ul>
                    :
                    <p>暂无评论</p>
                }
            </div>
        );
    }
}

function create_time(time) {
    time = moment(time);
    let mis = (new Date().getTime() - time.toDate().getTime()) / 1000;
    if(mis < 60) { // 秒
        return "刚刚";
    }
    mis = mis / 60; // 分钟
    if(mis > 1 && mis < 60) {
        return Math.floor(mis) + "分钟之前";
    }
    mis = mis / 60; // 小时
    if(mis > 1 && mis < 24) {
        return Math.floor(mis) + "小时之前";
    }
    mis = mis / 24; // 天
    if(mis > 1 && mis < 15) {
        return Math.floor(mis) + "天之前";
    }
    return time.format("YYYY-MM-DD HH:mm:ss")
}

export default CommentsWrapper;
