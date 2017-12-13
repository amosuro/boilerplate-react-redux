declare const require: any;

import * as React from "react";
import { Editor, EditorState, RichUtils, Entity, convertToRaw } from 'draft-js';
import {stateFromHTML} from 'draft-js-import-html';

import 'draft-js/dist/Draft.css';
import './DualInput.less';

import PostTypeSelector from '../PostTypeSelector/PostTypeSelector';

const Collapse = require('react-collapse');

interface DualInputProps {
    activeType: string,
    inputValue: string,
    textAreaValue: string,
    updateType: any,
    updateTextArea: any,
    updateInput: any,
    validateInput: any,
    validateTextArea: any,
    inputInvalid: boolean,
    textAreaInvalid: boolean,
    invalidInputText: string,
    invalidTextAreaText: string
}

interface DualInputInternalState {
    textAreaVisible: boolean
    editorState: any
}

export default class DualInput extends React.Component<DualInputProps, DualInputInternalState> {
    constructor(props: DualInputProps) {
        super(props);

        this.state = {
            textAreaVisible: !!this.props.textAreaValue.length,
            editorState: EditorState.createWithContent(stateFromHTML(this.props.textAreaValue))
        }
    }

    componentWillReceiveProps(props) {
        this.state = {
            textAreaVisible: !!props.textAreaValue.length,
            editorState: EditorState.createWithContent(stateFromHTML(props.textAreaValue))
        }
    }

    onInput(event) {
        const content = event.target.value;

        this.setState({
            textAreaVisible: !!content.length || !!this.props.textAreaValue.length,
            editorState: this.state.editorState
        });

        this.props.updateInput(event);
    }

    onTextAreaChange(editorState) {
        const contentState = convertToRaw(editorState.getCurrentContent());
        const serialisedContent = JSON.stringify(contentState);

        this.setState({
            editorState: editorState,
            textAreaVisible: this.state.textAreaVisible
        });

        this.props.updateTextArea(serialisedContent);
    }

    onInputBlur(event) {
        this.props.validateInput(event);
    }

    onTextAreaBlur() {
        const contentState = this.state.editorState.getCurrentContent();

        this.props.validateTextArea(contentState);
    }

    onTextAreaKeyChange(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            this.onTextAreaChange(newState);
        }
    }

    onInlineStyle(formatType: string) {
        this.onTextAreaChange(RichUtils.toggleInlineStyle(this.state.editorState, formatType));
    }

    onBlockStyle(formatType: string) {
        this.onTextAreaChange(RichUtils.toggleBlockType(this.state.editorState, formatType));
    }

    render() {
        return (
            <div className="proto-dual-input">
                <input type="text"
                       onChange={(event) => this.onInput(event)}
                       onBlur={event => this.onInputBlur(event)}
                       placeholder="Title of your commentary..."
                       className="proto-dual-input poc-input test-commentary-input"
                       value={this.props.inputValue} />

                <PostTypeSelector activeType={this.props.activeType}
                                  updateType={this.props.updateType} />

                <Collapse isOpened={!!this.state.textAreaVisible}>
                    <Editor editorState={!this.props.textAreaValue.length ? EditorState.createEmpty() : this.state.editorState}
                            placeholder="Start typing your commentary..."
                            handleKeyCommand={this.onTextAreaKeyChange.bind(this)}
                            onChange={this.onTextAreaChange.bind(this)}
                            onBlur={(state) => this.onTextAreaBlur()}
                    />
                    <ul className="proto-format">
                        <li onClick={() => this.onInlineStyle('BOLD')} className="proto-format__option fa fa-bold" />
                        <li onClick={() => this.onInlineStyle('ITALIC')} className="proto-format__option fa fa-italic" />
                        <li onClick={() => this.onBlockStyle('unordered-list-item')} className="proto-format__option fa fa-list" />
                        <li onClick={() => this.onBlockStyle('ordered-list-item')} className="proto-format__option fa fa-list-ol" />
                    </ul>
                </Collapse>

                <Collapse isOpened={!!this.props.inputInvalid} className="invalid-form-field-message">
                    {this.props.invalidInputText}
                </Collapse>

                <Collapse isOpened={!!this.props.textAreaInvalid} className="invalid-form-field-message">
                    {this.props.invalidTextAreaText}
                </Collapse>
            </div>
        )
    }
}
