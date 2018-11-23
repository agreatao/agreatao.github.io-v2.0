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
            data: null
        }
    }
    componentDidMount() {
        const { data } = this.props.issues;
        let result = [];
        let each = { year: moment(data[0].created_at).format("YYYY"), list: [] };
        data && data.forEach((item, index) => {
            let issue = {
                title: item.title,
                createTime: moment(item.created_at),
                updateTime: moment(item.updated_at),
                label: item.labels[0].name,
                comments: item.comments,
                id: index
            };
            if(each.year != issue.createTime.format("YYYY")) {
                result.push(each);
                each = { year: issue.createTime.format("YYYY"), list: [issue] };
            } else {
                each.list.push(issue);
                if(index == data.length - 1) {
                    result.push(each);
                }
            }
        });
        this.setState({ data: result });
    }
    render() {
        const { browser, issues } = this.props;
        const { width, height } = browser;
        const { error } = issues;
        const { data } = this.state;
        return (
            <div className="issues-page">
                <CircleNav data={issues_nav} />
                <div className="issues-wrapper">
                    {
                        data && !error ?
                        data.map((item, index) => <div className="year-list" key={index}>
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
                                            <Link to={`/issue/${issue.id}`} className="title">{issue.title}</Link>
                                            <div className="issue-other">
                                                <span className="fl comments"><i className="fa fa-comments" /> {issue.comments}</span>
                                                <span className="fr label"><i className="fa fa-paperclip" /> {issue.label}</span>
                                            </div>
                                        </div>
                                    </div>)
                                }
                            </div>
                        </div>)
                        :
                        <div className="issues-empty"></div>
                    }
                </div>
                <div className="copyright">&copy; {moment().format("YYYY")} Designed By Ao</div>
            </div>
        )
    }
}

export default connect(
    state => ({ browser: state.browser, issues: state.issues })
)(Issues);