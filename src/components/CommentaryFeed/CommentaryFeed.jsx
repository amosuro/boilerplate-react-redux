import React from 'react';

import url from './CommentaryFeed.scss';

export default class CommentaryFeed extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const posts = this.props.posts.map((post, index) => {
            const tags = post.tags.map((tag, index) => {
                return <a href="" key={index} className="proto-feed-item__tags__tag">{tag}</a>;
            });

            let itemClass;
            switch(post.type) {
                case 'commentary':
                    itemClass = 'proto-feed-item proto-feed-item--commentary';
                    break;
                case 'idea':
                    itemClass = 'proto-feed-item proto-feed-item--idea';
                    break;
                case 'news':
                    itemClass = 'proto-feed-item proto-feed-item--news';
                    break;
            }

            return <div key={index} className="col-xs-12">
                <div className={itemClass}>
                    <div className="proto-feed-item__tags">
                        {tags}
                    </div>
                    <div className="proto-feed-item__excerpt">
                        <h1>{post.title}</h1>
                    </div>
                    <div className="proto-feed-item__detail">
                        {post.detail}
                        <a href="#" className="proto-feed-item__detail__more">...read more</a>
                    </div>
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
                    <div className="proto-feed-item__social">
                        <div className="proto-feed-item__social__item">
                            <span className="fa fa-share-square-o"></span>
                        </div>
                        <div className="proto-feed-item__social__item">
                            <span className="fa fa-thumbs-o-up"></span>
                        </div>
                        <div className="proto-feed-item__social__item">
                            <span className="fa fa-comment-o"></span>
                        </div>
                        <div className="proto-feed-item__social__item">
                            <span className="fa fa-eye"></span>
                        </div>
                        <div className="proto-feed-item__social__item">
                            <span className="fa fa-bar-chart-o"></span>
                        </div>
                    </div>
                </div>
            </div>;
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