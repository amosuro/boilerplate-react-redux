import React from 'react';

import url from './CommentaryTextArea.scss';

import CommentaryTypes from '../CommentaryTypes/CommentaryTypes';
import CommentaryFormatting from '../CommentaryFormatting/CommentaryFormatting';

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
        const formattingOptions = this.props.withFormatting ? <CommentaryFormatting /> : null;
        const inputClass = this.props.withFormatting ? 'proto-input__field proto-input__field--formatting' : 'proto-input__field';

        return (
            <div className="proto-input">
                <CommentaryTypes updateType={this.props.updateType}
                                 types={this.props.types} />
                <textarea ref={(textArea) => { this.textArea = textArea }}
                          className={inputClass}
                          placeholder={this.props.placeholder}
                          onKeyUp={event => this.onKeyUp(event, true)}
                          rows={this.props.rows} />
                {formattingOptions}
            </div>
        );
    }
}
