import React from 'react';
import ReactDOM from 'react-dom';

import url from './FilterSearchBar.scss';

export default class FilterSearchBar extends React.Component {
    constructor(props) {
        super(props);
    }

    onToggle() {
        this.props.toggleVisibility();
    }

    render() {
        const input = this.props.isVisible ? <input type="text"
                                                    placeholder="Search for keywords..."
                                                    className="proto-filters__search__input" /> : null;
        return (
            <div className="proto-filters__search-container">
                <div className="proto-filters__search"
                     onClick={() => this.onToggle()}>
                    <span className={this.props.isVisible ? 'proto-filters__search__icon fa fa-close' : 'proto-filters__search__icon fa fa-search'} />
                </div>
                {input}
            </div>
        );
    }
}