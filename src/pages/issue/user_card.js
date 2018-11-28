import React from 'react';

class UserCard extends React.Component {
    render() {
        const { user } = this.props;
        return (
            <div className="user-card">
                <img src={user.avatar_url}/>
                <div className="card">
                    <img src={user.avatar_url} />
                    <a href={`http://github.com/${user.login}`} target="_blank">{user.login}</a>
                </div>
            </div>
        )
    }
}

export default UserCard;