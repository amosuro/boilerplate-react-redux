import React from 'react';

import url from './CommentaryForm.scss';

import CommentaryFormTags from '../CommentaryFormTags/CommentaryFormTags';
import CommentaryTextArea from '../CommentaryTextArea/CommentaryTextArea';
import CommentaryFormRating from '../CommentaryFormRating/CommentaryFormRating';
import CommentaryLock from '../CommentaryLock/CommentaryLock';
import Button from '../Button/Button';
import Dropdown from '../Dropdown/Dropdown';

export default class CommentaryForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            textAreaRows: 1,
            hashTags: [],
            ratingCount: 0,
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
                { id: 'commodities', label: 'Commodities', active: false },
            ]
        }
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

    onKeyUp(event) {
        const textarea = event.target;
        const textContent = textarea.value;
        const smallTextAreaClass = 'proto-input__field--small';

        if (textContent.length > 2) {
            this.findHashTags(textContent);
        } else if (textContent.length < 1) {
            this.setState({
                hashTags: [],
                ratingCount: 0
            });
        }
        this.calculateInputHeight(event);

        if (textContent.length > 117) {
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
            types: newTypes
        });
    }

    onDropdownSelect(id, name) {
        if (name === 'Regions') {
            const newRegions = Object.assign(this.state.regions);
            const itemToUpdate = newRegions.find(region => region.id === id);

            itemToUpdate.active = !itemToUpdate.active;
        } else if (name === 'Asset Class') {
            const newAssetClass = Object.assign(this.state.assetClass);
            const itemToUpdate = newAssetClass.find(as => as.id === id);

            itemToUpdate.active = !itemToUpdate.active;
        }
    }

    render() {
        return (
            <div className="proto">
                <h1 className="proto-heading">Good morning, <span className="proto-heading__sub">@Ashley Mosuro</span></h1>
                <div className="proto-row">
                    <div className="proto-left">
                        <Dropdown name="Regions"
                                  items={this.state.regions}
                                  onClick={this.onDropdownSelect.bind(this)} />
                        <Dropdown name="Asset Class"
                                  items={this.state.assetClass}
                                  onClick={this.onDropdownSelect.bind(this)} />
                    </div>
                    <div className="proto-right">
                        <CommentaryLock />
                    </div>
                </div>
                <CommentaryTextArea rows={this.state.textAreaRows}
                                    updateType={this.updateType.bind(this)}
                                    types={this.state.types}
                                    onKeyUp={this.onKeyUp.bind(this)}
                                    onMouseUp={this.onMouseUp.bind(this)} />
                <div className="proto-row">
                    <div className="proto-left">
                        <CommentaryFormTags hashTags={this.state.hashTags} />
                    </div>
                    <div className="proto-right">
                        <CommentaryFormRating ratingCount={this.state.ratingCount} />
                        <Button label="Post"
                                bgColor="#04a964"
                                clickAction={() => ''} />
                    </div>
                </div>
            </div>
        );
    }
}
