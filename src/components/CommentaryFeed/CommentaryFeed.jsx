import React from 'react';

import url from './CommentaryFeed.scss';

import CommentaryFeedItem from '../CommentaryFeedItem/CommentaryFeedItem';
import IdeaFeedItem from '../IdeaFeedItem/IdeaFeedItem';

export default class CommentaryFeed extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const posts = this.props.posts.map((post, index) => {
            switch(post.type) {
                case 'commentary':
                    return <CommentaryFeedItem key={index} item={post} />;
                    break;
                case 'idea':
                    return <IdeaFeedItem key={index} item={post} />;
                    break;
                case 'news':
                    return <CommentaryFeedItem key={index} item={post} />;
                    break;
            }
        });

        return (
            <div className="proto-feed">
                <div className="row">
                    {posts}
                </div>
            </div>
        )
    }
}