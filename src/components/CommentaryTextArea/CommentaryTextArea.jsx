import React from 'react';

import url from './CommentaryTextArea.scss';

import CommentaryFormatting from '../CommentaryFormatting/CommentaryFormatting';

export default class CommentaryTextArea extends React.Component {
    constructor(props) {
        super(props);
    }

    // componentDidMount() {
    //     if (this.props.shouldFocus) {
    //         this.textArea.focus();
    //     }
    // }

    onKeyUp(event) {
        if (this.props.onKeyUp) {
            this.props.onKeyUp(event, this.props.shouldResize)
        }
    }

    render() {
        const formattingOptions = this.props.withFormatting ? <CommentaryFormatting /> : null;
        const inputClass = this.props.withFormatting ? 'proto-input__field proto-input__field--formatting' : 'proto-input__field';

        return (
            <div className="proto-input">
                <textarea ref={(textArea) => { this.textArea = textArea }}
                          className={inputClass}
                          placeholder={this.props.placeholder}
                          onInput={event => this.onKeyUp(event)}
                          onChange={event => this.props.updateValue(event)}
                          rows={this.props.rows}
                          value={this.props.value} />
                {formattingOptions}
            </div>
        );
    }
}
