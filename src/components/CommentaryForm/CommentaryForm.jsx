import React from 'react';
import ReactDOM from 'react-dom';

import url from './CommentaryForm.scss';

import NewCommentary from '../NewCommentary/NewCommentary';
import NewIdea from '../NewIdea/NewIdea';
import CommentaryFormRating from '../CommentaryFormRating/CommentaryFormRating';
import CommentaryFormTags from '../CommentaryFormTags/CommentaryFormTags';
import Button from '../Button/Button';
import ToolTip from '../ToolTip/Tooltip';
import CommentaryFeed from '../CommentaryFeed/CommentaryFeed';
import Filters from '../Filters/Filters';

export default class CommentaryForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            textAreaRows: 1,
            textAreaFocus: false,
            hashTags: [],
            toolTipTarget: null,
            existingHashtags: [
                '#fx'
            ],
            potentialHashtags: [

            ],
            checkForHashtags: false,
            ratingCount: 0,
            newCommentary: {
                title: '',
                detail: '',
                hashTags: ''
            },
            newIdea: {
                title: '',
                detail: '',
                hashTags: '',
                entryPrice: '',
                tpLevel: '',
                slLevel: '',
                currency: '',
                timeHorizon: ''

            },
            types: [
                { id: 'commentary', label: 'Commentary', active: true },
                { id: 'idea', label: 'Idea', active: false },
                { id: 'news', label: 'News', active: false }
            ],
            regions: [
                { id: 'global', label: 'Global', active: false },
                { id: 'americas', label: 'Americas', active: false },
                { id: 'apac', label: 'APAC', active: false },
                { id: 'emea', label: 'EMEA', active: false }
            ],
            assetClass: [
                { id: 'fx', label: 'FX', active: false },
                { id: 'fxo', label: 'FXO', active: false },
                { id: 'rates', label: 'Rates', active: false },
                { id: 'credit', label: 'Credit', active: false },
                { id: 'equities', label: 'Equities', active: false },
                { id: 'commodities', label: 'Commodities', active: false }
            ],
            products: [
                { id: 'spot', label: 'Spot', active: false },
                { id: 'ndf', label: 'NDF', active: false },
                { id: 'swap', label: 'Swap', active: false },
                { id: 'forwards', label: 'Forwards', active: false },
                { id: 'futures', label: 'Futures', active: false }
            ],
            convictionLevels: [
                { id: '60', label: '< 60%', active: false },
                { id: '60-80', label: '60-80%', active: false },
                { id: '80', label: '> 80%', active: false }
            ],
            rationale: [
                { id: 1, label: '' }
            ],
            posts: [
                {
                    type: 'idea',
                    title: 'Buy EURUSD 1m ATM vol',
                    tags: [
                        '#global',
                        '#fx',
                        '#spot'
                    ],
                    currency: 'EURUSD',
                    convictionLevel: '> 80%',
                    entryPrice: '1.4370',
                    tpLevel: '1.3350',
                    slLevel: '1.4650',
                    timeHorizon: '1M',
                    rationales: [
                        'Trumps delay in leaving NAFTA in favor of a more orderly negotiation is beneficial for the Mexican Peso and trade',
                        'Portfolio adjustments back into MXN whilst ZAR continues to struggle',
                        '200 DMA having broken it to a low of 1.3360'
                    ]
                },
                {
                    type: 'commentary',
                    title: 'South Africa FX update',
                    detail: `ZAR: USDZAR was trading pretty technically again into the end of last week. Friday's range was well within Thursday's daily print, and I feel the pair remains a buy on dips. We tested the initial target I suggested last week (13.25) and the price action since leads me to suspect that actually an overshoot of the moving averages, towards sonewhere in the 13.35-13.45 area may be likely. This is purely based upon what seems to me to be growing momentum for a stronger broad Dollar. The local story remains driven by longer term structural and political concerns, which for the moment appear not to be currency drivers; fixed income also seems stable for the moment, and this as I say is a broad DXY story. Stick to the same technical levels, albeit raised a little higher, namely 13.05 / 13.15 / 13.25 / 13.35`,
                    tags: [
                        '#global',
                        '#fx',
                        '#usdzar'
                    ]
                },
                {
                    type: 'idea',
                    title: 'Buy EURUSD 1m ATM vol',
                    tags: [
                        '#global',
                        '#fx',
                        '#spot'
                    ],
                    currency: 'EURUSD',
                    convictionLevel: '> 80%',
                    entryPrice: '1.4370',
                    tpLevel: '1.3350',
                    slLevel: '1.4650',
                    timeHorizon: '1M',
                    rationales: [
                        'Trumps delay in leaving NAFTA in favor of a more orderly negotiation is beneficial for the Mexican Peso and trade',
                        'Portfolio adjustments back into MXN whilst ZAR continues to struggle',
                        '200 DMA having broken it to a low of 1.3360'
                    ]
                },
                {
                    type: 'commentary',
                    title: 'South Africa FX update',
                    detail: `ZAR: USDZAR was trading pretty technically again into the end of last week. Friday's range was well within Thursday's daily print, and I feel the pair remains a buy on dips. We tested the initial target I suggested last week (13.25) and the price action since leads me to suspect that actually an overshoot of the moving averages, towards sonewhere in the 13.35-13.45 area may be likely. This is purely based upon what seems to me to be growing momentum for a stronger broad Dollar. The local story remains driven by longer term structural and political concerns, which for the moment appear not to be currency drivers; fixed income also seems stable for the moment, and this as I say is a broad DXY story. Stick to the same technical levels, albeit raised a little higher, namely 13.05 / 13.15 / 13.25 / 13.35`,
                    tags: [
                        '#global',
                        '#fx',
                        '#usdzar'
                    ]
                },
                {
                    type: 'idea',
                    title: 'Buy EURUSD 1m ATM vol',
                    tags: [
                        '#global',
                        '#fx',
                        '#spot'
                    ],
                    currency: 'EURUSD',
                    convictionLevel: '> 80%',
                    entryPrice: '1.4370',
                    tpLevel: '1.3350',
                    slLevel: '1.4650',
                    timeHorizon: '1M',
                    rationales: [
                        'Trumps delay in leaving NAFTA in favor of a more orderly negotiation is beneficial for the Mexican Peso and trade',
                        'Portfolio adjustments back into MXN whilst ZAR continues to struggle',
                        '200 DMA having broken it to a low of 1.3360'
                    ]
                },
                {
                    type: 'commentary',
                    title: 'South Africa FX update',
                    detail: `ZAR: USDZAR was trading pretty technically again into the end of last week. Friday's range was well within Thursday's daily print, and I feel the pair remains a buy on dips. We tested the initial target I suggested last week (13.25) and the price action since leads me to suspect that actually an overshoot of the moving averages, towards sonewhere in the 13.35-13.45 area may be likely. This is purely based upon what seems to me to be growing momentum for a stronger broad Dollar. The local story remains driven by longer term structural and political concerns, which for the moment appear not to be currency drivers; fixed income also seems stable for the moment, and this as I say is a broad DXY story. Stick to the same technical levels, albeit raised a little higher, namely 13.05 / 13.15 / 13.25 / 13.35`,
                    tags: [
                        '#global',
                        '#fx',
                        '#usdzar'
                    ]
                },
                {
                    type: 'idea',
                    title: 'Buy EURUSD 1m ATM vol',
                    tags: [
                        '#global',
                        '#fx',
                        '#spot'
                    ],
                    currency: 'EURUSD',
                    convictionLevel: '> 80%',
                    entryPrice: '1.4370',
                    tpLevel: '1.3350',
                    slLevel: '1.4650',
                    timeHorizon: '1M',
                    rationales: [
                        'Trumps delay in leaving NAFTA in favor of a more orderly negotiation is beneficial for the Mexican Peso and trade',
                        'Portfolio adjustments back into MXN whilst ZAR continues to struggle',
                        '200 DMA having broken it to a low of 1.3360'
                    ]
                },
                {
                    type: 'commentary',
                    title: 'South Africa FX update',
                    detail: `ZAR: USDZAR was trading pretty technically again into the end of last week. Friday's range was well within Thursday's daily print, and I feel the pair remains a buy on dips. We tested the initial target I suggested last week (13.25) and the price action since leads me to suspect that actually an overshoot of the moving averages, towards sonewhere in the 13.35-13.45 area may be likely. This is purely based upon what seems to me to be growing momentum for a stronger broad Dollar. The local story remains driven by longer term structural and political concerns, which for the moment appear not to be currency drivers; fixed income also seems stable for the moment, and this as I say is a broad DXY story. Stick to the same technical levels, albeit raised a little higher, namely 13.05 / 13.15 / 13.25 / 13.35`,
                    tags: [
                        '#global',
                        '#fx',
                        '#usdzar'
                    ]
                }
            ]
        }
    }

    reset() {
        const resetDropDown = (items) => {
            return items.map(item => {
                if (item.active) {
                    item.active = false;
                }
                return item;
            })
        };
        const regions = resetDropDown(Object.assign(this.state.regions));
        const assetClass = resetDropDown(Object.assign(this.state.assetClass));
        const products = resetDropDown(Object.assign(this.state.products));
        const convictionLevels = resetDropDown(Object.assign(this.state.convictionLevels));

        this.setState({
           newCommentary: {
               title: '',
               detail: '',
               hashTags: ''
           },
            newIdea: {
                title: '',
                detail: '',
                hashTags: '',
                entryPrice: '',
                tpLevel: '',
                slLevel: '',
                currency: '',
                timeHorizon: ''
            },
            hashTags: [],
            potentialHashtags: [],
            rationale: [
                { id: 1, label: '' }
            ],
            regions,
            assetClass,
            products,
            convictionLevels,
            textAreaRows: 1,
            ratingCount: 0
        });
    }

    componentDidUpdate() {
        if (this.state.checkForHashtags) {
            this.setState({
                checkForHashtags: false
            });
        }
    }

    calculateButtonPositions() {
        return ReactDOM.findDOMNode(this.postBtn).getBoundingClientRect();
    }

    calculateInputHeight(event) {
        const element = event.target;

        const style = (window.getComputedStyle) ? window.getComputedStyle(element) : element.currentStyle;
        const elementLineHeight = parseInt(style.lineHeight, 10);
        const elementHeight = calculateContentHeight(element, elementLineHeight);
        const numberOfLines = Math.ceil(elementHeight / elementLineHeight);

        this.setState({
            textAreaRows: numberOfLines
        });

        function calculateContentHeight(element, scanAmount) {
            let origHeight = element.style.height;
            let heightOfElement = element.offsetHeight;
            let heightOfElementContent = element.scrollHeight;
            let overflow = element.style.overflow;

            if (heightOfElement >= heightOfElementContent) {
                const height = (heightOfElement + scanAmount) + 'px';
                element.style.height = height;
                element.style.overflow = 'hidden';

                if (heightOfElementContent < element.scrollHeight) {
                    while (element.offsetHeight >= element.scrollHeight) {
                        element.style.height = (heightOfElement -= scanAmount)+'px';
                    }

                    while (element.offsetHeight < element.scrollHeight) {
                        element.style.height = (heightOfElement++)+'px';
                    }
                    element.style.height = origHeight;
                    element.style.overflow = overflow;

                    return heightOfElement;
                }
            } else {
                return heightOfElementContent;
            }
        }
    }

    onKeyUp(event, shouldAdjustHeight) {
        this.populateHashtags(event);

        if (shouldAdjustHeight) {
            this.adjustInputHeight(event);
        }
    }

    onNewIdeaInputChange(event, field) {
        const newIdea = Object.assign(this.state.newIdea);

        newIdea[field] = event.target.value;

        this.setState({
            newIdea: newIdea
        });

        console.log(this.state.newIdea.entryPrice);
    }

    populateHashtags(event) {
        const textarea = event.target;
        const textContent = textarea.value;

        if (textContent.length > 2) {
            this.findHashTags(textContent);
        } else if (textContent.length < 1) {
            this.setState({
                hashTags: [],
                ratingCount: 0
            });
        }
    }

    adjustInputHeight(event) {
        const textarea = event.target;
        const smallTextAreaClass = 'proto-input__field--small';

        this.calculateInputHeight(event);

        if (textarea.value.length > 58) {
            textarea.classList.add(smallTextAreaClass);
        } else {
            textarea.classList.remove(smallTextAreaClass);
        }
    }

    findHashTags(textContent) {
        const arrayOfWords = textContent.replace(/\n/g, ' ').split(' ');
        const hashTags = arrayOfWords.filter((word, index) => word[0] === '#' && word.length > 1);
        const uniqueHashTags = [...new Set(hashTags)];

        this.setState({
            hashTags: uniqueHashTags,
            ratingCount: uniqueHashTags.length < 5 ? uniqueHashTags.length : 5
        });
    }

    onMouseUp(event) {
        this.calculateInputHeight(event);
    }

    updateType(id) {
        const newTypes = Object.assign(this.state.types).map(type => {
            if (type.id === id) {
                type.active = true;
            } else {
                type.active = false;
            }

            return type;
        });

        this.setState({
            types: newTypes,
            textAreaFocus: true
        });
    }

    getActiveType() {
        return this.state.types.find(type => type.active).id;
    }

    onDropdownSelect(id, name) {
        switch(name) {
            case 'Regions':
                setActiveItem(this.state.regions);
                break;
            case 'Asset Class':
                setActiveItem(this.state.assetClass);
                break;
            case 'Products':
                setActiveItem(this.state.products);
                break;
            case 'Conviction Level':
                setActiveItem(this.state.convictionLevels);
                break;
        }

        function setActiveItem(items) {
            const newItems = Object.assign(items);
            const itemToUpdate = newItems.find(item => item.id === id);

            itemToUpdate.active = !itemToUpdate.active;
        }
    }

    addNewRationale() {
        const rationales = Object.assign(this.state.rationale);

        rationales.push({
            id: rationales.length + 1,
            label: '',
        });

        this.setState({
            rationale: rationales
        });
    }

    removeRationale(id) {
        const rationales = Object.assign(this.state.rationale);
        const newRationales = rationales.filter(rationale => rationale.id !== id);

        this.setState({
            rationale: newRationales
        });
    }

    updateRationale(id, event) {
        const value = event.target.value;
        const rationales = Object.assign(this.state.rationale);
        const rationaleToUpdate = rationales.find(rationale => rationale.id === id);

        rationaleToUpdate.label = value;

        this.setState({
            rationale: rationales
        });
    }

    updateCommentaryTitle(event) {
        const newCommentary = Object.assign(this.state.newCommentary);

        newCommentary.title = event.target.value;

        this.setState({
            newCommentary: newCommentary
        });
    }

    updateCommentaryDetail(event) {
        const newCommentary = Object.assign(this.state.newCommentary);

        newCommentary.detail = event.target.value;

        this.setState({
            newCommentary: newCommentary
        });
    }

    updateIdeaTitle(event) {
        const newIdea = Object.assign(this.state.newIdea);

        newIdea.title = event.target.value;

        this.setState({
            newIdea: newIdea
        });
    }

    post() {
        this.checkForHashtags();
    }

    checkForHashtags() {
        // TODO: Needs serious refactor!!! Quick hack to get the idea working
        const generateNewPotentialHashtags = (textContent) => {
            const arrayOfWords = textContent.split(' ');
            const arrayOfExistingTags = this.state.existingHashtags.map(tag => tag.split('#')[1]);
            const matchedWords = arrayOfWords.filter(val => arrayOfExistingTags.indexOf(val) !== -1);
            const potentialTags = matchedWords.map(word => `#${word}`);

            if (potentialTags.length) {
                this.setState({
                    potentialHashtags: potentialTags,
                    displayToolTip: potentialTags.length,
                });
            } else {
                this.postAction();
            }
        };

        switch(this.getActiveType()) {
            case 'commentary':
                generateNewPotentialHashtags(this.state.newCommentary.detail);
                break;
            case 'idea':
                generateNewPotentialHashtags(this.state.newIdea.detail);
                break;
            case 'news':
                generateNewPotentialHashtags(this.state.newCommentary.detail);
                break;
        }
    }

    postAction() {
        switch(this.getActiveType()) {
            case 'commentary':
                this.generateNewCommentary();
                break;
            case 'idea':
                this.generateNewIdea();
                break;
            case 'news':
                break;
        }

        this.reset();
    }

    generateNewCommentary() {
        const newTags = [...this.state.hashTags, ...this.getDropdownValuesAsTags()];
        const uniqueTags = [...new Set(newTags)];
        const newPost = {
            type: 'commentary',
            title: this.state.newCommentary.title,
            detail: this.state.newCommentary.detail,
            tags: uniqueTags
        };
        const newPosts = Object.assign(this.state.posts);

        this.setState({
            posts: [newPost, ...newPosts]
        });
    }

    generateNewIdea() {
        const newTags = [...this.state.hashTags, ...this.getDropdownValuesAsTags()];
        const uniqueTags = [...new Set(newTags)];

        const newPost = {
            type: 'idea',
            title: this.state.newIdea.title,
            tags: uniqueTags,
            currency: this.state.newIdea.currency,
            convictionLevel: this.state.convictionLevels.find(level => level.active).label,
            entryPrice: this.state.newIdea.entryPrice,
            tpLevel: this.state.newIdea.tpLevel,
            slLevel: this.state.newIdea.slLevel,
            timeHorizon: this.state.newIdea.timeHorizon,
            rationales: this.state.rationale.filter(rationale => rationale.label.length > 0).map(rationale => rationale.label)
        };

        const newPosts = Object.assign(this.state.posts);

        this.setState({
            posts: [newPost, ...newPosts]
        });
    }

    missingTagsMessage() {
        return `Improve your reach! Add these tags? ${this.state.potentialHashtags.join(',')}`;
    }

    toggleToolTipDisplay() {
        this.setState({
            displayToolTip: !this.state.displayToolTip
        });
    }

    getDropdownValuesAsTags() {
        const hashTags = [];
        const convertToHashtag = (items) => {
            const activeItem = items.find(item => item.active);

            return `#${activeItem.label.toLowerCase()}`;
        };

        switch(this.getActiveType()) {
            case 'commentary':
                hashTags.push(convertToHashtag(this.state.regions));
                hashTags.push(convertToHashtag(this.state.assetClass));
                break;
            case 'idea':
                hashTags.push(convertToHashtag(this.state.regions));
                hashTags.push(convertToHashtag(this.state.assetClass));
                hashTags.push(convertToHashtag(this.state.products));
                break;
            case 'news':
                break;
        }

        return hashTags;
    }

    render() {
        let activeType;

        switch (this.getActiveType()) {
            case 'commentary':
                activeType = <NewCommentary regions={this.state.regions}
                                            assetClass={this.state.assetClass}
                                            types={this.state.types}
                                            textAreaRows={this.state.textAreaRows}
                                            textAreaFocus={this.state.textAreaFocus}
                                            updateType={this.updateType.bind(this)}
                                            onKeyUp={this.onKeyUp.bind(this)}
                                            onDropdownSelect={this.onDropdownSelect.bind(this)}
                                            model={this.state.newCommentary}
                                            updateTitle={this.updateCommentaryTitle.bind(this)}
                                            updateDetail={this.updateCommentaryDetail.bind(this)}
                                            reset={this.reset.bind(this)} />;

                break;
            case 'idea':
                activeType = <NewIdea regions={this.state.regions}
                                      assetClass={this.state.assetClass}
                                      types={this.state.types}
                                      products={this.state.products}
                                      convictionLevels={this.state.convictionLevels}
                                      textAreaRows={this.state.textAreaRows}
                                      textAreaFocus={this.state.textAreaFocus}
                                      updateType={this.updateType.bind(this)}
                                      onKeyUp={this.onKeyUp.bind(this)}
                                      onInputChange={this.onNewIdeaInputChange.bind(this)}
                                      onDropdownSelect={this.onDropdownSelect.bind(this)}
                                      rationale={this.state.rationale}
                                      addNewRationale={this.addNewRationale.bind(this)}
                                      removeRationale={this.removeRationale.bind(this)}
                                      updateRationale={this.updateRationale.bind(this)}
                                      model={this.state.newIdea}
                                      updateTitle={this.updateIdeaTitle.bind(this)}
                                      reset={this.reset.bind(this)} />;
                break;
            case 'news':
                activeType = <NewCommentary regions={this.state.regions}
                                            assetClass={this.state.assetClass}
                                            types={this.state.types}
                                            textAreaRows={this.state.textAreaRows}
                                            textAreaFocus={false}
                                            updateType={this.updateType.bind(this)}
                                            onKeyUp={this.onKeyUp.bind(this)}
                                            onDropdownSelect={this.onDropdownSelect.bind(this)}
                                            model={this.state.newCommentary}
                                            updateTitle={this.updateCommentaryTitle.bind(this)}
                                            updateDetail={this.updateCommentaryDetail.bind(this)}
                                            reset={this.reset.bind(this)} />;
                break;
        }

        const toolTip = this.state.displayToolTip ? <ToolTip positions={this.state.toolTipPositions}
                                                             acceptAction={this.postAction.bind(this)}
                                                             toggleVisibility={this.toggleToolTipDisplay.bind(this)}
                                                             content={this.missingTagsMessage()} /> : null;

        const formTags = this.getActiveType() !== 'idea' ? <CommentaryFormTags hashTags={this.state.hashTags} /> : null;
        const formRating = this.getActiveType() !== 'idea' ? <CommentaryFormRating ratingCount={this.state.ratingCount} /> : null;

        return (
            <div className="proto">
                <div className="proto-compose">
                    <h1 className="proto-heading">Good morning, <span className="proto-heading__sub">@Ashley Mosuro</span></h1>
                    {activeType}
                    <div className="row middle-xs">
                        <div className="col-xs-8 col-sm-4">
                            {formTags}
                        </div>
                        <div className="col-xs-4 col-sm-4">
                            {formRating}
                        </div>
                        <div className="col-xs-6 col-sm-2">
                            <Button label="Reset"
                                    bgColor="#5f5f5f"
                                    clickAction={() => this.reset()} />
                        </div>
                        <div className="col-xs-6 col-sm-2">
                            <Button label="Post"
                                    bgColor="#04a964"
                                    ref={btn => { this.postBtn = btn }}
                                    clickAction={() => this.post()} />
                            {toolTip}
                        </div>
                    </div>
                </div>
                <Filters />
                <CommentaryFeed posts={this.state.posts} />
            </div>
        );
    }
}
