import {combineReducers} from "redux";
import {ActionTypes} from "./actions";

export const jwtToken = (state = '', action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_JWT_TOKEN:
            return action.jwtToken;
        default:
            return state
    }
};

const rootReducer = combineReducers({
    jwtToken
});

export default rootReducer;