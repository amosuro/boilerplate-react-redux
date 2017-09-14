import React from 'react';

import url from './CommentaryTextArea.scss';

import CommentaryTypes from '../CommentaryTypes/CommentaryTypes';

export default class CommentaryTextArea extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const activeType = this.props.types.find(type => type.active);

        return (
            <div className="proto-input">
                <CommentaryTypes updateType={this.props.updateType}
                                 types={this.props.types} />
                <textarea className="proto-input__field"
                          placeholder={`Start typing your ${activeType.id}...`}
                          onKeyUp={event => this.props.onKeyUp(event)}
                          rows={this.props.rows} />
            </div>
        );
    }
}
