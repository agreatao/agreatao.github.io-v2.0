import "./style/index.less";

import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { CircleNav } from 'components/nav';
import { issue_nav } from 'config/nav';
import marked from 'lib/markdown';

class Issue extends React.Component {
    render() {
        const issue = this.props.issues.data[this.props.params.id];
        return (
            <div className="issue-page">
                <CircleNav data={issue_nav} />
                {
                    issue ?
                    <div className="issue-wrapper">
                        <div className="issue-header">
                            <div className="issue-title">{issue.title}</div>
                            <div className="issue-others clear">
                                <div className="fl">
                                    <div className="calendar">{moment(issue.create_at).format("YYYY-MM-DD")}</div>
                                    <div className="label">{issue.labels[0].name}</div>
                                </div>
                                <div className="fr">
                                    <div className="comments">{issue.comments}</div>
                                </div>
                            </div>
                        </div>
                        <div className="issue-content">
                            <div className="markdown-content" dangerouslySetInnerHTML={{__html: marked(issue.body)}} />
                        </div>
                        <div className="issue-footer clear">
                            <div className="fl">
                                <a className="heart">点赞</a>
                            </div>
                            <div className="fr">
                                <a className="comments-a" href={issue.html_url + '/#new_comment_field'} target="_blank">评论</a>
                            </div>
                        </div>
                    </div>
                    :
                    null
                }
                <div className="copyright">&copy; {moment().format("YYYY")} Designed By Ao</div>
            </div>
        ) 
    }
}

export default connect(
    state => ({ issues: state.issues })
)(Issue);