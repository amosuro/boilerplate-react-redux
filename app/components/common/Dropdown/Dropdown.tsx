import * as React from "react";

import './Dropdown.less';

export interface DropdownProps {
    name: string,
    items: { id: string, label: string, active: boolean }[],
    onClick: any,
    lockItemId?: string,
    className?: string,
    value: string
}

interface DropdownInternalState {
    listVisible: boolean
}

export default class Dropdown extends React.Component<DropdownProps, DropdownInternalState> {
    constructor(props: DropdownProps) {
        super(props);

        this.state = {
            listVisible: false
        };

        // required due to a gotcha with removing event listeners when using bind(this)
        this.onBodyClick = this.onBodyClick.bind(this);
    }

    componentDidUpdate() {
        if (this.state.listVisible) {
            document.body.addEventListener('click', this.onBodyClick);
        } else {
            document.body.removeEventListener('click', this.onBodyClick);
        }
    }

    toggleListVisibility() {
        this.setState({
            listVisible: !this.state.listVisible
        });
    }

    onBodyClick() {
        this.setState({
            listVisible: false
        });
    }

    onItemClick(selectedItem) {
        this.props.onClick(selectedItem.id);
        this.toggleListVisibility();
        this.resetActiveItem(selectedItem);
    }

    resetActiveItem(selectedItem) {
        if (selectedItem.id === this.props.value) {
            this.setState({
                listVisible: this.state.listVisible
            });
        } else {
            this.props.items.forEach(item => {
                if (selectedItem.id === item.id) {
                    this.setState({
                        listVisible: this.state.listVisible
                    });
                }
            });
        }
    }

    render() {
        const items = this.props.items.map((item, idx) => {
            const className = item.id === this.props.value ? 'proto-dropdown__list__item--selected' : 'proto-dropdown__list__item';
            return (
                <li key={idx}
                    onMouseDown={() => this.onItemClick(item)}
                    className={className}>
                    {item.label}
                </li>
            )
        });

        const baseClassName = `proto-dropdown__list`;
        const extraClassName = this.state.listVisible ? 'proto-dropdown__list--active' : '';
        const dropdownList = <ul className={`${baseClassName} ${extraClassName}`}>{items}</ul>;
        const displayList = this.state.listVisible ? dropdownList : null;
        const selectedItem = this.props.items.filter(item => item.id === this.props.lockItemId || item.id === this.props.value)[0];
        const dropdownClass = this.props.lockItemId ? 'proto-dropdown proto-dropdown--locked' : 'proto-dropdown';
        const dropdownCurrentClass = selectedItem ? 'proto-dropdown__current' : 'proto-dropdown__current--default';
        const dropdownLockedClass = this.props.lockItemId ? 'proto-dropdown--locked' : '';
        const dropdownIconClass = this.state.listVisible ? 'proto-dropdown__icon fa fa-caret-up' : 'proto-dropdown__icon fa fa-caret-down';

        return (
            <div className={`${dropdownClass} ${this.props.className}`}>
                <div onClick={() => this.toggleListVisibility()}
                     className={`${dropdownCurrentClass} ${dropdownLockedClass}`}
                     data-tip={this.props.name}>
                    {selectedItem ? selectedItem.label : this.props.name}
                </div>
                <div onClick={() => this.toggleListVisibility()}
                     className={`${dropdownIconClass} ${dropdownLockedClass}`} />
                {displayList}
            </div>
        )
    }
}