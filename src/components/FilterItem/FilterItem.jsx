import React from 'react';
import ReactDOM from 'react-dom';

import url from './FilterItem.scss';

import FilterItemDropDown from '../FilterItemDropDown/FilterItemDropDown';

export default class FilterItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dropDownPosition: {
                left: 0
            }
        }
    }

    componentDidMount() {
        this.calculateDropDownPosition();
    }

    calculateDropDownPosition() {
        const elementSize = ReactDOM.findDOMNode(this.filterItem).getBoundingClientRect();
        const bodyFontSize = parseInt(window.getComputedStyle(document.body).getPropertyValue('font-size').split('px')[0]);

        this.setState({
           dropDownPosition: {
               left: elementSize.left - (bodyFontSize / 2) // get the 0.5rem px value
           }
        });
    }

    toggleDropDownVisibility() {
        this.props.toggleActiveItem(this.props.id);
    }

    render() {
        const isActive = this.props.activeItem === this.props.id;
        const dropDown = isActive ? <FilterItemDropDown inputType={this.props.inputType}
                                                        positioning={this.state.dropDownPosition}
                                                        options={this.props.options} /> : null;

        const itemActiveClass = isActive ? 'proto-filters__list-item--active' : 'proto-filters__list-item';

        const iconClass = isActive ? 'fa-caret-up' : 'fa-caret-down';

        return (
            <div className={itemActiveClass}
                 onClick={() => this.toggleDropDownVisibility()}
                 ref={(filterItem) => this.filterItem = filterItem}>
                <div className="proto-filters__list-item__label">{this.props.label}</div>
                <div className={`proto-filters__list-item__icon fa ${iconClass}`}></div>
                {dropDown}
            </div>
        );
    }
}