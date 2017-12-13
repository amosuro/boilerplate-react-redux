import React from "react";
import Progress from "react-progress-2";
import queryString from "query-string";
import {Route, NavLink} from 'react-router-dom';

import "react-progress-2/main.css";

import UserInfoContainer from "./containers/UserInfo/UserInfo";
import HelloSymphony from "./components/HelloSymphony/HelloSymphony";
import "./styles/global.scss";

const {appId, jwtEnabled} = queryString.parse(window.location.search);

export default class App extends React.Component {
    render() {
        return (
            <div className="symphony-hsbc-app">
                <Progress.Component/>
                <div className="grid-x grid-margin-x">
                    <div className="medium-3 cell">
                        <NavLink to="/" className="button">Home</NavLink>
                        <NavLink to="/user-info" className="button">User Info</NavLink>
                    </div>
                    <div className="medium-9 cell">
                        <Route path="/"
                               exact={true}
                               render={(routeProps) => <HelloSymphony {...routeProps} appId="symphony-app-seed" />} />
                        <Route path="/user-info"
                               render={(routeProps) => <UserInfoContainer {...routeProps} appId={appId} jwtEnabled={!!jwtEnabled} />} />
                    </div>
                </div>
            </div>
        );
    }
}
