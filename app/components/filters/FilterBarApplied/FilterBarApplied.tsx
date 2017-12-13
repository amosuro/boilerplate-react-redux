import * as React from "react";

import { FilterState } from '../Filters/Filters';
import {PostingTypesEnum, HashTagEnum} from "../../../models";

import './FilterBarApplied.less';

interface FilterBarAppliedProps {
    filterState: FilterState,
    removeFilter: any
}

export default class FilterBarApplied extends React.Component<FilterBarAppliedProps, {}> {
    constructor(props: FilterBarAppliedProps) {
        super(props);
    }

    removeFilter(value, type) {
        this.props.removeFilter(value, type);
    }

    renderFilter(id, filter, filterType, label) {
        return (
            <div key={id}
                 onClick={() => this.removeFilter(filter, filterType)}
                 className="proto-filters-applied__item">
                <span className="proto-filters-applied__item__icon fa fa-window-close" />
                <span className="proto-filters-applied__item__label">
                    {label}
                </span>
            </div>
        );
    }

    renderCheckboxFilters(filterType, filterValue, enumReference, label?) {
        const appliedFilters = this.props.filterState[filterType];
        const isSingleFilter = (typeof appliedFilters === 'string' && appliedFilters === filterValue) || (typeof appliedFilters === 'boolean' && appliedFilters);
        const isManyFilters = appliedFilters.length;

        if (isSingleFilter) {
            return this.renderFilter(filterType, filterValue, filterType, label);
        } else if (isManyFilters) {
            return this.props.filterState[filterType].map((filter, idx) => {
                return this.renderFilter(idx, filter, filterType, enumReference.labelFor(filter));
            });
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className="proto-filters-applied">
                {this.renderCheckboxFilters('postingTypes', null, PostingTypesEnum)}
                {this.renderCheckboxFilters('assetClasses', null, HashTagEnum)}
                {this.renderCheckboxFilters('regions', null, HashTagEnum)}
                {this.renderCheckboxFilters('private_', 'PRV', null, 'Private')}
                {this.renderCheckboxFilters('public_', 'PUB', null, 'Public')}
                {this.renderCheckboxFilters('activeFxTradeIdea', 'ACTIVE', null, 'Active')}
                {this.renderCheckboxFilters('nonActiveFxTradeIdea', 'NOT_ACTIVE', null, 'Non Active')}
                {this.renderCheckboxFilters('buyFxTradeIdea', 'BUY', null, 'Buy')}
                {this.renderCheckboxFilters('sellFxTradeIdea', 'SELL', null, 'Sell')}
            </div>
        );
    }
}