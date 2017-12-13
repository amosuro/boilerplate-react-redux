import * as React from "react";
import * as Collapse from "react-collapse";
import * as DatePicker from 'react-datepicker';
import * as moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

import './Input.less';

interface InputProps {
    value: any,
    name: string,
    placeholder: string,
    type: string,
    onChange: any,
    isInvalid?: boolean,
    invalidText?: string,
    onBlur?: any,
    className?: string
    maxLength?: number
}

export default class Input extends React.Component<InputProps, {}> {
    constructor(props: InputProps) {
        super(props);
    }

    onBlur(e) {
        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    }

    onChange(isoString) {
        this.props.onChange(isoString);
    }

    render() {
        return (
            <div className="input" data-tip={this.props.type === 'date' ? this.props.placeholder : null}>
                {
                    this.props.type === 'date' ? <DatePicker className={`input__field poc-input ${this.props.className}`}
                                                             selected={moment(this.props.value)}
                                                             minDate={moment()}
                                                             onBlur={(event) => this.onBlur(event)}
                                                             placeholderText={this.props.placeholder}
                                                             onChange={(moment) => this.onChange(moment.toISOString())} /> : <input className={`input__field poc-input ${this.props.className}`}
                                                                                                                    onChange={(event) => this.onChange(event)}
                                                                                                                    onBlur={(event) => this.onBlur(event)}
                                                                                                                    placeholder={this.props.placeholder}
                                                                                                                    value={this.props.value}
                                                                                                                    type={this.props.type}
                                                                                                                    maxLength={this.props.maxLength} />
                }
                <Collapse isOpened={!!this.props.isInvalid} className="invalid-form-field-message">
                    {this.props.invalidText}
                </Collapse>
            </div>
        )
    }
}