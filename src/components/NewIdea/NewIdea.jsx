import React from 'react';

import url from './NewIdea.scss';

import CommentaryFormTags from '../CommentaryFormTags/CommentaryFormTags';
import CommentaryTextArea from '../CommentaryTextArea/CommentaryTextArea';
import CommentaryFormRating from '../CommentaryFormRating/CommentaryFormRating';
import CommentaryLock from '../CommentaryLock/CommentaryLock';
import Button from '../Button/Button';
import Dropdown from '../Dropdown/Dropdown';
import Input from '../Input/Input';
import TextArea from '../TextArea/TextArea';

export default class NewIdea extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="row bottom-xs">
                    <div className="col-xs-8">
                        <div className="row">
                            <div className="col-xs-3">
                                <Dropdown name="Regions"
                                          items={this.props.regions}
                                          onClick={this.props.onDropdownSelect} />
                            </div>
                            <div className="col-xs-3">
                                <Dropdown name="Asset Class"
                                          items={this.props.assetClass}
                                          onClick={this.props.onDropdownSelect} />
                            </div>
                            <div className="col-xs-3">
                                <Dropdown name="Products"
                                          items={this.props.products}
                                          onClick={this.props.onDropdownSelect} />
                            </div>
                            <div className="col-xs-3">
                                <Dropdown name="Conviction Level"
                                          items={this.props.convictionLevels}
                                          onClick={this.props.onDropdownSelect} />
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-4">
                        <CommentaryLock />
                    </div>
                </div>
                <CommentaryTextArea rows={this.props.textAreaRows}
                                    shouldFocus={this.props.textAreaFocus}
                                    placeholder="Give your idea a title..."
                                    updateType={this.props.updateType}
                                    types={this.props.types}
                                    onMouseUp={this.props.onMouseUp} />
                <div className="row">
                    <div className="col-xs-12 col-sm-4">
                        <div className="row">
                            <div className="col-xs-4">
                                <Input type="text" placeholder="Currency" />
                            </div>
                            <div className="col-xs-4">
                                <Input type="text" placeholder="Entry" />
                            </div>
                            <div className="col-xs-4">
                                <Input type="text" placeholder="Time Horizon" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6">
                                <Input type="text" placeholder="TP level" />
                            </div>
                            <div className="col-xs-6">
                                <Input type="text" placeholder="SL level" />
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-8">
                        <TextArea placeholder="Rationale"
                                  onKeyUp={this.props.onKeyUp} />
                    </div>
                </div>
            </div>
        )
    }
}