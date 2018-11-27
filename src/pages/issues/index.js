import './style/index.less';

import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

import { CircleNav } from 'components/nav';
import { issues_nav } from 'config/nav';

class Issues extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            issues: null
        }
    }
    componentDidMount() {
        const { data } = this.props;
        if(data) {
            let { issues } = data;
            let issuesResult = [];
            let issuesResultItem = { year: issues && issues[0] && moment(issues[0].created_at).format("YYYY"), list: [] };
            issues && issues.forEach((item, index) => {
                let issue = {
                    title: item.title,
                    createTime: moment(item.created_at),
                    updateTime: moment(item.updated_at),
                    label: item.labels && item.labels[0] && item.labels[0].name,
                    comments: item.comments,
                    id: item.number
                };
                if(issuesResultItem.year != issue.createTime.format("YYYY")) {
                    issuesResult.push(issuesResultItem);
                    issuesResultItem = { year: issue.createTime.format("YYYY"), list: [issue] };
                } else {
                    issuesResultItem.list.push(issue);
                    if(index == issues.length - 1) {
                        issuesResult.push(issuesResultItem);
                    }
                }
            }); 
            this.setState({ issues: issuesResult });
        }
    }
    render() {
        const { browser, error } = this.props;
        const { width, height } = browser;
        const { issues } = this.state;
        return (
            <div className="issues-page">
                <CircleNav data={issues_nav} />
                <div className="issues-wrapper">
                    {
                        issues && !error ?
                        issues.map((item, index) => <div className="year-list" key={index}>
                            <div className="year">{item.year}</div>
                            <div className="year-issue-wrapper">
                                {
                                    item.list.map((issue, issueIndex) => <div className="year-issue-list" key={issueIndex}>
                                        <div className="create-time">
                                            <div className="date">
                                                <span className="day">{issue.createTime.format("DD")}</span>
                                                <span className="month">{issue.createTime.format("MMM")}</span>
                                            </div>
                                            <div className="time">{issue.createTime.format("HH:mm:ss")}</div>
                                        </div>
                                        <div className="issue-info">
                                            <Link to={`/issue/${issue.id}`} title={issue.title} className="title">{issue.title}</Link>
                                            <div className="issue-other">
                                                <span className="fl"><i className="comments">{issue.comments}</i></span>
                                                {
                                                    issue.label &&
                                                    <span className="fr"><i className="label">{issue.label}</i></span>
                                                }
                                            </div>
                                        </div>
                                    </div>)
                                }
                            </div>
                        </div>)
                        :
                        <div className="issues-empty">
                            <p>{error}</p>
                        </div>
                    }
                </div>
                <div className="copyright">&copy; {moment().format("YYYY")} Designed By Ao</div>
            </div>
        )
    }
}

export default connect(
    state => ({ browser: state.browser })
)(Issues);