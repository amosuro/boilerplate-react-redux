import {connect} from "react-redux";
import * as React from "react";
import * as model from "../../../models";
import {RestApiError, SymUser} from "../../../models";
import * as apiModel from "../../../api/api_model";
import {convertTime} from "../../../message-ml/utils";
import {fetchWrapper} from "../../fetch-wrapper";
import * as _ from "underscore";
import * as objectAssign from "object-assign";

import PostComment from '../PostComment/PostComment';

import './Comments.less';

const API_MESSAGE_COMMENTS = "/api/messages/:id/comments";

const REQ_COMMENTS = "REQ_COMMENTS";
const FAIL_REC_COMMENTS = "FAIL_REC_COMMENTS";
export const REC_COMMENTS = "REC_COMMENTS";

export const REQ_COMMENT_NEW = "REQ_COMMENT_NEW";
export const REC_COMMENT_NEW = 'REC_COMMENT_NEW';
export const FAIL_REC_COMMENT_NEW = 'FAIL_REC_COMMENT_NEW';

interface CommentsDisplayProps {
    postingId: string;
    comments: CommentsState;
    isFetching: boolean;
    apiError: model.RestApiError;
    onRetryClick: any;
    dispatch: any;
    smallAvatarUrl: string;
}

export class CommentsDisplay extends React.Component<CommentsDisplayProps, { interval }> {
    componentDidMount() {
        this.props.dispatch(fetchPostingComments(this.props.postingId));

        const interval = setInterval( () => {
            this.props.dispatch(fetchPostingComments(this.props.postingId))
        }, 15000);
        this.setState({interval});
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    postComment(request) {
        this.props.dispatch(createComment(request));
    }

    render() {
        return (
            <div className="proto-comments">
                {
                    (this.props.comments.postingComments()[this.props.postingId] || []).map(comment =>
                        <div className="proto-comments__comment" key={comment.timestamp + Math.random()}>
                            <img className="proto-comments__comment__avatar"
                                 src={comment.user && comment.user.smallAvatarUrl ? comment.user.smallAvatarUrl : SymUser.DEFAULT_AVATAR}
                                 alt={comment.user ? comment.user.emailAddress : ''} />
                            <div className="proto-comments__comment__details">
                                <h4 className="proto-comments__comment__details__heading">
                                    {comment.user ? comment.user.displayName : SymUser.DEFAULT_USERNAME}
                                    <span className="media-date"> {convertTime(comment.timestamp)} (GMT)</span>
                                </h4>
                                <span className="proto-comments__comment__details__text" dangerouslySetInnerHTML={{__html: comment.content}}/>
                            </div>
                        </div>
                    )
                }

                <PostComment postingId={this.props.postingId}
                             smallAvatarUrl={this.props.smallAvatarUrl}
                             onSubmit={this.postComment.bind(this)} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments_state,
        isFetching: state.comments_state.isFetching(),
        apiError: state.comments_state.apiError()
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        postingId: ownProps.postingId,
        onRetryClick: (e) => {
            e.stopPropagation();
            dispatch(fetchPostingComments(ownProps.postingId));
        },
        dispatch: dispatch
    }
};

export const Comments = connect(mapStateToProps, mapDispatchToProps)(CommentsDisplay);

export class CommentsState {
    constructor(postingComments: { [postId: string]: model.Comment[] },
                isFetching: boolean,
                apiError: model.RestApiError) {
        this._postingComments = postingComments;
        this._isFetching = isFetching;
        this._apiError = apiError;
    }

    private _isFetching: boolean;
    private _postingComments: { [postId: string]: model.Comment[] };
    private _apiError: model.RestApiError;

    public postingComments: () => { [postId: string]: model.Comment[] } = () => this._postingComments;
    public isFetching: () => boolean = () => this._isFetching;
    public apiError: () => model.RestApiError = () => this._apiError;
};

export const comments_state = (state: CommentsState = new CommentsState({}, false, undefined), action) => {
    switch (action.type) {
        case REQ_COMMENTS:
            return new CommentsState(state.postingComments(), action.isFetching, undefined);
        case REC_COMMENTS: {
            return new CommentsState(
                _.groupBy(action.comments, c => c.postingId), false, undefined
            );
        }
        case REC_COMMENT_NEW: {
            let comment = model.Comment.fromJson(action.response.body);
            let newComments: { [postId: string]: model.Comment[] } = {};
            let existingComments = state.postingComments()[comment.postingId];
            newComments[comment.postingId] = [comment, ...existingComments];
            return new CommentsState(
                objectAssign({}, state.postingComments(), newComments),
                false, undefined
            );
        }
        case FAIL_REC_COMMENTS:
            return new CommentsState(
                state.postingComments(),
                false,
                RestApiError.fromJson(action.response.body)
            );
        default:
            return state
    }
};

export const fetchPostingComments = (postingId, isFetching = true) => {
    return (dispatch) => {
        dispatch({
            type: REQ_COMMENTS,
            isFetching
        });
        return fetchWrapper(API_MESSAGE_COMMENTS.replace(':id', postingId) + "?postingId=" + postingId)
            .then(response => response.json()
                .then(json => new model.Response(response.status, json)))
            .then(r => {
                if (r.status >= 400) {
                    dispatch({response: r, type: FAIL_REC_COMMENTS});
                }
                else {
                    let comments: model.Comment[] = r.body.map(ic => model.Comment.fromJson(ic));
                    dispatch({comments: comments, type: REC_COMMENTS});
                }
            });
    }
};

export const createComment = (pcr_legacy: apiModel.PostCommentRequest) => {
    return (dispatch, getState) => {
        let pcr = new apiModel.PostCommentRequest(pcr_legacy.postingId, pcr_legacy.comment);
        dispatch({
            type: REQ_COMMENT_NEW
        });
        return fetchWrapper(API_MESSAGE_COMMENTS.replace(':id', pcr.postingId), 'POST', JSON.stringify(pcr))
            .then(response =>
                response.json()
                    .then(json => new model.Response(response.status, json)))
            .then(r => {
                if (r.status >= 400) {
                    dispatch({response: r, type: FAIL_REC_COMMENTS});
                }
                else {
                    let comments: model.Comment[] = r.body.map(ic => model.Comment.fromJson(ic));
                    dispatch({type: REC_COMMENTS, comments});
                }
            });
    }
};
