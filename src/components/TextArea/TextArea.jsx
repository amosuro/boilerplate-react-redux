import React from 'react';

import url from './TextArea.scss';

export default class TextArea extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="textarea">
                <textarea className="textarea__field"
                          rows={this.props.rows || 4}
                          onKeyUp={event => this.props.onKeyUp(event, false)}
                          placeholder={this.props.placeholder} />
            </div>
        )
    }
}