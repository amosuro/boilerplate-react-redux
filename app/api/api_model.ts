import {SymUser} from "../models";

export class CreatePostingRequest {
    headline: string;
    message: string;
    postingType: string;
    tags: string[];
    privateUsers: Array<SymUser>;

    constructor(headline: string, message: string, postingType: string, tags: string[], privateUsers: Array<SymUser>) {
        this.headline = headline;
        this.message = message;
        this.postingType = postingType;
        this.tags = tags;
        this.privateUsers = privateUsers;
    }
}
export class PostCommentRequest {
    constructor(postingId: string,
                comment: string) {
        this.postingId = postingId;
        this.comment = comment;
    }

    postingId: string;
    comment: string;
}
export class NotifyCommentRequest {
    constructor(postingId: string, commentorId: number) {
        this.postingId = postingId;
        this.commentorId = commentorId;
    }
    postingId: string;
    commentorId: number;
}

export const postData = (targetUrl, payload: any) => fetch(
    targetUrl,
    {
        headers: {
            'Accept': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(payload)
    }
).then(response => response.json());