import React from 'react';

import url from './TextArea.scss';

import CommentaryFormatting from '../CommentaryFormatting/CommentaryFormatting';

export default class TextArea extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const formattingOptions = this.props.withFormatting ? <CommentaryFormatting /> : null;

        return (
            <div className="textarea">
                <textarea className="textarea__field"
                          rows={this.props.rows || 4}
                          onKeyUp={event => this.props.onKeyUp(event, false)}
                          placeholder={this.props.placeholder} />
                {formattingOptions}
            </div>
        )
    }
}