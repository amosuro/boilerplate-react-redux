import * as React from "react";
import {connect} from "react-redux";

import {filterByPostingText} from "../Filters/Filters";

import "./FilterBarSearch.less";

interface FilterBarSearchProps {
    onFilterByPostingText: any,
    searchText: string
}

interface FilterBarSearchState {
    isVisible: boolean
}

export class FilterBarSearchDisplay extends React.Component<FilterBarSearchProps, FilterBarSearchState> {
    constructor(props: FilterBarSearchProps) {
        super(props);

        this.state = {
            isVisible: false
        }
    }

    toggleSearchBar() {
        this.updateFilterText(undefined);
        this.setVisibility(!this.state.isVisible);
    }

    componentWillReceiveProps(newProps) {
        this.setVisibility(newProps.searchText && !!newProps.searchText.length);
    }

    onChange(event) {
        this.updateFilterText(event.target.value);
    }

    updateFilterText(filterText: string) {
        this.props.onFilterByPostingText(filterText);
    }

    setVisibility(isVisible) {
        this.setState({isVisible});
    }

    render() {
        const input = this.state.isVisible ? <input type="text"
                                                    placeholder="Search using keywords..."
                                                    autoFocus
                                                    value={this.props.searchText ? this.props.searchText : ""}
                                                    onChange={e => this.onChange(e)}
                                                    className="proto-filters__search__input"/> : null;
        return (
            <div className="proto-filters__search-container">
                <div className="proto-filters__search"
                     onClick={() => this.toggleSearchBar()}>
                    <span
                        className={this.state.isVisible ? 'proto-filters__search__icon fa fa-close' : 'proto-filters__search__icon fa fa-search'}/>
                </div>
                {input}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        searchText: state.filter_state.filterContent
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFilterByPostingText: (filterText) => {
            dispatch(filterByPostingText(filterText));
        }
    }
};

export const FilterBarSearch = connect(mapStateToProps, mapDispatchToProps)(FilterBarSearchDisplay);
