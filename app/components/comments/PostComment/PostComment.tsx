import * as React from "react";
import * as apiModel from "../../../api/api_model";

import './PostComment.less';

interface PostCommentState {
    message: string
}

interface PostCommentDisplayProps {
    postingId: string,
    smallAvatarUrl: string;
    onSubmit: any;
}

export default class PostComment extends React.Component<PostCommentDisplayProps, PostCommentState> {
    private message: string = "";

    constructor(props, state) {
        super(props, state);
        this.state = {
            message: this.message,
        };
    }

    handleEditorChange = (e) => {
        this.setState({message: e.target.value});
    };

    onClick(event) {
        event.preventDefault();
        const request = new apiModel.PostCommentRequest(this.props.postingId, this.state.message);

        this.setState({message: ""});
        this.props.onSubmit(request);
    }

    render() {
        return (
            <div className="proto-post-comment">
                <img className="proto-post-comment__avatar" src={this.props.smallAvatarUrl}/>
                <textarea value={this.state.message}
                          rows={1}
                          className="proto-post-comment__textarea"
                          onChange={(e) => this.handleEditorChange(e)}
                          placeholder="Add a comment..." />
                <button onClick={(e) => this.onClick(e)}
                        className="proto-post-comment__button"
                        disabled={!this.state.message || !this.state.message.trim()}>
                    Post
                </button>
            </div>
        );
    }
}