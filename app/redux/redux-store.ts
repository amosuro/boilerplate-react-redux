import * as reducers from "./state";
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from "redux-thunk";
import createLogger = require('redux-logger');
const loggerMiddleware = (createLogger as any)();
import {hashHistory} from 'react-router';
var initialState: any = {};
import {routerMiddleware} from 'react-router-redux';
const myRouterMiddleware = routerMiddleware(hashHistory);
export const store = createStore(
    reducers.traderApp,
    initialState,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
        myRouterMiddleware
    )
);
