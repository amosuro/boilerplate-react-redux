import * as React from "react";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import * as ReactTooltip from "react-tooltip";
import { scroller } from 'react-scroll';

import {HashTagEnum, Posting, PostingTypesEnum, SymUser} from "../../../models";
import {fetchPostings, incrementShares, postLike, postRemoveLike} from "../Main/Main";
import {openInPostingForm, togglePostingForm} from '../../editors/PostingForm/PostingForm';
import {filterByPostingText} from "../../filters/Filters/Filters";

import {
    addAssetClassToFilter,
    addPostingTypeToFilter,
    addRegionToFilter,
    FilterState
} from "../../filters/Filters/Filters";
import {stripTagsOut} from "../../../message-ml/index";
import {createMarkup} from "../../../message-ml/utils";
import {symphonyServices} from "../../../symphony/symphony-services";

import MainPostMeta from "../MainPostMeta/MainPostMeta";
import MainPostSocial from "../MainPostSocial/MainPostSocial";
import {Comments, fetchPostingComments} from "../../comments/Comments/Comments";

import "./MainPost.less";

interface MainPostProps {
    posting: Posting;
    onHashTagClick: any;
    onClick: any;
    onClickLike: any;
    onClickRemoveLike: any;
    onClickAssetClass: any;
    onClickRegion: any;
    onClickPostingType: any;
    onClickShare: any;
    onClickComment: any;
    onClickEdit: any;
    userId: number;
    filterState: FilterState;
}

interface MainPostInternalState {
    posting: Posting,
    fromUser: SymUser,
    visibility: boolean,
    commentsVisibility: boolean
}

export class MainPostDisplay extends React.Component<MainPostProps, MainPostInternalState> {
    constructor(props: MainPostProps) {
        super(props);

        this.state = {
            posting: this.props.posting,
            fromUser: this.props.posting.fromUser ? this.props.posting.fromUser : SymUser.MOCK_USER,
            visibility: false,
            commentsVisibility: false
        }
    }

    componentDidUpdate() {
        // Required in order for tooltip component to recognise new pricing information
        ReactTooltip.rebuild();
    }

    toggleVisibility() {
        this.setState({
            posting: this.state.posting,
            fromUser: this.state.posting.fromUser,
            visibility: !this.state.visibility,
            commentsVisibility: this.state.commentsVisibility
        });
    }

    toggleCommentsVisibility(event) {
        this.setState({
            posting: this.state.posting,
            fromUser: this.state.posting.fromUser,
            visibility: this.state.visibility,
            commentsVisibility: !this.state.commentsVisibility
        });

        this.props.onClickComment(event);
    }

    getTimeHorizonLabel() {
        switch (this.props.posting.fxTradeIdeaPosting.timeHorizon) {
            case 'ONE_WEEK':
                return '1W';
            case 'ONE_MONTH':
                return '1M';
            case 'TWO_MONTH':
                return '2M';
            case 'THREE_MONTH':
                return '3M';
            case 'FOUR_MONTH':
                return '4M';
            case 'FIVE_MONTH':
                return '5M';
            case 'SIX_MONTH':
                return '6M';
            case 'SEVEN_MONTH':
                return '7M';
            case 'EIGHT_MONTH':
                return '8M';
            case 'NINE_MONTH':
                return '9M';
            case 'TEN_MONTH':
                return '10M';
            case 'ELEVEN_MONTH':
                return '11M';
            case 'ONE_YEAR':
                return '1Y';
        }
    }

    calculateConvictionClass() {
        switch (this.props.posting.fxTradeIdeaPosting.convictionLevel) {
            case '<60%':
                return 'proto-conviction--low';
            case '60-80%':
                return 'proto-conviction--medium';
            case '>80%':
                return 'proto-conviction--high'
        }
    }

    isHashTagClick(event) {
        return (event && event.target.classList.contains('post-tag-link'));
    }

    searchHashTag(event) {
        if (this.isHashTagClick(event)) {
            const hashTagText = event.target.text.replace('#', '');
            this.props.onHashTagClick(hashTagText);
        }
    }

    renderIdeaMeta() {
        const fxTiPosting = this.props.posting.fxTradeIdeaPosting;
        const hasPricing = !!fxTiPosting.pricing;
        const performanceState = fxTiPosting.pricing && fxTiPosting.pricing.performance > 0 ? 'positive' : 'negative';
        const performance = fxTiPosting.pricing && fxTiPosting.pricing.performance ? fxTiPosting.pricing.performance : null;
        const latestMid = fxTiPosting.pricing && fxTiPosting.pricing.latestMid ? fxTiPosting.pricing.latestMid : null;
        const isActive = fxTiPosting.pricing && fxTiPosting.pricing.entryPriceMatchedMidAt;
        const renderItem = (dataType, content, isVisible, state) => {
            if (isVisible && content) {
                return (
                    <div className={`proto-idea-meta__item--${state}`}
                         data-tip={dataType}>
                        {content}
                    </div>
                );
            } else {
                return null;
            }
        };

        return (
            <div className="proto-idea-meta">
                {renderItem('Time Horizon', this.getTimeHorizonLabel(), true, 'neutral')}
                {renderItem('Currency Pair', this.state.posting.fxTradeIdeaPosting.currencyPair, true, 'neutral')}
                {renderItem('Product', this.state.posting.fxTradeIdeaPosting.product, true, 'neutral')}
                {renderItem('Status', isActive ? 'Active' : 'Not Active', hasPricing, isActive ? 'positive' : 'neutral')}
                {renderItem('Performance', `${performance}%`, hasPricing, performanceState)}
                {renderItem('Market Mid Price', latestMid, hasPricing, performanceState)}
                {renderItem('Risk Reward Ratio', fxTiPosting.riskRewardRatioFraction, true, performanceState)}
                {renderItem('Trade Action', fxTiPosting.action, true, 'neutral')}
            </div>
        )
    }

    onClickEdit() {
        this.props.onClickEdit(this.state.posting);

        this.scrollToPostingForm();
    }

    scrollToPostingForm() {
        scroller.scrollTo('posting-form', {
            duration: 400,
            delay: 0,
            smooth: 'easeIn'
        })
    }

    renderEditButton() {
        const isPostOwner = this.props.userId === this.props.posting.fromUser.id;
        const editingEnabled = false;

        return isPostOwner && editingEnabled ? (
            <div className="col-xs-2">
                <div className="proto-feed-item__edit">
                    <a data-tip="Edit post"
                       className="fa fa-edit proto-feed-item__edit__icon"
                       onClick={() => this.onClickEdit()} />
                </div>
            </div>
        ) : null;
    }

    renderTradeIdeaPost() {
        const rationales = <ul className="proto-feed-item__rationales">
            {
                this.props.posting.fxTradeIdeaPosting.rationale.split('|').map((rationale, index) => {
                    return (
                        <li key={index}
                            className="proto-feed-item__rationales__rationale"
                            dangerouslySetInnerHTML={createMarkup(rationale)}/>
                    );
                })
            }
        </ul>;

        const feedItemClass = this.state.visibility || this.state.commentsVisibility ? 'proto-feed-item--expanded' : 'proto-feed-item';

        return (
            <div className="col-xs-12">
                <div className={`${feedItemClass} proto-feed-item--idea`}>
                    <div className="proto-feed-item__title">
                        <div className="row middle-xs">
                            <div className="col-xs-12 col-sm-6">
                                <h1 className="proto-feed-item__excerpt__heading"
                                    onClick={() => this.toggleVisibility()}
                                    dangerouslySetInnerHTML={createMarkup(this.state.posting.fxTradeIdeaPosting.ideaName)} />
                            </div>
                            <div className="col-xs-12 col-sm-6">
                                <div className="row">
                                    <div className="col-xs-10">
                                        {this.renderIdeaMeta()}
                                    </div>
                                    {this.renderEditButton()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="proto-feed-item__tags">
                        <a href="" className="proto-feed-item__tags__tag"
                           onClick={(e) => this.props.onClickPostingType(e, this.props.posting.postingType)}>{PostingTypesEnum.hashTagFor(this.props.posting.postingType)}</a>
                        <a href="" className="proto-feed-item__tags__tag"
                           onClick={(e) => this.props.onClickAssetClass(e, this.props.posting.assetClass)}>{HashTagEnum.hashtagFor(this.props.posting.assetClass)}</a>
                        <a href="" className="proto-feed-item__tags__tag"
                           onClick={(e) => this.props.onClickRegion(e, this.props.posting.region)}>{HashTagEnum.hashtagFor(this.props.posting.region)}</a>
                    </div>
                    <div className="proto-price">
                        <div className="row">
                            <div className="col-xs-3">
                                <div className="proto-price-badge">
                                    <div className="proto-price-badge__label">
                                        Entry
                                    </div>
                                    <div className="proto-price-badge__price">
                                        {this.props.posting.fxTradeIdeaPosting.entry}
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-3">
                                <div className="proto-price-badge">
                                    <div className="proto-price-badge__label">
                                        TP Level
                                    </div>
                                    <div className="proto-price-badge__price">
                                        {this.props.posting.fxTradeIdeaPosting.tpLevel}
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-3">
                                <div className="proto-price-badge">
                                    <div className="proto-price-badge__label">
                                        SL Level
                                    </div>
                                    <div className="proto-price-badge__price">
                                        {this.props.posting.fxTradeIdeaPosting.slLevel}
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-3">
                                <div className={`proto-conviction ${this.calculateConvictionClass()}`}>
                                    <div className="proto-conviction__label">
                                        Conviction
                                    </div>
                                    <div className="proto-conviction__level">
                                        {this.props.posting.fxTradeIdeaPosting.convictionLevel}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.visibility ? rationales : null}
                    <MainPostMeta timestamp={this.props.posting.timestamp}
                                  isPrivate={this.props.posting.private_}
                                  privateUsers={this.props.posting.privateUsers}
                                  user={this.state.fromUser}/>
                    <MainPostSocial posting={this.props.posting}
                                    onLike={this.props.onClickLike}
                                    onUnlike={this.props.onClickRemoveLike}
                                    onShare={this.props.onClickShare}
                                    onComment={this.toggleCommentsVisibility.bind(this)}
                                    userId={this.props.userId}/>
                    {this.state.commentsVisibility && <div className="proto-feed-item__comments">
                        <Comments isVisible={true}
                                  postingId={this.props.posting.idHexadecimal}
                                  smallAvatarUrl={this.state.fromUser.smallAvatarUrl}/>
                    </div>}
                </div>
            </div>
        );
    }

    renderCommentaryPost() {
        const feedItemClass = this.state.visibility || this.state.commentsVisibility ? 'proto-feed-item--expanded' : 'proto-feed-item';
        const detailClass = this.state.visibility ? 'proto-feed-item__detail' : 'proto-feed-item__detail--clipped';

        return (
            <div className="col-xs-12">
                <div className={`${feedItemClass} proto-feed-item--commentary`}>
                    <div className="proto-feed-item__title">
                        <div className="row middle-xs">
                            <div className="col-xs-10">
                                <h1 className="proto-feed-item__excerpt__heading"
                                    onClick={() => this.toggleVisibility()}
                                    dangerouslySetInnerHTML={createMarkup(this.state.posting.genericPosting.headline)} />
                            </div>
                            {this.renderEditButton()}
                        </div>
                    </div>
                    <div className="proto-feed-item__tags">
                        <a href="" className="proto-feed-item__tags__tag"
                           onClick={(e) => this.props.onClickPostingType(e, this.props.posting.postingType)}>{PostingTypesEnum.hashTagFor(this.props.posting.postingType)}</a>
                        <a href="" className="proto-feed-item__tags__tag"
                           onClick={(e) => this.props.onClickAssetClass(e, this.props.posting.assetClass)}>{HashTagEnum.hashtagFor(this.props.posting.assetClass)}</a>
                        <a href="" className="proto-feed-item__tags__tag"
                           onClick={(e) => this.props.onClickRegion(e, this.props.posting.region)}>{HashTagEnum.hashtagFor(this.props.posting.region)}</a>
                    </div>
                    <div className={detailClass}
                         onClick={event => this.searchHashTag(event)}
                         dangerouslySetInnerHTML={createMarkup(this.state.posting.genericPosting.content)}/>

                    <MainPostMeta timestamp={this.props.posting.timestamp}
                                  isPrivate={this.props.posting.private_}
                                  privateUsers={this.props.posting.privateUsers}
                                  user={this.state.fromUser}/>
                    <MainPostSocial posting={this.props.posting}
                                    onLike={this.props.onClickLike}
                                    onUnlike={this.props.onClickRemoveLike}
                                    onShare={this.props.onClickShare}
                                    onComment={this.toggleCommentsVisibility.bind(this)}
                                    userId={this.props.userId}/>
                    {this.state.commentsVisibility && <div className="proto-feed-item__comments">
                        <Comments isVisible={true}
                                  postingId={this.props.posting.idHexadecimal}
                                  smallAvatarUrl={this.state.fromUser.smallAvatarUrl}/>
                    </div>}
                </div>
            </div>
        );
    }

    render() {
        const content = this.state.posting.postingType === PostingTypesEnum.TI ? this.renderTradeIdeaPost() : this.renderCommentaryPost();

        return content;
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.user_info_state.user ? state.user_info_state.user.id : undefined,
        filterState: state.filter_state
    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        posting: ownProps.posting,
        onHashTagClick: (hashTagText) => {
            dispatch(filterByPostingText(hashTagText));
        },
        onClick: (e) => {
            e.stopPropagation();
            dispatch(push("view-posting/" + ownProps.posting.idHexadecimal));
        },
        onClickLike: (e) => {
            e.stopPropagation();
            dispatch(postLike(ownProps.posting));
        },
        onClickRemoveLike: (e) => {
            e.stopPropagation();
            dispatch(postRemoveLike(ownProps.posting));
        },
        onClickAssetClass: (e, assetClass: string) => {
            e.preventDefault();
            e.stopPropagation();
            dispatch(addAssetClassToFilter(assetClass));
            dispatch(fetchPostings(true, true));
        },
        onClickRegion: (e, region: string) => {
            e.preventDefault();
            e.stopPropagation();
            dispatch(addRegionToFilter(region));
            dispatch(fetchPostings(true, true));
        },
        onClickPostingType: (e, postingType: string) => {
            e.preventDefault();
            e.stopPropagation();
            dispatch(addPostingTypeToFilter(postingType));
            dispatch(fetchPostings(true, true));
        },
        onClickShare: (e) => {
            e.stopPropagation();

            let headline = null;
            let message = null;
            if (ownProps.posting.isFxTradeIdea()) {
                headline = ownProps.posting.fxTradeIdeaPosting.ideaName;
                message = "";
            } else {
                headline = ownProps.posting.genericPosting.headline;
                message = ownProps.posting.genericPosting.content;
            }

            symphonyServices.share(
                HashTagEnum.labelFor(ownProps.posting.assetClass) + ' ' + PostingTypesEnum.labelFor(ownProps.posting.postingType).toLowerCase() + ' has been shared with you about...',
                stripTagsOut(headline),
                stripTagsOut(message),
                ownProps.posting.timestamp,
                '',
                ownProps.posting.fromUser ? ownProps.posting.fromUser.displayName : SymUser.DEFAULT_USERNAME,
                ownProps.posting.idHexadecimal
            );
            dispatch(incrementShares(ownProps.posting));
        },
        onClickComment: (e) => {
            e.stopPropagation();
            dispatch(fetchPostingComments(ownProps.posting.idHexadecimal, true));
        },
        onClickEdit: (posting: Posting) => {
            dispatch(togglePostingForm(posting.postingType));
            dispatch(openInPostingForm(posting));
        }
    }
};

export const MainPost = connect(mapStateToProps, mapDispatchToProps)(MainPostDisplay);