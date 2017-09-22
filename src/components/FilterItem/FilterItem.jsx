import React from 'react';
import ReactDOM from 'react-dom';

import url from './FilterItem.scss';

export default class FilterItem extends React.Component {
    constructor(props) {
        super(props);
    }

    calculateDropDownPosition() {
        const elementSize = ReactDOM.findDOMNode(this.filterItem).getBoundingClientRect();
        const bodyFontSize = parseInt(window.getComputedStyle(document.body).getPropertyValue('font-size').split('px')[0]);

        return elementSize.left - (bodyFontSize / 2); // get the 0.5rem px value
    }

    toggleDropDownVisibility() {
        const positioning = {
            left: this.calculateDropDownPosition()
        };

        this.props.toggleActiveItem(this.props.id, this.props.inputType, positioning, this.props.value);
    }

    render() {
        if (this.props.isVisible) {
            const isActive = this.props.activeItemId === this.props.id;
            const itemActiveClass = isActive ? 'proto-filters__list-item--active' : 'proto-filters__list-item';

            const iconClass = isActive ? 'fa-caret-up' : 'fa-caret-down';

            return (
                <div className={itemActiveClass}
                     onClick={() => this.toggleDropDownVisibility()}
                     ref={(filterItem) => this.filterItem = filterItem}>
                    <div className="proto-filters__list-item__label">{this.props.label}</div>
                    <div className={`proto-filters__list-item__icon fa ${iconClass}`}></div>
                </div>
            );
        } else {
            return null;
        }
    }
}