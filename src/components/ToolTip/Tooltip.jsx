import React from 'react';

import url from './ToolTip.scss';


export default class ToolTip extends React.Component {
    constructor(props) {
        super(props);
    }

    onDismiss() {
        this.props.toggleVisibility();
    }

    onAccept() {
        this.props.toggleVisibility();
        this.props.acceptAction();
    }

    render() {
        return (
            <div className="proto-tool-tip">
                <div className="proto-tool-tip__actions">
                    <div onClick={() => this.onDismiss()} className="proto-tool-tip__actions__btn--negative">Dismiss</div>
                    <div onClick={() => this.onAccept()} className="proto-tool-tip__actions__btn--positive">Accept</div>
                </div>
                <div className="proto-tool-tip__content">
                    {this.props.content}
                </div>
            </div>
        );
    }
}
