import * as React from "react";

import './FilterBarItemDropdown.less';

interface FilterBarItemDropdownProps {
    toggleVisibility: any,
    inputType: string,
    positioning: any,
    isVisible: boolean,
    onInputChange: any,
    value: any
}

export default class FilterBarItemDropdown extends React.Component<FilterBarItemDropdownProps, {}> {
    dropDownContainer: any;

    constructor(props: FilterBarItemDropdownProps) {
        super(props);

        // required due to a gotcha with removing event listeners when using bind(this)
        this.onBodyClick = this.onBodyClick.bind(this);
    }

    componentDidUpdate() {
        if (this.props.isVisible) {
            document.body.addEventListener('click', this.onBodyClick);
        } else {
            document.body.removeEventListener('click', this.onBodyClick);
        }
    }

    onBodyClick(event) {
        if (!this.isSelectableElement(event.target, 5, this.dropDownContainer.className)) {
            this.props.toggleVisibility();
        }
    }

    isSelectableElement(DOMelement, depth, className) {
        if (DOMelement.classList.contains(className)) {
            return true;
        } else {
            if (DOMelement.parentElement && depth) {
                return this.isSelectableElement(DOMelement.parentElement, depth - 1, className);
            } else {
                return false;
            }
        }
    };

    onChange(event) {
        const value = event.target.value;
        this.props.onInputChange(value);

        if (this.props.inputType === 'radio') {
            this.props.toggleVisibility();
        }
    }

    renderInputType(option, idx) {
        switch(this.props.inputType) {
            case 'radio':
                return (
                    <div key={idx} className="proto-radio">
                        <input type="radio"
                               name="radio-group"
                               id={option.value}
                               className="proto-radio__input"
                               value={option.value}
                               onChange={event => this.onChange(event)}
                               defaultChecked={option.selected} />
                        <label htmlFor={option.value}
                               className="proto-radio__label">
                            {option.label}
                            </label>
                    </div>
                );
            case 'checkbox':
                return (
                    <div key={idx} className="proto-checkbox">
                        <input type="checkbox"
                               id={option.value}
                               className="proto-radio__input"
                               value={option.value}
                               onChange={event => this.onChange(event)}
                               defaultChecked={option.selected} />
                        <label htmlFor={option.value}
                               className="proto-radio__label">{option.label}</label>
                    </div>
                );
        }
    }

    render() {
        if (this.props.isVisible) {
            return (
                <div style={this.props.positioning} ref={dropDownContainer => this.dropDownContainer = dropDownContainer} className="proto-filters__dropDown">
                    {this.props.value.map((option, idx) => this.renderInputType(option, idx))}
                </div>
            );
        } else {
            return null;
        }
    }
}
