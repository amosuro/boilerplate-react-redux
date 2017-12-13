import es6promise from "es6-promise";
import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import {BrowserRouter as Router} from 'react-router-dom';

import INITIAL_STATE from "./store/state";
import App from "./App";

import rootReducer from "./store/reducers";
es6promise.polyfill();

let store = createStore(rootReducer, INITIAL_STATE, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>, document.getElementById('app')
);