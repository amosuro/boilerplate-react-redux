import React from 'react';

import url from './CommentaryTextArea.scss';

import CommentaryTypes from '../CommentaryTypes/CommentaryTypes';

export default class CommentaryTextArea extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.shouldFocus) {
            this.textArea.focus();
        }
    }

    onKeyUp(event) {
        if (this.props.onKeyUp) {
            this.props.onKeyUp(event, true)
        }
    }

    render() {
        const activeType = this.props.types.find(type => type.active);

        return (
            <div className="proto-input">
                <CommentaryTypes updateType={this.props.updateType}
                                 types={this.props.types} />
                <textarea ref={(textArea) => { this.textArea = textArea }}
                          className="proto-input__field"
                          placeholder={this.props.placeholder}
                          onKeyUp={event => this.onKeyUp(event, true)}
                          rows={this.props.rows} />
            </div>
        );
    }
}
