import React from 'react';

import url from './CommentaryFeedSocial.scss';

export default class CommentaryFeedSocial extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="proto-feed-item__social">
                <div className="proto-feed-item__social__item">
                    <span className="fa proto-feed-item__social__item__icon fa-share-square-o"></span>
                </div>
                <div className="proto-feed-item__social__item">
                    <span className="fa proto-feed-item__social__item__icon fa-thumbs-o-up"></span>
                    <span className="proto-feed-item__social__item__count">23</span>
                </div>
                <div className="proto-feed-item__social__item">
                    <span className="fa proto-feed-item__social__item__icon fa-comment-o"></span>
                    <span className="proto-feed-item__social__item__count">7</span>
                </div>
                <div className="proto-feed-item__social__item">
                    <span className="fa proto-feed-item__social__item__icon fa-eye"></span>
                    <span className="proto-feed-item__social__item__count">200</span>
                </div>
                <div className="proto-feed-item__social__item proto-feed-item__social__item--trend">
                    <span className="fa proto-feed-item__social__item__icon fa-star"></span>
                    <span className="fa proto-feed-item__social__item__icon fa-star"></span>
                    <span className="fa proto-feed-item__social__item__icon fa-star-o"></span>
                </div>
            </div>
        );
    }
}