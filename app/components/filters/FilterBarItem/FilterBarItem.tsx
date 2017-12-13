import * as React from "react";
import * as ReactDOM from "react-dom";

import './FilterBarItem.less';

interface FilterBarItemProps {
    toggleActiveItem: any,
    id: string,
    inputType: string,
    value: {label: string, value: string, selected: boolean}[],
    label: string,
    activeItemId: string,
    isVisible: boolean,
    className?: string
}

export default class FilterBarItem extends React.Component<FilterBarItemProps, {}> {
    filterItem: HTMLElement;

    constructor(props: FilterBarItemProps) {
        super(props);
    }

    calculateDropDownPosition() {
        const elementSize = ReactDOM.findDOMNode(this.filterItem).getBoundingClientRect();
        const bodyFontSize = parseInt(window.getComputedStyle(document.body).getPropertyValue('font-size').split('px')[0]);

        return elementSize.left - bodyFontSize; // subtract the 0.5rem padding
    }

    toggleDropDownVisibility() {
        const positioning = {
            left: this.calculateDropDownPosition()
        };

        this.props.toggleActiveItem(this.props.id, this.props.inputType, positioning, this.props.value);
    }

    getSelectedItemLabel() {
        return this.props.value.filter(item => item.selected)[0].label;
    }

    render() {
        if (this.props.isVisible) {
            const isActive = this.props.activeItemId === this.props.id;
            const isRadioInputType = this.props.inputType === 'radio';

            let computedClassName = 'proto-filters__list-item';
            computedClassName += isActive ? ' proto-filters__list-item--active' : '';
            computedClassName += this.props.className ? ` ${this.props.className}` : '';

            const iconClass = isActive ? 'fa-caret-up' : 'fa-caret-down';

            return (
                <div className={computedClassName}
                     onClick={() => this.toggleDropDownVisibility()}
                     ref={(filterItem) => this.filterItem = filterItem}>
                    <div className="proto-filters__list-item__label">
                        {isRadioInputType ? this.getSelectedItemLabel() : this.props.label}
                    </div>
                    <div className={`proto-filters__list-item__icon fa ${iconClass}`} />
                </div>
            );
        } else {
            return null;
        }
    }
}
