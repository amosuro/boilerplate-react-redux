import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import jwtdecode from "jwt-decode";

import {updateJwtTokenAsync} from "../../store/actions";

import "./UserInfo.scss";


export class UserInfo extends React.Component {

    componentDidMount() {
        this.props.refreshJwtToken(this.props.appId, this.props.jwtEnabled);
    }

    getUser() {
        const {jwtToken} = this.props;
        return (!!jwtToken ? jwtdecode(jwtToken).user : null);
    }

    render() {
        const user = this.getUser();
        return (
            <div className="user-info">
                <h1 className="user-info__heading">User Info</h1>
                <p className="user-info__body">This is an example Redux container</p>
                {
                    user ?
                    <article className="user-info-panel">
                        <div className="user-info-panel__heading">{user.displayName}</div>
                        <section className="user-info-panel__details">
                            <div>Email: {user.emailAddress}</div>
                            <div>Company: {user.company}</div>
                            <div>ID: {user.username}</div>
                        </section>
                    </article> : <div>Sorry, no user found.</div>
                }
            </div>
        );
    }
}

UserInfo.propTypes = {
    appId: PropTypes.string,
    jwtEnabled: PropTypes.bool,
    jwtToken: PropTypes.string
};

const mapStateToProps = (state) => {
    return {
        jwtToken: state.jwtToken
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        refreshJwtToken: (appId, jwtEnabled) => {
            dispatch(updateJwtTokenAsync(appId, jwtEnabled));
        }
    };
};

const UserInfoContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserInfo);

export default UserInfoContainer;