import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

import url from './CommentaryDualInput.scss';

import CommentaryTextArea from '../CommentaryTextArea/CommentaryTextArea';
import CommentaryTypes from '../CommentaryTypes/CommentaryTypes';

export default class CommentaryDualInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            textAreaVisible: false
        }
    }

    onInput(event) {
        const content = event.target.value;

        this.setState({
            textAreaVisible: content.length > 4 || this.props.model.detail.length
        });
    }

    render() {
        const textArea = this.state.textAreaVisible ? <CommentaryTextArea key={0}
                                value={this.props.model.detail}
                                rows={this.props.rows}
                                placeholder="Start typing your commentary..."
                                shouldFocus={this.props.shouldFocus}
                                shouldResize={true}
                                updateType={this.props.updateType}
                                types={this.props.types}
                                onKeyUp={this.props.onKeyUp}
                                withFormatting={true}
                                updateValue={this.props.updateDetail} /> : null;
        return (
            <div className="proto-dual-input">
                <input type="text"
                       onInput={(event) => this.onInput(event)}
                       placeholder="Title of your commentary..."
                       className="proto-dual-input"
                       onKeyUp={event => this.props.updateTitle(event)} />
                <CommentaryTypes updateType={this.props.updateType}
                                 types={this.props.types} />

                <CSSTransitionGroup
                    transitionName="proto-dual-input__textarea"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}>
                    {textArea}
                </CSSTransitionGroup>
            </div>
        )
    }
}