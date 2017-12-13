import * as React from "react";
import * as Select from "react-select";

import {SymUser} from "../../../models";

import './PrivacyToggle.less';

const RecipientsValueComponent = (props) => {
    return (
        <div className={"Select-value " + (props.value.invalid ? "invalid" : "")}>
            <span className="Select-value-icon" aria-hidden="true" onClick={() => props.onRemove(props.value)}>×</span>
            <span className="Select-value-label" role="option" aria-selected="true" id="react-select-2--value-2">
                {props.value.invalid ? props.value.emailAddress + ' (not found)' : props.value.displayName}<span
                className="Select-aria-only">&nbsp;</span>
            </span>
        </div>
    )
};

export interface PrivacyToggleProps {
    isPrivate: boolean,
    privateUsers: Array<SymUser>,
    options: Array<SymUser>,
    optionRenderer: any,
    isLoading: boolean,
    onInputChange: any,
    onPrivateUsersChange: any,
    onPrivacyChange: any
}

export default class PrivacyToggle extends React.Component<PrivacyToggleProps, {}> {
    constructor(props: PrivacyToggleProps) {
        super(props);
    }

    toggleLock() {
        this.props.onPrivacyChange();
    }

    render() {
        const lockLabel = this.props.isPrivate ? 'Private ' : 'Public ';

        return (
            <div className="row end-xs bottom-xs middle-sm">
                <div className="col-xs-12 col-sm-8">
                    {this.props.isPrivate && <Select multi={true}
                                                     value={this.props.privateUsers}
                                                     onChange={this.props.onPrivateUsersChange}
                                                     options={this.props.options}
                                                     labelKey="displayName"
                                                     valueKey="emailAddress"
                                                     placeholder="Enter recipients here"
                                                     optionRenderer={this.props.optionRenderer}
                                                     valueComponent={RecipientsValueComponent}
                                                     onInputChange={this.props.onInputChange}
                                                     isLoading={this.props.isLoading}
                    />}
                </div>
                <div className="col-xs-12 col-sm-4 text-right">
                    <div className="proto-lock-container">
                        <div className="proto-lock">
                            <span onClick={() => this.toggleLock()}
                                className="proto-lock__label">
                                {lockLabel}
                            </span>
                            <span onClick={() => this.toggleLock()}
                                  className={`proto-lock__icon fa ${this.props.isPrivate ? 'fa-lock' : 'fa-unlock'}`}></span>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}