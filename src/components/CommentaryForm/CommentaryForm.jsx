import React from 'react';
import ReactDOM from 'react-dom';

import url from './CommentaryForm.scss';

import NewCommentary from '../NewCommentary/NewCommentary';
import NewIdea from '../NewIdea/NewIdea';
import CommentaryFormRating from '../CommentaryFormRating/CommentaryFormRating';
import CommentaryFormTags from '../CommentaryFormTags/CommentaryFormTags';
import Button from '../Button/Button';
import ToolTip from '../ToolTip/Tooltip';

export default class CommentaryForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            textAreaRows: 1,
            textAreaFocus: false,
            hashTags: [],
            toolTipTarget: null,
            existingHashtags: [
                '#test',
                '#commentary',
                '#idea'
            ],
            potentialHashtags: [

            ],
            checkForHashtags: false,
            ratingCount: 0,
            newCommentary: {
                title: ''
            },
            newIdea: {
                title: ''
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
            ]
        }
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

        if (textarea.value.length > 117) {
            textarea.classList.add(smallTextAreaClass);
        } else {
            textarea.classList.remove(smallTextAreaClass);
        }
    }

    findHashTags(textContent) {
        const arrayOfWords = textContent.split(' ');

        if (!arrayOfWords[arrayOfWords.length - 1].length) {
            const hashTags = arrayOfWords.filter((word, index) => word[0] === '#' && word.length > 1);
            const uniqueHashTags = [...new Set(hashTags)];

            this.setState({
                hashTags: uniqueHashTags,
                ratingCount: uniqueHashTags.length
            });
        }
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
        this.setState({
            newCommentary: {
                title: event.target.value
            }
        });
    }

    updateIdeaTitle(event) {
        this.setState({
            newIdea: {
                title: event.target.value
            }
        });
    }

    post() {
        this.checkForHashtags();
    }

    checkForHashtags() {
        // TODO: Needs serious refactor!!! Quick hack to get the idea working
        const generateNewPotentialHashtags = (textContent) => {
            const arrayOfWords = textContent.split(' ');
            const arrayOfHashTags = this.state.existingHashtags.map(tag => tag.split('#')[1]);
            const matchedWords = arrayOfWords.filter(val => arrayOfHashTags.indexOf(val) !== -1);
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
                generateNewPotentialHashtags(this.state.newCommentary.title);
                break;
            case 'idea':
                generateNewPotentialHashtags(this.state.newIdea.title);
                break;
            case 'news':
                generateNewPotentialHashtags(this.state.newCommentary.title);
                break;
        }
    }

    postAction() {
        console.log('POSTED');
    }

    missingTagsMessage() {
        return `Improve your reach! Add these tags? ${this.state.potentialHashtags.join(',')}`;
    }

    toggleToolTipDisplay() {
        this.setState({
            displayToolTip: !this.state.displayToolTip
        });
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
                                            title={this.state.newCommentary.title}
                                            updateTitle={this.updateCommentaryTitle.bind(this)} />;

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
                                      onDropdownSelect={this.onDropdownSelect.bind(this)}
                                      rationale={this.state.rationale}
                                      addNewRationale={this.addNewRationale.bind(this)}
                                      removeRationale={this.removeRationale.bind(this)}
                                      updateRationale={this.updateRationale.bind(this)}
                                      title={this.state.newIdea.title}
                                      updateTitle={this.updateIdeaTitle.bind(this)} />;
                break;
            case 'news':
                activeType = <NewCommentary regions={this.state.regions}
                                            assetClass={this.state.assetClass}
                                            types={this.state.types}
                                            textAreaRows={this.state.textAreaRows}
                                            textAreaFocus={this.state.textAreaFocus}
                                            updateType={this.updateType.bind(this)}
                                            onKeyUp={this.onKeyUp.bind(this)}
                                            onDropdownSelect={this.onDropdownSelect.bind(this)}
                                            title={this.state.newCommentary.title}
                                            updateTitle={this.updateCommentaryTitle.bind(this)} />;
                break;
        }

        const toolTip = this.state.displayToolTip ? <ToolTip positions={this.state.toolTipPositions}
                                                             acceptAction={this.postAction.bind(this)}
                                                             toggleVisibility={this.toggleToolTipDisplay.bind(this)}
                                                             content={this.missingTagsMessage()} /> : null;

        return (
            <div className="proto">
                <h1 className="proto-heading">Good morning, <span className="proto-heading__sub">@Ashley Mosuro</span></h1>
                {activeType}
                <div className="row middle-xs">
                    <div className="col-xs-6 col-sm-4">
                        <CommentaryFormTags hashTags={this.state.hashTags} />
                    </div>
                    <div className="col-xs-6 col-sm-4">
                        <CommentaryFormRating ratingCount={this.state.ratingCount} />
                    </div>
                    <div className="col-xs-6 col-sm-2">
                        <Button label="Cancel"
                                bgColor="#5f5f5f"
                                clickAction={() => ''} />
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
        );
    }
}
