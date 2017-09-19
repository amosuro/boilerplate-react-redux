import React from 'react';

import url from './NewIdea.scss';

import CommentaryTextArea from '../CommentaryTextArea/CommentaryTextArea';
import CommentaryLock from '../CommentaryLock/CommentaryLock';
import Dropdown from '../Dropdown/Dropdown';
import Input from '../Input/Input';
import Bullets from '../Bullets/Bullets';
import CommentaryTypes from '../CommentaryTypes/CommentaryTypes';

export default class NewIdea extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.reset();
    }

    render() {
        const styles = {
            position: 'relative'
        };

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
                <div style={styles}>
                    <CommentaryTypes updateType={this.props.updateType}
                                     types={this.props.types} />
                    <CommentaryTextArea value={this.props.model.title}
                                        rows={this.props.textAreaRows}
                                        shouldFocus={this.props.textAreaFocus}
                                        shouldResize={false}
                                        placeholder="Give your idea a title..."
                                        updateType={this.props.updateType}
                                        types={this.props.types}
                                        onKeyUp={this.props.onKeyUp}
                                        updateValue={this.props.updateTitle} />
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-5">
                        <div className="row">
                            <div className="col-xs-4">
                                <Input type="text" placeholder="Entry price" />
                            </div>
                            <div className="col-xs-4">
                                <Input type="text" placeholder="TP level" />
                            </div>
                            <div className="col-xs-4">
                                <Input type="text" placeholder="SL level" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6">
                                <Input type="text" placeholder="Currency" />
                            </div>
                            <div className="col-xs-6">
                                <Input type="text" placeholder="Time Horizon" />
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-7">
                        <Bullets bullets={this.props.rationale}
                                 addNew={this.props.addNewRationale}
                                 remove={this.props.removeRationale}
                                 update={this.props.updateRationale} />
                    </div>
                </div>
            </div>
        )
    }
}