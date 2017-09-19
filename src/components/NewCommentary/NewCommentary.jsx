import React from 'react';

import url from './NewCommentary.scss';

import CommentaryLock from '../CommentaryLock/CommentaryLock';
import Dropdown from '../Dropdown/Dropdown';
import CommentaryDualInput from '../CommentaryDualInput/CommentaryDualInput';

export default class NewCommentary extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.reset();
    }

    render() {
        return (
            <div>
                <div className="row bottom-xs">
                    <div className="col-xs-8">
                        <div className="row">
                            <div className="col-xs-6 col-sm-3">
                                <Dropdown name="Regions"
                                          items={this.props.regions}
                                          onClick={this.props.onDropdownSelect} />
                            </div>
                            <div className="col-xs-6 col-sm-3">
                                <Dropdown name="Asset Class"
                                          items={this.props.assetClass}
                                          onClick={this.props.onDropdownSelect} />
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-4">
                        <CommentaryLock />
                    </div>
                </div>
                <CommentaryDualInput model={this.props.model}
                                     rows={this.props.textAreaRows}
                                     placeholder="Start typing your commentary"
                                     shouldFocus={this.props.textAreaFocus}
                                     updateType={this.props.updateType}
                                     types={this.props.types}
                                     onKeyUp={this.props.onKeyUp}
                                     withFormatting={true}
                                     updateTitle={this.props.updateTitle}
                                     updateDetail={this.props.updateDetail} />
            </div>
        )
    }
}