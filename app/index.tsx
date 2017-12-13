import * as React from "react";
import * as ReactDOM from "react-dom";
import {connect, Provider} from "react-redux";
import {hashHistory, IndexRoute, Route, Router} from "react-router";
import {Main} from "./components/postings/Main/Main";
import {syncHistoryWithStore} from "react-router-redux";
import {store} from "./redux/redux-store";
import {initApp} from "./symphony/services";

import * as NProgress from "nprogress";

import "../vendor/tinymce.ts";
import "../node_modules/nprogress/nprogress.css";
import "imports?jQuery=jquery!../javascript/bootstrap.js";
import "../less/hsbc-bootstrap.less";
import "../node_modules/react-select/dist/react-select.css";
import "font-awesome-webpack";

NProgress.configure({minimum: 0.1, easing: 'ease', speed: 500, showSpinner: false, trickleSpeed: 200});

const history = syncHistoryWithStore(hashHistory, store);

interface EntryPointDisplayProps {
    userProfile: any;
    init: any;
}

class EntryPointDisplay extends React.Component<EntryPointDisplayProps, {}> {
    componentDidMount() {
        this.props.init();
    }

    render() {
        return this.props.userProfile.loaded ? <div>{this.props.children}</div> : <div></div>;
    }
}

const mapStateToProps = (state) => {
    return {
        userProfile: state.user_profile_state
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        init: () => {
            dispatch(initApp());
        }
    }
};

const EntryPoint = connect(mapStateToProps, mapDispatchToProps)(EntryPointDisplay);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={EntryPoint}>
                <IndexRoute component={Main}/>
            </Route>
        </Router>
    </Provider>
    , document.getElementById("root")
);