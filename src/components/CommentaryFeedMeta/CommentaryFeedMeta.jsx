import React from 'react';

import url from './CommentaryFeedMeta.scss';

export default class CommentaryFeedMeta extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="proto-feed-item__meta">
                <div className="row middle-xs">
                    <div className="col-xs-8">
                        <div className="proto-feed-item__meta__author">
                            <div className="proto-feed-item__meta__author__pic">
                                <img className="proto-feed-item__meta__author__pic-image"
                                     src="https://cldup.com/1ll3zUYsN1.png" />
                            </div>
                            <a href="" className="proto-feed-item__meta__author__name">@Ashley Mosuro</a>
                        </div>
                    </div>
                    <div className="col-xs-4">
                        <div className="proto-feed-item__meta__timestamp">15 Sept 2017 @ 12:22 (GMT)</div>
                    </div>
                </div>
            </div>
        );
    }
}