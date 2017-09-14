import React from 'react';

import url from './Dropdown.scss';

export default class Dropdown extends React.Component {
    constructor(props) {
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

    toggleListVisibility(id) {
        this.setState({
            listVisible: !this.state.listVisible
        });
    }

    onBodyClick() {
        this.setState({
            listVisible: false
        });
    }

    onItemClick(id, name) {
        this.toggleListVisibility(id);
        this.props.onClick(id, name);
    }

    render() {
        const items = this.props.items.map((item, idx) => {
            return (
                <li key={idx}
                    onClick={() => this.onItemClick(item.id, this.props.name)}
                    className="proto-dropdown__list__item">
                    {item.label}
                </li>
            )
        });
        const dropdownList = <ul className={this.state.listVisible ? 'proto-dropdown__list proto-dropdown__list--active' : 'proto-dropdown__list'}>{items}</ul>;
        const displayList = this.state.listVisible ? dropdownList : null;
        const selectedItem = this.props.items.find(item => item.active);

        return (
            <div className="proto-dropdown">
                <div onClick={() => this.toggleListVisibility()}
                     className="proto-dropdown__current">
                    {selectedItem ? selectedItem.label : this.props.name}
                </div>
                <div onClick={() => this.toggleListVisibility()}
                     className={this.state.listVisible ? 'proto-dropdown__icon fa fa-caret-up' : 'proto-dropdown__icon fa fa-caret-down'}></div>
                {displayList}
            </div>
        )
    }
}