import "./style/index.less";

import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { CircleNav } from 'components/nav';
import { issue_nav } from 'config/nav';
import http from 'lib/http';
import { scroll } from 'lib/utils';

import { Base64 } from 'js-base64';
import config from 'config'

import IssueWrapper from './issue';
import CommentsWrapper from './comments';
import CommentFormWrapper from './comment_form';

class Issue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            issues: null,
            currentIndex: null,
            comments: null
        }
    }
    componentDidMount() {
        const { data, params } = this.props;
        const { id } = params;
        if(data && id) {
            const { issues, comments } = data;
            if(issues) {
                let currentIndex = issues.map((item, index) => item.number).indexOf(parseInt(id, 10));
                this.setState({
                    issues, currentIndex, comments
                })
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        const { data, params } = nextProps;
        const { id } = params;
        if(data && id) {
            const { issues, comments } = data;
            if(issues) {
                const currentIndex = issues.map((item, index) => item.number).indexOf(parseInt(id, 10));
                this.setState({
                    issues, currentIndex, comments
                })
            }
        }
    }
    render() {
        const { error, location, params } = this.props;
        const { issues, comments, currentIndex } = this.state;
        return (
            <div className="issue-page">
                <CircleNav data={issue_nav} />
                <IssueWrapper error={error} issues={issues} currentIndex={currentIndex} />
                <CommentsWrapper comments={comments} />
                <CommentFormWrapper id={params.id} />
                <div className="copyright">&copy; {moment().format("YYYY")} Designed By Ao</div>
            </div>
        ) 
    }
}

export default Issue;