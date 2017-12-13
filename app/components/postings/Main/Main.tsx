import * as React from "react";
import {connect} from "react-redux";
import * as objectAssign from "object-assign";
import * as _ from "underscore";
import * as ReactTooltip from "react-tooltip";

import {MainPost} from "../MainPost/MainPost";
import {Filters} from "../../filters/Filters/Filters";
import {Loading} from "../../common/Loading/Loading";
import {PostingForm} from "../../editors/PostingForm/PostingForm";

import * as model from "../../../models";
import {Like} from "../../../models";
import {fetchWrapper} from "../../fetch-wrapper";
import {REC_COMMENTS} from "../../comments/Comments/Comments";

import './Main.less';

declare const SYMPHONY: any;

export const API_MESSAGES = "/api/messages";
export const API_MESSAGES_UPDATE = "/api/messages/:id";
const API_MESSAGE_LIKE = "/api/messages/:id/like";
const API_MESSAGE_SHARE = "/api/messages/:id/share";

interface MainDisplayProps {
    postings: [model.Posting];
    isFetching: boolean;
    apiError: model.RestApiError;
    apiErrorMessage: string;
    userProfile: any;
    onRetryClick: any;
    dispatch: any;
}

class MainDisplay extends React.Component<MainDisplayProps, { interval }> {

    componentWillMount() {
        const that = this;
        const interval = setInterval(function () {
            if (!that.props.isFetching) { // avoid refreshing while another operation is ongoing
                that.props.dispatch(fetchPostings(false, false));
                //that.props.dispatch(incrementCount())
            }
        }, 15000);

        this.setState({interval});
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    renderEmptyPostings() {
        return (
            <div className="proto-empty-feed">
                <div className="row">
                    <div className="col-sm-4 col-sm-offset-4">
                        <h1>No results!</h1>
                        <p>Try widening your search by removing some filters.</p>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return <div className="proto">
            <div className="row">
                <div className="col-xs-12">
                    <Loading isFetching={this.props.isFetching} apiError={this.props.apiError}
                             onRetryClick={this.props.onRetryClick}/>
                    <PostingForm/>
                    <Filters/>
                </div>
            </div>
            <div className="row">
                {this.props.postings.map((p: model.Posting) => <MainPost key={p.idHexadecimal} posting={p}/>)}
                {!this.props.postings.length && this.renderEmptyPostings()}
            </div>
            <ReactTooltip place="bottom" effect="solid" class="media-footer-tooltip"/>
        </div>
    }

}

const mapStateToProps = (state) => {
    return {
        postings: state.filter_state.applyFilter(state.postings_state.postings),
        isFetching: state.postings_state.isFetching,
        apiError: state.postings_state.apiError,
        apiErrorMessage: state.postings_state.apiErrorMessage,
        userProfile: state.user_profile_state
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onRetryClick: (e) => {
            e.stopPropagation();
            dispatch(fetchPostings(true, true));
        },
        dispatch: dispatch
    }
};

export const Main = connect(mapStateToProps, mapDispatchToProps)(MainDisplay);

export const getUserProfile = (getPostings: boolean) => {
    return fetchWrapper('/api/user-profile?getPostings=' + getPostings)
        .then(response => response.json()
            .then(json => new model.Response(response.status, json)));
};

const REQ_USER_PROFILE = "REQ_USER_PROFILE";
export const REC_USER_PROFILE = "REC_USER_PROFILE";
const FAIL_USER_PROFILE = "FAIL_USER_PROFILE";

export const user_profile_state = (state = {
    isFetching: false,
    loaded: false,
    searchPreference: undefined,
    postPreference: undefined,
    smallAvatarUrl: undefined
}, action) => {
    switch (action.type) {
        case REC_USER_PROFILE: {
            console.log("App Flow - Got user profile", action.userProfile);
            return objectAssign({}, state, {isFetching: false}, action.userProfile);
        }
        case FAIL_USER_PROFILE: {
            console.log("App Flow - Failed to get user profile", action.response);
            return state;
        }
        default:
            return state;
    }
};

export const REQ_POSTINGS = 'REQ_POSTINGS';
export const REC_POSTINGS = 'REC_POSTINGS';
export const FAIL_REC_POSTINGS = 'FAIL_REC_POSTINGS';

export const REQ_POSTINGS_NEW = 'REQ_POSTINGS_NEW';
export const REC_POSTINGS_NEW = 'REC_POSTINGS_NEW';
export const FAIL_REC_POSTINGS_NEW = 'FAIL_REC_POSTINGS_NEW';

export const REQ_LIKE = 'REQ_LIKE';
export const REQ_REMOVE_LIKE = 'REQ_REMOVE_LIKE';
export const RES_LIKE = 'RES_LIKE';
export const RES_REMOVE_LIKE = 'RES_REMOVE_LIKE';
export const RES_SHARE = 'RES_SHARE';

export const postings_state = (state = {
    isFetching: false,
    apiError: undefined,
    postings: []
}, action) => {
    switch (action.type) {
        case REQ_POSTINGS: {
            return objectAssign({}, state, {isFetching: action.isFetching});
        }
        case REC_POSTINGS: {
            console.log("REC_POSTINGS ->", action);
            return objectAssign({}, state, {
                isFetching: false,
                apiError: undefined,
                apiErrorMessage: undefined,
                postings: action.postings.map(m => model.Posting.fromJson(m))
            });
        }
        case FAIL_REC_POSTINGS: {
            console.log("Received server fail response ->", action.response);
            return objectAssign({}, state, {
                isFetching: false,
                apiError: model.RestApiError.fromJson(action.response.body),
                postings: state.postings
            });
        }
        case REQ_POSTINGS_NEW: {
            return objectAssign({}, state, {isFetching: true});
        }
        case REC_POSTINGS_NEW: {
            console.log("Received response ->", action);
            return objectAssign({}, state, {
                isFetching: false,
                apiError: undefined,
                apiErrorMessage: undefined,
                postings: action.postings.map(m => model.Posting.fromJson(m))
            });
        }
        case FAIL_REC_POSTINGS_NEW: {
            console.log("Received server fail response ->", action.response);
            return objectAssign({}, state, {
                isFetching: false,
                apiError: model.RestApiError.fromJson(action.response.body),
                postings: state.postings
            });
        }
        case RES_LIKE: {
            let index = 0;
            _.each(state.postings, function (p, i) {
                if (p.idHexadecimal === action.posting.idHexadecimal) {
                    index = i;
                }
            });

            let likes;
            if (action.like) {
                likes = action.posting.likes || [];
                likes.push(action.like);
            }

            const newPostingsState = [
                ...state.postings.slice(0, index),
                objectAssign({}, state.postings[index], {likes: likes, likesCount: likes.length}),
                ...state.postings.slice(index + 1)
            ];

            return objectAssign({}, state, {
                isFetching: false,
                apiError: undefined,
                apiErrorMessage: undefined,
                postings: newPostingsState
            });
        }
        case RES_REMOVE_LIKE: {
            let index = 0;
            _.each(state.postings, function (p, i) {
                if (p.idHexadecimal === action.posting.idHexadecimal) {
                    index = i;
                }
            });

            const likes = _.reject(action.posting.likes, function (like: Like) {
                return like.userId === action.userId;
            });

            const newPostingsState = [
                ...state.postings.slice(0, index),
                objectAssign({}, state.postings[index], {likes: likes, likesCount: likes.length}),
                ...state.postings.slice(index + 1)
            ];

            return objectAssign({}, state, {
                isFetching: false,
                apiError: undefined,
                apiErrorMessage: undefined,
                postings: newPostingsState
            });
        }
        case REC_COMMENTS:
            let index;

            _.each(state.postings, function (p, i) {
                if (action.comments.length && p.idHexadecimal === action.comments[0].postingId) {
                    index = i;
                }
            });

            if (action.comments.length) {
                const comments = action.comments ? action.comments.length : 0;

                const newPostingsState = [
                    ...state.postings.slice(0, index),
                    objectAssign({}, state.postings[index], {commentsCount: comments}),
                    ...state.postings.slice(index + 1)
                ];

                return objectAssign({}, state, {
                    isFetching: false,
                    apiError: undefined,
                    apiErrorMessage: undefined,
                    postings: newPostingsState
                });
            } else {
                return state;
            }
        case RES_SHARE: {
            const post = _.filter(state.postings, (posting) => posting.idHexadecimal === action.posting.idHexadecimal)[0];
            post.sharesCount = post.sharesCount ? post.sharesCount + 1 : 1;
            return objectAssign({}, state, {
                isFetching: false,
                apiError: undefined,
                apiErrorMessage: undefined,
                postings: state.postings
            });
        }
        default:
            return state;
    }
};
export const fetchPostings = (isFetching: boolean, triggeredByUser: boolean) => {
    return (dispatch, getState) => {
        const state = getState();
        dispatch({
            type: REQ_POSTINGS,
            isFetching
        });

        let queryString = API_MESSAGES
            + '?sortBy=' + state.filter_state.sortBy
            + '&dateRange=' + state.filter_state.dateRange
            + '&public=' + state.filter_state.public_
            + '&private=' + state.filter_state.private_
            + '&activeFxTradeIdea=' + state.filter_state.activeFxTradeIdea
            + '&nonActiveFxTradeIdea=' + state.filter_state.nonActiveFxTradeIdea
            + '&buyFxTradeIdea=' + state.filter_state.buyFxTradeIdea
            + '&sellFxTradeIdea=' + state.filter_state.sellFxTradeIdea
            + '&triggeredByUser=' + triggeredByUser;

        state.filter_state.postingTypes.forEach(postingType => queryString += '&postingTypes=' + postingType);
        state.filter_state.assetClasses.forEach(assetClass => queryString += '&assetClasses=' + assetClass);
        state.filter_state.regions.forEach(region => queryString += '&regions=' + region);

        return fetchWrapper(queryString)
            .then(response => response.json()
                .then(json => new model.Response(response.status, json)))
            .then(r => {
                if (r.status >= 400) {
                    dispatch({type: FAIL_REC_POSTINGS, response: r});
                }
                else {
                    dispatch({type: REC_POSTINGS, postings: r.body});
                }
            });
    }
};


export const postLike = (posting: model.Posting) => {
    return (dispatch, getState) => {
        dispatch({
            type: REQ_LIKE
        });
        return fetchWrapper(API_MESSAGE_LIKE.replace(':id', posting.idHexadecimal), 'POST')
            .then(response =>
                response.json().then(json => new model.Response(response.status, json)))
            .then(r => {
                if (r.status >= 400) {
                    dispatch({response: r, type: FAIL_REC_POSTINGS});
                }
                else {
                    dispatch({posting: posting, like: r.body, type: RES_LIKE});
                }
            });
    }
};

export const postRemoveLike = (posting: model.Posting) => {
    return (dispatch, getState) => {
        dispatch({
            type: REQ_REMOVE_LIKE
        });
        return fetchWrapper(API_MESSAGE_LIKE.replace(':id', posting.idHexadecimal), 'DELETE')
            .then(r => {
                if (r.status >= 400) {
                    dispatch({response: r, type: FAIL_REC_POSTINGS_NEW});
                }
                else {
                    dispatch({
                        posting,
                        type: RES_REMOVE_LIKE,
                        userId: getState().user_info_state.user.id
                    });
                }
            });
    }
};

export const incrementShares = (posting: model.Posting) => {
    return (dispatch) => {
        return fetchWrapper(API_MESSAGE_SHARE.replace(':id', posting.idHexadecimal), 'PUT')
            .then(r => {
                if (r.status >= 400) {
                    dispatch({response: r, type: FAIL_REC_POSTINGS_NEW});
                }
                else {
                    dispatch({posting: posting, type: RES_SHARE});
                }
            });
    }
};

