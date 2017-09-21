import React from 'react';

import url from './FilterItemDropDown.scss';

export default class FilterItemDropDown extends React.Component {
    constructor(props) {
        super(props);
    }

    renderInputType(option, idx) {
        switch(this.props.inputType) {
            case 'radio':
                return (
                    <div key={idx} className="proto-radio">
                        <input type="radio" id="something" className="proto-radio__input" />
                        <label htmlFor="something" className="proto-radio__label">{option.label}</label>
                    </div>
                );
                break;
            case 'checkbox':
                return (
                    <div key={idx} className="proto-radio">
                        <input type="radio" id="something" className="proto-radio__input" />
                        <label for="something" className="proto-radio__label">{option.label}</label>
                    </div>
                );
                break;
        }
    }

    render() {
        return (
            <div style={this.props.positioning} className="proto-filters__dropDown">
                {
                    this.props.options.map((option, idx) => this.renderInputType(option, idx))
                }
            </div>
        );
    }
}