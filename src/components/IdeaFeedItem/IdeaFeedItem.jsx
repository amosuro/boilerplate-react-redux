import React from 'react';

import url from './IdeaFeedItem.scss';

import CommentaryFeedSocial from '../CommentaryFeedSocial/CommentaryFeedSocial';
import CommentaryFeedMeta from '../CommentaryFeedMeta/CommentaryFeedMeta';

export default class IdeaFeedItem extends React.Component {
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

        const rationales = <ul className="proto-feed-item__rationales">
            {
                this.props.item.rationales.map((rationale, index) => {
                    return (
                        <li key={index} className="proto-feed-item__rationales__rationale">
                            {rationale}
                        </li>
                    );
                })
            }
        </ul>;

        const visibleRationales = this.state.visibility ? rationales : null;

        return (
            <div className="col-xs-12">
                <div className="proto-feed-item proto-feed-item--idea" onClick={() => this.toggleVisibility()}>
                    <div className="proto-feed-item__title">
                        <div className="row middle-xs">
                            <div className="col-xs-8">
                                <h1 className="proto-feed-item__excerpt__heading">{this.props.item.title}</h1>
                            </div>
                            <div className="col-xs-1">
                                <div className="proto-feed-item__excerpt__currency">
                                    <div className="proto-feed-item__excerpt__currency__badge">
                                        1W
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-3">
                                <div className="proto-feed-item__excerpt__currency">
                                    <div className="proto-feed-item__excerpt__currency__badge">
                                        {this.props.item.currency}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="proto-feed-item__tags">
                        {tags}
                    </div>
                    <div className="proto-price">
                        <div className="row">
                            <div className="col-xs-3">
                                <div className="proto-price-badge">
                                    <div className="proto-price-badge__label">
                                        Entry
                                    </div>
                                    <div className="proto-price-badge__price">
                                        {this.props.item.entryPrice}
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-3">
                                <div className="proto-price-badge">
                                    <div className="proto-price-badge__label">
                                        TP Level
                                    </div>
                                    <div className="proto-price-badge__price">
                                        {this.props.item.tpLevel}
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-3">
                                <div className="proto-price-badge">
                                    <div className="proto-price-badge__label">
                                        SL Level
                                    </div>
                                    <div className="proto-price-badge__price">
                                        {this.props.item.slLevel}
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-3">
                                <div className="proto-conviction proto-conviction--high">
                                    <div className="proto-conviction__label">
                                        Conviction (%)
                                    </div>
                                    <div className="proto-conviction__level">
                                        80+
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {visibleRationales}
                    <CommentaryFeedMeta />
                    <CommentaryFeedSocial />
                </div>
            </div>
        );
    }
}