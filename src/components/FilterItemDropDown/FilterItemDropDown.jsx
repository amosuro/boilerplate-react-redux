import React from 'react';

import url from './FilterItemDropDown.scss';

export default class FilterItemDropDown extends React.Component {
    constructor(props) {
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

    renderInputType(option, idx) {
        console.log(this.props.value);
        switch(this.props.inputType) {
            case 'radio':
                return (
                    <div key={idx} className="proto-radio">
                        <input type="radio" id={option.id}
                               name="radio-group"
                               className="proto-radio__input"
                               onChange={event => this.props.onInputChange(event, this.props.value, this.props.inputType)}
                               defaultChecked={option.active} />
                        <label htmlFor={option.id} className="proto-radio__label">{option.label}</label>
                    </div>
                );
                break;
            case 'checkbox':
                return (
                    <div key={idx} className="proto-checkbox">
                        <input type="checkbox" id={option.id} className="proto-radio__input" onChange={event => this.props.onInputChange(event)} defaultChecked={option.active} />
                        <label htmlFor={option.id} className="proto-radio__label">{option.label}</label>
                    </div>
                );
                break;
            case 'text':
                return (
                    <div className="proto-text">
                        <input type="text"
                               className="proto-text__input"
                               onChange={event => this.props.onInputChange(event)}
                               placeholder={`Enter ${this.props.value.label}`}
                               id="something"  />
                        <div className="proto-text__btn fa fa-arrow-right"></div>
                    </div>
                );
                break;
        }
    }

    render() {
        if (this.props.isVisible) {
            return (
                <div style={this.props.positioning} ref={dropDownContainer => this.dropDownContainer = dropDownContainer} className="proto-filters__dropDown">
                    {
                        this.props.inputType === 'text' ? this.renderInputType(this.props.value) : this.props.value.map((option, idx) => this.renderInputType(option, idx))
                    }
                </div>
            );
        } else {
            return null;
        }
    }
}