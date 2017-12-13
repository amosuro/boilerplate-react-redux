import * as React from "react";

import './LargeTextArea.less';

interface LargeTextAreaProps {
    value: string,
    className?: string,
    rows: number,
    placeholder: string,
    shouldResize: boolean,
    detectHashtags: boolean,
    updateType?: any,
    onChange: any,
    onBlur?: any,
}

export default class LargeTextArea extends React.Component<LargeTextAreaProps, {}> {
    constructor(props) {
        super(props);
    }

    onChange(event) {
        this.props.onChange(event, this.props.detectHashtags);
    }

    onBlur(event) {
        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
    }

    render() {
        return (
            <div className="proto-input">
                <textarea className={`proto-input__field poc-textarea ${this.props.className}`}
                          placeholder={this.props.placeholder}
                          onChange={event => this.onChange(event)}
                          onBlur={event => this.onBlur(event)}
                          rows={this.props.rows}
                          value={this.props.value} />
            </div>
        );
    }
}