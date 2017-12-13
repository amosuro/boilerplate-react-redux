import * as React from "react";

import {Posting} from '../../../models';

import './MainPostSocial.less';

interface MainPostSocialProps {
    posting: Posting,
    onLike: any,
    onUnlike: any,
    onShare: any,
    onComment: any,
    userId: number
}

export default class MainPostSocial extends React.Component<MainPostSocialProps, {}> {
    constructor(props: MainPostSocialProps) {
        super(props);
    }

    calculateTrendRating() {
        const trendIndex = this.props.posting.likesCount + this.props.posting.commentsCount + this.props.posting.viewsCount;
        const activeRating = { active: true };
        const nonActiveRating = { active: false };
        const trendStarRatings = [];

        if (trendIndex >= 3 && trendIndex < 7) {
            trendStarRatings.push(activeRating, nonActiveRating, nonActiveRating, nonActiveRating, nonActiveRating);
        } else if (trendIndex >= 7 && trendIndex < 11) {
            trendStarRatings.push(activeRating, activeRating, nonActiveRating, nonActiveRating, nonActiveRating);
        } else if (trendIndex >= 10 && trendIndex < 14) {
            trendStarRatings.push(activeRating, activeRating, activeRating, nonActiveRating, nonActiveRating);
        } else if (trendIndex >= 14 && trendIndex < 18) {
            trendStarRatings.push(activeRating, activeRating, activeRating, activeRating, nonActiveRating);
        } else if (trendIndex >= 18) {
            trendStarRatings.push(activeRating, activeRating, activeRating, activeRating, activeRating);
        } else {
            trendStarRatings.push(nonActiveRating, nonActiveRating, nonActiveRating, nonActiveRating, nonActiveRating);
        }

        return trendStarRatings;
    }

    hasUserLiked() {
        return this.props.posting.likes && this.props.posting.likes.filter(like => like.userId === this.props.userId)[0];
    }

    onShare(event) {
        this.props.onShare(event);
    }

    onLike(event) {
        if (this.hasUserLiked()) {
            this.props.onUnlike(event);
        } else {
            this.props.onLike(event);
        }
    }

    onComment(event) {
        this.props.onComment(event);
    }

    render() {
        const trendRating = this.calculateTrendRating();
        const likeBtnClass = this.hasUserLiked() ? 'fa-thumbs-up' : 'fa-thumbs-o-up';

        return (
            <div className="proto-feed-item__social">
                <a className="proto-feed-item__social__item proto-feed-item__social__item--share"
                     onClick={(e) => this.onShare(e)}>
                    <span className="fa proto-feed-item__social__item__icon fa-share-square-o" />
                </a>
                <a className="proto-feed-item__social__item proto-feed-item__social__item--like"
                     onClick={(e) => this.onLike(e)}>
                    <span className={`fa proto-feed-item__social__item__icon ${likeBtnClass}`} />
                    <span className="proto-feed-item__social__item__count">
                        {this.props.posting.likes ? this.props.posting.likes.length : 0}
                    </span>
                </a>
                <a className="proto-feed-item__social__item proto-feed-item__social__item--comment"
                     onClick={(e) => this.onComment(e)}>
                    <span className="fa proto-feed-item__social__item__icon fa-comment-o" />
                    <span className="proto-feed-item__social__item__count">{this.props.posting.commentsCount}</span>
                </a>
                <div className="proto-feed-item__social__item proto-feed-item__social__item--trend">
                    <span className="fa proto-feed-item__social__item__icon fa-eye" />
                    <span className="proto-feed-item__social__item__count">{this.props.posting.viewsCount}</span>
                </div>
                <div className="proto-feed-item__social__item proto-feed-item__social__item--trend">
                    {trendRating.map((rating, index) => {
                        const activeClass = rating.active ? 'fa-star' : 'fa-star-o';

                        return <span key={index} className={`fa proto-feed-item__social__item__icon ${activeClass}`} />
                    })}
                </div>
            </div>
        );
    }
}