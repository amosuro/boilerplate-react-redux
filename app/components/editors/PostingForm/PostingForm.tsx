import * as React from "react";
import {connect} from "react-redux";
import {convertFromRaw} from "draft-js";
import {stateToHTML} from "draft-js-export-html";
import * as Collapse from "react-collapse";
import * as _ from "underscore";
import { Element } from 'react-scroll';
import * as moment from 'moment';

import {
    API_MESSAGES,
    API_MESSAGES_UPDATE,
    FAIL_REC_POSTINGS_NEW,
    REC_POSTINGS_NEW,
    REC_USER_PROFILE,
    REQ_POSTINGS_NEW
} from "../../postings/Main/Main";
import {
    Posting,
    FxTradeIdeaPosting,
    GenericPosting,
    HashTagEnum,
    PostingTypesEnum,
    PostPreference,
    Response,
    SymUser
} from "../../../models";
import {fetchWrapper} from "../../fetch-wrapper";
import {isEmpty} from "../../../message-ml/utils";

import PrivacyToggle from "../PrivacyToggle/PrivacyToggle";
import Dropdown from "../../common/Dropdown/Dropdown";
import LargeTextArea from "../LargeTextArea/LargeTextArea";
import PostTypeSelector from "../PostTypeSelector/PostTypeSelector";
import Input from "../../common/Input/Input";
import Bullets from "../Bullets/Bullets";
import Button from "../../common/Button/Button";
import DualInput from "../DualInput/DualInput";
import HashTags from "../HashTags/HashTags";
import HashTagRating from "../HashTagRating/HashTagRating";

export interface PostingFormProps {
    postingForm: PostingFormState;
    postPreference: PostPreference;
    smallAvatarUrl: string;
    userId: number;
    dispatch: any;

    handleAssetClassChange: any;
    handleRegionChange: any;
    handlePrivacyChange: any;
    handlePrivateUsersChange: any;

    handleHeadlineChange: any;
    handleContentChange: any;
    handleHashtagChange: any;

    handleIdeaNameChange: any;
    handleCurrencyPairChange: any;
    handleEndDateChange: any;
    handleProductChange: any;
    handleTimeHorizonChange: any;
    handleActionChange: any;
    handleEntryChange: any;
    handleTpLevelChange: any;
    handleSlLevelChange: any;
    handleRationaleUpdate: any;
    handleRationaleRemove: any;
    handleRationaleAdd: any;
    handleConvictionLevelChange: any;
    handlePostTypeChange: any;

    onInitialFormLoad: any;

    submit: any;
    updateForm: any;
}

interface PostingFormInternalState {
    options?: Array<SymUser>;
    isLoading?: boolean;
    formValidation?: any;
}

export class PostingFormDisplay extends React.Component<PostingFormProps, PostingFormInternalState> {
    constructor(props: PostingFormProps) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.validateForm = this.validateForm.bind(this);

        this.handleAssetClassChange = this.handleAssetClassChange.bind(this);
        this.handleRegionChange = this.handleRegionChange.bind(this);

        this.handlePrivacyChange = this.handlePrivacyChange.bind(this);
        this.handlePrivateUsersChange = this.handlePrivateUsersChange.bind(this);
        this.onInputChangePrivateUsers = this.onInputChangePrivateUsers.bind(this);
        this.renderPrivateUserValue = this.renderPrivateUserValue.bind(this);

        this.handleHeadlineChange = this.handleHeadlineChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.detectHashtags = this.detectHashtags.bind(this);

        this.handleIdeaNameChange = this.handleIdeaNameChange.bind(this);
        this.handleCurrencyPairChange = this.handleCurrencyPairChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleCurrencyPairBlur = this.handleCurrencyPairBlur.bind(this);
        this.handleProductChange = this.handleProductChange.bind(this);
        this.handleTimeHorizonChange = this.handleTimeHorizonChange.bind(this);
        this.handleActionChange = this.handleActionChange.bind(this);
        this.handleEntryChange = this.handleEntryChange.bind(this);
        this.handleEntryBlur = this.handleEntryBlur.bind(this);
        this.handleIdeaNameBlur = this.handleIdeaNameBlur.bind(this);
        this.handleHeadlineBlur = this.handleHeadlineBlur.bind(this);
        this.handleContentBlur = this.handleContentBlur.bind(this);
        this.handleTpLevelChange = this.handleTpLevelChange.bind(this);
        this.handleTpLevelBlur = this.handleTpLevelBlur.bind(this);
        this.handleSlLevelChange = this.handleSlLevelChange.bind(this);
        this.handleSlLevelBlur = this.handleSlLevelBlur.bind(this);
        this.handleRationaleUpdate = this.handleRationaleUpdate.bind(this);
        this.handleRationaleRemove = this.handleRationaleRemove.bind(this);
        this.handleRationaleAdd = this.handleRationaleAdd.bind(this);
        this.handleConvictionLevelChange = this.handleConvictionLevelChange.bind(this);

        this.state = {
            options: this.props.postPreference ? this.props.postPreference.privateUsers : [],
            isLoading: false,
            formValidation: {}
        };
    }

    componentDidMount() {
        this.props.onInitialFormLoad();
    }

    validateForm(): boolean {

        if (this.props.postingForm.private_ && (!this.props.postingForm.privateUsers || this.props.postingForm.privateUsers.length === 0)) {
            this.setState({formValidation: {privateUsersEmpty: true}});
            return false;
        }

        // FX Trade Idea
        if (this.props.postingForm.postingType === PostingTypesEnum.TI && this.props.postingForm.assetClass === HashTagEnum.FX) {

            let fxTradeIdeaPosting = this.props.postingForm.fxTradeIdeaPosting;
            if (isEmpty(fxTradeIdeaPosting.ideaName)) {
                this.setState({formValidation: {ideaNameEmpty: true}});
                return false;
            }
            if (isEmpty(fxTradeIdeaPosting.currencyPair)) {
                this.setState({formValidation: {currencyPairEmpty: true}});
                return false;
            }
            if ((fxTradeIdeaPosting.currencyPair.length !== 6 || fxTradeIdeaPosting.currencyPair.match(/[^A-Za-z]/g))) {
                this.setState({formValidation: {currencyPairLength: true}});
                return false;
            }
            if (isEmpty(fxTradeIdeaPosting.entry)) {
                this.setState({formValidation: {entryEmpty: true}});
                return false;
            }
            if (isEmpty(fxTradeIdeaPosting.tpLevel)) {
                this.setState({formValidation: {tpLevelEmpty: true}});
                return false;
            }
            if (isEmpty(fxTradeIdeaPosting.slLevel)) {
                this.setState({formValidation: {slLevelEmpty: true}});
                return false;
            }
            if (isEmpty(fxTradeIdeaPosting.rationale)) {
                this.setState({formValidation: {rationaleEmpty: true}});
                return false;
            }
            if (isEmpty(fxTradeIdeaPosting.endDate)) {
                this.setState({formValidation: {endDate: true}});
                return false;
            }

        } else {

            if (isEmpty(this.props.postingForm.genericPosting.headline)) {
                this.setState({formValidation: {headlineEmpty: true}});
                return false;
            }
            if (isEmpty(this.props.postingForm.genericPosting.content)) {
                this.setState({formValidation: {contentEmpty: true}});
                return false;
            }

        }

        return true;
    };

    resetFormValidation(): void {
        this.setState({
            formValidation: {
                privateUsersEmpty: false,
                headlineEmpty: false,
                contentEmpty: false
            }
        });
    };

    handleAssetClassChange(value) {
        this.props.handleAssetClassChange(value);
        this.resetFormValidation();
    };

    handleRegionChange(value) {
        this.props.handleRegionChange(value);
        this.resetFormValidation();
    };

    handlePrivacyChange() {
        this.props.handlePrivacyChange();
        this.resetFormValidation();
    };

    handlePrivateUsersChange(privateUsers: Array<SymUser>) {
        this.props.handlePrivateUsersChange(privateUsers);
        this.resetFormValidation();
    };

    onSubmit(e) {
        e.preventDefault();

        if (!this.validateForm()) {
            return;
        }

        this.props.submit(this.props.postingForm);
    };

    onUpdate(e) {
        e.preventDefault();

        if (!this.validateForm()) {
            return;
        }

        this.props.updateForm(this.props.postingForm);
    };

    handleCancelClick(e) {
        e.preventDefault();
        this.props.dispatch(clearForm());

        if (this.props.postingForm.postingType === 'TI') {
            this.props.dispatch(togglePostingForm('TI'));
        } else {
            this.props.dispatch(togglePostingForm('C'));
        }

        this.resetFormValidation();
    };

    renderUserOption(option: SymUser) {
        return (
            <div className="media">
                {/*<div className="media-left">*/}
                {/*   <img className="media-object avatar" src={option.smallAvatarUrl}/>*/}
                {/*</div>*/}
                <div className="media-body">
                    {option.displayName} ({option.emailAddress})
                </div>
            </div>
        )
    };

    renderPrivateUserValue(value: SymUser) {
        return <div className="Select-value">
            <span className="Select-value-icon" aria-hidden="true">×</span>
            <span className="Select-value-label" role="option" aria-selected="true" id="react-select-2--value-2">
                {value.displayName}<span className="Select-aria-only">&nbsp;</span>
            </span>
        </div>
    }

    onInputChangePrivateUsers(input: string): string {
        if (!input || input.length < 4) {
            return;
        }

        this.setState({isLoading: true});

        const isEmailSearch = input.indexOf('@') > -1;

        fetchWrapper("/api/user?query=" + input)
            .then(response => response.json())
            .then(json => {
                let privateUsers = _.filter(json, (user: SymUser) => {
                    return user.id !== this.props.userId;
                });

                privateUsers = _.map(privateUsers, (user: SymUser) => {
                    if (user.id !== this.props.userId) {
                        return new SymUser(user.id, user.displayName, user.emailAddress, null, user.invalid);
                    }
                });

                if (isEmailSearch) {
                    // only adds users that haven't been selected yet
                    _.each(privateUsers, (privateUser: SymUser) => {
                        const privateUserAlreadySelected = _.find(this.props.postingForm.privateUsers, (propsPrivateUser: SymUser) => {
                            return propsPrivateUser.emailAddress === privateUser.emailAddress;
                        });
                        if (!privateUserAlreadySelected) {
                            this.props.postingForm.privateUsers.push(privateUser);
                        }
                    });

                    this.props.dispatch(updatePrivateUsers(this.props.postingForm.privateUsers));
                    this.setState({options: null, isLoading: false});
                } else {
                    this.setState({options: privateUsers, isLoading: false});
                }
            });

        return isEmailSearch ? "" : input;
    }

    /* GENERAL POSTING START ========================================*/
    handleHeadlineChange(e) {
        this.props.handleHeadlineChange(e.target.value);
        this.resetFormValidation();
    };

    handleContentChange(content) {
        const contentState = convertFromRaw(JSON.parse(content));
        const html = stateToHTML(contentState);

        this.props.handleContentChange(html);
        this.detectHashtags(contentState.getPlainText());
    };

    detectHashtags(textContent) {
        if (textContent.length > 2) {
            const hashtags = this.findHashTags(textContent);

            this.props.handleHashtagChange(hashtags);
        } else if (textContent.length < 1) {
            this.props.handleHashtagChange([]);
        }
    }

    findHashTags(textContent) {
        const arrayOfWords = textContent.replace(/\n/g, ' ').split(' ');
        const hashTags = arrayOfWords.filter((word, index) => word[0] === '#' && word.length > 1);
        const uniqueHashTags = hashTags.filter((value, index, self) => self.indexOf(value) === index);

        return uniqueHashTags;
    }

    /* GENERAL POSTING END ========================================*/

    /* TRADE IDEA POSTING START ========================================*/
    handleIdeaNameChange(e) {
        this.props.handleIdeaNameChange(e.target.value);
        this.resetFormValidation();
    };

    handleCurrencyPairChange(e) {
        this.props.handleCurrencyPairChange(e.target.value);
        this.resetFormValidation();
    };

    handleEndDateChange(isoString) {
        this.props.handleEndDateChange(isoString);
        this.resetFormValidation();
    };

    handleCurrencyPairBlur(e) {
        const value = e.target.value;
        if (value && (value.length !== 6 || value.match(/[^A-Za-z]/g))) {
            this.setState({formValidation: {currencyPairLength: true}});
        }
    };

    handleProductChange(value) {
        this.props.handleProductChange(value);
        this.resetFormValidation();
    };

    handleTimeHorizonChange(value) {
        if (value === 'BROKEN_DATE') {
            this.props.handleEndDateChange(moment().toISOString());
        } else {
            this.props.handleEndDateChange(null);
        }

        this.props.handleTimeHorizonChange(value);
        this.resetFormValidation();
    };

    handleActionChange(value) {
        this.props.handleActionChange(value);
        this.resetFormValidation();
    }

    handleEntryChange(e) {
        this.props.handleEntryChange(this.enforceMax4Digits(e.target.value));
        this.resetFormValidation();
    };

    handleEntryBlur(e) {
        const value = e.target.value;
        if (!this.isNumeric(value)) {
            this.setState({formValidation: {entryInvalid: true}});
        }
        else {
            this.props.handleEntryChange(parseFloat(value).toFixed(4));
            this.resetFormValidation();
        }
    };

    handleIdeaNameBlur(e) {
        const value = e.target.value;

        if (!value.length) {
            this.setState({
                formValidation: {
                    ideaNameEmpty: true
                }
            });
        }
    };

    handleHeadlineBlur(e) {
        const value = e.target.value;

        this.setState({
            formValidation: {
                headlineEmpty: !value.length
            }
        });
    };

    handleContentBlur(contentState) {
        this.setState({
            formValidation: {
                contentEmpty: !contentState.hasText()
            }
        });
    };

    handleTpLevelChange(e) {
        this.props.handleTpLevelChange(this.enforceMax4Digits(e.target.value));
        this.resetFormValidation();
    };

    handleTpLevelBlur(e) {
        const value = e.target.value;
        if (!this.isNumeric(value)) {
            this.setState({formValidation: {tpLevelInvalid: true}});
        }
        else {
            this.props.handleTpLevelChange(parseFloat(value).toFixed(4));
            this.resetFormValidation();
        }
    };

    handleSlLevelChange(e) {
        this.props.handleSlLevelChange(this.enforceMax4Digits(e.target.value));
        this.resetFormValidation();
    };

    handleSlLevelBlur(e) {
        const value = e.target.value;
        if (!this.isNumeric(value)) {
            this.setState({formValidation: {slLevelInvalid: true}});
        }
        else {
            this.props.handleSlLevelChange(parseFloat(value).toFixed(4));
            this.resetFormValidation();
        }
    };

    handleRationaleUpdate(e, rationaleToUpdate) {
        const newValue = e.target.value;
        this.props.handleRationaleUpdate(newValue, rationaleToUpdate);
        this.resetFormValidation();
    };

    handleRationaleRemove(rationale) {
        this.props.handleRationaleRemove(rationale);
        this.resetFormValidation();
    };

    handleRationaleAdd(rationale) {
        this.props.handleRationaleAdd(rationale);
        this.resetFormValidation();
    };

    handleConvictionLevelChange(value) {
        this.props.handleConvictionLevelChange(value);
        this.resetFormValidation();
    };

    isNumeric(value: any): boolean {
        return !isNaN(value - parseFloat(value));
    };

    enforceMax4Digits(value) {
        return value.indexOf('.') > -1 ?
            value.substring(0, Math.min(value.lastIndexOf('.') + 5, value.length))
            : value
    }

    /* TRADE IDEA POSTING END ========================================*/

    assetClassOptions() {
        return [
            {id: HashTagEnum.FX, label: HashTagEnum.labelFor(HashTagEnum.FX), active: true},
            {id: HashTagEnum.FXO, label: HashTagEnum.labelFor(HashTagEnum.FXO), active: false},
            {id: HashTagEnum.RATES, label: HashTagEnum.labelFor(HashTagEnum.RATES), active: false},
            {id: HashTagEnum.CREDIT, label: HashTagEnum.labelFor(HashTagEnum.CREDIT), active: false},
            {id: HashTagEnum.EQUITIES, label: HashTagEnum.labelFor(HashTagEnum.EQUITIES), active: false},
            {id: HashTagEnum.COMMODITIES, label: HashTagEnum.labelFor(HashTagEnum.COMMODITIES), active: false}
        ]
    }

    regionOptions() {
        return [
            {id: HashTagEnum.GLOBAL, label: HashTagEnum.labelFor(HashTagEnum.GLOBAL), active: true},
            {id: HashTagEnum.AMERICAS, label: HashTagEnum.labelFor(HashTagEnum.AMERICAS), active: false},
            {id: HashTagEnum.APAC, label: HashTagEnum.labelFor(HashTagEnum.APAC), active: false},
            {id: HashTagEnum.EMEA, label: HashTagEnum.labelFor(HashTagEnum.EMEA), active: false}
        ]
    }

    convictionLevelOptions() {
        return [
            {id: '<60%', label: '<60% Conviction', active: true},
            {id: '60-80%', label: '60-80% Conviction', active: false},
            {id: '>80%', label: '>80% Conviction', active: false}
        ]
    }

    productOptions() {
        return [
            {id: 'SPOT', label: 'Spot', active: true},
            {id: 'NDF', label: 'NDF', active: false},
            {id: 'SWAP', label: 'Swap', active: false},
            {id: 'FORWARDS', label: 'Forwards', active: false}
        ]
    }

    timeHorizonOptions() {
        return [
            {id: 'ONE_WEEK', label: '1W', active: true},
            {id: 'TWO_WEEK', label: '2W', active: true},
            {id: 'THREE_WEEK', label: '3W', active: true},
            {id: 'ONE_MONTH', label: '1M', active: false},
            {id: 'TWO_MONTH', label: '2M', active: false},
            {id: 'THREE_MONTH', label: '3M', active: false},
            {id: 'FOUR_MONTH', label: '4M', active: false},
            {id: 'FIVE_MONTH', label: '5M', active: false},
            {id: 'SIX_MONTH', label: '6M', active: false},
            {id: 'SEVEN_MONTH', label: '7M', active: false},
            {id: 'EIGHT_MONTH', label: '8M', active: false},
            {id: 'NINE_MONTH', label: '9M', active: false},
            {id: 'TEN_MONTH', label: '10M', active: false},
            {id: 'ELEVEN_MONTH', label: '11M', active: false},
            {id: 'ONE_YEAR', label: '1Y', active: false},
            {id: 'BROKEN_DATE', label: 'Custom', active: false}
        ]
    }

    actionOptions() {
        return [
            {id: 'BUY', label: 'Buy', active: true},
            {id: 'SELL', label: 'Sell', active: false}
        ]
    }

    renderCommentaryForm() {
        return (
            <div>
                <div className="row bottom-xs">
                    <div className="col-xs-8">
                        <div className="row">
                            <div className="col-xs-3">
                                <Dropdown name="Regions"
                                          value={this.props.postingForm.region}
                                          items={this.regionOptions()}
                                          onClick={this.handleRegionChange}/>
                            </div>
                            <div className="col-xs-3">
                                <Dropdown name="Asset Class"
                                          value={this.props.postingForm.assetClass}
                                          items={this.assetClassOptions()}
                                          onClick={this.handleAssetClassChange}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-4">
                        <PrivacyToggle isPrivate={this.props.postingForm.private_}
                                       privateUsers={this.props.postingForm.privateUsers}
                                       options={this.state.options}
                                       optionRenderer={this.renderUserOption}
                                       isLoading={this.state.isLoading}
                                       onInputChange={this.onInputChangePrivateUsers}
                                       onPrivateUsersChange={this.handlePrivateUsersChange}
                                       onPrivacyChange={this.handlePrivacyChange}/>
                        <Collapse isOpened={!!this.state.formValidation.privateUsersEmpty}
                                  className="invalid-form-field-message">
                            Private postings require at least one recipient user
                        </Collapse>
                    </div>
                </div>
                <DualInput activeType={this.props.postingForm.postingType}
                           inputValue={this.props.postingForm.genericPosting.headline}
                           textAreaValue={this.props.postingForm.genericPosting.content}
                           updateType={this.props.handlePostTypeChange}
                           validateInput={this.handleHeadlineBlur}
                           validateTextArea={this.handleContentBlur}
                           inputInvalid={!!this.state.formValidation.headlineEmpty}
                           textAreaInvalid={!!this.state.formValidation.contentEmpty}
                           invalidInputText="Please enter a headline for your post"
                           invalidTextAreaText="Please enter your post content"
                           updateInput={this.handleHeadlineChange}
                           updateTextArea={this.handleContentChange} />
            </div>
        );
    }

    renderTradeIdeaForm() {
        const styles = {
            position: 'relative'
        };

        return (
            <div>
                <div className="row spacing-small-top spacing-small-bottom">
                    <div className="col-xs-8">
                        <div className="row">
                            <div className="col-xs-3">
                                <Dropdown name="Region"
                                          value={this.props.postingForm.region}
                                          items={this.regionOptions()}
                                          onClick={this.handleRegionChange} />
                            </div>
                            <div className="col-xs-3">
                                <Dropdown name="Asset Class"
                                          value={this.props.postingForm.assetClass}
                                          items={this.assetClassOptions()}
                                          lockItemId={HashTagEnum.FX}
                                          onClick={this.handleAssetClassChange}/>
                            </div>
                            <div className="col-xs-3">
                                <Dropdown name="Conviction"
                                          value={this.props.postingForm.fxTradeIdeaPosting.convictionLevel}
                                          items={this.convictionLevelOptions()}
                                          onClick={this.handleConvictionLevelChange}/>
                            </div>
                            <div className="col-xs-3">
                                <Dropdown name="Product"
                                          value={this.props.postingForm.fxTradeIdeaPosting.product}
                                          items={this.productOptions()}
                                          onClick={this.handleProductChange}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-4">
                        <PrivacyToggle isPrivate={this.props.postingForm.private_}
                                       privateUsers={this.props.postingForm.privateUsers}
                                       options={this.state.options}
                                       optionRenderer={this.renderUserOption}
                                       isLoading={this.state.isLoading}
                                       onInputChange={this.onInputChangePrivateUsers}
                                       onPrivateUsersChange={this.handlePrivateUsersChange}
                                       onPrivacyChange={this.handlePrivacyChange}/>
                        <Collapse isOpened={!!this.state.formValidation.privateUsersEmpty}
                                  className="invalid-form-field-message">
                            Private postings require at least one recipient user
                        </Collapse>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <div style={styles}>
                            <PostTypeSelector activeType={this.props.postingForm.postingType}
                                              updateType={this.props.handlePostTypeChange}/>
                            <LargeTextArea rows={1}
                                           value={this.props.postingForm.fxTradeIdeaPosting.ideaName}
                                           placeholder="Give your idea a title..."
                                           shouldResize={false}
                                           detectHashtags={false}
                                           onChange={this.handleIdeaNameChange}
                                           onBlur={this.handleIdeaNameBlur}
                                           className="test-headline-input"/>
                            <Collapse isOpened={!!this.state.formValidation.ideaNameEmpty} className="invalid-form-field-message">
                                Please enter an Idea Name
                            </Collapse>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-5">
                        <div className="row">
                            <div className="col-xs-4">
                                <div className="spacing-small-top spacing-small-bottom">
                                    <Input value={this.props.postingForm.fxTradeIdeaPosting.entry}
                                           name="price"
                                           placeholder="Entry price"
                                           type="text"
                                           onChange={this.handleEntryChange}
                                           onBlur={this.handleEntryBlur}
                                           isInvalid={this.state.formValidation.entryEmpty || this.state.formValidation.entryInvalid}
                                           invalidText="Please enter an Entry price in the format: 0.0000"
                                           className="test-entryprice-input"/>
                                </div>
                            </div>
                            <div className="col-xs-4">
                                <div className="spacing-small-top spacing-small-bottom">
                                    <Input value={this.props.postingForm.fxTradeIdeaPosting.tpLevel}
                                           name="tpLevel"
                                           placeholder="TP Level"
                                           type="text"
                                           onChange={this.handleTpLevelChange}
                                           onBlur={this.handleTpLevelBlur}
                                           isInvalid={this.state.formValidation.tpLevelEmpty || this.state.formValidation.tpLevelInvalid}
                                           invalidText="Please enter a TP Level price in the format: 0.0000"
                                           className="test-tplevel-input"/>
                                </div>
                            </div>
                            <div className="col-xs-4">
                                <div className="spacing-small-top spacing-small-bottom">
                                    <Input value={this.props.postingForm.fxTradeIdeaPosting.slLevel}
                                           name="slLevel"
                                           placeholder="SL Level"
                                           type="text"
                                           onChange={this.handleSlLevelChange}
                                           onBlur={this.handleSlLevelBlur}
                                           isInvalid={this.state.formValidation.slLevelEmpty || this.state.formValidation.slLevelInvalid}
                                           invalidText="Please enter a SL Level price in the format: 0.0000"
                                           className="test-sllevel-input"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-4">
                                <div className="spacing-small-top spacing-small-bottom">
                                    <Dropdown name="Action"
                                              value={this.props.postingForm.fxTradeIdeaPosting.action}
                                              items={this.actionOptions()}
                                              onClick={this.handleActionChange}
                                              className="test-action-input"/>
                                </div>
                            </div>
                            <div className="col-xs-4">
                                <div className="spacing-small-top spacing-small-bottom">
                                    <Input value={this.props.postingForm.fxTradeIdeaPosting.currencyPair}
                                           name="currency"
                                           placeholder="Enter six letters only e.g. AUDNZD"
                                           type="text"
                                           onChange={this.handleCurrencyPairChange}
                                           onBlur={this.handleCurrencyPairBlur}
                                           isInvalid={this.state.formValidation.currencyPairEmpty || this.state.formValidation.currencyPairLength}
                                           invalidText="Please enter a 6 character currency"
                                           maxLength={6}
                                           className="test-currencypair-input"/>
                                </div>
                            </div>
                            <div className="col-xs-4">
                                <div className="spacing-small-top spacing-small-bottom">
                                    <Dropdown name="Time Horizon"
                                              value={this.props.postingForm.fxTradeIdeaPosting.timeHorizon}
                                              items={this.timeHorizonOptions()}
                                              onClick={this.handleTimeHorizonChange}
                                              className="test-timehorizon-input"/>
                                    <Collapse isOpened={!!this.props.postingForm.fxTradeIdeaPosting.endDate}>
                                        <Input value={this.props.postingForm.fxTradeIdeaPosting.endDate}
                                               name="endDate"
                                               placeholder="End Date"
                                               type="date"
                                               onChange={this.handleEndDateChange}
                                               isInvalid={this.state.formValidation.endDateEmpty}
                                               invalidText="Please enter an end date"
                                               className="test-endDate-input"/>
                                    </Collapse>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-7">
                        <div className="spacing-small-top spacing-small-bottom">
                            <Bullets addNew={this.handleRationaleAdd}
                                     remove={this.handleRationaleRemove}
                                     update={this.handleRationaleUpdate}
                                     bullets={this.props.postingForm.fxTradeIdeaPosting.rationale}
                                     className="test-rationale-input"/>
                            <Collapse isOpened={!!this.state.formValidation.rationaleEmpty}
                                      className="invalid-form-field-message">
                                Please enter a Rationale
                            </Collapse>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <form onSubmit={(e) => this.props.postingForm.editMode ? this.onUpdate(e) : this.onSubmit(e)}
                  id="posting_form"
                  className="form-horizontal">
                <Element name="posting-form">
                    <div className="row">
                        <div className="col-xs-12">
                            {this.props.postingForm.editMode ? <h4>Currently editing: </h4> : null}
                        </div>
                    </div>
                    { this.props.postingForm.postingType === PostingTypesEnum.TI ? this.renderTradeIdeaForm() : this.renderCommentaryForm() }
                    <div className="row">
                        <div className="col-xs-8 col-sm-4">
                            {this.props.postingForm.postingType === PostingTypesEnum.C ?
                                <HashTags hashTags={this.props.postingForm.commentaryHashtags}/> : null}
                        </div>
                        <div className="col-xs-4 col-sm-4">
                            {this.props.postingForm.postingType === PostingTypesEnum.C ?
                                <HashTagRating hashTags={this.props.postingForm.commentaryHashtags}/> : null}
                        </div>
                        <div className="col-xs-6 col-sm-2 spacing-large-bottom">
                            <Button label={this.props.postingForm.editMode ? 'Cancel' : 'Reset'}
                                    type="reset"
                                    bgColor="#5f5f5f"
                                    clickAction={this.handleCancelClick}
                                    className="test-reset-btn" />
                        </div>
                        <div className="col-xs-6 col-sm-2 spacing-large-bottom">
                            <Button label={this.props.postingForm.editMode ? 'Update' : 'Post'}
                                    type="submit"
                                    bgColor="#04753b"
                                    className="test-post-btn"/>
                        </div>
                    </div>
                </Element>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        postingForm: state.postingFormState,
        postPreference: state.user_profile_state.postPreference,
        smallAvatarUrl: state.user_profile_state.smallAvatarUrl,
        userId: state.user_info_state.user ? state.user_info_state.user.id : undefined
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch,

        handleAssetClassChange: (value: string) => {
            dispatch(updateAssetClass(value));
        },
        handleRegionChange: (value: string) => {
            dispatch(updateRegion(value));
        },
        handlePrivacyChange: () => {
            dispatch(togglePrivacy());
        },
        handlePrivateUsersChange(privateUsers: Array<SymUser>) {
            dispatch(updatePrivateUsers(privateUsers));
        },

        handleHeadlineChange: (headline: string) => {
            dispatch(updateHeadline(headline));
        },
        handleContentChange(content: string) {
            dispatch(updateContent(content));
        },
        handleHashtagChange(content: string[]) {
            dispatch(updateHashtags(content));
        },
        handleIdeaNameChange: (value: string) => {
            dispatch(updateIdeaName(value));
        },
        handleCurrencyPairChange: (value: string) => {
            dispatch(updateCurrencyPair(value));
        },
        handleEndDateChange: (value: string) => {
            dispatch(updateEndDate(value));
        },
        handleProductChange: (value: string) => {
            dispatch(updateProduct(value));
        },
        handleTimeHorizonChange: (value: string) => {
            dispatch(updateTimeHorizon(value));
        },
        handleActionChange: (value: string) => {
            dispatch(updateAction(value));
        },
        handleEntryChange: (value: string) => {
            dispatch(updateEntry(value));
        },
        handleTpLevelChange: (value: string) => {
            dispatch(updateTpLevel(value));
        },
        handleSlLevelChange: (value: string) => {
            dispatch(updateSlLevel(value));
        },
        handleRationaleUpdate: (value: string, rationaleToUpdate: string) => {
            dispatch(updateRationale(value, rationaleToUpdate));
        },
        handleRationaleRemove: (index: number) => {
            dispatch(deleteRationale(index));
        },
        handleRationaleAdd: (value: string) => {
            dispatch(addRationale(value));
        },
        handleConvictionLevelChange: (value: string) => {
            dispatch(updateConvictionLevel(value));
        },
        handlePostTypeChange: (type: string) => {
            dispatch(clearForm());

            if (type === 'TI') {
                dispatch(updateAssetClass('FX'));
            }

            dispatch(togglePostingForm(type));
        },
        onInitialFormLoad: () => {
            dispatch(togglePostingForm('C'));
        },
        submit: (postingForm: PostingFormState) => {
            dispatch(createPosting(postingForm));
        },
        updateForm: (postingForm: PostingFormState) => {
            dispatch(updatePosting(postingForm));
        }
    }
};

export const PostingForm = connect(mapStateToProps, mapDispatchToProps)(PostingFormDisplay);

const CLEAR_FORM = 'CLEAR_FORM';
const CLOSE_POSTING_FORM = 'CLOSE_POSTING_FORM';
const UPDATE_ASSET_CLASS = 'UPDATE_ASSET_CLASS';
const UPDATE_REGION = 'UPDATE_REGION';
const TOGGLE_PRIVACY = 'UPDATE_PRIVACY';
const UPDATE_PRIVATE_USER = 'UPDATE_PRIVATE_USER';
const TOGGLE_POSTING_FORM = 'TOGGLE_POSTING_FORM';

const UPDATE_HEADLINE = 'UPDATE_HEADLINE';
const UPDATE_CONTENT = 'UPDATE_MESSAGE';
const UPDATE_HASHTAGS = 'UPDATE_HASHTAGS';

const UPDATE_IDEA_NAME = 'UPDATE_IDEA_NAME';
const UPDATE_ORDER_TYPE = 'UPDATE_ORDER_TYPE';
const UPDATE_CURRENCY_PAIR = 'UPDATE_CURRENCY_PAIR';
const UPDATE_END_DATE = 'UPDATE_END_DATE';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const UPDATE_TIME_HORIZON = 'UPDATE_TIME_HORIZON';
const UPDATE_ACTION = 'UPDATE_ACTION';
const UPDATE_ENTRY = 'UPDATE_ENTRY';
const UPDATE_TP_LEVEL = 'UPDATE_TP_LEVEL';
const UPDATE_SL_LEVEL = 'UPDATE_SL_LEVEL';
const UPDATE_RATIONALE = 'UPDATE_RATIONALE';
const DELETE_RATIONALE = 'DELETE_RATIONALE';
const ADD_RATIONALE = 'ADD_RATIONALE';
const UPDATE_CONVICTION_LEVEL = 'UPDATE_CONVICTION_LEVEL';
const UPDATE_STATUS = 'UPDATE_STATUS';
const UPDATE_STATUS_RATIONALE = 'UPDATE_STATUS_RATIONALE';
const OPEN_IN_POSTING_FORM = 'OPEN_IN_POSTING_FORM';
const TOGGLE_EDIT_MODE = 'TOGGLE_EDIT_MODE';

export class PostingFormState {

    public static DEFAULT_STATE = new PostingFormState("C", HashTagEnum.FX, HashTagEnum.GLOBAL, false, [], [], false);

    postingType: string; // C, TI
    assetClass: string;
    region: string;
    private_: boolean;
    privateUsers: Array<SymUser>;

    genericPosting: GenericPosting = GenericPosting.DEFAULT_GENERAL_POSING;
    fxTradeIdeaPosting: FxTradeIdeaPosting = FxTradeIdeaPosting.DEFAULT_FX_TRADE_IDEA_POSTING;

    commentaryHashtags: any;
    editMode: boolean;

    constructor(postingType: string, assetClass: string,
                region: string, private_: boolean, privateUsers: Array<SymUser>, commentaryHashtags: string[], editMode: boolean) {
        this.postingType = postingType;
        this.assetClass = assetClass;
        this.region = region;
        this.private_ = private_;
        this.privateUsers = privateUsers;
        this.commentaryHashtags = commentaryHashtags;
        this.editMode = editMode;
    }

    clone(): PostingFormState {
        let postingFormState = new PostingFormState(this.postingType, this.assetClass, this.region, this.private_, this.privateUsers, [], this.editMode);
        postingFormState.genericPosting = this.genericPosting.clone();
        postingFormState.fxTradeIdeaPosting = this.fxTradeIdeaPosting.clone();
        return postingFormState;
    }

}
export const postingFormState = (state: PostingFormState = new PostingFormState("C", HashTagEnum.FX, HashTagEnum.GLOBAL, false, [], [], false), action: any): PostingFormState => {
    switch (action.type) {
        case UPDATE_ASSET_CLASS: {
            let postingFormState = state.clone();
            postingFormState.assetClass = action.assetClass;
            return postingFormState;
        }
        case UPDATE_REGION: {
            let postingFormState = state.clone();
            postingFormState.region = action.region;
            return postingFormState;
        }
        case TOGGLE_PRIVACY: {
            let postingFormState = state.clone();
            postingFormState.private_ = !postingFormState.private_;
            return postingFormState;
        }
        case UPDATE_PRIVATE_USER: {
            let postingFormState = state.clone();
            postingFormState.privateUsers = action.privateUsers;
            return postingFormState;
        }

        case UPDATE_HEADLINE: {
            let postingFormState = state.clone();
            postingFormState.genericPosting.headline = action.headline;
            return postingFormState;
        }
        case UPDATE_CONTENT: {
            let postingFormState = state.clone();
            postingFormState.genericPosting.content = action.content;
            return postingFormState;
        }
        case UPDATE_HASHTAGS: {
            let postingFormState = state.clone();
            postingFormState.commentaryHashtags = action.content;
            return postingFormState;
        }
        case UPDATE_IDEA_NAME: {
            const postingFormState = state.clone();
            postingFormState.fxTradeIdeaPosting.ideaName = action.ideaName;
            return postingFormState;
        }
        case UPDATE_CURRENCY_PAIR: {
            const postingFormState = state.clone();
            postingFormState.fxTradeIdeaPosting.currencyPair = action.currencyPair;
            return postingFormState;
        }
        case UPDATE_END_DATE: {
            const postingFormState = state.clone();
            postingFormState.fxTradeIdeaPosting.endDate = action.endDate;
            return postingFormState;
        }
        case UPDATE_PRODUCT: {
            const postingFormState = state.clone();
            postingFormState.fxTradeIdeaPosting.product = action.product;
            return postingFormState;
        }
        case UPDATE_TIME_HORIZON: {
            const postingFormState = state.clone();
            postingFormState.fxTradeIdeaPosting.timeHorizon = action.timeHorizon;
            return postingFormState;
        }
        case UPDATE_ACTION: {
            const postingFormState = state.clone();
            postingFormState.fxTradeIdeaPosting.action = action.action;
            return postingFormState;
        }
        case UPDATE_ENTRY: {
            const postingFormState = state.clone();
            postingFormState.fxTradeIdeaPosting.entry = action.entry;
            return postingFormState;
        }
        case UPDATE_TP_LEVEL: {
            const postingFormState = state.clone();
            postingFormState.fxTradeIdeaPosting.tpLevel = action.tpLevel;
            return postingFormState;
        }
        case UPDATE_SL_LEVEL: {
            const postingFormState = state.clone();
            postingFormState.fxTradeIdeaPosting.slLevel = action.slLevel;
            return postingFormState;
        }
        case UPDATE_RATIONALE: {
            const postingFormState = state.clone();

            let rationales = postingFormState.fxTradeIdeaPosting.rationale.split('|');
            const indexOfRationale = rationales.indexOf(action.rationaleToUpdate);

            if (indexOfRationale >= 0) {
                rationales = rationales.splice(indexOfRationale, 1, action.newValue);
            } else {
                rationales.push(action.newValue);
            }

            rationales.join('|');

            return postingFormState;
        }
        case DELETE_RATIONALE: {
            const postingFormState = state.clone();
            let rationales = postingFormState.fxTradeIdeaPosting.rationale.split('|').filter((rationale, idx) => {
                return idx !== action.rationaleIndex;
            });


            postingFormState.fxTradeIdeaPosting.rationale = rationales.join('|');

            return postingFormState;
        }
        case ADD_RATIONALE: {
            const postingFormState = state.clone();

            if (postingFormState.fxTradeIdeaPosting.rationale.length) {
                let rationales = postingFormState.fxTradeIdeaPosting.rationale.split('|');

                rationales.push(action.rationale);

                postingFormState.fxTradeIdeaPosting.rationale = rationales.join('|');
            } else {
                postingFormState.fxTradeIdeaPosting.rationale = action.rationale;
            }

            return postingFormState;
        }
        case UPDATE_CONVICTION_LEVEL: {
            const postingFormState = state.clone();
            postingFormState.fxTradeIdeaPosting.convictionLevel = action.convictionLevel;
            return postingFormState;
        }

        case TOGGLE_POSTING_FORM: {
            const postingFormState = state.clone();
            postingFormState.postingType = action.postingType;
            return postingFormState;
        }
        case CLOSE_POSTING_FORM: {
            return PostingFormState.DEFAULT_STATE;
        }
        case CLEAR_FORM: {
            return PostingFormState.DEFAULT_STATE;
        }
        case REC_USER_PROFILE: {
            const postPreference = action.userProfile.postPreference;
            if (postPreference) {
                // remove invalid users
                postPreference.privateUsers = _.filter(postPreference.privateUsers, (privateUser: SymUser) => {
                    return !!privateUser.id;
                });
                return new PostingFormState("C",
                    postPreference.assetClass ? postPreference.assetClass : state.assetClass,
                    postPreference.region ? postPreference.region : state.region,
                    postPreference.private_ ? postPreference.private_ : state.private_,
                    postPreference.privateUsers, [], false);
            }
            return state;
        }
        case UPDATE_STATUS: {
            const postingFormState = state.clone();
            postingFormState.fxTradeIdeaPosting.status = action.status;
            return postingFormState;
        }
        case UPDATE_STATUS_RATIONALE: {
            const postingFormState = state.clone();
            postingFormState.fxTradeIdeaPosting.statusRationale = action.statusRationale;
            return postingFormState;
        }
        case OPEN_IN_POSTING_FORM: {
            const newPostingForm = new PostingFormState(state.postingType,
                action.posting.assetClass,
                action.posting.region,
                action.posting.private_,
                action.posting.privateUsers,
                [], true);

            if (action.posting.genericPosting) {
                newPostingForm.genericPosting = new GenericPosting(action.posting.genericPosting.headline, action.posting.genericPosting.content);
            } else {
                newPostingForm.fxTradeIdeaPosting = new FxTradeIdeaPosting(action.posting.fxTradeIdeaPosting.ideaName, action.posting.fxTradeIdeaPosting.currencyPair, action.posting.fxTradeIdeaPosting.product, action.posting.fxTradeIdeaPosting.timeHorizon, action.posting.fxTradeIdeaPosting.endDate, action.posting.fxTradeIdeaPosting.action,
                    action.posting.fxTradeIdeaPosting.entry, action.posting.fxTradeIdeaPosting.tpLevel, action.posting.fxTradeIdeaPosting.slLevel, action.posting.fxTradeIdeaPosting.rationale || '', action.posting.fxTradeIdeaPosting.convictionLevel, action.posting.fxTradeIdeaPosting.riskRewardRatioFraction,
                    action.posting.fxTradeIdeaPosting.pricing, action.posting.fxTradeIdeaPosting.status, action.posting.fxTradeIdeaPosting.statusRationale, action.posting.fxTradeIdeaPosting.statusTimestamp);
            }

            return newPostingForm;
        }
        case TOGGLE_EDIT_MODE: {
            const postingFormState = state.clone();
            postingFormState.editMode = action.editMode;
            return postingFormState;
        }
        default:
            return state;
    }
}

export const clearForm = () => {
    return {
        type: CLEAR_FORM
    }
};
export const updateHeadline = (headline: string) => {
    return {
        type: UPDATE_HEADLINE,
        headline
    }
};
export const updateContent = (content: string) => {
    return {
        type: UPDATE_CONTENT,
        content
    }
};
export const updateHashtags = (content: any) => {
    return {
        type: UPDATE_HASHTAGS,
        content
    }
};
export const updateAssetClass = (assetClass: string) => {
    return {
        type: UPDATE_ASSET_CLASS,
        assetClass
    }
};
export const updateRegion = (region: string) => {
    return {
        type: UPDATE_REGION,
        region
    }
};
export const togglePrivacy = () => {
    return {
        type: TOGGLE_PRIVACY
    }
};
export const updatePrivateUsers = (privateUsers: Array<SymUser>) => {
    return {
        type: UPDATE_PRIVATE_USER,
        privateUsers
    }
};
export const closePostingForm = () => {
    return {
        type: CLOSE_POSTING_FORM
    }
};

export const togglePostingForm = (postingType: string) => {
    return {
        type: TOGGLE_POSTING_FORM,
        postingType
    }
};


export const updateIdeaName = (value: string) => {
    return {
        type: UPDATE_IDEA_NAME,
        ideaName: value
    }
};
export const updateCurrencyPair = (value: string) => {
    return {
        type: UPDATE_CURRENCY_PAIR,
        currencyPair: value
    }
};
export const updateEndDate = (value: string) => {
    return {
        type: UPDATE_END_DATE,
        endDate: value
    }
};
export const updateProduct = (value: string) => {
    return {
        type: UPDATE_PRODUCT,
        product: value
    }
};
export const updateTimeHorizon = (value: string) => {
    return {
        type: UPDATE_TIME_HORIZON,
        timeHorizon: value
    }
};
export const updateAction = (value: string) => {
    return {
        type: UPDATE_ACTION,
        action: value
    }
};
export const updateEntry = (value: string) => {
    return {
        type: UPDATE_ENTRY,
        entry: value
    }
};
export const updateTpLevel = (value: string) => {
    return {
        type: UPDATE_TP_LEVEL,
        tpLevel: value
    }
};
export const updateSlLevel = (value: string) => {
    return {
        type: UPDATE_SL_LEVEL,
        slLevel: value
    }
};
export const updateRationale = (value: string, rationaleToUpdate: string) => {
    return {
        type: UPDATE_RATIONALE,
        rationaleToUpdate: rationaleToUpdate,
        newValue: value
    }
};
export const deleteRationale = (index: number) => {
    return {
        type: DELETE_RATIONALE,
        rationaleIndex: index
    }
};
export const addRationale = (value: string) => {
    return {
        type: ADD_RATIONALE,
        rationale: value
    }
};
export const updateConvictionLevel = (value: string) => {
    return {
        type: UPDATE_CONVICTION_LEVEL,
        convictionLevel: value
    }
};
export const updateStatus = (value: string) => {
    return {
        type: UPDATE_STATUS,
        status: value,
        timestamp: Date.now()
    }
};
export const updateStatusRationale = (value: string) => {
    return {
        type: UPDATE_STATUS_RATIONALE,
        statusRationale: value
    }
};

export const openInPostingForm = (posting: Posting) => {
    return {
        type: OPEN_IN_POSTING_FORM,
        posting: posting
    }
};

export const toggleEditMode = (editMode: boolean) => {
    return {
        type: TOGGLE_EDIT_MODE,
        editMode: editMode
    }
};

export const createPosting = (postingForm: PostingFormState) => {
    return (dispatch, getState) => {
        const body = JSON.stringify(postingForm);

        dispatch({type: REQ_POSTINGS_NEW});

        return fetchWrapper(API_MESSAGES, "POST", body)
            .then(response => response.json().then(json => new Response(response.status, json)))
            .then(response => {
                if (response.status >= 400) {
                    dispatch({type: FAIL_REC_POSTINGS_NEW, response: response});
                } else {
                    dispatch(clearForm());
                    dispatch({type: UPDATE_CONTENT, content: ''});
                    dispatch({type: REC_USER_PROFILE, userProfile: response.body.userProfile});
                    dispatch({type: REC_POSTINGS_NEW, postings: response.body.postings});
                }
            });
    }
};

export const updatePosting = (postingForm: PostingFormState) => {
    return (dispatch, getState) => {
        const body = JSON.stringify(postingForm);

        dispatch({type: REQ_POSTINGS_NEW});

        // TODO: Need to determine how we manage the updating of a post. For now, we assume making a PUT request
        // to a new end-point that is yet to be defined. We should only need to update this end-point and decide what
        // data needs to be sent across.

        return fetchWrapper(API_MESSAGES_UPDATE, "PUT", body)
            .then(response => response.json().then(json => new Response(response.status, json)))
            .then(response => {
                if (response.status >= 400) {
                    dispatch({type: FAIL_REC_POSTINGS_NEW, response: response});
                } else {
                    dispatch(clearForm());
                    dispatch({type: UPDATE_CONTENT, content: ''});
                    dispatch({type: REC_USER_PROFILE, userProfile: response.body.userProfile});
                    dispatch({type: REC_POSTINGS_NEW, postings: response.body.postings});
                }
            });
    }
};