import React from "react";
import PropTypes from "prop-types";

import "./HelloSymphony.scss";
import {getNodeEnv} from "../../services/envService";

export class HelloSymphony extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="hello-symphony">
                <h1 className="hello-symphony__heading">Home</h1>
                <p className="hello-symphony__body">
                    App Id: {this.props.appId}
                    <br />
                    App running in <strong>{getNodeEnv()}</strong> mode!
                    <br />
                    <em>This is a dumb component, but you can visit the User Info navigation item for an example of a Redux container.</em>
                </p>
            </div>
        );
    }
}

HelloSymphony.propTypes = {
    appId: PropTypes.string
};

export default HelloSymphony;