import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import {filter_state} from "../components/filters/Filters/Filters";
import {comments_state} from "../components/comments/Comments/Comments";
import {postings_state, user_profile_state} from "../components/postings/Main/Main";
import {postingFormState} from "../components/editors/PostingForm/PostingForm";
import {user_info_state} from "../symphony/services";

export const traderApp = combineReducers({
    postings_state,
    filter_state,
    comments_state,
    user_profile_state,
    user_info_state,
    postingFormState,
    routing: routerReducer
});