import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';

import marked from 'lib/markdown';
import { scroll } from 'lib/utils';

class IssueWrapper extends React.Component {
    onCommentsClick() {
        scroll({
            targetPositionY: this.refs.issue.scrollHeight + 30
        }, document.getElementById("app"));
    }
    render() {
        const { error, issues, currentIndex } = this.props;
        if(issues && issues.length > 0 && currentIndex != null && issues[currentIndex]) {
            let isFirst = (currentIndex == issues.length - 1);
            let isLast = (currentIndex == 0);
            let issue = issues[currentIndex];
            return <div className="issue-wrapper" ref="issue">
                <div className="issue-header">
                    <div className="issue-title">{issue.title}</div>
                    <div className="issue-infos clear">
                        <div className="fl">
                            <a className="calendar">{moment(issue.created_at).format("YYYY-MM-DD HH:mm:ss")}</a>
                            {
                                issue.labels && issue.labels[0] &&
                                <a className="label">{issue.labels[0].name}</a>
                            }
                        </div>
                        <div className="fr">
                            <a className="heart">点赞</a>
                            <a className="comments-a" onClick={::this.onCommentsClick}>评论</a>
                        </div>
                    </div>
                </div>
                <div className="issue-content">
                    <div className="markdown-content" dangerouslySetInnerHTML={{__html: marked(issue.body)}} />
                </div>
                <div className="issue-footer">
                    <div className="issue-infos clear">
                        <div className="fl">
                            <a className="heart">点赞</a>
                        </div>
                        <div className="fr">
                            {
                                issues && !isFirst &&
                                <Link className="issue-btn" to={`/issue/${issues[currentIndex + 1].number}`}>上一篇</Link>
                            }
                            {
                                issues && !isLast &&
                                <Link className="issue-btn" to={`/issue/${issues[currentIndex - 1].number}`}>下一篇</Link>
                            }
                        </div>
                    </div>
                </div>
            </div>
        } else {
            return <div className="issue-wrapper">
                <p className="error">{error}</p>
            </div>
        }
    }
}

export default IssueWrapper;