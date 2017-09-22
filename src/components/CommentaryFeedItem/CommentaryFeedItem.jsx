import React from 'react';

import url from './CommentaryFeedItem.scss';

import CommentaryFeedSocial from '../CommentaryFeedSocial/CommentaryFeedSocial';
import CommentaryFeedMeta from '../CommentaryFeedMeta/CommentaryFeedMeta';


export default class CommentaryFeedItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visibility: false
        }
    }

    toggleVisibility() {
        this.setState({
            visibility: !this.state.visibility
        });
    }

    render() {
        const tags = this.props.item.tags.map((tag, index) => {
            return <a href="" key={index} className="proto-feed-item__tags__tag">{tag}</a>;
        });

        const detailClass = this.state.visibility ? 'proto-feed-item__detail' : 'proto-feed-item__detail--clipped';

        return (
            <div className="col-xs-12 col-sm-6">
                <div className="proto-feed-item proto-feed-item--commentary" onClick={() => this.toggleVisibility()}>
                    <div className="proto-feed-item__title">
                        <h1 className="proto-feed-item__excerpt__heading">{this.props.item.title}</h1>
                    </div>
                    <div className="proto-feed-item__tags">
                        {tags}
                    </div>
                    <div className={detailClass}>
                        {this.props.item.detail}
                    </div>
                    <CommentaryFeedMeta />
                    <CommentaryFeedSocial />
                </div>
            </div>
        );
    }
}